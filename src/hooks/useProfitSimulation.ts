import { useState } from 'react';
import { ProfitSimulationData, ProfitSimulationResult } from '../types/profit';
import { simulateProfitAPI } from '../utils/mockProfitData';

export const useProfitSimulation = () => {
  const [result, setResult] = useState<ProfitSimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateProfit = async (data: ProfitSimulationData): Promise<void> => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Durante o desenvolvimento, usar dados mock
      // Em produção, descomentar o código da API real

      // Código para API real:
      /*
      const response = await fetch('/api/profit/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: ProfitSimulationError = await response.json();
        throw new Error(errorData.message || 'Erro ao simular lucro');
      }

      const simulationResult: ProfitSimulationResult = await response.json();
      setResult(simulationResult);
      */

      // Usando dados mock para desenvolvimento
      const simulationResult = await simulateProfitAPI(data);
      setResult(simulationResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    result,
    loading,
    error,
    simulateProfit,
    clearResult,
  };
};
