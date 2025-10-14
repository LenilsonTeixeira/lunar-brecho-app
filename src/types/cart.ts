import { ProductResponse } from '../services/types';

export interface CartItem {
  id: string; // ID único do item no carrinho
  productId: string;
  productExternalId: string;
  variantId: string; // ID da variante selecionada
  quantity: number;

  // Snapshot do produto no momento da adição (para exibição e cálculo)
  snapshot: {
    name: string;
    mainImageUrl?: string;
    mainThumbnailUrl?: string;
    brand?: string;
    type: 'NEW' | 'BAZAAR';
    category: string;
    basePrice: number;
    discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
    discountValue?: number;
    size: string;
    stockAvailable: number;
  };
}

export interface CartContextData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: ProductResponse, quantity: number, variantId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string, variantId: string) => number;
}
