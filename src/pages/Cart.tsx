// import { Trash2, Minus, Plus, Loader2 } from "lucide-react";
// import { useState } from "react";
// import CartLayout from "../components/cart/CartLayout";
// import Stepper from "../components/layout/Stepper";

// const Cart = () => {
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const priceUnit = 47;
//   const totalPrice = quantity * priceUnit;

//   const handleUpdateQuantity = (change: number) => {
//     if (loading) return;
//     setLoading(true);

//     setTimeout(() => {
//       setQuantity((prev) => Math.max(1, prev + change));
//       setLoading(false);
//     }, 500);
//   };

//   return (
//     <>
//          <Stepper/>
//     <CartLayout>

//       {/* Título */}
//       <div className="my-1">
//         <h1 className="font-semibold text-2xl sm:text-3xl">Carrinho</h1>
//       </div>

//       {/* Corpo do carrinho */}
//       <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
//         {/* Lista de itens */}
//         <div className="w-full lg:w-2/3 self-start">
//           <div className="flex flex-col gap-6">
//             {/* Item do carrinho */}
//             <div className="bg-white border border-slate-200 rounded-xl shadow-md p-2">
//               <div className="flex gap-4">
//                 {/* Imagem */}
//                 <div className="w-28 sm:w-32 h-auto flex-shrink-0 border p-1 border-slate-100 shadow-md rounded">
//                   <img
//                     className="w-full h-full object-cover rounded"
//                     src="https://images.tcdn.com.br/img/img_prod/1265389/blusa_feminina_paetes_preta_3059_3_28b72c455b152f55285d812210d55abf.jpg"
//                     alt="Blusa Feminina Paetês Preta"
//                   />
//                 </div>

//                 {/* Detalhes do produto */}
//                 <div className="flex flex-col justify-between w-full">
//                   <div>
//                     <h3 className="text-base sm:text-lg font-semibold">Blusa Feminina Paetês Preta</h3>
//                     <div className="text-base sm:text-lg text-slate-800">R$ {priceUnit.toFixed(2)}</div>
//                   </div>

//                   <div className="flex items-center justify-between mt-2">
//                     <select className="text-sm sm:text-base border border-slate-300 rounded p-1 text-center">
//                       <option value="P">P</option>
//                       <option value="M" selected>
//                         M
//                       </option>
//                       <option value="G">G</option>
//                       <option value="GG">GG</option>
//                     </select>

//                     <button className="text-sm sm:text-base flex items-center cursor-pointer gap-1 text-red-500">
//                       <Trash2 size={15} />
//                       Remover
//                     </button>
//                   </div>

//                   <div className="flex items-center justify-between mt-4">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => handleUpdateQuantity(-1)}
//                         disabled={loading || quantity === 1}
//                         className="bg-sky-600 hover:bg-sky-700 p-1 rounded text-white disabled:opacity-50"
//                       >
//                         <Minus size={14} />
//                       </button>

//                       <span className="text-base sm:text-lg font-medium">{quantity}</span>

//                       <button
//                         onClick={() => handleUpdateQuantity(1)}
//                         disabled={loading}
//                         className="bg-sky-600 hover:bg-sky-700 p-1 rounded text-white disabled:opacity-50"
//                       >
//                         <Plus size={14} />
//                       </button>
//                     </div>

//                     <div className="text-lg sm:text-xl font-semibold">
//                       {loading ? (
//                         <Loader2 className="animate-spin text-slate-600" size={20} />
//                       ) : (
//                         `R$ ${totalPrice.toFixed(2)}`
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Fim do item */}
//           </div>
//         </div>

//         {/* Resumo do pedido */}
//         <div className="bg-emerald-100 w-full lg:w-1/3 p-4 rounded-xl shadow self-start">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4">Resumo do Pedido</h2>

//           <div className="flex justify-between text-sm sm:text-base mb-2">
//             <span>Subtotal</span>
//             <span>R$ {totalPrice.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between text-sm sm:text-base mb-4">
//             <span>Entrega</span>
//             <span>R$ 10,00</span>
//           </div>

//           <div className="flex justify-between font-bold text-lg sm:text-xl">
//             <span>Total</span>
//             <span>R$ {(totalPrice + 10).toFixed(2)}</span>
//           </div>

//           <button className="mt-6 w-full bg-slate-800 text-white py-2 rounded hover:bg-emerald-700 text-base sm:text-lg">
//             Finalizar Compra
//           </button>
//           <button className="mt-1 w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 text-base sm:text-lg">
//             Continuar Comprando
//           </button>
//         </div>
//       </div>
//     </CartLayout>
//     </>
//   );
// };

// export default Cart;
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CartLayout from "../components/cart/CartLayout";
import Stepper from "../components/layout/Stepper";
import CartStep from "../components/cart/CartStep";
import CartDeliveryStep from "../components/cart/CartDeliveryStep";
import CartPaymentStep from "../components/cart/CartPaymentStep";

const steps = ["Carrinho", "Entrega", "Pagamento"];

const Cart = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <CartLayout>
      <Stepper currentStep={step} steps={steps} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {step === 0 && <CartStep onNext={nextStep} />}
          {step === 1 && <CartDeliveryStep onNext={nextStep} />}
          {step === 2 && <CartPaymentStep />}
        </motion.div>
      </AnimatePresence>
    </CartLayout>
  );
};

export default Cart;