import { Banknote, CreditCard } from "lucide-react";
import { Product } from "../../types/product"
import ProductDetailItem from "./ProductDetailItem";
import { calculateDiscountedPrice, calculateInstallment, formatToBRL } from "../../utils/priceUtils";

type Props = {
    product: Product
}

const discount = 5;

const ProductTitleSection = ({ product }: Props) => {

  const finalPrice = calculateDiscountedPrice(product.price, discount);
  const installment = calculateInstallment(product.price, 6);
  
    return (
        <>
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <ProductDetailItem
            value={formatToBRL(product.price)}
            className="mt-5 text-3xl font-medium"
          />
          <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-slate-600">
                  De {formatToBRL(product.price)} por R$ {formatToBRL(finalPrice)} no PIX (5% de desconto).
              </span>
          </div>
          <div className="flex items-center gap-1">
            <CreditCard />
            <div>
            <strong>6 x de {formatToBRL(installment)}</strong>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Banknote />
            <div><strong>5% de desconto</strong> pagando por PIX</div>
          </div>
          <ProductDetailItem value={product.description} className="mt-5 md:w-4/5" />
          <ProductDetailItem label="Marca" value={product.brand} className="mt-4 mb-4" />
          <ProductDetailItem label="Categoria" value={product.category} className="mt-4 mb-4" />
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Tipo:</span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-sm ${
                  product.type === 'Novo'
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-500 text-white'
                }`}
              >
                {product.type}
              </span>
          </div>
        </>
      );
}

export default ProductTitleSection