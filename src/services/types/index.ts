// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  type: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  type: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
}

export interface RegisterResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  storeId: string | null;
  active: boolean;
}

// Category types
export interface CategoryRequest {
  name: string;
  description?: string;
  color?: string;
  orderDisplay?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface CategoryResponse {
  id: string;
  externalId?: string | null;
  name: string;
  description?: string;
  color?: string;
  orderDisplay?: number;
  imageUrl?: string;
  thumbnailUrl?: string;
  productCount?: number;
  totalProducts?: number;
  status: 'ACTIVE' | 'INACTIVE';
}

// Product types
export interface ProductVariant {
  id?: string;
  size: string;
  stockAvailable?: number;
}

export interface ProductImage {
  id?: string;
  originalUrl?: string;
  thumbnailUrl?: string;
  position: number;
  isMain: boolean;
}

export interface ProductRequest {
  mainImageUrl?: string;
  mainThumbnailImageUrl?: string;
  name: string;
  description?: string;
  brand?: string;
  color?: string;
  observations?: string;
  category: string;
  type: 'NEW' | 'BAZAAR';
  basePrice: number;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
  discountValue?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  variants: ProductVariant[];
  sku?: string;
}

export interface ProductResponse {
  id: string;
  externalId: string;
  sku?: string;
  mainImageUrl?: string;
  mainThumbnailImageUrl?: string;
  name: string;
  description?: string;
  brand?: string;
  color?: string;
  observations?: string;
  category: string;
  type: 'NEW' | 'BAZAAR';
  basePrice: number;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
  discountValue?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  variants: ProductVariant[];
  images: ProductImage[];
  totalCurrentStock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImageMetadataRequest {
  position: number;
  isMain: boolean;
  operationType: 'ADD' | 'UPDATE';
}

export interface ProductListItemResponse {
  id: string;
  externalId: string;
  sku?: string;
  name: string;
  mainImageUrl: string;
  mainThumbnailImageUrl: string;
  category: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  brand: string;
  color: string;
  observations: string;
  isNew: boolean;
  basePrice: number;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
  discountValue: number;
  storeId: string;
  variants: Array<{
    size: string;
    stockAvailable: number;
  }>;
  images: Array<{
    originalUrl?: string;
    position: number;
    isMain: boolean;
    thumbnailUrl?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export type ProductListResponse = ProductListItemResponse[];

// Common types
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Customer types
export interface CustomerRequest {
  externalId?: string | null;
  name: string;
  email?: string | null;
  phone: string;
  address?: string | null;
  neighborhood?: string | null;
  number?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  complement?: string | null;
}

export interface CustomerResponse {
  id?: string | null;
  externalId?: string | null;
  name: string;
  email?: string | null;
  phone: string;
  address?: string | null;
  neighborhood?: string | null;
  number?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  complement?: string | null;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerListResponse = CustomerResponse[];

// Order types
export interface OrderCustomer {
  fullName: string;
  phone: string;
}

export interface OrderItem {
  productId: string;
  sku?: string | null;
  externalId?: string | null;
  mainImageUrl: string;
  mainThumbnailImageUrl: string;
  name: string;
  brand: string;
  size: string;
  quantity: number;
  discountApplied?: number | null;
  unitPrice: number;
  subtotal: number;
}

export interface OrderFinancialSummary {
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
}

export interface OrderDeliveryAddress {
  address: string;
  neighborhood?: string | null;
  number?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  complement?: string | null;
}

export interface OrderRequest {
  id?: string;
  externalId?: string;
  customer: OrderCustomer;
  items: OrderItem[];
  financialSummary: OrderFinancialSummary;
  status: 'PENDING' | 'APPROVED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  deliveryType: 'HOME_DELIVERY' | 'STORE_PICKUP';
  deliveryAddress: OrderDeliveryAddress;
  paymentMethod: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH';
}

export interface OrderResponse {
  id: string;
  externalId: string;
  customer: OrderCustomer;
  items: OrderItem[];
  financialSummary: OrderFinancialSummary;
  status: 'PENDING' | 'APPROVED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  deliveryType: 'HOME_DELIVERY' | 'STORE_PICKUP';
  deliveryAddress: OrderDeliveryAddress;
  paymentMethod: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH';
  createdAt?: string;
  updatedAt?: string;
}

export type OrderListResponse = OrderResponse[];

export interface OrderStatusUpdateRequest {
  status: 'PENDING' | 'APPROVED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

// Store types
export interface StoreConfigProps {
  pixKey: string;
  whatsapp: string;
  deliveryFee: number;
}

export interface StoreRequest {
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  website?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  config?: StoreConfigProps;
}

export interface StoreResponse {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  website?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  config?: StoreConfigProps;
  createdAt: string;
  updatedAt: string;
}

export type StoreListResponse = StoreResponse[];
