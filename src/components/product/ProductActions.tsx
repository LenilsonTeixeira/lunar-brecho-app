import { ShoppingCart } from 'lucide-react';
import WhatsappIcon from '../icon/WhatsappIcon';
import { ProductResponse } from '../../services/types';
import { useCart } from '../../contexts/CartContext';

type Props = {
  product: ProductResponse;
  selectedSize: string;
};

const ProductActions = ({ product, selectedSize }: Props) => {
  const { addToCart, getItemQuantity } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
      return;
    }

    // Busca a variante selecionada
    const selectedVariant = product.variants?.find((v) => v.size === selectedSize);
    if (!selectedVariant || !selectedVariant.id) {
      alert('Variante não encontrada.');
      return;
    }

    const stockAvailable = selectedVariant.stockAvailable || 0;
    const currentQuantity = getItemQuantity(product.id, selectedVariant.id);
    const availableQuantity = stockAvailable - currentQuantity;

    if (availableQuantity <= 0) {
      alert('Este produto/tamanho não está mais disponível no estoque.');
      return;
    }

    addToCart(product, 1, selectedVariant.id);
    alert('Produto adicionado ao carrinho!');
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de mais informações sobre este produto: ${product.name} - ${window.location.href}`,
  );

  const whatsappLink = `https://api.whatsapp.com/send?phone=${import.meta.env.VITE_PHONE_NUMBER}&text=${whatsappMessage}`;

  // Busca a variante selecionada para verificar estoque
  const selectedVariant = product.variants?.find((v) => v.size === selectedSize);
  const stockAvailable = selectedVariant?.stockAvailable || 0;
  const variantId = selectedVariant?.id || '';

  const currentQuantity = variantId ? getItemQuantity(product.id, variantId) : 0;
  const isOutOfStock = selectedSize ? currentQuantity >= stockAvailable : false;

  return (
    <div className='flex flex-col space-y-3'>
      <a
        href={whatsappLink}
        target='_blank'
        rel='noopener noreferrer'
        className='bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 text-base w-full sm:w-80 cursor-pointer flex items-center justify-center gap-3 transition-colors rounded-lg font-medium'
      >
        <WhatsappIcon width={24} height={24} />
        Compre pelo WhatsApp
      </a>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`px-6 py-4 text-base w-full sm:w-80 cursor-pointer flex items-center justify-center gap-3 transition-colors rounded-lg font-medium ${
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
