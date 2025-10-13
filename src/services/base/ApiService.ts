import { ApiError } from '../types';
import { ENV } from '../../config/env';

const API_BASE_URL = 'http://localhost:8080';

export class BaseApiService {
  protected baseURL: string;
  private isRefreshing = false;
  private refreshPromise: Promise<string | null> | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  protected async request<T>(endpoint: string, options: any = {}): Promise<T> {
    return this.makeRequest<T>(endpoint, options, false);
  }

  private async makeRequest<T>(
    endpoint: string,
    options: any = {},
    isRetry: boolean = false,
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: any = {
      headers: {
        'Content-Type': 'application/json',
        'store-id': ENV.STORE_ID,
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
        // Se for erro 401 (token expirado) e não for uma tentativa de retry
        // e não estiver marcado para pular lógica de refresh
        if (response.status === 401 && !isRetry && !options?.skipAuthRefresh) {
          try {
            // Tenta renovar o token
            const newToken = await this.refreshAccessToken();
            if (newToken) {
              // Refaz a requisição com o novo token
              return this.makeRequest<T>(endpoint, options, true);
            }
          } catch (refreshError) {
            // Se falhar ao renovar, redireciona para login
            this.handleAuthFailure();
            throw new ApiError('Sessão expirada. Faça login novamente.', 401);
          }
        }

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

  private async refreshAccessToken(): Promise<string | null> {
    // Se já está renovando, aguarda a renovação em andamento
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performTokenRefresh();

    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
      }

      // Importação dinâmica para evitar dependência circular
      const { authService } = await import('../auth/AuthService');
      const response = await authService.refreshToken({ refreshToken });

      // Atualiza os tokens no localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);

      return response.token;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      throw error;
    }
  }

  private handleAuthFailure(): void {
    // Remove tokens do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');

    // Redireciona para a página de login
    window.location.href = '/admin/login';
  }

  protected async uploadFile<T>(endpoint: string, file: File): Promise<T> {
    return this.makeUploadRequest<T>(endpoint, file, false);
  }

  private async makeUploadRequest<T>(
    endpoint: string,
    file: File,
    isRetry: boolean = false,
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');

    const config: any = {
      method: 'POST',
      headers: {
        'store-id': ENV.STORE_ID,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Se for erro 401 (token expirado) e não for uma tentativa de retry
        if (response.status === 401 && !isRetry) {
          try {
            // Tenta renovar o token
            const newToken = await this.refreshAccessToken();
            if (newToken) {
              // Refaz a requisição com o novo token
              return this.makeUploadRequest<T>(endpoint, file, true);
            }
          } catch (refreshError) {
            // Se falhar ao renovar, redireciona para login
            this.handleAuthFailure();
            throw new ApiError('Sessão expirada. Faça login novamente.', 401);
          }
        }

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
