import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductResponse } from '../services/types';
import { productService } from '../services/product/ProductService';

interface ProductContextData {
  products: ProductResponse[];
  filteredProducts: ProductResponse[];
  selectedCategory: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleCategorySelect: (category: string | null) => void;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  currentPage: number;
  refreshProducts: () => Promise<void>;
  loadMoreProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const getProducts = async (page: number = 0, size: number = 10) => {
    try {
      const response = await productService.getProducts(page, size);
      return response;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
    }
  };

  const refreshProducts = async () => {
    setIsLoading(true);
    setCurrentPage(0);
    setHasMore(true);
    try {
      const response = await getProducts(0, 10);
      setProducts(response.content || []);
      setCurrentPage(0);
      setHasMore(response.number < response.totalPages - 1);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const response = await getProducts(nextPage, 10);

      if (response.content && response.content.length > 0) {
        setProducts((prev) => [...prev, ...response.content]);
        setCurrentPage(nextPage);
        setHasMore(nextPage < response.totalPages - 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar mais produtos:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when category is selected
    // Reset pagination when category changes
    setCurrentPage(0);
    setHasMore(true);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category.name === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        selectedCategory,
        searchQuery,
        setSearchQuery,
        handleCategorySelect,
        isLoading,
        isLoadingMore,
        hasMore,
        currentPage,
        refreshProducts,
        loadMoreProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }

  return context;
}
