import { ShoppingCart } from 'lucide-react';
import WhatsappIcon from '../icon/WhatsappIcon';
import { ProductResponse } from '../../services/types';
import { useCart } from '../../contexts/CartContext';
import { formatProductForWhatsApp } from '../../utils/orderFormatter';
import { useGTM } from '../../hooks/useGTM';

type Props = {
  product: ProductResponse;
  selectedSize: string;
};

const ProductActions = ({ product, selectedSize }: Props) => {
  const { addToCart, getItemQuantity } = useCart();
  const { trackButtonClick, trackProductAction } = useGTM();

  const handleAddToCart = () => {
    trackButtonClick('add_to_cart', 'product_detail', {
      product_id: product.id,
      product_name: product.name,
      selected_size: selectedSize,
      price: product.basePrice,
    });

    trackProductAction('add_to_cart', product.id, product.name, {
      selected_size: selectedSize,
      price: product.basePrice,
    });

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

  const handleWhatsAppProduct = () => {
    trackButtonClick('whatsapp_product', 'product_detail', {
      product_id: product.id,
      product_name: product.name,
      selected_size: selectedSize,
    });

    trackProductAction('whatsapp_contact', product.id, product.name, {
      selected_size: selectedSize,
    });

    const formattedMessage = formatProductForWhatsApp(product, selectedSize);
    const whatsappMessage = encodeURIComponent(formattedMessage);
    const whatsappLink = `https://api.whatsapp.com/send?phone=5534996962488&text=${whatsappMessage}`;

    window.open(whatsappLink, '_blank');
  };

  // Busca a variante selecionada para verificar estoque
  const selectedVariant = product.variants?.find((v) => v.size === selectedSize);
  const stockAvailable = selectedVariant?.stockAvailable || 0;
  const variantId = selectedVariant?.id || '';

  const currentQuantity = variantId ? getItemQuantity(product.id, variantId) : 0;
  const isOutOfStock = selectedSize ? currentQuantity >= stockAvailable : false;

  return (
    <div className='flex flex-col space-y-3'>
      <button
        onClick={handleWhatsAppProduct}
        className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base w-full cursor-pointer flex items-center justify-center gap-2 sm:gap-3 transition-colors rounded-lg font-medium'
      >
        <WhatsappIcon width={20} height={20} className='sm:w-6 sm:h-6' />
        Compre pelo WhatsApp
      </button>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base w-full cursor-pointer flex items-center justify-center gap-2 sm:gap-3 transition-colors rounded-lg font-medium ${
          isOutOfStock
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-sky-500 hover:bg-sky-600 text-white'
        }`}
      >
        <ShoppingCart className='w-4 h-4 sm:w-5 sm:h-5' />
        {isOutOfStock ? 'Indisponível' : 'Adicionar ao Carrinho'}
      </button>
    </div>
  );
};

export default ProductActions;
