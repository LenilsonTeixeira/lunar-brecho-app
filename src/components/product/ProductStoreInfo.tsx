import { Info, Store } from "lucide-react";

const ProductStoreInfo = () => {
    return (
        <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
          <div className="flex items-start sm:items-center text-slate-800 gap-1">
            <Store className="w-5 h-5 mt-[2px] sm:mt-0" />
            <span className="text-sm leading-snug">
              Loja física: Avenida Camilo Chaves nº 470 - Ituiutaba MG
            </span>
          </div>
          <div className="flex items-start sm:items-center text-slate-800 gap-1 mt-3">
            <Info className="w-8 h-8 sm:w-5 sm:h-5 mt-[2px] sm:mt-0" />
            <span>
              Reservas feita pelo WhatsApp somente mediante a confirmação de pagamento.
            </span>
          </div>
        </div>
      );
}

export default ProductStoreInfo