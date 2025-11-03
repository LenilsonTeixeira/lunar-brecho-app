import { useState, useEffect } from 'react';
import { Plus, X, ChevronLeft, ChevronRight, Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  productService,
  ApiError,
  ProductRequest,
  ProductImageMetadataRequest,
  categoryService,
  CategoryResponse,
} from '@/services';

const AddProduct = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [sizes, setSizes] = useState<{ id: number; size: string; quantity: number | '' }[]>([
    { id: 1, size: '', quantity: 1 },
  ]);
  const [productPrice, setProductPrice] = useState<number | ''>('');
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE'>(
    'PERCENTAGE',
  );
  const [discountValue, setDiscountValue] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<(File | undefined)[]>(
    new Array(6).fill(undefined),
  );
  const [imagePreviews, setImagePreviews] = useState<string[]>(new Array(6).fill(''));
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productColor, setProductColor] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productType, setProductType] = useState<'NEW' | 'BAZAAR'>('NEW');
  const [productDescription, setProductDescription] = useState('');
  const [productObservations, setProductObservations] = useState('');
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const response = await categoryService.getCategories(); // Fetch all categories
        setCategories(response);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        if (error instanceof ApiError) {
          setCategoriesError(`Erro ao carregar categorias: ${error.message}`);
        } else {
          setCategoriesError('Erro de conexão ao carregar categorias.');
        }
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run once on mount

  const steps = [
    { id: 1, title: 'Imagens', description: 'Adicione as fotos do produto' },
    { id: 2, title: 'Informações Básicas', description: 'Nome, categoria e marca' },
    { id: 3, title: 'Tamanhos', description: 'Configure tamanhos e quantidades' },
    { id: 4, title: 'Descrição', description: 'Detalhes e observações' },
    { id: 5, title: 'Preços', description: 'Preço e descontos' },
    { id: 6, title: 'Revisão', description: 'Confirme os dados' },
  ];

  const availableSizes = [
    // Tamanhos de roupas
    'PP',
    'P',
    'M',
    'G',
    'GG',
    'XG',
    'XXG',
    'XXXG',

    // Numerações de calçados e chinelos (padrão brasileiro)
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',

    // Numerações duplas para chinelos e calçados
    '33/34',
    '34/35',
    '35/36',
    '36/37',
    '37/38',
    '38/39',
    '39/40',
    '40/41',
    '41/42',
    '42/43',
    '43/44',
    '44/45',
    '45/46',
    '46/47',
    '47/48',

    // Tamanhos infantis
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',

    // Numerações duplas infantis
    '20/21',
    '21/22',
    '22/23',
    '23/24',
    '24/25',
    '25/26',
    '26/27',
    '27/28',
    '28/29',
    '29/30',
    '30/31',
    '31/32',
    '32/33',

    // Tamanhos especiais
    'Único',
    'Livre',
    'Tamanho Único',
    'Tamanho Livre',
    'Unissex',
    'Adulto',
    'Infantil',
    'Juvenil',
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

  const updateSize = (id: number, field: 'size' | 'quantity', value: string | number | '') => {
    setSizes(sizes.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const calculateFinalPrice = () => {
    if (discountType === 'NONE' || Number(discountValue) === 0) {
      return Number(productPrice) || 0;
    }

    if (discountType === 'PERCENTAGE') {
      return (
        (Number(productPrice) || 0) -
        ((Number(productPrice) || 0) * (Number(discountValue) || 0)) / 100
      );
    }

    if (discountType === 'FIXED_AMOUNT') {
      return Math.max(0, (Number(productPrice) || 0) - (Number(discountValue) || 0));
    }

    return Number(productPrice) || 0;
  };

  const getDiscountSymbol = () => {
    switch (discountType) {
      case 'PERCENTAGE':
        return '%';
      case 'FIXED_AMOUNT':
        return 'R$';
      case 'NONE':
        return '';
      default:
        return '%';
    }
  };

  const handleDiscountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
    setDiscountType(newType);

    // Reset discount value when changing type
    if (newType === 'NONE') {
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

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    switch (currentStep) {
      case 1: // Imagens - não obrigatório
        break;

      case 2: // Informações Básicas
        if (!productName.trim()) {
          errors.productName = 'Nome do produto é obrigatório';
        }
        if (!productCategory.trim()) {
          errors.productCategory = 'Categoria é obrigatória';
        }
        // Tipo sempre tem valor padrão, não precisa validar
        break;

      case 3: {
        // Tamanhos
        const invalidSizes = sizes.filter(
          (s) => !s.size.trim() || s.quantity === '' || Number(s.quantity) < 1,
        );
        if (invalidSizes.length > 0) {
          sizes.forEach((size) => {
            if (!size.size.trim()) {
              errors[`size_${size.id}`] = 'Selecione um tamanho';
            }
            if (size.quantity === '' || Number(size.quantity) < 1) {
              errors[`quantity_${size.id}`] = 'Quantidade deve ser maior que 0';
            }
          });
        }
        break;
      }

      case 4: // Descrição
        if (!productDescription.trim()) {
          errors.productDescription = 'Descrição do produto é obrigatória';
        }
        break;

      case 5: // Preços
        if (!productPrice || Number(productPrice) <= 0) {
          errors.productPrice = 'Preço original é obrigatório e deve ser maior que 0';
        }
        break;

      case 6: // Revisão - não precisa validar
        break;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setFieldErrors({}); // Limpa erros ao avançar
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFieldErrors({}); // Limpa erros ao voltar
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Validar tamanho (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 10MB.');
        return;
      }

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          // Atualizar o array de arquivos e previews simultaneamente
          setProductImages((prev) => {
            const newImages = [...prev];
            newImages[index] = file;
            return newImages;
          });

          setImagePreviews((prev) => {
            const newPreviews = [...prev];
            newPreviews[index] = result;
            return newPreviews;
          });
        }
      };

      reader.onerror = (e) => {
        console.error('FileReader error:', e);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setProductImages((prev) => {
      const newImages = [...prev];
      newImages[index] = undefined;
      return newImages;
    });

    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews[index] = '';
      return newPreviews;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validar campos obrigatórios
      if (!productName.trim() || !productCategory.trim() || !productPrice) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Validar tamanhos
      const invalidSizes = sizes.filter(
        (s) => !s.size.trim() || s.quantity === '' || Number(s.quantity) < 1,
      );
      if (invalidSizes.length > 0) {
        setError('Por favor, preencha corretamente todos os tamanhos.');
        return;
      }

      // Verificar se há imagens
      const hasImages = productImages.some((img) => img !== undefined);

      // Preparar dados do produto
      const productData: ProductRequest = {
        name: productName.trim(),
        category: productCategory.trim(), // Trim no frontend + backend para consistência
        brand: productBrand.trim() || undefined,
        color: productColor.trim() || undefined,
        type: productType,
        basePrice: Number(productPrice),
        discountType: discountType as 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE',
        discountValue: discountType !== 'NONE' ? Number(discountValue) || 0 : undefined,
        status: hasImages ? 'ACTIVE' : 'INACTIVE',
        description: productDescription.trim() || undefined,
        observations: productObservations.trim() || undefined,
        variants: sizes.map((size) => ({
          size: size.size.trim(),
          stockAvailable: Number(size.quantity),
        })),
      };

      // 1. Criar o produto
      const response = await productService.createProduct(productData);

      // 2. Upload das imagens se fornecidas
      const imagesToUpload = productImages.filter((img): img is File => img !== undefined);
      if (imagesToUpload.length > 0) {
        for (let i = 0; i < imagesToUpload.length; i++) {
          const image = imagesToUpload[i];
          if (image) {
            const metadata: ProductImageMetadataRequest = {
              position: i, // Position starts from 0
              isMain: i === 0, // First image is main
              operationType: 'ADD', // New product, so ADD operation
            };
            await productService.uploadProductImage(response.id, image, metadata);
          }
        }
      }

      // 3. Redirecionar para a lista de produtos
      navigate('/admin/produtos');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      if (error instanceof ApiError) {
        setError(`Erro ao criar produto: ${error.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
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
                <input
                  accept='image/*'
                  type='file'
                  id='main-image'
                  className='hidden'
                  onChange={(e) => handleImageChange(0, e)}
                />
                {imagePreviews[0] ? (
                  <div className='aspect-square rounded-lg overflow-hidden border-2 border-purple-400 shadow-lg group-hover:shadow-xl transition-all duration-300 relative'>
                    <img
                      src={imagePreviews[0]}
                      alt='Imagem Principal'
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        console.error('Image load error:', e);
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'https://via.placeholder.com/150x150/8b5cf6/ffffff?text=Erro+Imagem';
                      }}
                    />
                    <div className='absolute inset-0 bg-transparent group-hover:bg-white/20 transition-all duration-300 flex items-center justify-center'>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg'>
                          <svg
                            className='w-4 h-4 text-purple-600'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className='absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg'>
                      Principal
                    </div>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        removeImage(0);
                      }}
                      className='absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg'
                    >
                      <X className='w-3 h-3' />
                    </button>
                  </div>
                ) : (
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
                )}
              </label>

              {/* Additional Images */}
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <label key={index} htmlFor={`image${index + 1}`} className='cursor-pointer group'>
                    <input
                      accept='image/*'
                      type='file'
                      id={`image${index + 1}`}
                      className='hidden'
                      onChange={(e) => handleImageChange(index + 1, e)}
                    />
                    {imagePreviews[index + 1] ? (
                      <div className='aspect-square rounded-lg overflow-hidden border-2 border-slate-300 shadow-lg group-hover:shadow-xl transition-all duration-300 relative'>
                        <img
                          src={imagePreviews[index + 1]}
                          alt={`Imagem ${index + 2}`}
                          className='w-full h-full object-cover'
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              'https://via.placeholder.com/150x150/8b5cf6/ffffff?text=Erro+Imagem';
                          }}
                        />
                        <div className='absolute inset-0 bg-transparent group-hover:bg-white/20 transition-all duration-300 flex items-center justify-center'>
                          <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg'>
                              <svg
                                className='w-4 h-4 text-purple-600'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
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
                    )}
                    {imagePreviews[index + 1] && (
                      <button
                        type='button'
                        onClick={(e) => {
                          e.preventDefault();
                          removeImage(index + 1);
                        }}
                        className='absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg'
                      >
                        <X className='w-3 h-3' />
                      </button>
                    )}
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
                  Nome do Produto <span className='text-red-500'>*</span>
                </label>
                <input
                  id='product-name'
                  type='text'
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    if (fieldErrors.productName) {
                      setFieldErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.productName;
                        return newErrors;
                      });
                    }
                  }}
                  placeholder='Digite o nome do produto'
                  className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                    fieldErrors.productName
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                  }`}
                  required
                />
                {fieldErrors.productName && (
                  <p className='text-sm text-red-600 flex items-center gap-1'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {fieldErrors.productName}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='category'
                >
                  Categoria <span className='text-red-500'>*</span>
                </label>
                <select
                  id='category'
                  value={productCategory}
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                    if (fieldErrors.productCategory) {
                      setFieldErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.productCategory;
                        return newErrors;
                      });
                    }
                  }}
                  className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                    fieldErrors.productCategory
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                  }`}
                  disabled={categoriesLoading}
                >
                  <option value=''>
                    {categoriesLoading ? 'Carregando categorias...' : 'Selecione uma categoria'}
                  </option>
                  {categoriesError && (
                    <option value='' disabled>
                      {categoriesError}
                    </option>
                  )}
                  {categories.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {fieldErrors.productCategory && (
                  <p className='text-sm text-red-600 flex items-center gap-1'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {fieldErrors.productCategory}
                  </p>
                )}
              </div>
            </div>

            {/* Brand, Color and Type - Side by side on larger screens */}
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
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  placeholder='Digite a marca do produto'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='color'
                >
                  Cor
                </label>
                <input
                  id='color'
                  type='text'
                  value={productColor}
                  onChange={(e) => setProductColor(e.target.value)}
                  placeholder='Digite a cor do produto'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>
            </div>

            {/* Type */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='type'>
                  Tipo
                </label>
                <select
                  id='type'
                  value={productType}
                  onChange={(e) => setProductType(e.target.value as 'NEW' | 'BAZAAR')}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                >
                  <option value='NEW'>Novo</option>
                  <option value='BAZAAR'>Bazar</option>
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
                Tamanhos e Quantidades <span className='text-red-500'>*</span>
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
                  className={`flex flex-col gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    fieldErrors[`size_${sizeItem.id}`] || fieldErrors[`quantity_${sizeItem.id}`]
                      ? 'bg-red-50 border-red-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className='flex items-start gap-4'>
                    <div className='flex-1'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600 mb-2 block'>
                        Tamanho {index + 1} <span className='text-red-500'>*</span>
                      </label>
                      <select
                        value={sizeItem.size}
                        onChange={(e) => {
                          updateSize(sizeItem.id, 'size', e.target.value);
                          if (fieldErrors[`size_${sizeItem.id}`]) {
                            setFieldErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors[`size_${sizeItem.id}`];
                              return newErrors;
                            });
                          }
                        }}
                        className={`w-full outline-none py-2 px-3 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                          fieldErrors[`size_${sizeItem.id}`]
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                        }`}
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
                        Quantidade <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='number'
                        min='1'
                        value={sizeItem.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          updateSize(
                            sizeItem.id,
                            'quantity',
                            value === '' ? '' : parseInt(value) || 1,
                          );
                          if (fieldErrors[`quantity_${sizeItem.id}`]) {
                            setFieldErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors[`quantity_${sizeItem.id}`];
                              return newErrors;
                            });
                          }
                        }}
                        placeholder='Qtd'
                        className={`w-full outline-none py-2 px-3 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                          fieldErrors[`quantity_${sizeItem.id}`]
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                        }`}
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
                  {(fieldErrors[`size_${sizeItem.id}`] ||
                    fieldErrors[`quantity_${sizeItem.id}`]) && (
                    <div className='flex flex-col gap-1'>
                      {fieldErrors[`size_${sizeItem.id}`] && (
                        <p className='text-sm text-red-600 flex items-center gap-1'>
                          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path
                              fillRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                          {fieldErrors[`size_${sizeItem.id}`]}
                        </p>
                      )}
                      {fieldErrors[`quantity_${sizeItem.id}`] && (
                        <p className='text-sm text-red-600 flex items-center gap-1'>
                          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path
                              fillRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                          {fieldErrors[`quantity_${sizeItem.id}`]}
                        </p>
                      )}
                    </div>
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
                  {sizes.reduce((total, item) => total + (Number(item.quantity) || 0), 0)} unidades
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
                Descrição do Produto <span className='text-red-500'>*</span>
              </label>
              <textarea
                id='product-description'
                value={productDescription}
                onChange={(e) => {
                  setProductDescription(e.target.value);
                  if (fieldErrors.productDescription) {
                    setFieldErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.productDescription;
                      return newErrors;
                    });
                  }
                }}
                rows={4}
                className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border transition-all duration-300 resize-none bg-white ${
                  fieldErrors.productDescription
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                }`}
                placeholder='Digite a descrição do produto'
              ></textarea>
              {fieldErrors.productDescription && (
                <p className='text-sm text-red-600 flex items-center gap-1'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {fieldErrors.productDescription}
                </p>
              )}
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
                value={productObservations}
                onChange={(e) => setProductObservations(e.target.value)}
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
                    onChange={(e) => {
                      handlePriceChange(e);
                      if (fieldErrors.productPrice) {
                        setFieldErrors((prev) => {
                          const newErrors = { ...prev };
                          delete newErrors.productPrice;
                          return newErrors;
                        });
                      }
                    }}
                    placeholder='0,00'
                    className={`outline-none py-3 pl-10 pr-4 text-base rounded-lg border transition-all duration-300 bg-white w-full group-hover:border-purple-300 ${
                      fieldErrors.productPrice
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                    }`}
                    required
                  />
                </div>
                {fieldErrors.productPrice && (
                  <p className='text-sm text-red-600 flex items-center gap-1'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {fieldErrors.productPrice}
                  </p>
                )}
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
                  <option value='PERCENTAGE'>Porcentagem (%)</option>
                  <option value='FIXED_AMOUNT'>Valor Fixo (R$)</option>
                  <option value='NONE'>Sem Desconto</option>
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
                  {discountType !== 'NONE' && (
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm font-medium group-focus-within:text-purple-600 transition-colors'>
                      {getDiscountSymbol()}
                    </span>
                  )}
                  <input
                    id='discount-value'
                    type='number'
                    min='0'
                    step={discountType === 'PERCENTAGE' ? '0.01' : '0.01'}
                    value={discountType === 'NONE' ? 0 : discountValue}
                    onChange={handleDiscountValueChange}
                    placeholder='0'
                    disabled={discountType === 'NONE'}
                    className={`outline-none py-3 pr-4 text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white w-full group-hover:border-purple-300 ${
                      discountType === 'NONE' ? 'pl-4 bg-slate-100 cursor-not-allowed' : 'pl-10'
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
                      <strong>Nome:</strong> {productName || '[Nome do produto]'}
                    </p>
                    <p>
                      <strong>Categoria:</strong> {productCategory || '[Categoria selecionada]'}
                    </p>
                    <p>
                      <strong>Marca:</strong> {productBrand || '[Marca do produto]'}
                    </p>
                    {productColor && (
                      <p>
                        <strong>Cor:</strong> {productColor}
                      </p>
                    )}
                    <p>
                      <strong>Tipo:</strong> {productType === 'NEW' ? 'Novo' : 'Bazar'}
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
                      {discountType === 'NONE'
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
                  {sizes.reduce((total, item) => total + (Number(item.quantity) || 0), 0)} unidades
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
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/produtos')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Adicionar Produto</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações do produto abaixo
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg className='h-5 w-5 text-red-400' viewBox='0 0 20 20' fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm text-red-800'>{error}</p>
              </div>
              <div className='ml-auto pl-3'>
                <button onClick={() => setError(null)} className='text-red-400 hover:text-red-600'>
                  <span className='sr-only'>Fechar</span>
                  <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

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
          {/* Validation Error Alert */}
          {Object.keys(fieldErrors).length > 0 && (
            <div className='bg-red-50 border-l-4 border-red-500 rounded-lg p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <svg className='h-5 w-5 text-red-500' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-semibold text-red-800'>
                    Preencha todos os campos obrigatórios
                  </h3>
                  <p className='text-sm text-red-700 mt-1'>
                    Por favor, corrija os campos destacados em vermelho antes de continuar.
                  </p>
                </div>
              </div>
            </div>
          )}
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
                  type='button'
                  onClick={handleSubmit}
                  disabled={loading}
                  className='flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  {loading ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      Criando...
                    </>
                  ) : (
                    <>
                      <Check className='w-4 h-4' />
                      Finalizar Cadastro
                    </>
                  )}
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
