import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';
import axios from 'axios';

interface ProductContextData {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleCategorySelect: (category: string | null) => void;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    const API_URL = 'http://localhost:3001/produtos';
    try {
      const response = await axios.get<Product[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when category is selected
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
