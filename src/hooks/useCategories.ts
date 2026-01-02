import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '../services/category/CategoryService';
import { CategoryResponse } from '../services/types';
import { useAuth } from '../contexts/AuthContext';

interface UseCategoriesReturn {
  categories: CategoryResponse[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCategories = (): UseCategoriesReturn => {
  const { isPublicClientReady } = useAuth();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar categorias');
      console.error('Erro ao buscar categorias:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = async () => {
    await fetchCategories();
  };

  useEffect(() => {
    // Aguarda a autenticação do public_client antes de buscar categorias
    if (isPublicClientReady) {
      fetchCategories();
    }
  }, [isPublicClientReady, fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch,
  };
};
