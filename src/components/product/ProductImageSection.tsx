import ProductImageGallery from './ProductImageGallery';

type Props = {
  images: string[];
  alt: string;
};

const ProductImageSection = ({ images, alt }: Props) => {
  return <ProductImageGallery images={images} alt={alt} />;
};

export default ProductImageSection;
