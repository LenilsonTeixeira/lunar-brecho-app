import { Link } from "react-router"

export interface ProductItemProps {
    id: string,
    image: string[],
    name: string,
    price: number,
    brand: string,
}

const ProductItem = (props: ProductItemProps) => {
  return (
    <Link 
      to={`/produtos/${props.id}`} className="flex flex-col items-center"
    >
        <div className="rounded-lg p-1 shadow-xs shadow-slate-400">
            <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-md">
                <img 
                src={props.image[0]} 
                className="w-full h-full object-cover hover:scale-110 transition duration-500 ease-in-out" 
                alt="Produto" 
                loading="lazy" 
                />
            </div>
        </div>
            <p className="mt-2 text-md text-center flex-1 overflow-hidden">{props.name}</p> 
            <p className="m-2 text-md font-medium text-red-500">R$ {props.price.toFixed(2)}</p>
            <button className="text-md font-medium text-emerald-600 cursor-pointer hover:text-slate-700">COMPRAR</button>
    </Link>
  )
}

export default ProductItem
