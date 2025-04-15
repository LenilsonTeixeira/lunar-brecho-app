import { useEffect, useState } from "react";
import { Product } from "../types/product";
import axios from "axios";
import { useLocation } from "react-router";
import HomeLayout from "../components/home/HomeLayout";
import ProductSection from "../components/home/ProductSection";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSelectedCategory(null);
    setSearchQuery("");
  }, [location]);

  const getProducts = async () => {
    const API_URL = "http://localhost:3001/produtos";
    try {
      const response = await axios.get<Product[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery(""); // Clear search when category is selected
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
