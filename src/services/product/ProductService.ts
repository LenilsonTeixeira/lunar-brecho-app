import { BaseApiService } from '../base/ApiService';
import {
  ProductRequest,
  ProductResponse,
  ProductListResponse,
  ProductImageMetadataRequest,
} from '../types';
import { ENV } from '../../config/env';

export class ProductService extends BaseApiService {
  async getProducts(page: number = 0, size: number = 10): Promise<ProductListResponse> {
    return this.request<ProductListResponse>(`/products?page=${page}&size=${size}`, {
      method: 'GET',
    });
  }

  async getProduct(id: string): Promise<ProductResponse> {
    return this.request<ProductResponse>(`/products/${id}`, {
      method: 'GET',
    });
  }

  async getProductBySku(sku: string): Promise<ProductResponse> {
    return this.request<ProductResponse>(`/products/sku/${encodeURIComponent(sku)}`, {
      method: 'GET',
    });
  }

  async createProduct(data: ProductRequest): Promise<ProductResponse> {
    return this.request<ProductResponse>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: ProductRequest): Promise<ProductResponse> {
    return this.request<ProductResponse>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string): Promise<void> {
    return this.request<void>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async uploadProductImage(
    productId: string,
    file: File,
    metadata: ProductImageMetadataRequest,
  ): Promise<ProductResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    const url = `${this.baseURL}/products/${productId}/images`;
    const token = localStorage.getItem('authToken');

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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro de conexão');
    }
  }

  async updateProductImage(
    productId: string,
    imageId: string,
    file: File,
    metadata: ProductImageMetadataRequest,
  ): Promise<ProductResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));

    const url = `${this.baseURL}/products/${productId}/images/${imageId}`;
    const token = localStorage.getItem('authToken');

    const config: any = {
      method: 'PATCH',
      headers: {
        'x-store-id': ENV.STORE_ID,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro de conexão');
    }
  }

  async deleteProductImage(productId: string, imageId: string): Promise<void> {
    return this.request<void>(`/products/${productId}/images/${imageId}`, {
      method: 'DELETE',
    });
  }
}

export const productService = new ProductService();
