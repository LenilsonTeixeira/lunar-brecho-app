import Breadcrumb from '../layout/Breadcrumb';
import ProductTitleSection from './ProductTitleSection';
import ProductSizeSelector from './ProductSizeSelector';
import ProductObservations from './ProductObservations';
import ProductActions from './ProductActions';
import ProductStoreInfo from './ProductStoreInfo';
import { Product } from '../../types/product';

type Props = {
  product: Product;
  selectedSize: string;
  onSelectSize: (size: string) => void;
};

const ProductInfoSection = ({ product, selectedSize, onSelectSize }: Props) => {
  return (
    <div className='flex-1'>
      <Breadcrumb
        items={[
          { label: 'Início', to: '/' },
          { label: product.category, to: `/categorias/${product.category}` },
          { label: product.name },
        ]}
      />
      <ProductTitleSection product={product} />
      <ProductSizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelectSize={onSelectSize}
      />
      <ProductObservations product={product} />
      <ProductActions product={product} selectedSize={selectedSize} />
      <ProductStoreInfo />
    </div>
  );
};

export default ProductInfoSection;
