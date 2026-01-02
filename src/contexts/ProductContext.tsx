import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductListItemResponse } from '../services/types';
import { productService } from '../services/product/ProductService';

interface ProductContextData {
  products: ProductListItemResponse[];
  filteredProducts: ProductListItemResponse[];
  selectedCategory: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleCategorySelect: (category: string | null) => void;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  refreshProducts: () => Promise<void>;
  loadPage: (page: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductListItemResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const getProducts = async (page: number = 0, size: number = 200) => {
    try {
      const response = await productService.getProducts(page, size);
      return response;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  };

  const refreshProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts(0, 200);
      setProducts(response || []);
      setCurrentPage(0);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPage = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getProducts(page, 200);
      setProducts(response || []);
      setCurrentPage(page);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //refreshProducts();
  }, []);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when category is selected
    // Reset pagination when category changes
    setCurrentPage(0);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
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
        currentPage,
        totalPages: 1,
        totalElements: products.length,
        refreshProducts,
        loadPage,
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
