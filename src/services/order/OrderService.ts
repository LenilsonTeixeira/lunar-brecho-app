import { BaseApiService } from '../base/ApiService';
import { OrderRequest, OrderResponse, OrderListResponse, OrderStatusUpdateRequest } from '../types';

export class OrderService extends BaseApiService {
  async getOrders(page: number = 0, size: number = 10): Promise<OrderListResponse> {
    return this.request<OrderListResponse>(`/orders?page=${page}&size=${size}`, {
      method: 'GET',
    });
  }

  async getOrder(id: string): Promise<OrderResponse> {
    return this.request<OrderResponse>(`/orders/${id}`, {
      method: 'GET',
    });
  }

  async createOrder(data: OrderRequest): Promise<OrderResponse> {
    return this.request<OrderResponse>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOrder(id: string, data: OrderRequest): Promise<OrderResponse> {
    return this.request<OrderResponse>(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteOrder(id: string): Promise<void> {
    return this.request<void>(`/orders/${id}`, {
      method: 'DELETE',
    });
  }

  async updateOrderStatus(id: string, status: OrderStatusUpdateRequest): Promise<OrderResponse> {
    return this.request<OrderResponse>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(status),
    });
  }
}

export const orderService = new OrderService();
