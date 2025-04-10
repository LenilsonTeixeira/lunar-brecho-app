import { useState } from "react";
import Thumbnails from "../layout/Thumbnails";


export interface ProductImageGalleryProps {
    images: string[];
    alt: string;
}

const ProductImageGallery = ({ images, alt }: ProductImageGalleryProps) => {

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
      <Thumbnails
        images={images}
        alt={alt}
        onSelect={setSelectedImage}
        selectedImage={selectedImage}
      />

      <div className="w-full sm:w-[80%] border-slate-100 p-1 border shadow-md">
        <img className="w-full h-auto" src={selectedImage} alt={alt} />
      </div>
    </div>
  )
}

export default ProductImageGallery