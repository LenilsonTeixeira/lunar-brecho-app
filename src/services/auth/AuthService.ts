import { BaseApiService } from '../base/ApiService';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types';
import { ENV, isSuperAdminEmail } from '../../config/env';
import { STORAGE_KEYS } from '../../constants/storageKeys';

export class AuthService extends BaseApiService {
  private isPublicClientAuthenticating = false;
  private publicClientAuthPromise: Promise<LoginResponse | null> | null = null;

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Super admins fazem login sem o header x-store-id (na página /admin/login)
    const isAdminLoginPage = window.location.pathname === '/admin/login';
    const isSuperAdmin = isSuperAdminEmail(credentials.email);
    const shouldSkipHeaders = isAdminLoginPage && isSuperAdmin;

    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      ...(shouldSkipHeaders
        ? { skipDefaultHeaders: true }
        : {
            headers: {
              'x-store-id': ENV.STORE_ID,
            },
          }),
      body: JSON.stringify(credentials),
      skipAuthRefresh: true,
    });
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return this.request<RegisterResponse>('/auth/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async refreshToken(payload: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return this.request<RefreshTokenResponse>('/auth/refresh', {
      method: 'POST',
      // Sinaliza para o BaseApiService não tentar renovar novamente
      skipAuthRefresh: true,
      body: JSON.stringify(payload),
    });
  }

  /**
   * Autentica automaticamente com as credenciais do public_client.
   * Usado para obter um token básico para o frontend acessar recursos públicos.
   */
  async authenticatePublicClient(): Promise<LoginResponse | null> {
    // Se já está autenticando, aguarda a autenticação em andamento
    if (this.isPublicClientAuthenticating && this.publicClientAuthPromise) {
      return this.publicClientAuthPromise;
    }

    // Verifica se já existe um token válido do public_client
    const existingToken = localStorage.getItem(STORAGE_KEYS.PUBLIC_CLIENT_TOKEN);
    if (existingToken && !this.isTokenExpired(existingToken)) {
      return null; // Já autenticado
    }

    // Verifica se as credenciais do public_client estão configuradas
    if (!ENV.PUBLIC_CLIENT_EMAIL || !ENV.PUBLIC_CLIENT_PASSWORD) {
      console.warn(
        'Credenciais do public_client não configuradas. Configure VITE_PUBLIC_CLIENT_EMAIL e VITE_PUBLIC_CLIENT_PASSWORD.',
      );
      return null;
    }

    this.isPublicClientAuthenticating = true;
    this.publicClientAuthPromise = this.performPublicClientAuth();

    try {
      const response = await this.publicClientAuthPromise;
      return response;
    } finally {
      this.isPublicClientAuthenticating = false;
      this.publicClientAuthPromise = null;
    }
  }

  private async performPublicClientAuth(): Promise<LoginResponse | null> {
    try {
      const response = await this.login({
        email: ENV.PUBLIC_CLIENT_EMAIL!,
        password: ENV.PUBLIC_CLIENT_PASSWORD!,
      });

      // Salva os tokens do public_client separadamente
      localStorage.setItem(STORAGE_KEYS.PUBLIC_CLIENT_TOKEN, response.accessToken);
      localStorage.setItem(STORAGE_KEYS.PUBLIC_CLIENT_REFRESH_TOKEN, response.refreshToken);

      return response;
    } catch (error) {
      console.error('Erro ao autenticar public_client:', error);
      return null;
    }
  }

  /**
   * Renova o token do public_client usando o refresh token.
   */
  async refreshPublicClientToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.PUBLIC_CLIENT_REFRESH_TOKEN);
    if (!refreshToken) {
      // Tenta autenticar novamente
      const response = await this.authenticatePublicClient();
      return response?.accessToken || null;
    }

    try {
      const response = await this.refreshToken({ refreshToken });

      localStorage.setItem(STORAGE_KEYS.PUBLIC_CLIENT_TOKEN, response.accessToken);
      localStorage.setItem(STORAGE_KEYS.PUBLIC_CLIENT_REFRESH_TOKEN, response.refreshToken);

      return response.accessToken;
    } catch (error) {
      console.error('Erro ao renovar token do public_client:', error);
      // Se falhar, tenta autenticar novamente
      localStorage.removeItem(STORAGE_KEYS.PUBLIC_CLIENT_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.PUBLIC_CLIENT_REFRESH_TOKEN);
      const response = await this.authenticatePublicClient();
      return response?.accessToken || null;
    }
  }

  /**
   * Verifica se um token JWT está expirado.
   */
  private isTokenExpired(token: string): boolean {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      const payload = JSON.parse(jsonPayload);

      // Adiciona uma margem de 60 segundos para evitar problemas de timing
      const expirationTime = payload.exp * 1000;
      const now = Date.now();
      const marginMs = 60 * 1000;

      return now >= expirationTime - marginMs;
    } catch (error) {
      console.error('Erro ao verificar expiração do token:', error);
      return true; // Considera expirado se não conseguir decodificar
    }
  }

  /**
   * Retorna o token ativo atual, validando se não está expirado.
   * Prioriza o token de admin/super_admin sobre o token do public_client.
   */
  getValidActiveToken(): string | null {
    const adminToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (adminToken && !this.isTokenExpired(adminToken)) {
      return adminToken;
    }

    const publicClientToken = localStorage.getItem(STORAGE_KEYS.PUBLIC_CLIENT_TOKEN);
    if (publicClientToken && !this.isTokenExpired(publicClientToken)) {
      return publicClientToken;
    }

    return null;
  }

  /**
   * Verifica se o usuário atual é um admin ou super_admin.
   */
  isAdminAuthenticated(): boolean {
    const adminToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!adminToken && !this.isTokenExpired(adminToken);
  }

  /**
   * Limpa os tokens do public_client (usado principalmente para testes).
   */
  clearPublicClientTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.PUBLIC_CLIENT_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.PUBLIC_CLIENT_REFRESH_TOKEN);
  }
}

export const authService = new AuthService();
