import { BaseApiService } from '../base/ApiService';
import { StoreRequest, StoreResponse, StoreListResponse } from '../types';

export class StoreService extends BaseApiService {
  // StoreService não usa x-store-id header pois é para super admin
  async getStores(): Promise<StoreListResponse> {
    return this.request<StoreListResponse>('/stores', {
      method: 'GET',
      skipDefaultHeaders: true,
    });
  }

  async getStore(id: string): Promise<StoreResponse> {
    return this.request<StoreResponse>(`/stores/${id}`, {
      method: 'GET',
      skipDefaultHeaders: true,
    });
  }

  async createStore(data: StoreRequest): Promise<StoreResponse> {
    return this.request<StoreResponse>('/stores', {
      method: 'POST',
      body: JSON.stringify(data),
      skipDefaultHeaders: true,
    });
  }

  async updateStore(id: string, data: StoreRequest): Promise<StoreResponse> {
    return this.request<StoreResponse>(`/stores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      skipDefaultHeaders: true,
    });
  }

  async deleteStore(id: string): Promise<void> {
    return this.request<void>(`/stores/${id}`, {
      method: 'DELETE',
      skipDefaultHeaders: true,
    });
  }
}

export const storeService = new StoreService();
