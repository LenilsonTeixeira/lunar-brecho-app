import { Banknote, CreditCard, Share2 } from 'lucide-react';
import { ProductResponse } from '../../services/types';
import ProductDetailItem from './ProductDetailItem';
import {
  calculateDiscountedPrice,
  calculateInstallment,
  formatToBRL,
} from '../../utils/priceUtils';

type Props = {
  product: ProductResponse;
};

const discount = 5;

const ProductTitleSection = ({ product }: Props) => {
  const finalPrice = calculateDiscountedPrice(product.basePrice, discount);
  const installment = calculateInstallment(product.basePrice, 6);

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
        <h1 className='font-medium text-2xl flex-1'>{product.name}</h1>
        <button
          onClick={handleShare}
          className='ml-4 p-2 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-full transition-colors'
          title='Compartilhar produto'
        >
          <Share2 className='w-5 h-5' />
        </button>
      </div>
      <ProductDetailItem
        value={formatToBRL(product.basePrice)}
        className='mt-4 text-3xl font-medium'
      />
      <div className='flex items-center gap-1 mt-2'>
        <span className='text-sm font-medium text-slate-600'>
          De {formatToBRL(product.basePrice)} por R$ {formatToBRL(finalPrice)} no PIX (5% de
          desconto).
        </span>
      </div>
      <div className='flex items-center gap-1 mt-2'>
        <CreditCard />
        <div className='text-base'>
          <strong>6 x de {formatToBRL(installment)}</strong>
        </div>
      </div>
      <div className='flex items-center gap-1 mt-2'>
        <Banknote />
        <div className='text-base'>
          <strong>5% de desconto</strong> pagando por PIX
        </div>
      </div>
      <ProductDetailItem value={product.description || ''} className='mt-6 md:w-4/5 text-base' />
      {product.brand && (
        <ProductDetailItem label='Marca' value={product.brand} className='mt-4 text-base' />
      )}
      <ProductDetailItem
        label='Categoria'
        value={product.category.name}
        className='mt-3 text-base'
      />
      <ProductDetailItem
        label='Tipo'
        value={product.type === 'NEW' ? 'Novo' : 'Bazar'}
        className='mt-3 text-base'
      />
    </>
  );
};

export default ProductTitleSection;
