
import { Product } from "../../types/product";
import ProductImageGallery from "./ProductImageGallery";

type Props = {
    images: Product["images"];
    alt: string;
  };

const ProductImageSection = ({ images, alt }: Props) => {
  return <ProductImageGallery images={images} alt={alt} />;
}

export default ProductImageSection