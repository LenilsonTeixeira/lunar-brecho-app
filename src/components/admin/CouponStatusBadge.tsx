import { CouponStatus } from '../../types/coupon';

interface CouponStatusBadgeProps {
  status: CouponStatus;
  className?: string;
}

const CouponStatusBadge = ({ status, className = '' }: CouponStatusBadgeProps) => {
  const getStatusConfig = (status: CouponStatus) => {
    switch (status) {
      case 'ACTIVE':
        return {
          label: 'Ativo',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
        };
      case 'INACTIVE':
        return {
          label: 'Inativo',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
        };
      case 'EXPIRED':
        return {
          label: 'Expirado',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
        };
      default:
        return {
          label: 'Desconhecido',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      {config.label}
    </span>
  );
};

export default CouponStatusBadge;
