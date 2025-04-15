import { useState } from "react";
import Thumbnails from "../layout/Thumbnails";

export interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  isReserved?: boolean;
}

const ProductImageGallery = ({ images, alt, isReserved }: ProductImageGalleryProps) => {

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row items-start">
      <Thumbnails
        images={images}
        alt={alt}
        onSelect={setSelectedImage}
        selectedImage={selectedImage}
      />

      <div className="w-full sm:w-[80%] border-slate-100 p-1 border shadow-md relative">
        <img className="w-full h-auto" src={selectedImage} alt={alt} />

        {isReserved && (
          <div className="absolute bottom-0 left-0 w-full bg-yellow-500/90 text-white text-center text-sm font-semibold p-4">
            Produto reservado
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageGallery;