import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import ProductTypeBadge from './ProductTypeBadge';
import {
  calculateDiscountedPrice,
  calculateInstallment,
  formatToBRL,
} from '../../utils/priceUtils';

export interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addToCart } = useCart();
  const finalPrice = calculateDiscountedPrice(product.price, 5);
  const installment = calculateInstallment(product.price, 6);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne a navegação do Link
    e.stopPropagation();

    if (product.sizes.length === 1) {
      // Se só tem um tamanho, adiciona automaticamente
      addToCart(product, 1, product.sizes[0]);
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
    <Link to={`/produtos/${product.id}`} className='flex flex-col items-center mb-4 md:mb-12 group'>
      <div className='border-2 border-slate-200 p-1 rounded-lg shadow-sm relative'>
        {/* Label tipo (Novo/Bazar) */}
        <div className='absolute top-2 left-2 z-10'>
          <ProductTypeBadge type={product.type} variant='compact' />
        </div>

        {/* Label Reservado */}
        {product.isReserved && (
          <div className='absolute bottom-2 right-2 z-10'>
            <span className='px-2 py-1 text-[10px] font-medium rounded-sm bg-yellow-400 text-black bg-opacity-80'>
              Reservado
            </span>
          </div>
        )}

        {/* Botão do Carrinho */}
        <button
          onClick={handleAddToCart}
          className='absolute top-2 right-2 z-10 bg-white/90 hover:bg-white text-slate-700 hover:text-sky-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300'
          title={product.sizes.length === 1 ? 'Adicionar ao carrinho' : 'Ver produto'}
        >
          <ShoppingCart className='w-4 h-4' />
        </button>

        <div className='aspect-[3/4] overflow-hidden rounded-md'>
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
