import { useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Drawer = ({ isOpen, onClose, title, children, className = '' }: DrawerProps) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 size-auto max-h-none max-w-none overflow-hidden bg-transparent z-50'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-gray-900/50 transition-opacity duration-500 ease-in-out'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Drawer Panel */}
      <div className='absolute inset-0 pl-4 focus:outline-none sm:pl-10 md:pl-16'>
        <div
          className={`group/dialog-panel relative ml-auto block size-full max-w-sm sm:max-w-md transform transition duration-500 ease-in-out ${className}`}
        >
          {/* Close button */}
          <div className='absolute top-0 left-0 -ml-6 flex pt-4 pr-2 duration-500 ease-in-out sm:-ml-8 md:-ml-10 sm:pr-4'>
            <button
              type='button'
              onClick={onClose}
              className='relative rounded-md text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            >
              <span className='absolute -inset-2.5'></span>
              <span className='sr-only'>Fechar painel</span>
              <X className='size-5 sm:size-6' />
            </button>
          </div>

          {/* Drawer Content */}
          <div className='relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl'>
            {/* Header */}
            {title && (
              <div className='px-4 sm:px-6'>
                <h2 className='text-base font-semibold text-gray-900'>{title}</h2>
              </div>
            )}

            {/* Content */}
            <div className='relative mt-6 flex-1 px-4 sm:px-6'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
