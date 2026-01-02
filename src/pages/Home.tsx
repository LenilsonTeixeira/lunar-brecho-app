import { useLocation } from 'react-router';
import HomeLayout from '../components/home/HomeLayout';
import ProductSection from '../components/home/ProductSection';
import { useEffect, useCallback } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useProductPolling } from '../hooks/useProductPolling';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const location = useLocation();
  const { isPublicClientReady } = useAuth();
  const {
    filteredProducts,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    handleCategorySelect,
    refreshProducts,
    isLoading,
    currentPage,
    totalPages,
    totalElements,
    loadPage,
  } = useProducts();

  // Memoiza a função para evitar re-renders desnecessários
  const memoizedRefresh = useCallback(() => refreshProducts(), [refreshProducts]);

  // Carrega os produtos inicialmente ao montar o componente (aguarda autenticação)
  useEffect(() => {
    if (isPublicClientReady) {
      refreshProducts();
    }
  }, [isPublicClientReady]);

  // Polling para atualizar produtos periodicamente
  useProductPolling(memoizedRefresh, 60000);

  // Reseta filtros quando muda de rota
  useEffect(() => {
    handleCategorySelect(null);
    setSearchQuery('');
  }, [location]);

  return (
    <HomeLayout
      selectedCategory={selectedCategory}
      onSelectCategory={handleCategorySelect}
      onSearch={setSearchQuery}
      searchQuery={searchQuery}
    >
      <ProductSection
        products={filteredProducts}
        title={selectedCategory ? selectedCategory : 'Produtos'}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        loadPage={loadPage}
      />
    </HomeLayout>
  );
};

export default Home;
