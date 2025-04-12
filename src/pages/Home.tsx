import { useEffect, useState } from "react";
import { Product } from "../types/product";
import axios from "axios";
import HomeLayout from "../components/home/HomeLayout";
import ProductSection from "../components/home/ProductSection";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <HomeLayout>
      <ProductSection products={products} />
    </HomeLayout>
  );
};

export default Home;
