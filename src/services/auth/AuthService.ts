import { BaseApiService } from '../base/ApiService';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types';

export class AuthService extends BaseApiService {
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

  async refreshToken(payload: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return this.request<RefreshTokenResponse>('/auth/refresh', {
      method: 'POST',
      // Sinaliza para o BaseApiService não tentar renovar novamente
      skipAuthRefresh: true,
      body: JSON.stringify(payload),
    });
  }
}

export const authService = new AuthService();
