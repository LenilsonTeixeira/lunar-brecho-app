import { useEffect, useState } from "react";
import { Product } from "../types/product";
import axios from "axios";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const API_URL = "http://localhost:3001/produtos";
    try {
      const response = await axios.get<Product[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return []; // Retorna array vazio para evitar erros
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
    <div className="px-4">
      
      <div className="flex flex-col items-start w-full">
       
        <Title texts={["GARIMPOS"]}/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
          {products.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              brand={item.brand}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
