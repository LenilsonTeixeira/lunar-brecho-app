import { useState } from 'react';
import Thumbnails from '../layout/Thumbnails';

export interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  isReserved?: boolean;
}

const ProductImageGallery = ({ images, alt, isReserved }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className='flex-1 flex flex-col-reverse gap-4 lg:flex-row lg:gap-6 items-start'>
      <Thumbnails
        images={images}
        alt={alt}
        onSelect={setSelectedImage}
        selectedImage={selectedImage}
      />

      <div className='w-full lg:w-[80%] border-slate-200 p-2 border rounded-lg shadow-sm relative'>
        <img className='w-full h-auto rounded-md' src={selectedImage} alt={alt} />

        {isReserved && (
          <div className='absolute bottom-0 left-0 w-full bg-yellow-500/90 text-white text-center text-sm font-semibold p-4 rounded-b-lg'>
            Produto reservado
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;
