const API_BASE_URL = 'http://localhost:8080';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  type: string;
  expiresIn: number;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
}

interface RegisterResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  storeId: string | null;
  active: boolean;
}

// Category interfaces
interface CategoryRequest {
  name: string;
  description?: string;
}

interface CategoryResponse {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  productCount?: number;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: any = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: any = {
      headers: {
        'Content-Type': 'application/json',
        'store-id': '08d38d1a-b5d2-439c-ae84-d6118fd3bb94',
        ...options.headers,
      },
      ...options,
    };

    // Adiciona token de autorização se disponível
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(errorData.message || `Erro ${response.status}`, response.status);
      }

      // Para DELETE requests, não tenta fazer parse do JSON
      if (response.status === 204 || options.method === 'DELETE') {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Erro de conexão', 0);
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return this.request<RegisterResponse>('/auth/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Category methods
  async getCategories(): Promise<CategoryResponse[]> {
    return this.request<CategoryResponse[]>('/categories', {
      method: 'GET',
    });
  }

  async getCategory(id: number): Promise<CategoryResponse> {
    return this.request<CategoryResponse>(`/categories/${id}`, {
      method: 'GET',
    });
  }

  async createCategory(data: CategoryRequest): Promise<CategoryResponse> {
    return this.request<CategoryResponse>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: number, data: CategoryRequest): Promise<CategoryResponse> {
    return this.request<CategoryResponse>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: number): Promise<void> {
    return this.request<void>(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  async uploadCategoryImage(id: number, file: File): Promise<CategoryResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/categories/${id}/images`;
    const token = localStorage.getItem('authToken');

    const config: any = {
      method: 'POST',
      headers: {
        'store-id': '08d38d1a-b5d2-439c-ae84-d6118fd3bb94',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(errorData.message || `Erro ${response.status}`, response.status);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Erro de conexão', 0);
    }
  }

  async deleteCategoryImage(id: number): Promise<void> {
    return this.request<void>(`/categories/${id}/images`, {
      method: 'DELETE',
    });
  }
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const apiService = new ApiService(API_BASE_URL);
export { ApiError };
export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  CategoryRequest,
  CategoryResponse,
};
