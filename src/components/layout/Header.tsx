import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import MoonIcon from '../icon/MoonIcon';
import { useCart } from '../../contexts/CartContext';

interface HeaderProps {
  showBanner: boolean;
}

const Header = ({ showBanner }: HeaderProps) => {
  const { totalItems } = useCart();

  return (
    <div
      className='w-full flex items-center h-16 sm:h-20 font-medium shadow-xl fixed left-0 z-50 bg-slate-100 transition-all duration-300 ease-in-out'
      style={{ top: showBanner ? '2rem' : '0' }}
    >
      <div className='flex h-16 sm:h-20 items-center justify-between w-full px-4 sm:px-6 lg:px-10'>
        <Link
          to='/'
          className='flex gap-1 items-center hover:text-sky-400 transition-colors text-slate-700 hover:scale-110 duration-500'
        >
          <MoonIcon className='w-5 h-5 sm:w-6 sm:h-6' />
          <h1 className='text-lg sm:text-xl font-bold'>LUNAR</h1>
        </Link>

        {/* Carrinho de Compras */}
        <Link
          to='/carrinho'
          className='relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full hover:bg-sky-100 transition-colors text-slate-700 hover:text-sky-600'
        >
          <ShoppingCart className='w-5 h-5 sm:w-6 sm:h-6' />
          {totalItems > 0 && (
            <span className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center'>
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
