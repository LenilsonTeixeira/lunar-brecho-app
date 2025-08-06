import { ProfitSimulationResult } from '../types/profit';

// Dados mock para simulação de lucro
export const mockProfitSimulationResult: ProfitSimulationResult = {
  finalPrice: 90.0,
  grossProfit: 40.0,
  netProfit: 37.5,
  profitMargin: 41.67,
  sellerAmount: 27.0, // apenas para produtos consignados
  costBreakdown: {
    acquisitionCost: 50.0,
    platformFee: 4.5,
    otherCosts: 2.5,
    sellerCommission: 27.0, // apenas para produtos consignados
    totalCosts: 84.0,
  },
  summary: {
    originalPrice: 100.0,
    discountAmount: 10.0,
    finalPrice: 90.0,
    profitType: 'net',
  },
};

// Função para simular resposta da API
export const simulateProfitAPI = async (data: any): Promise<ProfitSimulationResult> => {
  // Simular delay da API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const {
    productType,
    baseSalePrice,
    discountPercentage,
    acquisitionCost = 0,
    sellerCommission = 0,
    platformFee,
    otherCosts,
  } = data;

  // Cálculos básicos
  const discountAmount = (baseSalePrice * discountPercentage) / 100;
  const finalPrice = baseSalePrice - discountAmount;
  const platformFeeAmount = (finalPrice * platformFee) / 100;

  let grossProfit = 0;
  let netProfit = 0;
  let sellerAmount = 0;
  let costBreakdown: any = {
    acquisitionCost: 0,
    platformFee: platformFeeAmount,
    otherCosts,
    totalCosts: platformFeeAmount + otherCosts,
  };

  if (productType === 'DIRECT') {
    grossProfit = finalPrice - acquisitionCost;
    netProfit = grossProfit - platformFeeAmount - otherCosts;
    costBreakdown.acquisitionCost = acquisitionCost;
    costBreakdown.totalCosts = acquisitionCost + platformFeeAmount + otherCosts;
  } else {
    sellerAmount = (finalPrice * sellerCommission) / 100;
    grossProfit = finalPrice;
    netProfit = finalPrice - sellerAmount - platformFeeAmount - otherCosts;
    costBreakdown.sellerCommission = sellerAmount;
    costBreakdown.totalCosts = sellerAmount + platformFeeAmount + otherCosts;
  }

  const profitMargin = finalPrice > 0 ? (netProfit / finalPrice) * 100 : 0;

  return {
    finalPrice,
    grossProfit,
    netProfit,
    profitMargin,
    sellerAmount: productType === 'CONSIGNED' ? sellerAmount : undefined,
    costBreakdown,
    summary: {
      originalPrice: baseSalePrice,
      discountAmount,
      finalPrice,
      profitType: 'net',
    },
  };
};
