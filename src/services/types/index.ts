// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  expiresIn: number;
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
  createdAt?: string;
  updatedAt?: string;
  productCount?: number;
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
