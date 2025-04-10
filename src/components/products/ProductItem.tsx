import { Link } from "react-router"
import { Product } from "../../types/product"

export interface ProductItemProps {
    product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {

  const calculatePriceWithFivePercentDiscount = (price: number) => {
    return Math.ceil(price - (price * 0.05)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  return (
    <Link 
      to={`/produtos/${product.id}`} 
      className="flex flex-col items-center mb-4 md:mb-12"
    >
        <div className="rounded-lg p-1 shadow-sm shadow-slate-400">
            <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                <img 
                  src={product.images[0]} 
                  className="w-full h-full object-cover hover:scale-110 transition duration-500 ease-in-out" 
                  alt={product.name} 
                  loading="lazy" 
                />
            </div>
        </div>
        
        <div className="mt-2 text-md text-center flex-1 overflow-hidden font-light">
          {product.name}
        </div> 

        <div className="flex gap-2 flex-wrap justify-center mt-1">
          {product.sizes.map((size, index) => (
            <div key={index} className="p-1 rounded-full border border-slate-600 text-xs">
              {size}
            </div>
          ))}
        </div>

        <div className="mt-2 text-md font-medium text-slate-700">
            <span>{product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
        </div>

        <div className="text-md font-light text-slate-700">
            <span>
            {
              calculatePriceWithFivePercentDiscount(product.price)
            }  no PIX</span>
        </div>
    </Link>
  )
}

export default ProductItem
