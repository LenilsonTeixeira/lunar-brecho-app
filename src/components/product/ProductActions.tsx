import WhatsappIcon from "../icon/WhatsappIcon";


const ProductActions = () => {
    return (
        <>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button className="bg-slate-800 text-white px-8 py-3 text-sm active:bg-gray-700 sm:w-60 cursor-pointer">
            Comprar
          </button>
          <button className="text-slate-900 border border-slate-800 px-8 py-3 text-sm active:bg-slate-100 sm:w-60 cursor-pointer">
            Adicionar ao Carrinho
          </button>
        </div>
        <button className="mt-2 bg-emerald-500 text-white px-8 py-3 text-sm w-full sm:w-122 cursor-pointer flex items-center justify-center gap-2">
            <WhatsappIcon/> Compre pelo WhatsApp
        </button>
        </>
      );
}

export default ProductActions