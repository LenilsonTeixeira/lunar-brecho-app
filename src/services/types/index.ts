// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  type: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
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
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface CategoryResponse {
  id: string;
  externalId: string;
  name: string;
  description?: string;
  color?: string;
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
  mainThumbnailUrl?: string;
  name: string;
  description?: string;
  brand?: string;
  observations?: string;
  category: string;
  type: 'NEW' | 'BAZAAR';
  basePrice: number;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
  discountValue?: number;
  status: 'ACTIVE' | 'INACTIVE';
  variants: ProductVariant[];
}

export interface ProductResponse {
  id: string;
  externalId: string;
  mainImageUrl?: string;
  mainThumbnailUrl?: string;
  name: string;
  description?: string;
  brand?: string;
  observations?: string;
  category: CategoryResponse;
  type: 'NEW' | 'BAZAAR';
  basePrice: number;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
  discountValue?: number;
  status: 'ACTIVE' | 'INACTIVE';
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

export interface ProductListResponse {
  content: ProductResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

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
export interface CustomerAddressRequest {
  street: string;
  number: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  type: 'HOME' | 'WORK' | 'OUTRO';
  isDefault: boolean;
}

export interface CustomerRequest {
  name: string;
  email?: string;
  phone: string;
  cpf?: string;
  addresses: CustomerAddressRequest[];
}

export interface CustomerAddressResponse {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  type: 'HOME' | 'WORK' | 'OUTRO';
  isDefault: boolean;
}

export interface CustomerResponse {
  id: string;
  externalId?: string;
  name: string;
  email?: string;
  phone: string;
  cpf?: string;
  addresses: CustomerAddressResponse[];
}

export interface CustomerListResponse {
  content: CustomerResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Order types
export interface OrderCustomer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  externalId: string;
  name: string;
  mainImageUrl: string;
  mainImageThumbnailUrl: string;
  brand: string;
  size: string;
  quantity: number;
  discountApplied: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderFinancialSummary {
  subtotal: number;
  totalAmount: number;
  deliveryFee: number;
  discountAmount: number;
}

export interface OrderDeliveryAddress {
  id: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface OrderRequest {
  id?: string;
  externalId?: string;
  customer: OrderCustomer;
  items: OrderItem[];
  financialSummary: OrderFinancialSummary;
  status: 'PENDING' | 'APPROVED' | 'SENT' | 'DELIVERED' | 'CANCELLED';
  deliveryType: 'HOME_DELIVERY' | 'PICKUP';
  deliveryAddress: OrderDeliveryAddress;
  paymentMethod: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH';
}

export interface OrderResponse {
  id: string;
  externalId: string;
  customer: OrderCustomer;
  items: OrderItem[];
  financialSummary: OrderFinancialSummary;
  status: 'PENDING' | 'APPROVED' | 'SENT' | 'DELIVERED' | 'CANCELLED';
  deliveryType: 'HOME_DELIVERY' | 'PICKUP';
  deliveryAddress: OrderDeliveryAddress;
  paymentMethod: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH';
}

export interface OrderListResponse {
  content: OrderResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface OrderStatusUpdateRequest {
  status: 'PENDING' | 'APPROVED' | 'SENT' | 'DELIVERED' | 'CANCELLED';
}
