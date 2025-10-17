import { useLocation } from 'react-router';
import HomeLayout from '../components/home/HomeLayout';
import ProductSection from '../components/home/ProductSection';
import { useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useProductPolling } from '../hooks/useProductPolling';

const Home = () => {
  const location = useLocation();
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

  useProductPolling(refreshProducts, 60000);

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
