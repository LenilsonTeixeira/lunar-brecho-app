export const formatToBRL = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const calculateDiscountedPrice = (price: number, discountPercent: number): number => {
  const discount = price * (discountPercent / 100);
  const finalPrice = Math.ceil(price - discount);
  return finalPrice;
};

export const calculateInstallment = (price: number, installments: number): number => {
  const installmentValue = price / installments;
  return installmentValue;
};
