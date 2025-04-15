import { Product } from '../../types/product';
import ProductImageGallery from './ProductImageGallery';

type Props = {
  images: Product['images'];
  alt: string;
  isReserved: boolean;
};

const ProductImageSection = ({ images, alt, isReserved }: Props) => {
  return <ProductImageGallery images={images} alt={alt} isReserved={isReserved} />;
};

export default ProductImageSection;
