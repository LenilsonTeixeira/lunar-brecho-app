import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useCartDrawer } from '../../contexts/CartDrawerContext';

const CartDrawerTrigger = () => {
  const { totalItems } = useCart();
  const { openCartDrawer } = useCartDrawer();

  return (
    <button
      onClick={openCartDrawer}
      className='relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-white transition-colors text-slate-50 hover:text-slate-800'
    >
      <ShoppingCart className='w-5 h-5 sm:w-6 sm:h-6' />
      {totalItems > 0 && (
        <span className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center'>
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartDrawerTrigger;
