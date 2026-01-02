import { ProductListItemResponse } from '../services/types';

export interface CartItem {
  id: string;
  productId: string;
  externalId: string;
  variantSize: string;
  quantity: number;
  snapshot: {
    name: string;
    mainImageUrl?: string;
    mainThumbnailImageUrl?: string;
    brand?: string;
    type: 'NEW' | 'BAZAAR';
    category: string;
    basePrice: number;
    discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
    discountValue?: number;
    size: string;
    stockAvailable: number;
    sku?: string;
  };
}

export interface CartContextData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: ProductListItemResponse, quantity: number, variantSize: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string, variantSize: string) => number;
}
