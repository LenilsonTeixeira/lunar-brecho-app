import { BaseApiService } from '../base/ApiService';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types';

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
}

export const authService = new AuthService();
