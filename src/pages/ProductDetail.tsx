import { useEffect, useState } from 'react';
import { ProductResponse } from '../services/types';
import { productService } from '../services/product/ProductService';
import { useParams } from 'react-router';
import ProductDetailLayout from '../components/product/ProductDetailLayout';
import ProductImageSection from '../components/product/ProductImageSection';
import ProductInfoSection from '../components/product/ProductInfoSection';

// Tipo estendido do ProductResponse com propriedades calculadas
type EnrichedProductResponse = ProductResponse & {
  imageUrls: string[];
  sizes: string[];
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<EnrichedProductResponse>();
  const [size, setSize] = useState('');

  const getProductById = async (): Promise<EnrichedProductResponse> => {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    try {
      const response = await productService.getProduct(productId);

      // Aplica regras de conversão diretamente no ProductResponse
      const imageUrls =
        response.images?.map((img) => img.originalUrl || img.thumbnailUrl || '') || [];
      if (response.mainImageUrl && !imageUrls.includes(response.mainImageUrl)) {
        imageUrls.unshift(response.mainImageUrl);
      }

      // Retorna ProductResponse enriquecido com propriedades calculadas
      return {
        ...response,
        imageUrls: imageUrls.filter(Boolean),
        sizes: response.variants?.map((v) => v.size) || [],
      };
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductById();
      setProduct(data);

      // Verifica se há um tamanho na URL e se ele é válido para o produto
      const urlParams = new URLSearchParams(window.location.search);
      const sizeFromUrl = urlParams.get('size');
      if (sizeFromUrl && data.sizes.includes(sizeFromUrl)) {
        setSize(sizeFromUrl);
      }
    };

    fetchProducts();
  }, []);

  return (
    product && (
      <ProductDetailLayout>
        <ProductImageSection images={product.imageUrls} alt={product.name} />
        <ProductInfoSection product={product} selectedSize={size} onSelectSize={setSize} />
      </ProductDetailLayout>
    )
  );
};

export default ProductDetail;
