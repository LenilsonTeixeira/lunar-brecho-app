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
  discountType: 'PERCENTAGE' | 'FIXED' | 'NONE';
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
  discountType: 'PERCENTAGE' | 'FIXED' | 'NONE';
  discountValue?: number;
  status: 'ACTIVE' | 'INACTIVE';
  variants: ProductVariant[];
  images: ProductImage[];
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
