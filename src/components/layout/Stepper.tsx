const Stepper = () => {
  return (
        <ol className="flex justify-between sm:justify-center items-center w-full mt-20 p-3 space-x-2 text-sm bg-slate-800 font-medium text-center border-y text-slate-800 sm:text-base  sm:p-4 sm:space-x-4 fixed top-0 left-0 z-50">
            <li className="flex items-center text-sky-500">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-sky-500 rounded-full shrink-0">
                    1
                </span>
               Carrinho
                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                </svg>
            </li>
            <li className="flex items-center text-slate-50">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-slate-50 rounded-full shrink-0 ">
                    2
                </span>
                Entrega
                <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                </svg>
            </li>
            <li className="flex items-center text-slate-50">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-slate-50 rounded-full shrink-0 ">
                    3
                </span>
                Pagamento
            </li>
        </ol>
  )
}

export default Stepper