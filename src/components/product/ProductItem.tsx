import { Link } from 'react-router';
import { Product } from '../../types/product';
import {
  calculateDiscountedPrice,
  calculateInstallment,
  formatToBRL,
} from '../../utils/priceUtils';

export interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const finalPrice = calculateDiscountedPrice(product.price, 5);
  const installment = calculateInstallment(product.price, 6);

  return (
    <Link to={`/produtos/${product.id}`} className='flex flex-col items-center mb-4 md:mb-12'>
      <div className='rounded-lg p-1 shadow-sm shadow-slate-400 relative'>
        {/* Label tipo (Novo/Usado) */}
        <div className='absolute top-2 left-2 z-10'>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-sm ${
              product.type === 'Novo' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
            }`}
          >
            {product.type}
          </span>
        </div>

        {/* Label Reservado */}
        {product.isReserved && (
          <div className='absolute bottom-2 right-2 z-10'>
            <span className='px-2 py-1 text-[10px] font-medium rounded-sm bg-yellow-400 text-black bg-opacity-80'>
              Reservado
            </span>
          </div>
        )}

        <div className='aspect-[3/4] overflow-hidden rounded-lg shadow-md'>
          <img
            src={product.images[0]}
            className='w-full h-full object-cover hover:scale-110 transition duration-500 ease-in-out'
            alt={product.name}
            loading='lazy'
          />
        </div>
      </div>

      <div className='mt-2 text-md text-center flex-1 overflow-hidden font-light'>
        {product.name}
      </div>

      <div className='flex gap-2 flex-wrap justify-center mt-1'>
        {product.sizes.map((size, index) => (
          <div key={index} className='p-1 rounded-full border border-slate-600 text-xs'>
            {size}
          </div>
        ))}
      </div>

      <div className='mt-2 text-md font-medium text-slate-700'>
        <span>
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>

      <div className='text-md font-light text-slate-700'>
        <span>{formatToBRL(finalPrice)} no PIX</span>
      </div>

      <div className='text-sm font-light text-slate-700 mt-1'>
        <span>
          ou 6 x de <strong>{formatToBRL(installment)}</strong>
        </span>
      </div>
    </Link>
  );
};

export default ProductItem;
