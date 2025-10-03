import Breadcrumb from '../layout/Breadcrumb';
import ProductTitleSection from './ProductTitleSection';
import ProductSizeSelector from './ProductSizeSelector';
import ProductObservations from './ProductObservations';
import ProductActions from './ProductActions';
import ProductStoreInfo from './ProductStoreInfo';
import { ProductResponse } from '../../services/types';

type Props = {
  product: ProductResponse;
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
            { label: product.category.name, to: `/categorias/${product.category.name}` },
            { label: product.name },
          ]}
        />
        <div className='mt-4'>
          <ProductTitleSection product={product} />
        </div>
        <div className='mt-6'>
          <ProductSizeSelector
            variants={product.variants}
            selectedSize={selectedSize}
            onSelectSize={onSelectSize}
          />
        </div>
        <div className='mt-6'>
          <ProductObservations product={product} />
        </div>
        <div className='mt-8'>
          <ProductActions product={product} selectedSize={selectedSize} />
        </div>
        <div className='mt-8 pb-8'>
          <ProductStoreInfo />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
