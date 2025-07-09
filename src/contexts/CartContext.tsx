import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';
import { CartItem, CartContextData } from '../types/cart';
import { calculateDiscountedPrice } from '../utils/priceUtils';

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        setItems([]);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, selectedSize: string) => {
    if (quantity <= 0) return;

    // Verificar se o produto já está no carrinho com o mesmo tamanho
    const existingItemIndex = items.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === selectedSize,
    );

    if (existingItemIndex >= 0) {
      // Atualizar quantidade do item existente
      const updatedItems = [...items];
      const newQuantity = updatedItems[existingItemIndex].quantity + quantity;

      // Validar estoque
      if (newQuantity > product.amount) {
        alert(`Quantidade indisponível. Estoque disponível: ${product.amount} unidades.`);
        return;
      }

      updatedItems[existingItemIndex].quantity = newQuantity;
      setItems(updatedItems);
    } else {
      // Adicionar novo item
      if (quantity > product.amount) {
        alert(`Quantidade indisponível. Estoque disponível: ${product.amount} unidades.`);
        return;
      }

      const newItem: CartItem = {
        id: `${product.id}-${selectedSize}-${Date.now()}`,
        product,
        quantity,
        selectedSize,
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
    if (quantity > item.product.amount) {
      alert(`Quantidade indisponível. Estoque disponível: ${item.product.amount} unidades.`);
      return;
    }

    setItems(items.map((item) => (item.id === itemId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (productId: string, selectedSize: string): number => {
    const item = items.find(
      (item) => item.product.id === productId && item.selectedSize === selectedSize,
    );
    return item ? item.quantity : 0;
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce((total, item) => {
    const discountedPrice = calculateDiscountedPrice(item.product.price, 5);
    return total + discountedPrice * item.quantity;
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
