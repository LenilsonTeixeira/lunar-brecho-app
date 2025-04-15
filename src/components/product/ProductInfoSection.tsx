import { Product } from "../../types/product";
import Breadcrumb from "../layout/Breadcrumb";
import ProductActions from "./ProductActions";
import ProductObservations from "./ProductObservations";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductStoreInfo from "./ProductStoreInfo";
import ProductTitleSection from "./ProductTitleSection";


type Props = {
    product: Product;
    selectedSize: string;
    onSelectSize: (size: string) => void;
};


const ProductInfoSection = ({ product, selectedSize, onSelectSize }: Props) => {
  return (
    <div className="flex-1">
        <Breadcrumb items={[{ label: "Início", to: "/" },
                            { label: product.category, to: `/categorias/${product.category}` },
                            { label: product.name },]}/>
        <ProductTitleSection product={product}/>
        <ProductSizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelectSize={onSelectSize}/>
        <ProductObservations product={product}/>
        <ProductActions product={product}/>
        <ProductStoreInfo/>
    </div>
  )
}

export default ProductInfoSection