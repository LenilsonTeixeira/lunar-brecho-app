import { ProductVariant } from '../../services/types';

type SizeSelectorProps = {
  variants: ProductVariant[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
};

const ProductSizeSelector = ({ variants, selectedSize, onSelectSize }: SizeSelectorProps) => {
  return (
    <div className='flex flex-col w-fit'>
      <p className='mb-3 text-base font-medium'>
        Tamanho: {selectedSize || 'Selecione'}
        {selectedSize && (
          <span className='ml-2 text-sm text-slate-600 font-normal'>
            ({variants.find((v) => v.size === selectedSize)?.stockAvailable || 0} disponíveis)
          </span>
        )}
      </p>
      <div className='flex gap-2 flex-wrap'>
        {variants.map((variant, index) => {
          const stockAvailable = variant.stockAvailable || 0;
          const isOutOfStock = stockAvailable === 0;
          const isSelected = selectedSize === variant.size;

          return (
            <button
              key={index}
              onClick={() => !isOutOfStock && onSelectSize(variant.size)}
              disabled={isOutOfStock}
              className={`p-1 px-2 rounded-2xl border-2 text-xs transition-all duration-200 relative ${
                isOutOfStock
                  ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
                  : isSelected
                    ? 'border-sky-400 bg-sky-50 text-sky-700 cursor-pointer'
                    : 'border-slate-200 hover:border-sky-400 hover:bg-sky-50 cursor-pointer'
              }`}
              title={isOutOfStock ? 'Indisponível' : `${stockAvailable} disponível(is)`}
            >
              <div className='flex flex-col items-center gap-0.5'>
                <span className={isOutOfStock ? 'line-through' : ''}>{variant.size}</span>
                <span className={`text-[10px] ${isSelected ? 'text-sky-600' : 'text-slate-500'}`}>
                  {isOutOfStock ? 'Esgotado' : `${stockAvailable} disp.`}
                </span>
              </div>
              {!isOutOfStock && stockAvailable <= 3 && (
                <span className='ml-1 text-orange-500 font-semibold absolute -top-1 -right-1'>
                  •
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
