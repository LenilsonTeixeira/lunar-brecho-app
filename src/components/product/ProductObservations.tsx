import { Product } from "../../types/product"

type Props = {
    product: Product
}

const ProductObservations = ({ product }: Props) => {
    return (
      <>  
        {product.observations && (
          <div className="mt-4 mb-4">
            <p className="mb-1">Observações:</p>
            <p className="text-slate-900 text-sm font-light">{product.observations}</p>
          </div>
        )}
      </>
      );
}

export default ProductObservations