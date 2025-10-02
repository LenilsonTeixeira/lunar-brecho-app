import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { ProductResponse } from '../services/types';
import { productService } from '../services/product/ProductService';
import { useParams } from 'react-router';
import ProductDetailLayout from '../components/product/ProductDetailLayout';
import ProductImageSection from '../components/product/ProductImageSection';
import ProductInfoSection from '../components/product/ProductInfoSection';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [size, setSize] = useState('');

  // Converte ProductResponse para Product (formato legado)
  const convertToLegacyProduct = (productResponse: ProductResponse): Product => {
    const sizes = productResponse.variants?.map((v) => v.size) || [];
    const imageUrls =
      productResponse.images?.map((img) => img.originalUrl || img.thumbnailUrl || '') || [];
    if (productResponse.mainImageUrl && !imageUrls.includes(productResponse.mainImageUrl)) {
      imageUrls.unshift(productResponse.mainImageUrl);
    }

    return {
      id: productResponse.id,
      images: imageUrls.filter(Boolean),
      name: productResponse.name,
      price: productResponse.basePrice,
      brand: productResponse.brand || '',
      description: productResponse.description || '',
      sizes,
      type: productResponse.type === 'NEW' ? 'Novo' : 'Bazar',
      category: productResponse.category as any,
      amount: productResponse.totalCurrentStock || 0,
      isReserved: (productResponse.totalReservedQuantity || 0) > 0,
      observations: productResponse.observations || '',
    };
  };

  const getProductById = async () => {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    try {
      const response = await productService.getProduct(productId);
      return convertToLegacyProduct(response);
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
        <ProductImageSection
          images={product.images}
          alt={product.name}
          isReserved={product.isReserved}
        />
        <ProductInfoSection product={product} selectedSize={size} onSelectSize={setSize} />
      </ProductDetailLayout>
    )
  );
};

export default ProductDetail;
