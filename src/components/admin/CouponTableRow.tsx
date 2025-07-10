import { Edit, Trash2, Eye } from 'lucide-react';
import { Coupon, CouponStatus } from '../../types/coupon';
import CouponStatusBadge from './CouponStatusBadge';

interface CouponTableRowProps {
  coupon: Coupon;
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
  onToggleStatus: (coupon: Coupon) => void;
}

const CouponTableRow = ({ coupon, onEdit, onDelete, onToggleStatus }: CouponTableRowProps) => {
  const getCouponStatus = (coupon: Coupon): CouponStatus => {
    if (!coupon.isActive) return 'INACTIVE';
    if (new Date() > new Date(coupon.expirationDate)) return 'EXPIRED';
    return 'ACTIVE';
  };

  const formatValue = (coupon: Coupon): string => {
    if (coupon.type === 'PERCENTAGE') {
      return `${coupon.value}%`;
    }
    return `R$ ${coupon.value.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatExpirationDate = (date: Date): string => {
    const expirationDate = new Date(date);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Expirado há ${Math.abs(diffDays)} dias`;
    } else if (diffDays === 0) {
      return 'Expira hoje';
    } else if (diffDays === 1) {
      return 'Expira amanhã';
    } else if (diffDays <= 7) {
      return `Expira em ${diffDays} dias`;
    } else {
      return formatDate(date);
    }
  };

  const getUsagePercentage = (): number => {
    return Math.round((coupon.currentUsage / coupon.maxUsage) * 100);
  };

  const getUsageColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  const status = getCouponStatus(coupon);
  const usagePercentage = getUsagePercentage();

  return (
    <tr className='border-b border-slate-200 hover:bg-slate-50 transition-colors duration-200'>
      {/* Código */}
      <td className='py-4 px-4'>
        <div className='flex items-center'>
          <span className='font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded text-sm'>
            {coupon.code}
          </span>
        </div>
      </td>

      {/* Tipo */}
      <td className='py-4 px-4'>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            coupon.type === 'PERCENTAGE'
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-purple-100 text-purple-800 border border-purple-200'
          }`}
        >
          {coupon.type === 'PERCENTAGE' ? '%' : 'R$'}
        </span>
      </td>

      {/* Valor */}
      <td className='py-4 px-4'>
        <span className='font-semibold text-slate-800'>{formatValue(coupon)}</span>
        {coupon.minOrderValue && (
          <div className='text-xs text-slate-500 mt-1'>
            Mín: R$ {coupon.minOrderValue.toFixed(2).replace('.', ',')}
          </div>
        )}
      </td>

      {/* Expiração */}
      <td className='py-4 px-4'>
        <div className='text-sm'>
          <div className='font-medium text-slate-800'>
            {formatExpirationDate(coupon.expirationDate)}
          </div>
          <div className='text-xs text-slate-500'>{formatDate(coupon.expirationDate)}</div>
        </div>
      </td>

      {/* Usos */}
      <td className='py-4 px-4'>
        <div className='text-sm'>
          <div className='font-medium text-slate-800'>
            {coupon.currentUsage}/{coupon.maxUsage}
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <div className='flex-1 bg-slate-200 rounded-full h-2'>
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  usagePercentage >= 90
                    ? 'bg-red-500'
                    : usagePercentage >= 75
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${getUsageColor(usagePercentage)}`}>
              {usagePercentage}%
            </span>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className='py-4 px-4'>
        <CouponStatusBadge status={status} />
      </td>

      {/* Ações */}
      <td className='py-4 px-4'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => onEdit(coupon)}
            className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
            title='Editar cupom'
          >
            <Edit className='w-4 h-4' />
          </button>

          <button
            onClick={() => onToggleStatus(coupon)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              coupon.isActive
                ? 'text-orange-600 hover:bg-orange-50'
                : 'text-green-600 hover:bg-green-50'
            }`}
            title={coupon.isActive ? 'Desativar cupom' : 'Ativar cupom'}
          >
            <Eye className='w-4 h-4' />
          </button>

          <button
            onClick={() => onDelete(coupon)}
            className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
            title='Excluir cupom'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CouponTableRow;
