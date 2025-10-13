export type ProductType = 'DIRECT' | 'CONSIGNED';

export interface ProfitSimulationData {
  productType: ProductType;
  baseSalePrice: number;
  discountPercentage: number;
  acquisitionCost?: number; // Obrigatório apenas para produtos diretos
  sellerCommission?: number; // Obrigatório apenas para produtos consignados
  platformFee: number;
  otherCosts: number;
}

export interface ProfitSimulationResult {
  finalPrice: number;
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  sellerAmount?: number; // Valor repassado ao vendedor (apenas para consignados)
  costBreakdown: {
    acquisitionCost: number;
    platformFee: number;
    otherCosts: number;
    sellerCommission?: number;
    totalCosts: number;
  };
  summary: {
    originalPrice: number;
    discountAmount: number;
    finalPrice: number;
    profitType: 'gross' | 'net';
  };
}

export interface ProfitSimulationError {
  message: string;
  field?: string;
}
