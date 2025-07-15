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
    <div className='flex-1 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto'>
        <Breadcrumb
          items={[
            { label: 'Início', to: '/' },
            { label: product.category, to: `/categorias/${product.category}` },
            { label: product.name },
          ]}
        />
        <div className='mt-4 sm:mt-6'>
          <ProductTitleSection product={product} />
        </div>
        <div className='mt-1'>
          <ProductSizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={onSelectSize}
          />
        </div>
        <div className='mt-6 sm:mt-8'>
          <ProductObservations product={product} />
        </div>
        <div className='mt-8 sm:mt-10'>
          <ProductActions product={product} selectedSize={selectedSize} />
        </div>
        <div className='mt-8 sm:mt-10 pb-8'>
          <ProductStoreInfo />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
