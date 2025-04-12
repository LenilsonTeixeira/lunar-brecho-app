type SizeSelectorProps = {
    sizes: string[];
    selectedSize: string;
    onSelectSize: (size: string) => void;
  };

const ProductSizeSelector = ({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) => {
    return (
        <div className="flex flex-col w-fit">
          <p className="my-4">Tamanho: {selectedSize}</p>
          <div className="flex gap-2">
            {sizes.map((sizeOption, index) => (
              <button
                key={index}
                onClick={() => onSelectSize(sizeOption)}
                className={`py-1 px-2 border w-fit rounded-md cursor-pointer font-medium transition-colors 
                  ${
                    selectedSize === sizeOption
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                {sizeOption}
              </button>
            ))}
          </div>
        </div>
      );
}

export default ProductSizeSelector