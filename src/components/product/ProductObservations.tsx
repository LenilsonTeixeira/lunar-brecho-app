import { ProductResponse } from '../../services/types';

type Props = {
  product: ProductResponse;
};

const ProductObservations = ({ product }: Props) => {
  return (
    <>
      {product.observations && (
        <div>
          <p className='mb-2 font-medium'>Observações:</p>
          <p className='text-slate-700 text-sm leading-relaxed'>{product.observations}</p>
        </div>
      )}
    </>
  );
};

export default ProductObservations;
