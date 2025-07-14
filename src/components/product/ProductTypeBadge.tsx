import { Sparkles, Tag } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductTypeBadgeProps {
  type: Product['type'];
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

const ProductTypeBadge = ({ type, variant = 'default', className = '' }: ProductTypeBadgeProps) => {
  const isNew = type === 'Novo';

  const variants = {
    default: {
      container:
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm transition-all duration-300 hover:scale-105',
      icon: 'w-4 h-4',
      text: 'text-sm font-medium',
    },
    compact: {
      container:
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium shadow-sm transition-all duration-200 hover:scale-102',
      icon: 'w-3 h-3',
      text: 'text-xs font-medium',
    },
    detailed: {
      container:
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg',
      icon: 'w-5 h-5',
      text: 'text-sm font-semibold',
    },
  };

  const currentVariant = variants[variant];

  const typeStyles = {
    Novo: {
      container: `${currentVariant.container} bg-gradient-to-r from-emerald-500 to-green-500 text-white border border-emerald-400/30`,
      icon: 'text-emerald-100',
      text: 'text-white',
    },
    Bazar: {
      container: `${currentVariant.container} bg-gradient-to-r from-violet-500 to-purple-600 text-white border border-violet-400/30`,
      icon: 'text-violet-100',
      text: 'text-white',
    },
  };

  const currentStyles = typeStyles[type];

  return (
    <div className={`${currentStyles.container} ${className}`}>
      {isNew ? (
        <Sparkles className={`${currentVariant.icon} ${currentStyles.icon}`} />
      ) : (
        <Tag className={`${currentVariant.icon} ${currentStyles.icon}`} />
      )}
      <span className={`${currentVariant.text} ${currentStyles.text}`}>{type}</span>
    </div>
  );
};

export default ProductTypeBadge;
