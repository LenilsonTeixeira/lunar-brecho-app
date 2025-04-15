import { Share2 } from 'lucide-react';
import WhatsappIcon from '../icon/WhatsappIcon';
import { Product } from '../../types/product';

type Props = {
  product: Product;
};

const ProductActions = ({ product }: Props) => {
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

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de mais informações sobre este produto: ${product.name} - ${window.location.href}`,
  );

  const whatsappLink = `https://api.whatsapp.com/send?phone=${import.meta.env.VITE_PHONE_NUMBER}&text=${whatsappMessage}`;

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
        onClick={handleShare}
        className='mt-2 border border-sky-600 text-sky-600 hover:text-sky-800 px-8 py-3 text-sm w-full sm:w-72 cursor-pointer flex items-center justify-center gap-2 transition-colors'
      >
        <Share2 />
        Compartilhar
      </button>
    </div>
  );
};

export default ProductActions;
