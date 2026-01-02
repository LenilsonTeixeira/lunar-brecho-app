import { ApiError } from '../types';
import { ENV } from '../../config/env';
import { STORAGE_KEYS } from '../../constants/storageKeys';

const API_BASE_URL = ENV.API_URL || 'http://localhost:3000';

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

  /**
   * Obtém o token ativo atual.
   * Prioriza o token de admin/super_admin sobre o token do public_client.
   */
  private getActiveToken(): string | null {
    const adminToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (adminToken) {
      return adminToken;
    }

    const publicClientToken = localStorage.getItem(STORAGE_KEYS.PUBLIC_CLIENT_TOKEN);
    if (publicClientToken) {
      return publicClientToken;
    }

    return null;
  }

  /**
   * Verifica se está usando token de admin (vs public_client).
   */
  private isUsingAdminToken(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  private async makeRequest<T>(
    endpoint: string,
    options: any = {},
    isRetry: boolean = false,
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Se skipDefaultHeaders for true, mantém apenas Content-Type para o body JSON funcionar
    const defaultHeaders = options.skipDefaultHeaders
      ? { 'Content-Type': 'application/json' }
      : {
          'Content-Type': 'application/json',
          'x-store-id': ENV.STORE_ID,
        };

    const config: any = {
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    // Adiciona token de autorização se disponível (prioriza admin sobre public_client)
    // Não adiciona se skipDefaultHeaders for true
    const token = this.getActiveToken();
    if (token && !options.skipDefaultHeaders) {
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
            // Se estiver usando token de admin, redireciona para login
            // Se for public_client, apenas tenta reautenticar
            if (this.isUsingAdminToken()) {
              this.handleAuthFailure();
              throw new ApiError('Sessão expirada. Faça login novamente.', 401);
            } else {
              // Tenta reautenticar o public_client
              await this.handlePublicClientReauth();
              // Tenta a requisição novamente
              return this.makeRequest<T>(endpoint, options, true);
            }
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
      // Determina qual refresh token usar baseado no tipo de autenticação
      const isAdmin = this.isUsingAdminToken();
      const refreshTokenKey = isAdmin
        ? STORAGE_KEYS.REFRESH_TOKEN
        : STORAGE_KEYS.PUBLIC_CLIENT_REFRESH_TOKEN;
      const accessTokenKey = isAdmin ? STORAGE_KEYS.AUTH_TOKEN : STORAGE_KEYS.PUBLIC_CLIENT_TOKEN;

      const refreshToken = localStorage.getItem(refreshTokenKey);
      if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
      }

      // Importação dinâmica para evitar dependência circular
      const { authService } = await import('../auth/AuthService');
      const response = await authService.refreshToken({ refreshToken });

      // Atualiza os tokens no localStorage (na chave apropriada)
      localStorage.setItem(accessTokenKey, response.accessToken);
      localStorage.setItem(refreshTokenKey, response.refreshToken);

      return response.accessToken;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      throw error;
    }
  }

  private handleAuthFailure(): void {
    // Remove tokens de admin do localStorage
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);

    // Redireciona para a página de login
    window.location.href = '/admin/login';
  }

  private async handlePublicClientReauth(): Promise<void> {
    // Remove tokens do public_client
    localStorage.removeItem(STORAGE_KEYS.PUBLIC_CLIENT_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.PUBLIC_CLIENT_REFRESH_TOKEN);

    // Tenta reautenticar o public_client
    const { authService } = await import('../auth/AuthService');
    await authService.authenticatePublicClient();
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
    const token = this.getActiveToken();

    const config: any = {
      method: 'POST',
      headers: {
        'x-store-id': ENV.STORE_ID,
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
            // Se estiver usando token de admin, redireciona para login
            if (this.isUsingAdminToken()) {
              this.handleAuthFailure();
              throw new ApiError('Sessão expirada. Faça login novamente.', 401);
            } else {
              await this.handlePublicClientReauth();
              return this.makeUploadRequest<T>(endpoint, file, true);
            }
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
