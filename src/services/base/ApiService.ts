import { ApiError } from '../types';

const API_BASE_URL = 'http://localhost:8080';

export class BaseApiService {
  protected baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  protected async request<T>(endpoint: string, options: any = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: any = {
      headers: {
        'Content-Type': 'application/json',
        'store-id': '15a60849-3b2a-480a-9fb3-3348f53f00fe',
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

  protected async uploadFile<T>(endpoint: string, file: File): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const config: any = {
      method: 'POST',
      headers: {
        'store-id': '15a60849-3b2a-480a-9fb3-3348f53f00fe',
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
}
