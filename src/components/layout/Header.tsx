import { Link } from 'react-router';
import CartDrawerTrigger from '../common/CartDrawerTrigger';

const Header = () => {
  return (
    <div className='w-full flex items-center h-16 sm:h-20 font-medium shadow-2xl fixed left-0 z-50 bg-slate-900 transition-all duration-300 ease-in-out top-0'>
      <div className='flex h-16 sm:h-20 items-center justify-between w-full px-4 sm:px-6 lg:px-10'>
        <Link
          to='/'
          className='flex items-center hover:opacity-90 transition-opacity hover:scale-105 duration-300'
        >
          <img
            src='/lunar-logo.png'
            alt='Lunar Brechó'
            className='h-12 sm:h-14 w-auto object-contain'
          />
        </Link>

        {/* Carrinho de Compras */}
        <CartDrawerTrigger />
      </div>
    </div>
  );
};

export default Header;
