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
      const availableSizes = data.variants?.map((v) => v.size) || [];

      if (sizeFromUrl && availableSizes.includes(sizeFromUrl)) {
        setSize(sizeFromUrl);
      } else {
        // Se não há tamanho na URL, verifica se há apenas um tamanho disponível
        const availableVariants = data.variants?.filter((v) => (v.stockAvailable || 0) > 0) || [];
        if (availableVariants.length === 1) {
          // Seleciona automaticamente o único tamanho disponível
          setSize(availableVariants[0].size);
        }
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
