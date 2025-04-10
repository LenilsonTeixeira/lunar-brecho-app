import { Product } from "../../types/product"
import ProductDetailItem from "./ProductDetailItem";

type Props = {
    product: Product
}

const ProductTitleSection = ({ product }: Props) => {
    return (
        <>
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <ProductDetailItem
            value={product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            className="mt-5 text-3xl font-medium"
          />
          <ProductDetailItem value={product.description} className="mt-5 md:w-4/5" />
          <ProductDetailItem label="Marca" value={product.brand} className="mt-4 mb-4" />
          <ProductDetailItem label="Categoria" value={product.category} className="mt-4 mb-4" />
          <ProductDetailItem label="Tipo" value={product.type} className="mt-4" />
        </>
      );
}

export default ProductTitleSection