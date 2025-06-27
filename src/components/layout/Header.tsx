import { Link } from 'react-router';
import MoonIcon from '../icon/MoonIcon';

interface HeaderProps {
  showBanner: boolean;
}

const Header = ({ showBanner }: HeaderProps) => {
  return (
    <div
      className='w-full flex items-center h-20 font-medium shadow-xl fixed left-0 z-50 bg-slate-100 transition-all duration-300 ease-in-out'
      style={{ top: showBanner ? '2rem' : '0' }}
    >
      <div className='flex h-20 items-center justify-center w-full px-4'>
        <Link
          to='/'
          className='flex gap-1 items-center hover:text-sky-400 transition-colors text-slate-700 hover:scale-110 duration-500'
        >
          <MoonIcon className='w-6 h-6' />
          <h1 className='text-xl font-bold'>LUNAR</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
