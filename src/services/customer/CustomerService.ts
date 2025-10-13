import { BaseApiService } from '../base/ApiService';
import { CustomerListResponse, CustomerRequest, CustomerResponse } from '../types';

export class CustomerService extends BaseApiService {
  async getCustomers(page: number, size: number): Promise<CustomerListResponse> {
    return this.request<CustomerListResponse>(`/customers?page=${page}&size=${size}`, {
      method: 'GET',
    });
  }

  async getCustomer(id: string): Promise<CustomerResponse> {
    return this.request<CustomerResponse>(`/customers/${id}`, {
      method: 'GET',
    });
  }

  async getCustomerByPhone(number: string): Promise<CustomerResponse | null> {
    return this.request<CustomerResponse | null>(`/customers/phone/${encodeURIComponent(number)}`, {
      method: 'GET',
    });
  }

  async createCustomer(data: CustomerRequest): Promise<CustomerResponse> {
    return this.request<CustomerResponse>('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCustomer(id: string, data: CustomerRequest): Promise<CustomerResponse> {
    return this.request<CustomerResponse>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCustomer(id: string): Promise<void> {
    return this.request<void>(`/customers/${id}`, {
      method: 'DELETE',
    });
  }
}

export const customerService = new CustomerService();
