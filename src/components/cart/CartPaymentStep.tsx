import { useState } from "react";
import Stepper from "../layout/Stepper";
import { motion, AnimatePresence } from "framer-motion";

const CartPaymentStep = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvv: "" });

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const handlePayment = () => {
    if (!selectedMethod) return;
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Pagamento via ${selectedMethod} efetuado com sucesso!`);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="px-4 sm:py-4 max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6 text-center">Escolha a forma de pagamento</h1>

      <div className="flex flex-col gap-4">
        {["Cartão de Crédito", "Pix", "Boleto", "PayPal", "Apple Pay"].map((method) => (
          <motion.button
            key={method}
            onClick={() => handleSelectMethod(method)}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            className={`border rounded-xl p-4 text-left transition-all duration-300 hover:border-sky-600 ${
              selectedMethod === method ? "border-sky-600 bg-sky-50" : "border-slate-300"
            }`}
          >
            {method}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedMethod === "Cartão de Crédito" && (
          <motion.div
            key="credit-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid grid-cols-1 gap-4"
          >
            <input
              type="text"
              placeholder="Número do Cartão"
              value={cardInfo.number}
              onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
              className="p-3 rounded-lg border border-slate-300 w-full"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Validade (MM/AA)"
                value={cardInfo.expiry}
                onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                className="p-3 rounded-lg border border-slate-300 w-full"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cardInfo.cvv}
                onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                className="p-3 rounded-lg border border-slate-300 w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        disabled={!selectedMethod || isSubmitting}
        onClick={handlePayment}
        className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-emerald-700 disabled:opacity-50 transition"
      >
        {isSubmitting ? "Processando..." : "Confirmar Pagamento"}
      </motion.button>
    </div>
  );
};

export default CartPaymentStep;