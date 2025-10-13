import { BaseApiService } from '../base/ApiService';
import { CategoryRequest, CategoryResponse } from '../types';

export class CategoryService extends BaseApiService {
  async getCategories(): Promise<CategoryResponse[]> {
    return this.request<CategoryResponse[]>('/categories', {
      method: 'GET',
    });
  }

  async getCategory(id: string): Promise<CategoryResponse> {
    return this.request<CategoryResponse>(`/categories/${id}`, {
      method: 'GET',
    });
  }

  async createCategory(data: CategoryRequest): Promise<CategoryResponse> {
    return this.request<CategoryResponse>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: string, data: CategoryRequest): Promise<CategoryResponse> {
    return this.request<CategoryResponse>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string): Promise<void> {
    return this.request<void>(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  async uploadCategoryImage(id: string, file: File): Promise<CategoryResponse> {
    return this.uploadFile<CategoryResponse>(`/categories/${id}/images`, file);
  }

  async deleteCategoryImage(id: string): Promise<void> {
    return this.request<void>(`/categories/${id}/images`, {
      method: 'DELETE',
    });
  }
}

export const categoryService = new CategoryService();
