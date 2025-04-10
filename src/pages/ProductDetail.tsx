import { useEffect, useState } from "react";
import { Product } from "../types/product";
import axios from "axios";
import { useParams } from "react-router";
import ProductDetailLayout from "../components/products/ProductDetailLayout";
import ProductImageSection from "../components/products/ProductImageSection";
import ProductInfoSection from "../components/products/ProductInfoSection";

const ProductDetail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState<Product>();
  const [size, setSize] = useState('')

  const getProductById = async () => {
    const API_URL = `http://localhost:3001/produtos/${productId}`;
    try {
      const response = await axios.get<Product>(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error
    }
  };

    useEffect(() => {
      const fetchProducts = async () => {
        const data = await getProductById();
        setProduct(data);
        console.log(data)
      };
  
      fetchProducts();
    }, []);

  return product && (
          <ProductDetailLayout>
              <ProductImageSection images={product.images} alt={product.name} />
              <ProductInfoSection product={product} selectedSize={size} onSelectSize={setSize} />
          </ProductDetailLayout>
  )
}

export default ProductDetail