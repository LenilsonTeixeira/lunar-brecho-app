import { Product } from './product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface CartContextData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity: number, selectedSize: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string, selectedSize: string) => number;
}
