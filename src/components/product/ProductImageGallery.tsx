import { useState } from 'react';
import Thumbnails from '../layout/Thumbnails';
import { getValidImages } from '../../constants/images';
import ProductImage from '../common/ProductImage';

export interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

const ProductImageGallery = ({ images, alt }: ProductImageGalleryProps) => {
  // Filtra imagens vazias e usa a imagem default se não houver imagens válidas
  const effectiveImages = getValidImages(images);
  const [selectedImage, setSelectedImage] = useState(effectiveImages[0]);

  return (
    <div className='flex-1 flex flex-col-reverse gap-3 sm:gap-4 lg:flex-row lg:gap-6 items-start'>
      <Thumbnails
        images={effectiveImages}
        alt={alt}
        onSelect={setSelectedImage}
        selectedImage={selectedImage}
      />

      <div className='w-full lg:w-[80%] border-slate-200 p-1 sm:p-2 border rounded-lg shadow-sm relative'>
        <ProductImage
          className='w-full h-auto rounded-md'
          src={selectedImage}
          alt={alt}
          loading='eager'
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
