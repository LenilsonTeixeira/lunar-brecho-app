import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { ProductResponse } from '../../services/types';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import ProductTypeBadge from './ProductTypeBadge';
import { calculateInstallment, formatToBRL } from '../../utils/priceUtils';

export interface ProductItemProps {
  product: ProductResponse;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addToCart } = useCart();

  // Calcula o preço final com desconto
  const basePrice = product.basePrice;
  let finalPrice = basePrice;

  if (product.discountType === 'PERCENTAGE' && product.discountValue) {
    finalPrice = basePrice - (basePrice * product.discountValue) / 100;
  } else if (product.discountType === 'FIXED' && product.discountValue) {
    finalPrice = basePrice - product.discountValue;
  }

  const installment = calculateInstallment(basePrice, 6);

  // Extrai os tamanhos dos variants
  const sizes = product.variants?.map((v) => v.size) || [];

  // Converte ProductResponse para Product (formato antigo do carrinho)
  const convertToLegacyProduct = (): Product => {
    const imageUrls = product.images?.map((img) => img.originalUrl || img.thumbnailUrl || '') || [];
    if (product.mainImageUrl && !imageUrls.includes(product.mainImageUrl)) {
      imageUrls.unshift(product.mainImageUrl);
    }

    return {
      id: product.id,
      images: imageUrls.filter(Boolean),
      name: product.name,
      price: product.basePrice,
      brand: product.brand || '',
      description: product.description || '',
      sizes,
      type: product.type === 'NEW' ? 'Novo' : 'Bazar',
      category: product.category as any,
      amount: product.totalCurrentStock || 0,
      observations: product.observations || '',
    };
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne a navegação do Link
    e.stopPropagation();

    if (sizes.length === 1) {
      // Se só tem um tamanho, adiciona automaticamente
      const legacyProduct = convertToLegacyProduct();
      addToCart(legacyProduct, 1, sizes[0]);
      alert('Produto adicionado ao carrinho!');
    } else {
      // Se tem múltiplos tamanhos, redireciona para a página do produto
      window.location.href = `/produtos/${product.id}`;
    }
  };

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.preventDefault(); // Previne a navegação do Link pai
    e.stopPropagation();

    // Redireciona para a página do produto com o tamanho pré-selecionado
    window.location.href = `/produtos/${product.id}?size=${encodeURIComponent(size)}`;
  };

  return (
    <Link to={`/produtos/${product.id}`} className='flex flex-col items-start mb-4 md:mb-12 group'>
      <div className='border-2 border-slate-200 p-1 rounded-lg shadow-sm relative w-full'>
        {/* Label tipo (Novo/Bazar) */}
        <div className='absolute top-2 left-2 z-10'>
          <ProductTypeBadge type={product.type} variant='compact' />
        </div>

        {/* Botão do Carrinho */}
        <button
          onClick={handleAddToCart}
          className='absolute top-2 right-2 z-10 bg-white/90 hover:bg-white text-slate-700 hover:text-sky-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300'
          title={sizes.length === 1 ? 'Adicionar ao carrinho' : 'Ver produto'}
        >
          <ShoppingCart className='w-4 h-4' />
        </button>

        <div className='aspect-[3/4] overflow-hidden rounded-md'>
          <img
            src={
              product.mainThumbnailUrl ||
              product.mainImageUrl ||
              product.images?.[0]?.thumbnailUrl ||
              product.images?.[0]?.originalUrl ||
              ''
            }
            className='w-full h-full object-cover hover:scale-110 transition duration-500 ease-in-out'
            alt={product.name}
            loading='lazy'
          />
        </div>
      </div>

      <div className='mt-2 text-md flex-1 overflow-hidden font-light w-full text-center'>
        {product.name}
      </div>

      <div className='flex gap-2 flex-wrap mt-1 w-full justify-center'>
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={(e) => handleSizeClick(e, size)}
            className='p-1 rounded-full border-2 border-slate-200 text-xs hover:border-sky-400 hover:bg-sky-50 transition-all duration-200 cursor-pointer'
            title={`Selecionar tamanho ${size}`}
          >
            {size}
          </button>
        ))}
      </div>

      <div className='mt-2 text-md font-medium text-slate-700 w-full text-center'>
        <span>
          {basePrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>

      <div className='text-md font-light text-slate-700 w-full text-center'>
        <span>{formatToBRL(finalPrice)} no PIX</span>
      </div>

      <div className='text-sm font-light text-slate-700 mt-1 w-full text-center'>
        <span>
          ou 6 x de <strong>{formatToBRL(installment)}</strong>
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;
