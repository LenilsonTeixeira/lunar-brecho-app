import { Share2 } from 'lucide-react';
import { ProductResponse } from '../../services/types';
import ProductDetailItem from './ProductDetailItem';
import {
  calculateDiscountedPrice,
  // calculateInstallment,
  formatToBRL,
} from '../../utils/priceUtils';

type Props = {
  product: ProductResponse;
};

const ProductTitleSection = ({ product }: Props) => {
  // Calculate actual discount based on product configuration
  const calculateProductDiscount = () => {
    if (product.discountType === 'NONE' || !product.discountValue) {
      return 0;
    }

    if (product.discountType === 'PERCENTAGE') {
      return product.discountValue;
    }

    if (product.discountType === 'FIXED_AMOUNT') {
      return (product.discountValue / product.basePrice) * 100;
    }

    return 0;
  };

  const productDiscount = calculateProductDiscount();
  const finalPrice =
    productDiscount > 0
      ? calculateDiscountedPrice(product.basePrice, productDiscount)
      : product.basePrice;
  // const installment = calculateInstallment(product.basePrice, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert('Compartilhamento não suportado neste navegador.');
    }
  };

  return (
    <>
      <div className='flex items-start justify-between'>
        <h1 className='font-medium text-lg sm:text-xl lg:text-2xl flex-1 pr-2'>{product.name}</h1>
        <button
          onClick={handleShare}
          className='ml-2 p-1.5 sm:p-2 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-full transition-colors flex-shrink-0'
          title='Compartilhar produto'
        >
          <Share2 className='w-4 h-4 sm:w-5 sm:h-5' />
        </button>
      </div>
      <ProductDetailItem
        value={formatToBRL(finalPrice)}
        className='mt-4 text-2xl sm:text-3xl font-medium'
      />
      {productDiscount > 0 && (
        <div className='flex items-center gap-1 mt-2'>
          <span className='text-xs sm:text-sm font-medium text-slate-600'>
            {formatToBRL(product.basePrice)} no cartão
          </span>
        </div>
      )}
      {/* <div className='flex items-center gap-1 mt-2'>
        <CreditCard className='w-4 h-4 sm:w-5 sm:h-5' />
        <div className='text-sm sm:text-base'>
          <strong>2 x de {formatToBRL(installment)}</strong>
        </div>
      </div> */}

      <ProductDetailItem
        value={product.description || ''}
        className='mt-6 md:w-4/5 text-sm sm:text-base'
      />
      {product.brand && (
        <ProductDetailItem
          label='Marca'
          value={product.brand}
          className='mt-4 text-sm sm:text-base'
        />
      )}
      <ProductDetailItem
        label='Categoria'
        value={product.category.name}
        className='mt-3 text-sm sm:text-base'
      />
      <ProductDetailItem
        label='Tipo'
        value={product.type === 'NEW' ? 'Novo' : 'Bazar'}
        className='mt-3 text-sm sm:text-base'
      />
    </>
  );
};

export default ProductTitleSection;
