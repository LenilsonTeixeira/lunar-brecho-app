import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const AddProduct = () => {
  const [sizes, setSizes] = useState([{ id: 1, size: '', quantity: 1 }]);
  const [productPrice, setProductPrice] = useState<number | ''>('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed' | 'none'>('percentage');
  const [discountValue, setDiscountValue] = useState<number | ''>('');

  const availableSizes = [
    'PP',
    'P',
    'M',
    'G',
    'GG',
    'XG',
    'XXG',
    '34',
    '36',
    '38',
    '40',
    '42',
    '44',
    '46',
    '48',
    'Único',
    'Livre',
  ];

  const addSize = () => {
    const newId = Math.max(...sizes.map((s) => s.id), 0) + 1;
    setSizes([...sizes, { id: newId, size: '', quantity: 1 }]);
  };

  const removeSize = (id: number) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter((s) => s.id !== id));
    }
  };

  const updateSize = (id: number, field: 'size' | 'quantity', value: string | number) => {
    setSizes(sizes.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const calculateFinalPrice = () => {
    if (discountType === 'none' || Number(discountValue) === 0) {
      return Number(productPrice) || 0;
    }

    if (discountType === 'percentage') {
      return (
        (Number(productPrice) || 0) -
        ((Number(productPrice) || 0) * (Number(discountValue) || 0)) / 100
      );
    }

    if (discountType === 'fixed') {
      return Math.max(0, (Number(productPrice) || 0) - (Number(discountValue) || 0));
    }

    return Number(productPrice) || 0;
  };

  const getDiscountSymbol = () => {
    switch (discountType) {
      case 'percentage':
        return '%';
      case 'fixed':
        return 'R$';
      case 'none':
        return '';
      default:
        return '%';
    }
  };

  const handleDiscountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'percentage' | 'fixed' | 'none';
    setDiscountType(newType);

    // Reset discount value when changing type
    if (newType === 'none') {
      setDiscountValue('');
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setProductPrice('');
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setProductPrice(numValue);
      }
    }
  };

  const handleDiscountValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setDiscountValue('');
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setDiscountValue(numValue);
      }
    }
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Adicionar Produto</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações do produto abaixo
          </p>
        </div>

        <form className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Product Images */}
          <div>
            <label className='text-sm sm:text-base font-semibold text-slate-700 mb-3 block'>
              Imagens do Produto
            </label>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
              {/* Main Image */}
              <label htmlFor='main-image' className='cursor-pointer group'>
                <input accept='image/*' type='file' id='main-image' className='hidden' required />
                <div className='aspect-square border-2 border-dashed border-purple-400 rounded-lg flex items-center justify-center bg-purple-50 group-hover:border-purple-500 group-hover:bg-purple-100 transition-all duration-300'>
                  <div className='text-center'>
                    <div className='w-8 h-8 mx-auto mb-2 bg-purple-200 rounded-full flex items-center justify-center group-hover:bg-purple-300 transition-colors'>
                      <svg
                        className='w-4 h-4 text-purple-600 group-hover:text-purple-700'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        />
                      </svg>
                    </div>
                    <p className='text-xs text-purple-600 group-hover:text-purple-700 font-medium'>
                      Imagem Principal
                    </p>
                  </div>
                </div>
              </label>

              {/* Additional Images */}
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <label key={index} htmlFor={`image${index}`} className='cursor-pointer group'>
                    <input accept='image/*' type='file' id={`image${index}`} className='hidden' />
                    <div className='aspect-square border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-slate-50 group-hover:border-purple-400 group-hover:bg-purple-50 transition-all duration-300'>
                      <div className='text-center'>
                        <div className='w-8 h-8 mx-auto mb-2 bg-slate-200 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors'>
                          <svg
                            className='w-4 h-4 text-slate-500 group-hover:text-purple-600'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                            />
                          </svg>
                        </div>
                        <p className='text-xs text-slate-500 group-hover:text-purple-600'>
                          Adicionar
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
            </div>
          </div>

          {/* Product Name and Category - Side by side on larger screens */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='product-name'
              >
                Nome do Produto
              </label>
              <input
                id='product-name'
                type='text'
                placeholder='Digite o nome do produto'
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='category'
              >
                Categoria
              </label>
              <select
                id='category'
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
              >
                <option value=''>Selecione uma categoria</option>
                {[
                  { name: 'Roupas Femininas' },
                  { name: 'Acessórios' },
                  { name: 'Sapatos' },
                  { name: 'Bolsas' },
                  { name: 'Bijuterias' },
                ].map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Brand and Type - Side by side on larger screens */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='brand'>
                Marca
              </label>
              <input
                id='brand'
                type='text'
                placeholder='Digite a marca do produto'
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='type'>
                Tipo
              </label>
              <select
                id='type'
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
              >
                <option value=''>Selecione o tipo</option>
                <option value='novo'>Novo</option>
                <option value='bazar'>Bazar</option>
              </select>
            </div>
          </div>

          {/* Sizes and Quantities - Dynamic Management */}
          <div>
            <div className='flex items-center justify-between mb-4'>
              <label className='text-sm sm:text-base font-semibold text-slate-700'>
                Tamanhos e Quantidades
              </label>
              <button
                type='button'
                onClick={addSize}
                className='flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300'
              >
                <Plus className='w-4 h-4' />
                Adicionar Tamanho
              </button>
            </div>

            <div className='space-y-3'>
              {sizes.map((sizeItem, index) => (
                <div
                  key={sizeItem.id}
                  className='flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200'
                >
                  <div className='flex-1'>
                    <label className='text-xs sm:text-sm font-medium text-slate-600 mb-2 block'>
                      Tamanho {index + 1}
                    </label>
                    <select
                      value={sizeItem.size}
                      onChange={(e) => updateSize(sizeItem.id, 'size', e.target.value)}
                      className='w-full outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    >
                      <option value=''>Selecione o tamanho</option>
                      {availableSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='flex-1'>
                    <label className='text-xs sm:text-sm font-medium text-slate-600 mb-2 block'>
                      Quantidade
                    </label>
                    <input
                      type='number'
                      min='1'
                      value={sizeItem.quantity}
                      onChange={(e) =>
                        updateSize(sizeItem.id, 'quantity', parseInt(e.target.value) || 1)
                      }
                      placeholder='Qtd'
                      className='w-full outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    />
                  </div>

                  {sizes.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeSize(sizeItem.id)}
                      className='mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                      aria-label='Remover tamanho'
                    >
                      <X className='w-4 h-4' />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Total Quantity Display */}
            <div className='mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200'>
              <div className='flex items-center justify-between'>
                <span className='text-xs sm:text-sm font-medium text-purple-700'>
                  Quantidade Total:
                </span>
                <span className='text-sm sm:text-lg font-bold text-purple-800'>
                  {sizes.reduce((total, item) => total + item.quantity, 0)} unidades
                </span>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm sm:text-base font-semibold text-slate-700'
              htmlFor='product-description'
            >
              Descrição do Produto
            </label>
            <textarea
              id='product-description'
              rows={4}
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none bg-white'
              placeholder='Digite a descrição do produto'
            ></textarea>
          </div>

          {/* Observations */}
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm sm:text-base font-semibold text-slate-700'
              htmlFor='observations'
            >
              Observações
            </label>
            <textarea
              id='observations'
              rows={3}
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none bg-white'
              placeholder='Informações adicionais, detalhes especiais, etc.'
            ></textarea>
          </div>

          {/* Prices and Discount - Professional Section */}
          <div className='p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-purple-50 rounded-xl border border-slate-200 shadow-sm'>
            <div className='mb-6'>
              <h3 className='text-lg sm:text-xl font-bold text-slate-800 mb-2'>
                Preços e Descontos
              </h3>
              <p className='text-sm text-slate-600'>
                Configure o preço base e as opções de desconto
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
              {/* Preço Original */}
              <div className='flex flex-col gap-3'>
                <label
                  className='text-sm font-semibold text-slate-700 flex items-center gap-2'
                  htmlFor='product-price'
                >
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  Preço Original
                  <span className='text-red-500 ml-1'>*</span>
                </label>
                <div className='relative group'>
                  <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm font-medium group-focus-within:text-purple-600 transition-colors'>
                    R$
                  </span>
                  <input
                    id='product-price'
                    type='number'
                    min='0'
                    step='0.01'
                    value={productPrice}
                    onChange={handlePriceChange}
                    placeholder='0,00'
                    className='outline-none py-3 pl-10 pr-4 text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white w-full group-hover:border-purple-300'
                    required
                  />
                </div>
              </div>

              {/* Tipo de Desconto */}
              <div className='flex flex-col gap-3'>
                <label
                  className='text-sm font-semibold text-slate-700 flex items-center gap-2'
                  htmlFor='discount-type'
                >
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  Tipo de Desconto
                </label>
                <select
                  id='discount-type'
                  value={discountType}
                  onChange={handleDiscountTypeChange}
                  className='outline-none py-3 px-4 text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white cursor-pointer hover:border-purple-300'
                >
                  <option value='percentage'>Porcentagem (%)</option>
                  <option value='fixed'>Valor Fixo (R$)</option>
                  <option value='none'>Sem Desconto</option>
                </select>
              </div>

              {/* Valor do Desconto */}
              <div className='flex flex-col gap-3 sm:col-span-2 xl:col-span-1'>
                <label
                  className='text-sm font-semibold text-slate-700 flex items-center gap-2'
                  htmlFor='discount-value'
                >
                  <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                  Valor do Desconto
                </label>
                <div className='relative group'>
                  {discountType !== 'none' && (
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm font-medium group-focus-within:text-purple-600 transition-colors'>
                      {getDiscountSymbol()}
                    </span>
                  )}
                  <input
                    id='discount-value'
                    type='number'
                    min='0'
                    step={discountType === 'percentage' ? '0.01' : '0.01'}
                    value={discountType === 'none' ? 0 : discountValue}
                    onChange={handleDiscountValueChange}
                    placeholder='0'
                    disabled={discountType === 'none'}
                    className={`outline-none py-3 pr-4 text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white w-full group-hover:border-purple-300 ${
                      discountType === 'none' ? 'pl-4 bg-slate-100 cursor-not-allowed' : 'pl-10'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Preview do Preço Final */}
            <div className='mt-6 p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-lg border border-purple-200'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <svg
                    className='w-5 h-5 text-purple-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span className='text-sm font-medium text-purple-700'>Preço Final Estimado:</span>
                </div>
                <span className='text-lg sm:text-xl font-bold text-purple-800'>
                  R$ {calculateFinalPrice().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Adicionar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
