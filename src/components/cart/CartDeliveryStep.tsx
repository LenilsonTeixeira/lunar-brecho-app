interface DeliveryStepProps {
    onNext: () => void;
  }
  
  const CartDeliveryStep = ({ onNext }: DeliveryStepProps) => {
    return (
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Como gostaria de receber seu pedido?</h2>
       {/* div principal */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* div sessao 1*/}
            <div className="bg-amber-200 w-full lg:w-2/3">
                sessao 1
            </div>
            <div className="bg-amber-100 w-full lg:w-1/3 p-4 self-start">sessao 2</div>
        </div>
        {/* <form className="flex flex-col gap-4" onSubmit={(e) => {
          e.preventDefault(); // impede recarregamento
          onNext(); // avança para o step de pagamento
        }}>
          <input type="text" placeholder="Nome completo" className="p-2 border border-gray-300 rounded" required />
          <input type="text" placeholder="Endereço" className="p-2 border border-gray-300 rounded" required />
          <input type="text" placeholder="Cidade" className="p-2 border border-gray-300 rounded" required />
          <input type="text" placeholder="CEP" className="p-2 border border-gray-300 rounded" required />
          <input type="text" placeholder="Telefone" className="p-2 border border-gray-300 rounded" required />
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-semibold text-lg mt-4">
            Continuar para Pagamento
          </button>
        </form> */}
      </div>
    );
  };
  
  export default CartDeliveryStep;