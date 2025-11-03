import { useState, useEffect } from 'react';
import { Plus, X, Tag, BarChart3, Image, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import {
  productService,
  categoryService,
  ApiError,
  ProductRequest,
  ProductImageMetadataRequest,
  CategoryResponse,
} from '@/services';

interface ProductSize {
  id?: string;
  size: string;
  quantity: number | '';
}

interface ProductItem {
  id: string;
  externalId: string;
  name: string;
  category: string;
  brand: string;
  color?: string;
  type: 'NEW' | 'BAZAAR';
  basePrice: number;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
  discountValue?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  sizes: ProductSize[];
  images: Array<{
    id?: string;
    originalUrl?: string;
    thumbnailUrl?: string;
    position: number;
    isMain: boolean;
  }>;
  description?: string;
  observations?: string;
}

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productColor, setProductColor] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productType, setProductType] = useState<'NEW' | 'BAZAAR'>('NEW');
  const [productStatus, setProductStatus] = useState<'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK'>(
    'ACTIVE',
  );
  const [productPrice, setProductPrice] = useState<number | ''>('');
  const [productDescription, setProductDescription] = useState('');
  const [productObservations, setProductObservations] = useState('');
  const [productImages, setProductImages] = useState<
    Array<{
      id?: string;
      originalUrl?: string;
      thumbnailUrl?: string;
      position: number;
      isMain: boolean;
    } | null>
  >([]);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>(new Array(6).fill(null));
  const [sizes, setSizes] = useState<ProductSize[]>([]);
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE'>(
    'PERCENTAGE',
  );
  const [discountValue, setDiscountValue] = useState<number | ''>('');
  // removed old newImages state; now using imageFiles per slot
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('ID do produto não fornecido');
        return;
      }

      try {
        setError(null);
        const productData = await productService.getProduct(productId);
        setProduct({
          ...productData,
          brand: productData.brand || '',
          category: productData.category.name,
          sizes: productData.variants.map((v) => ({
            id: v.id,
            size: v.size,
            quantity: v.stockAvailable || 0,
          })),
        });
        setProductName(productData.name);
        setProductBrand(productData.brand || '');
        setProductColor(productData.color || '');
        setProductCategory(productData.category.name);
        setProductType(productData.type);
        setProductStatus(productData.status);
        setProductPrice(productData.basePrice);
        setProductDescription(productData.description || '');
        setProductObservations(productData.observations || '');

        // Mapear as imagens existentes para um array de 6 posições ordenado
        const imagesArray: Array<{
          id?: string;
          originalUrl?: string;
          thumbnailUrl?: string;
          position: number;
          isMain: boolean;
        } | null> = new Array(6).fill(null);

        // Se a API retornar images como undefined, usar array vazio
        const apiImages = productData.images || [];

        if (apiImages.length > 0) {
          // Ordenar as imagens por position
          const sortedImages = [...apiImages].sort((a, b) => a.position - b.position);

          sortedImages.forEach((img) => {
            if (img.position >= 0 && img.position < 6) {
              imagesArray[img.position] = {
                id: img.id,
                originalUrl: img.originalUrl,
                thumbnailUrl: img.thumbnailUrl,
                position: img.position,
                isMain: img.isMain,
              };
            }
          });
        } else if (productData.mainImageUrl) {
          // Fallback: Se não tiver array de images mas tiver mainImageUrl, usar ela
          imagesArray[0] = {
            originalUrl: productData.mainImageUrl,
            thumbnailUrl: productData.mainThumbnailUrl,
            position: 0,
            isMain: true,
          };
        }

        setProductImages(imagesArray);

        setSizes(
          productData.variants.map((v) => ({
            id: v.id,
            size: v.size,
            quantity: v.stockAvailable || 0,
          })),
        );
        setDiscountType(productData.discountType);
        setDiscountValue(productData.discountValue || '');
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        if (err instanceof ApiError) {
          switch (err.status) {
            case 404:
              setError('Produto não encontrado');
              break;
            case 401:
              setError('Não autorizado. Faça login novamente.');
              break;
            default:
              setError('Erro ao carregar produto. Tente novamente.');
          }
        } else {
          setError('Erro de conexão. Verifique sua internet.');
        }
      }
    };

    fetchProduct();
  }, [productId]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const response = await categoryService.getCategories();
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
  }, []);

  const addSize = () => {
    const newId = Math.max(...sizes.map((s) => parseInt(s.id || '0')), 0) + 1;
    setSizes([
      ...sizes,
      {
        id: newId.toString(),
        size: '',
        quantity: 1,
      },
    ]);
  };

  const removeSize = (id: string) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter((s) => s.id !== id));
    }
  };

  const updateSize = (id: string, field: 'size' | 'quantity', value: string | number | '') => {
    setSizes(sizes.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFiles((prev) => {
        const next = [...prev];
        next[index] = file;
        return next;
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...productImages];
        const existing = newImages[index];
        newImages[index] = {
          id: existing?.id,
          originalUrl: e.target?.result as string,
          thumbnailUrl: e.target?.result as string,
          position: index,
          isMain: index === 0,
        };
        setProductImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...productImages];
    newImages[index] = null;
    setProductImages(newImages);

    // Também limpar o arquivo correspondente se houver
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = null;
    setImageFiles(newImageFiles);
  };

  const calculateTotalQuantity = () => {
    return sizes.reduce((total, size) => total + (Number(size.quantity) || 0), 0);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // debug: submit invoked
    setSaving(true);
    setError(null);

    try {
      // Validar campos obrigatórios
      if (!productName.trim() || !productCategory.trim() || !productPrice) {
        // debug: validation failed - required fields
        setError('Por favor, preencha todos os campos obrigatórios.');
        setSaving(false);
        return;
      }

      // Validar tamanhos
      const invalidSizes = sizes.filter(
        (s) => !s.size.trim() || s.quantity === '' || Number(s.quantity) < 0,
      );
      if (invalidSizes.length > 0) {
        // debug: validation failed - invalid sizes
        setError('Por favor, preencha corretamente todos os tamanhos.');
        setSaving(false);
        return;
      }

      // Preparar dados do produto
      const productData: ProductRequest = {
        name: productName.trim(),
        category: productCategory.trim(),
        brand: productBrand.trim() || undefined,
        color: productColor.trim() || undefined,
        type: productType,
        basePrice: Number(productPrice),
        discountType: discountType,
        discountValue: discountType !== 'NONE' ? Number(discountValue) || 0 : undefined,
        status: productStatus,
        description: productDescription.trim() || undefined,
        observations: productObservations.trim() || undefined,
        variants: sizes.map((size) => ({
          id: size.id,
          size: size.size.trim(),
          stockAvailable: Number(size.quantity),
        })),
      };

      // 1. Atualizar o produto
      // debug: updating product
      const response = await productService.updateProduct(productId!, productData);
      // debug: product updated

      // 2. Atualização/Cadastro de imagens por posição (PATCH para existentes, POST para novas)
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        if (!file) continue;

        const existingImage = product?.images?.find((img) => img.position === i);

        if (existingImage?.id) {
          const metadata: ProductImageMetadataRequest = {
            position: i,
            isMain: i === 0,
            operationType: 'UPDATE',
          };
          // debug: patching image
          await productService.updateProductImage(response.id, existingImage.id, file, metadata);
        } else {
          const metadata: ProductImageMetadataRequest = {
            position: i,
            isMain: i === 0,
            operationType: 'ADD',
          };
          // debug: creating image
          await productService.uploadProductImage(response.id, file, metadata);
        }
      }

      // 3. Redirecionar para a lista de produtos
      // debug: navigation
      navigate('/admin/produtos');
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      if (err instanceof ApiError) {
        setError(`Erro ao atualizar produto: ${err.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setSaving(false);
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
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>
            Editar Produto #{product?.externalId || productId}
          </h1>
          <p className='text-base text-slate-600'>Modifique as informações do produto abaixo</p>
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

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Tag className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='product-name'>
                  Nome do Produto *
                </label>
                <input
                  id='product-name'
                  type='text'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder='Digite o nome do produto'
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='product-brand'>
                  Marca *
                </label>
                <input
                  id='product-brand'
                  type='text'
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  placeholder='Digite a marca'
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='product-color'>
                  Cor
                </label>
                <input
                  id='product-color'
                  type='text'
                  value={productColor}
                  onChange={(e) => setProductColor(e.target.value)}
                  placeholder='Digite a cor do produto'
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='product-category'>
                  Categoria *
                </label>
                <select
                  id='product-category'
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                  disabled={categoriesLoading}
                >
                  <option value=''>
                    {categoriesLoading ? 'Carregando categorias...' : 'Selecione a categoria'}
                  </option>
                  {categoriesError && (
                    <option value='' disabled>
                      {categoriesError}
                    </option>
                  )}
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='product-type'>
                  Tipo *
                </label>
                <select
                  id='product-type'
                  value={productType}
                  onChange={(e) => setProductType(e.target.value as 'NEW' | 'BAZAAR')}
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='NEW'>Novo</option>
                  <option value='BAZAAR'>Bazar</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='product-status'>
                  Status *
                </label>
                <select
                  id='product-status'
                  value={productStatus}
                  onChange={(e) =>
                    setProductStatus(e.target.value as 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK')
                  }
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='ACTIVE'>Ativo</option>
                  <option value='INACTIVE'>Inativo</option>
                  <option value='OUT_OF_STOCK'>Fora de Estoque</option>
                </select>
              </div>
            </div>
          </div>

          {/* Imagens do Produto */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Image className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Imagens do Produto</h3>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
              {/* Imagem Principal */}
              <div className='relative group'>
                <label htmlFor='main-image' className='cursor-pointer block'>
                  <input
                    accept='image/*'
                    type='file'
                    id='main-image'
                    onChange={(e) => handleImageChange(0, e)}
                    className='hidden'
                  />
                  {productImages[0] ? (
                    <div className='aspect-square rounded-lg overflow-hidden border-2 border-purple-400 shadow-lg group-hover:shadow-xl transition-all duration-300 relative'>
                      <img
                        src={productImages[0]?.originalUrl || productImages[0]?.thumbnailUrl || ''}
                        alt='Imagem Principal'
                        className='w-full h-full object-cover'
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
              </div>

              {/* Imagens Adicionais */}
              {Array(5)
                .fill('')
                .map((_, index) => (
                  <div key={index + 1} className='relative group'>
                    <label htmlFor={`image${index + 1}`} className='cursor-pointer block'>
                      <input
                        accept='image/*'
                        type='file'
                        id={`image${index + 1}`}
                        onChange={(e) => handleImageChange(index + 1, e)}
                        className='hidden'
                      />
                      {productImages[index + 1] ? (
                        <div className='aspect-square rounded-lg overflow-hidden border-2 border-slate-300 shadow-lg group-hover:shadow-xl transition-all duration-300 relative'>
                          <img
                            src={
                              productImages[index + 1]?.originalUrl ||
                              productImages[index + 1]?.thumbnailUrl ||
                              ''
                            }
                            alt={`Imagem ${index + 2}`}
                            className='w-full h-full object-cover'
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
                    </label>
                  </div>
                ))}
            </div>
          </div>

          {/* Preços e Descontos - Seção Profissional */}
          <div className='p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-purple-50 rounded-xl border border-slate-200 shadow-sm'>
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-slate-800 mb-2'>Preços e Descontos</h3>
              <p className='text-sm text-slate-600'>
                Configure o preço base e as opções de desconto
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
              {/* Preço Original */}
              <div className='flex flex-col gap-3'>
                <label
                  className='text-sm font-medium text-slate-700 flex items-center gap-2'
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
                    className='outline-none py-3 pl-10 pr-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white w-full group-hover:border-purple-300'
                    required
                  />
                </div>
              </div>

              {/* Tipo de Desconto */}
              <div className='flex flex-col gap-3'>
                <label
                  className='text-sm font-medium text-slate-700 flex items-center gap-2'
                  htmlFor='discount-type'
                >
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  Tipo de Desconto
                </label>
                <select
                  id='discount-type'
                  value={discountType}
                  onChange={handleDiscountTypeChange}
                  className='outline-none py-3 px-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white cursor-pointer hover:border-purple-300'
                >
                  <option value='PERCENTAGE'>Porcentagem (%)</option>
                  <option value='FIXED_AMOUNT'>Valor Fixo (R$)</option>
                  <option value='NONE'>Sem Desconto</option>
                </select>
              </div>

              {/* Valor do Desconto */}
              <div className='flex flex-col gap-3 sm:col-span-2 xl:col-span-1'>
                <label
                  className='text-sm font-medium text-slate-700 flex items-center gap-2'
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
                    className={`outline-none py-3 pr-4 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white w-full group-hover:border-purple-300 ${
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

          {/* Estoque */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <BarChart3 className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Estoque</h3>
              </div>
              <button
                type='button'
                onClick={addSize}
                className='flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300'
              >
                <Plus className='w-4 h-4' />
                Adicionar Tamanho
              </button>
            </div>

            <div className='space-y-4'>
              {sizes.map((size, index) => (
                <div key={size.id} className='p-4 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center justify-between mb-3'>
                    <h4 className='text-sm font-semibold text-slate-800'>Tamanho {index + 1}</h4>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='flex flex-col gap-2'>
                      <label className='text-sm font-medium text-slate-700'>Tamanho *</label>
                      <input
                        type='text'
                        value={size.size}
                        onChange={(e) => updateSize(size.id!, 'size', e.target.value)}
                        placeholder='P, M, G, 36, 37, etc.'
                        className='outline-none py-2 px-3 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label className='text-sm font-medium text-slate-700'>Quantidade *</label>
                      <input
                        type='number'
                        min='0'
                        value={size.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          updateSize(
                            size.id!,
                            'quantity',
                            value === '' ? '' : parseInt(value) || 0,
                          );
                        }}
                        placeholder='0'
                        className='outline-none py-2 px-3 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    {sizes.length > 1 && (
                      <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-slate-700'>&nbsp;</label>
                        <button
                          type='button'
                          onClick={() => removeSize(size.id!)}
                          className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                          aria-label='Remover tamanho'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4 p-4 bg-purple-50 rounded-lg'>
              <div className='flex justify-between items-center'>
                <span className='text-lg font-semibold text-slate-800'>Total em Estoque:</span>
                <span className='text-xl font-bold text-purple-600'>
                  {calculateTotalQuantity()}
                </span>
              </div>
            </div>
          </div>

          {/* Descrição e Observações */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='space-y-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='product-description'>
                  Descrição
                </label>
                <textarea
                  id='product-description'
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder='Descreva o produto...'
                  rows={4}
                  className='outline-none py-2 px-3 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='product-observations'
                >
                  Observações
                </label>
                <textarea
                  id='product-observations'
                  value={productObservations}
                  onChange={(e) => setProductObservations(e.target.value)}
                  placeholder='Observações sobre o produto...'
                  rows={3}
                  className='outline-none py-2 px-3 text-base text-slate-900 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              disabled={saving}
              className='w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
            >
              {saving ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Atualizando...
                </>
              ) : (
                'Atualizar Produto'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
