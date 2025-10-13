import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductResponse } from '../services/types';
import { CartItem, CartContextData } from '../types/cart';

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);

        // Verificar se é o modelo antigo (não tem snapshot)
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0] && !parsed[0].snapshot) {
          // Modelo antigo detectado - limpar carrinho
          console.warn('Carrinho no formato antigo detectado. Limpando...');
          localStorage.removeItem('cart');
          alert(
            'Seu carrinho foi atualizado para uma nova versão. Por favor, adicione os produtos novamente.',
          );
          setItems([]);
          return;
        }

        // Modelo novo - carregar normalmente
        setItems(parsed);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        localStorage.removeItem('cart');
        setItems([]);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Calcula o preço final com desconto
  const calculateFinalPrice = (
    basePrice: number,
    discountType: 'PERCENTAGE' | 'FIXED' | 'NONE',
    discountValue?: number,
  ): number => {
    if (discountType === 'NONE' || !discountValue) {
      return basePrice;
    }

    if (discountType === 'PERCENTAGE') {
      return basePrice - (basePrice * discountValue) / 100;
    }

    if (discountType === 'FIXED') {
      return Math.max(0, basePrice - discountValue);
    }

    return basePrice;
  };

  const addToCart = (product: ProductResponse, quantity: number, variantId: string) => {
    if (quantity <= 0) return;

    // Buscar a variante selecionada
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) {
      alert('Variante não encontrada.');
      return;
    }

    // Verificar se o produto já está no carrinho com a mesma variante
    const existingItemIndex = items.findIndex((item) => item.variantId === variantId);

    if (existingItemIndex >= 0) {
      // Atualizar quantidade do item existente
      const updatedItems = [...items];
      const newQuantity = updatedItems[existingItemIndex].quantity + quantity;

      // Validar estoque
      if (newQuantity > (variant.stockAvailable || 0)) {
        alert(
          `Quantidade indisponível. Estoque disponível: ${variant.stockAvailable || 0} unidades.`,
        );
        return;
      }

      updatedItems[existingItemIndex].quantity = newQuantity;
      setItems(updatedItems);
    } else {
      // Adicionar novo item
      if (quantity > (variant.stockAvailable || 0)) {
        alert(
          `Quantidade indisponível. Estoque disponível: ${variant.stockAvailable || 0} unidades.`,
        );
        return;
      }

      const newItem: CartItem = {
        id: `${product.id}-${variantId}-${Date.now()}`,
        productId: product.id,
        productExternalId: product.externalId,
        variantId,
        quantity,
        snapshot: {
          name: product.name,
          mainImageUrl: product.mainImageUrl,
          mainThumbnailUrl: product.mainThumbnailUrl,
          brand: product.brand,
          type: product.type,
          category: product.category.name,
          basePrice: product.basePrice,
          discountType: product.discountType,
          discountValue: product.discountValue,
          size: variant.size,
          stockAvailable: variant.stockAvailable || 0,
        },
      };
      setItems([...items, newItem]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const item = items.find((item) => item.id === itemId);
    if (!item) return;

    // Validar estoque
    if (quantity > item.snapshot.stockAvailable) {
      alert(
        `Quantidade indisponível. Estoque disponível: ${item.snapshot.stockAvailable} unidades.`,
      );
      return;
    }

    setItems(items.map((item) => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (productId: string, variantId: string): number => {
    const item = items.find((item) => item.productId === productId && item.variantId === variantId);
    return item ? item.quantity : 0;
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce((total, item) => {
    const finalPrice = calculateFinalPrice(
      item.snapshot.basePrice,
      item.snapshot.discountType,
      item.snapshot.discountValue,
    );
    // Aplicar desconto adicional de 5% no PIX (mantido da lógica anterior)
    const pixPrice = finalPrice * 0.95;
    return total + pixPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
