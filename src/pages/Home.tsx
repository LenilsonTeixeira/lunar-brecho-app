import { useLocation } from 'react-router';
import HomeLayout from '../components/home/HomeLayout';
import ProductSection from '../components/home/ProductSection';
import { useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';

const Home = () => {
  const location = useLocation();
  const { filteredProducts, selectedCategory, searchQuery, setSearchQuery, handleCategorySelect } =
    useProducts();

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
      />
    </HomeLayout>
  );
};

export default Home;
