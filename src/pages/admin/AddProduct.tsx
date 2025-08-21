import { useState } from 'react';
import { Plus, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const AddProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sizes, setSizes] = useState([{ id: 1, size: '', quantity: 1 }]);
  const [productPrice, setProductPrice] = useState<number | ''>('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed' | 'none'>('percentage');
  const [discountValue, setDiscountValue] = useState<number | ''>('');

  const steps = [
    { id: 1, title: 'Imagens', description: 'Adicione as fotos do produto' },
    { id: 2, title: 'Informações Básicas', description: 'Nome, categoria e marca' },
    { id: 3, title: 'Tamanhos', description: 'Configure tamanhos e quantidades' },
    { id: 4, title: 'Descrição', description: 'Detalhes e observações' },
    { id: 5, title: 'Preços', description: 'Preço e descontos' },
    { id: 6, title: 'Revisão', description: 'Confirme os dados' },
  ];

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

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
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
        );

      case 2:
        return (
          <div className='space-y-6'>
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
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='brand'
                >
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
          </div>
        );

      case 3:
        return (
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
        );

      case 4:
        return (
          <div className='space-y-6'>
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
          </div>
        );

      case 5:
        return (
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
        );

      case 6:
        return (
          <div className='space-y-6'>
            <div className='p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                  <Check className='w-6 h-6 text-green-600' />
                </div>
                <div>
                  <h3 className='text-lg font-bold text-green-800'>Revisão Final</h3>
                  <p className='text-sm text-green-600'>
                    Confirme todas as informações antes de salvar
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  <h4 className='font-semibold text-green-700'>Informações Básicas</h4>
                  <div className='text-sm text-green-600'>
                    <p>
                      <strong>Nome:</strong> [Nome do produto]
                    </p>
                    <p>
                      <strong>Categoria:</strong> [Categoria selecionada]
                    </p>
                    <p>
                      <strong>Marca:</strong> [Marca do produto]
                    </p>
                    <p>
                      <strong>Tipo:</strong> [Novo/Bazar]
                    </p>
                  </div>
                </div>

                <div className='space-y-3'>
                  <h4 className='font-semibold text-green-700'>Preços</h4>
                  <div className='text-sm text-green-600'>
                    <p>
                      <strong>Preço Original:</strong> R$ {productPrice || '0,00'}
                    </p>
                    <p>
                      <strong>Desconto:</strong>{' '}
                      {discountType === 'none'
                        ? 'Sem desconto'
                        : `${discountValue}${getDiscountSymbol()}`}
                    </p>
                    <p>
                      <strong>Preço Final:</strong> R$ {calculateFinalPrice().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-4 p-3 bg-white rounded-lg border border-green-200'>
                <p className='text-sm text-green-700'>
                  <strong>Quantidade Total:</strong>{' '}
                  {sizes.reduce((total, item) => total + item.quantity, 0)} unidades
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
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

        {/* Stepper Header */}
        <div className='mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3'>
              <h2 className='text-base sm:text-lg font-semibold text-slate-800 text-center sm:text-left'>
                Passo {currentStep} de {steps.length}: {steps[currentStep - 1].title}
              </h2>
              <div className='text-sm text-slate-500 text-center sm:text-right'>
                {Math.round((currentStep / steps.length) * 100)}% completo
              </div>
            </div>

            {/* Progress Bar */}
            <div className='w-full bg-slate-200 rounded-full h-2 mb-6'>
              <div
                className='bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out'
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>

            {/* Steps - Mobile Responsive */}
            <div className='hidden sm:flex items-center justify-between'>
              {steps.map((step, index) => (
                <div key={step.id} className='flex items-center'>
                  <button
                    onClick={() => goToStep(step.id)}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                    }`}
                    disabled={step.id > currentStep}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                        step.id < currentStep
                          ? 'bg-green-500 text-white'
                          : step.id === currentStep
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className='w-5 h-5' />
                      ) : (
                        <span className='text-sm font-semibold'>{step.id}</span>
                      )}
                    </div>
                    <div className='text-center'>
                      <div
                        className={`text-xs font-medium transition-colors duration-300 ${
                          step.id <= currentStep ? 'text-slate-800' : 'text-slate-500'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          step.id <= currentStep ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        {step.description}
                      </div>
                    </div>
                  </button>

                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                        step.id < currentStep ? 'bg-green-500' : 'bg-slate-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Steps - Horizontal Scrollable */}
            <div className='sm:hidden'>
              <div
                className='flex items-center gap-3 overflow-x-auto pb-2'
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {steps.map((step, index) => (
                  <div key={step.id} className='flex items-center flex-shrink-0'>
                    <button
                      onClick={() => goToStep(step.id)}
                      className={`flex flex-col items-center transition-all duration-300 min-w-[80px] ${
                        step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                      }`}
                      disabled={step.id > currentStep}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                          step.id < currentStep
                            ? 'bg-green-500 text-white'
                            : step.id === currentStep
                              ? 'bg-purple-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {step.id < currentStep ? (
                          <Check className='w-4 h-4' />
                        ) : (
                          <span className='text-xs font-semibold'>{step.id}</span>
                        )}
                      </div>
                      <div className='text-center'>
                        <div
                          className={`text-xs font-medium transition-colors duration-300 ${
                            step.id <= currentStep ? 'text-slate-800' : 'text-slate-500'
                          }`}
                        >
                          {step.title}
                        </div>
                      </div>
                    </button>

                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                          step.id < currentStep ? 'bg-green-500' : 'bg-slate-200'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Step Indicator */}
              <div className='mt-3 text-center'>
                <div className='inline-flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full'>
                  <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                  <span className='text-xs font-medium text-purple-700'>
                    {steps[currentStep - 1].description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {renderStepContent()}

          {/* Navigation Buttons - Mobile Responsive */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-200'>
            <button
              type='button'
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 w-full sm:w-auto ${
                currentStep === 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
              }`}
            >
              <ChevronLeft className='w-4 h-4' />
              Anterior
            </button>

            <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
              {currentStep < steps.length ? (
                <button
                  type='button'
                  onClick={nextStep}
                  className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto'
                >
                  Próximo
                  <ChevronRight className='w-4 h-4' />
                </button>
              ) : (
                <button
                  type='submit'
                  className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto'
                >
                  <Check className='w-4 h-4' />
                  Finalizar Cadastro
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
