export type CouponType = 'FIXED' | 'PERCENTAGE';

export type CouponStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrderValue?: number;
  startDate: Date;
  expirationDate: Date;
  maxUsage: number;
  maxUsagePerUser?: number;
  currentUsage: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCouponData {
  code: string;
  type: CouponType;
  value: number;
  minOrderValue?: number;
  startDate: Date;
  expirationDate: Date;
  maxUsage: number;
  maxUsagePerUser?: number;
  isActive: boolean;
}

export interface UpdateCouponData extends Partial<CreateCouponData> {
  id: string;
}

export interface CouponFilters {
  code?: string;
  status?: CouponStatus;
  type?: CouponType;
  isActive?: boolean;
}

export interface CouponSort {
  field: keyof Coupon;
  direction: 'asc' | 'desc';
}
