import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductListItemResponse } from '../services/types';
import { CartItem, CartContextData } from '../types/cart';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { calculateFinalPrice } from '../utils/priceUtils';

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);

        // Verificar se é o modelo antigo (não tem snapshot)
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0] && !parsed[0].snapshot) {
          // Modelo antigo detectado - limpar carrinho
          console.warn('Carrinho no formato antigo detectado. Limpando...');
          localStorage.removeItem(STORAGE_KEYS.CART);
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
        localStorage.removeItem(STORAGE_KEYS.CART);
        setItems([]);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: ProductListItemResponse, quantity: number, variantSize: string) => {
    if (quantity <= 0) return;

    // Buscar a variante selecionada pelo tamanho
    const variant = product.variants.find((v) => v.size === variantSize);
    if (!variant) {
      alert('Variante não encontrada.');
      return;
    }

    // Criar um identificador único para o item (produto + tamanho)
    const itemKey = `${product.id}-${variantSize}`;

    // Verificar se o produto já está no carrinho com o mesmo tamanho
    const existingItemIndex = items.findIndex(
      (item) => item.productId === product.id && item.variantSize === variantSize,
    );

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
        id: `${itemKey}-${Date.now()}`,
        productId: product.id,
        externalId: product.externalId,
        variantSize,
        quantity,
        snapshot: {
          name: product.name,
          mainImageUrl: product.mainImageUrl,
          mainThumbnailImageUrl: product.mainThumbnailImageUrl,
          brand: product.brand,
          type: product.isNew ? 'NEW' : 'BAZAAR',
          category: product.category,
          basePrice: product.basePrice,
          discountType: product.discountType,
          discountValue: product.discountValue,
          size: variant.size,
          stockAvailable: variant.stockAvailable || 0,
          sku: product.sku,
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

  const getItemQuantity = (productId: string, variantSize: string): number => {
    const item = items.find(
      (item) => item.productId === productId && item.variantSize === variantSize,
    );
    return item ? item.quantity : 0;
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce((total, item) => {
    // Calcula o preço com desconto aplicado
    const itemPrice = calculateFinalPrice(
      item.snapshot.basePrice,
      item.snapshot.discountType,
      item.snapshot.discountValue,
    );
    return total + itemPrice * item.quantity;
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
