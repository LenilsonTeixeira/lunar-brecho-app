import { useState, useEffect, useCallback } from 'react';
import { Coupon, CreateCouponData, UpdateCouponData, CouponFilters } from '../types/coupon';

// Dados mockados para demonstração
const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'BLACK10',
    type: 'PERCENTAGE',
    value: 10,
    minOrderValue: 100,
    startDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-12-31'),
    maxUsage: 100,
    maxUsagePerUser: 1,
    currentUsage: 54,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    code: 'FREESHIP',
    type: 'FIXED',
    value: 15.5,
    startDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-06-30'),
    maxUsage: 50,
    currentUsage: 50,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    code: 'WELCOME20',
    type: 'PERCENTAGE',
    value: 20,
    minOrderValue: 50,
    startDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-03-01'),
    maxUsage: 200,
    maxUsagePerUser: 1,
    currentUsage: 180,
    isActive: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    code: 'SUMMER15',
    type: 'PERCENTAGE',
    value: 15,
    startDate: new Date('2024-06-01'),
    expirationDate: new Date('2024-08-31'),
    maxUsage: 75,
    currentUsage: 75,
    isActive: true,
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: '5',
    code: 'FIRSTORDER',
    type: 'FIXED',
    value: 25.0,
    minOrderValue: 80,
    startDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-12-31'),
    maxUsage: 300,
    maxUsagePerUser: 1,
    currentUsage: 45,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '6',
    code: 'FLASH30',
    type: 'PERCENTAGE',
    value: 30,
    minOrderValue: 150,
    startDate: new Date('2024-02-01'),
    expirationDate: new Date('2024-02-29'),
    maxUsage: 25,
    currentUsage: 25,
    isActive: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '7',
    code: 'LOYALTY5',
    type: 'PERCENTAGE',
    value: 5,
    startDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-12-31'),
    maxUsage: 1000,
    maxUsagePerUser: 5,
    currentUsage: 320,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '8',
    code: 'WINTER25',
    type: 'PERCENTAGE',
    value: 25,
    minOrderValue: 120,
    startDate: new Date('2024-12-01'),
    expirationDate: new Date('2024-02-29'),
    maxUsage: 100,
    currentUsage: 12,
    isActive: true,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '9',
    code: 'BIRTHDAY50',
    type: 'FIXED',
    value: 50.0,
    minOrderValue: 200,
    startDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-12-31'),
    maxUsage: 50,
    maxUsagePerUser: 1,
    currentUsage: 8,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '10',
    code: 'NEWCUSTOMER',
    type: 'PERCENTAGE',
    value: 15,
    minOrderValue: 60,
    startDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-12-31'),
    maxUsage: 500,
    maxUsagePerUser: 1,
    currentUsage: 156,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '11',
    code: 'VIP40',
    type: 'PERCENTAGE',
    value: 40,
    minOrderValue: 300,
    startDate: new Date('2024-01-01'),
    expirationDate: new Date('2024-12-31'),
    maxUsage: 20,
    maxUsagePerUser: 1,
    currentUsage: 20,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '12',
    code: 'SPRING20',
    type: 'PERCENTAGE',
    value: 20,
    minOrderValue: 100,
    startDate: new Date('2024-03-01'),
    expirationDate: new Date('2024-05-31'),
    maxUsage: 150,
    currentUsage: 89,
    isActive: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: '13',
    code: 'FALL10',
    type: 'PERCENTAGE',
    value: 10,
    startDate: new Date('2024-09-01'),
    expirationDate: new Date('2024-11-30'),
    maxUsage: 200,
    currentUsage: 67,
    isActive: true,
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01'),
  },
  {
    id: '14',
    code: 'HOLIDAY30',
    type: 'PERCENTAGE',
    value: 30,
    minOrderValue: 200,
    startDate: new Date('2024-12-15'),
    expirationDate: new Date('2024-12-25'),
    maxUsage: 100,
    currentUsage: 23,
    isActive: true,
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2024-12-15'),
  },
  {
    id: '15',
    code: 'EXPIRED50',
    type: 'PERCENTAGE',
    value: 50,
    minOrderValue: 100,
    startDate: new Date('2023-01-01'),
    expirationDate: new Date('2023-12-31'),
    maxUsage: 50,
    currentUsage: 12,
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
];

interface UseCouponsReturn {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    active: number;
    inactive: number;
    expired: number;
  };
  createCoupon: (data: CreateCouponData) => Promise<void>;
  updateCoupon: (id: string, data: UpdateCouponData) => Promise<void>;
  deleteCoupon: (id: string) => Promise<void>;
  toggleCouponStatus: (id: string, isActive: boolean) => Promise<void>;
  refreshCoupons: () => Promise<void>;
  checkCodeExists: (code: string, excludeId?: string) => Promise<boolean>;
}

export const useCoupons = (filters?: CouponFilters): UseCouponsReturn => {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    expired: 0,
  });

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simular chamada à API com delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Aplicar filtros nos dados mockados
      let filteredData = [...mockCoupons];

      if (filters?.status) {
        filteredData = filteredData.filter((coupon) => {
          const status = getCouponStatus(coupon);
          return status === filters.status;
        });
      }

      if (filters?.type) {
        filteredData = filteredData.filter((coupon) => coupon.type === filters.type);
      }

      if (filters?.isActive !== undefined) {
        filteredData = filteredData.filter((coupon) => coupon.isActive === filters.isActive);
      }

      setCoupons(filteredData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cupons');
      console.error('Erro ao buscar cupons:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const getCouponStatus = (coupon: Coupon): 'ACTIVE' | 'INACTIVE' | 'EXPIRED' => {
    if (!coupon.isActive) return 'INACTIVE';
    if (new Date() > new Date(coupon.expirationDate)) return 'EXPIRED';
    return 'ACTIVE';
  };

  const calculateStats = useCallback(() => {
    const total = mockCoupons.length;
    const active = mockCoupons.filter(
      (c) => c.isActive && new Date() <= new Date(c.expirationDate),
    ).length;
    const inactive = mockCoupons.filter((c) => !c.isActive).length;
    const expired = mockCoupons.filter((c) => new Date() > new Date(c.expirationDate)).length;

    return { total, active, inactive, expired };
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 200));
      const data = calculateStats();
      setStats(data);
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
    }
  }, [calculateStats]);

  const createCoupon = useCallback(
    async (data: CreateCouponData) => {
      try {
        setError(null);

        // Simular chamada à API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newCoupon: Coupon = {
          id: Date.now().toString(),
          ...data,
          currentUsage: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setCoupons((prev) => [newCoupon, ...prev]);
        await fetchStats();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao criar cupom');
        throw err;
      }
    },
    [fetchStats],
  );

  const updateCoupon = useCallback(
    async (id: string, data: UpdateCouponData) => {
      try {
        setError(null);

        // Simular chamada à API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const updatedCoupon: Coupon = {
          ...mockCoupons.find((c) => c.id === id)!,
          ...data,
          updatedAt: new Date(),
        };

        setCoupons((prev) => prev.map((c) => (c.id === id ? updatedCoupon : c)));
        await fetchStats();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao atualizar cupom');
        throw err;
      }
    },
    [fetchStats],
  );

  const deleteCoupon = useCallback(
    async (id: string) => {
      try {
        setError(null);

        // Simular chamada à API
        await new Promise((resolve) => setTimeout(resolve, 500));

        setCoupons((prev) => prev.filter((c) => c.id !== id));
        await fetchStats();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao excluir cupom');
        throw err;
      }
    },
    [fetchStats],
  );

  const toggleCouponStatus = useCallback(
    async (id: string, isActive: boolean) => {
      try {
        setError(null);

        // Simular chamada à API
        await new Promise((resolve) => setTimeout(resolve, 500));

        const updatedCoupon = {
          ...mockCoupons.find((c) => c.id === id)!,
          isActive,
          updatedAt: new Date(),
        };

        setCoupons((prev) => prev.map((c) => (c.id === id ? updatedCoupon : c)));
        await fetchStats();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao alterar status do cupom');
        throw err;
      }
    },
    [fetchStats],
  );

  const refreshCoupons = useCallback(async () => {
    await Promise.all([fetchCoupons(), fetchStats()]);
  }, [fetchCoupons, fetchStats]);

  const checkCodeExists = useCallback(async (code: string, excludeId?: string) => {
    try {
      // Simular verificação
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockCoupons.some((c) => c.code === code && c.id !== excludeId);
    } catch (err) {
      console.error('Erro ao verificar código:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
    fetchStats();
  }, [fetchCoupons, fetchStats]);

  return {
    coupons,
    loading,
    error,
    stats,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCouponStatus,
    refreshCoupons,
    checkCodeExists,
  };
};
