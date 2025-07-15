import { ShoppingCart } from 'lucide-react';
import WhatsappIcon from '../icon/WhatsappIcon';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';

type Props = {
  product: Product;
  selectedSize: string;
};

const ProductActions = ({ product, selectedSize }: Props) => {
  const { addToCart, getItemQuantity } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
      return;
    }

    const currentQuantity = getItemQuantity(product.id, selectedSize);
    const availableQuantity = product.amount - currentQuantity;

    if (availableQuantity <= 0) {
      alert('Este produto/tamanho não está mais disponível no estoque.');
      return;
    }

    addToCart(product, 1, selectedSize);
    alert('Produto adicionado ao carrinho!');
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de mais informações sobre este produto: ${product.name} - ${window.location.href}`,
  );

  const whatsappLink = `https://api.whatsapp.com/send?phone=${import.meta.env.VITE_PHONE_NUMBER}&text=${whatsappMessage}`;

  const currentQuantity = getItemQuantity(product.id, selectedSize);
  const isOutOfStock = selectedSize ? currentQuantity >= product.amount : false;

  return (
    <div className='flex flex-col'>
      <a
        href={whatsappLink}
        target='_blank'
        rel='noopener noreferrer'
        className='mt-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 text-sm w-full sm:w-72 cursor-pointer flex items-center justify-center gap-2 transition-colors'
      >
        <WhatsappIcon width={25} height={25} />
        Compre pelo WhatsApp
      </a>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`mt-2 px-8 py-3.5 text-sm w-full sm:w-72 cursor-pointer flex items-center justify-center gap-2 transition-colors ${
          isOutOfStock
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-sky-500 hover:bg-sky-600 text-white'
        }`}
      >
        <ShoppingCart className='w-5 h-5' />
        {isOutOfStock ? 'Indisponível' : 'Adicionar ao Carrinho'}
      </button>
    </div>
  );
};

export default ProductActions;
