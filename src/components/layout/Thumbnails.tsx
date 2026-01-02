import { ChevronUp, ChevronDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { handleImageError } from '../../constants/images';

export interface ThumbnailsProps {
  images: string[];
  alt: string;
  selectedImage: string;
  onSelect: (image: string) => void;
}

const Thumbnails = ({ images, alt, onSelect, selectedImage }: ThumbnailsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        setShowArrows(scrollHeight > clientHeight && images.length >= 4);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [images.length]);

  const scroll = (direction: 'up' | 'down') => {
    if (containerRef.current) {
      const scrollAmount = 150;
      containerRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='relative lg:w-[18%] w-full max-h-[80vh]'>
      {showArrows && (
        <button
          onClick={() => scroll('up')}
          className='absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-10'
          aria-label='Rolar para cima'
        >
          <ChevronUp className='w-3 h-3 sm:w-4 sm:h-4' />
        </button>
      )}

      <div
        ref={containerRef}
        className='flex lg:flex-col overflow-x-auto lg:overflow-y-auto h-auto max-h-[60vh] sm:max-h-[70vh] justify-start lg:justify-start w-full gap-2 sm:gap-3 lg:gap-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-1'
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            onClick={() => onSelect(img)}
            src={img}
            alt={`${alt} - imagem ${idx + 1}`}
            onError={handleImageError}
            className={`shadow-md w-[22%] sm:w-[24%] lg:w-full lg:h-auto aspect-[2/3] object-cover flex-shrink-0 cursor-pointer border-2 p-0.5 sm:p-1 rounded-md transition-all duration-200 ${
              selectedImage === img
                ? 'border-sky-400 shadow-lg shadow-sky-400/90'
                : 'border-slate-200 hover:border-slate-400'
            }`}
          />
        ))}
      </div>

      {showArrows && (
        <button
          onClick={() => scroll('down')}
          className='absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-10'
          aria-label='Rolar para baixo'
        >
          <ChevronDown className='w-3 h-3 sm:w-4 sm:h-4' />
        </button>
      )}
    </div>
  );
};

export default Thumbnails;
