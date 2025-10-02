import {
  ArrowLeft,
  Tag,
  BarChart3,
  Image,
  Loader2,
  AlertCircle,
  FileText,
  BadgePercent,
  Calendar,
  Clock,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';

import { productService, ApiError } from '@/services';
interface ProductItem {
  id: string;
  externalId: string;
  name: string;
  category: string;
  brand: string;
  type: 'SIMPLE' | 'VARIANT';
  basePrice: number;
  discountType: 'PERCENTAGE' | 'FIXED' | 'NONE';
  discountValue?: number;
  totalCurrentStock: number;
  totalInitialStock: number;
  totalSoldQuantity: number;
  totalReservedQuantity: number;
  status: 'ACTIVE' | 'INACTIVE';
  variants: Array<{
    id?: string;
    size: string;
    initialStock: number;
    stockAvailable: number;
    soldQuantity: number;
    reservedQuantity: number;
  }>;
  images: Array<{
    id?: string;
    originalUrl?: string;
    thumbnailUrl?: string;
    position: number;
    isMain: boolean;
  }>;
  description?: string;
  observations?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ViewProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('ID do produto não fornecido');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const productData = await productService.getProduct(productId);
        // Normalize optional fields to match local type expectations
        const normalized: ProductItem = {
          id: productData.id,
          externalId: productData.externalId,
          name: productData.name,
          category: productData.category,
          brand: productData.brand || '',
          type: productData.type === 'NEW' ? 'SIMPLE' : 'VARIANT',
          basePrice: productData.basePrice,
          discountType: productData.discountType,
          discountValue: productData.discountValue,
          totalCurrentStock: productData.totalCurrentStock,
          totalInitialStock: productData.totalInitialStock,
          totalSoldQuantity: productData.totalSoldQuantity,
          totalReservedQuantity: productData.totalReservedQuantity,
          status: productData.status,
          variants: (productData.variants || []).map((v) => ({
            id: v.id,
            size: v.size,
            initialStock: v.initialStock || 0,
            stockAvailable: v.stockAvailable || 0,
            soldQuantity: v.soldQuantity || 0,
            reservedQuantity: v.reservedQuantity || 0,
          })),
          images: (productData.images || []).map((img) => ({
            id: img.id,
            originalUrl: img.originalUrl,
            thumbnailUrl: img.thumbnailUrl,
            position: img.position,
            isMain: img.isMain,
          })),
          description: productData.description || '',
          observations: productData.observations || '',
          createdAt: productData.createdAt,
          updatedAt: productData.updatedAt,
        };

        setProduct(normalized);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='flex items-center gap-3'>
          <Loader2 className='w-6 h-6 animate-spin text-purple-600' />
          <span className='text-lg text-slate-600'>Carregando produto...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4'>
          <div className='text-center'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <AlertCircle className='w-8 h-8 text-red-600' />
            </div>
            <h2 className='text-xl font-bold text-slate-800 mb-2'>Erro</h2>
            <p className='text-slate-600 mb-6'>{error}</p>
            <div className='flex gap-3'>
              <button
                onClick={() => navigate('/admin/produtos')}
                className='flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors'
              >
                Voltar
              </button>
              <button
                onClick={() => window.location.reload()}
                className='flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50 min-h-screen'>
        <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <AlertCircle className='w-12 h-12 text-slate-400' />
            <h2 className='text-xl font-semibold text-slate-800'>Produto não encontrado</h2>
            <p className='text-slate-600'>O produto solicitado não existe ou foi removido.</p>
            <button
              onClick={() => navigate('/admin/produtos')}
              className='px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all duration-300 mt-4'
            >
              Voltar aos Produtos
            </button>
          </div>
        </div>
      </div>
    );
  }

  const calculateFinalPrice = () => {
    if (product.discountType === 'NONE' || !product.discountValue || product.discountValue === 0) {
      return product.basePrice;
    }

    if (product.discountType === 'PERCENTAGE') {
      return product.basePrice - (product.basePrice * product.discountValue) / 100;
    }

    if (product.discountType === 'FIXED') {
      return Math.max(0, product.basePrice - product.discountValue);
    }

    return product.basePrice;
  };

  const getDiscountSymbol = () => {
    switch (product.discountType) {
      case 'PERCENTAGE':
        return '%';
      case 'FIXED':
        return 'R$';
      case 'NONE':
        return '';
      default:
        return '%';
    }
  };

  const getDiscountLabel = () => {
    switch (product.discountType) {
      case 'PERCENTAGE':
        return 'Porcentagem';
      case 'FIXED':
        return 'Valor Fixo';
      case 'NONE':
        return 'Sem Desconto';
      default:
        return 'Porcentagem';
    }
  };

  // Filtrar apenas imagens que existem
  const existingImages = product.images.filter((img) => img.originalUrl);

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
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Produto #{product.externalId}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes do produto</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Tag className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Nome do Produto
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{product.name}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Marca</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{product.brand}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Categoria</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{product.category}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Tipo</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>
                    {product.type === 'SIMPLE' ? 'Novo' : 'Bazar'}
                  </span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Status</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>
                    {product.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Imagens do Produto */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Image className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Imagens do Produto</h3>
            </div>

            {existingImages.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
                {existingImages.map((image, index) => (
                  <div key={image.id || index} className='relative group'>
                    <div className='aspect-square rounded-lg overflow-hidden border-2 border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 relative'>
                      <img
                        src={image.originalUrl}
                        alt={`Imagem ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                      <div className='absolute inset-0 bg-transparent pointer-events-none'></div>
                    </div>
                    {image.isMain && (
                      <div className='absolute -top-2 -left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg'>
                        Principal
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8'>
                <div className='w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4'>
                  <Image className='w-8 h-8 text-slate-400' />
                </div>
                <p className='text-slate-500'>Nenhuma imagem disponível</p>
              </div>
            )}
          </div>

          {/* Preços e Descontos */}
          <div className='p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-purple-50 rounded-xl border border-slate-200 shadow-sm'>
            <div className='mb-6'>
              <div className='flex items-center gap-3 mb-1'>
                <BadgePercent className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg sm:text-xl font-bold text-slate-800'>Preços e Descontos</h3>
              </div>
              <p className='text-sm text-slate-600'>
                Informações sobre preços e descontos aplicados
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
              {/* Preço Original */}
              <div className='flex flex-col gap-3'>
                <label className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  Preço Original
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-lg font-bold text-slate-800'>
                    {formatPrice(product.basePrice)}
                  </span>
                </div>
              </div>

              {/* Tipo de Desconto */}
              <div className='flex flex-col gap-3'>
                <label className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  Tipo de Desconto
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-sm font-medium text-slate-800'>{getDiscountLabel()}</span>
                </div>
              </div>

              {/* Valor do Desconto */}
              <div className='flex flex-col gap-3 sm:col-span-2 xl:col-span-1'>
                <label className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
                  <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                  Valor do Desconto
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  {product.discountType !== 'NONE' && product.discountValue ? (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-medium text-slate-600'>
                        {getDiscountSymbol()}
                      </span>
                      <span className='text-lg font-bold text-slate-800'>
                        {product.discountValue}
                      </span>
                    </div>
                  ) : (
                    <span className='text-sm text-slate-500'>Não aplicado</span>
                  )}
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
                  <span className='text-sm font-medium text-purple-700'>Preço Final:</span>
                </div>
                <span className='text-lg sm:text-xl font-bold text-purple-800'>
                  {formatPrice(calculateFinalPrice())}
                </span>
              </div>
            </div>
          </div>

          {/* Estoque */}
          <div className='p-4 sm:p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-6'>
              <BarChart3 className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Estoque</h3>
            </div>

            {/* Detalhamento por Tamanho */}
            <div className='space-y-3'>
              <h4 className='text-base sm:text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2'>
                Detalhamento por Tamanho
              </h4>

              {product.variants.map((sizeItem, index) => (
                <div
                  key={index}
                  className='p-3 sm:p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group'
                >
                  {/* Cabeçalho do Tamanho */}
                  <div className='flex items-center justify-between gap-3 mb-3'>
                    <div className='flex items-center gap-3'>
                      <div className='relative'>
                        <div className='flex items-center gap-2'>
                          <div className='w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-md'>
                            <span className='text-sm font-bold text-white'>{sizeItem.size}</span>
                          </div>
                          <div className='hidden sm:block'>
                            <div className='text-sm font-medium text-slate-700'>
                              Tamanho {sizeItem.size}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quantidade Disponível */}
                    <div className='text-right'>
                      <div className='inline-flex items-center gap-2  px-3 py-2'>
                        <div className='text-lg sm:text-xl font-bold text-purple-600'>
                          {sizeItem.stockAvailable}
                        </div>
                        <div className='text-xs text-slate-500'>Disponível</div>
                      </div>
                    </div>
                  </div>

                  {/* Somente quantidade disponível exibida, seção simplificada */}
                </div>
              ))}
            </div>
          </div>

          {/* Descrição e Observações */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <FileText className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Descrição e Observações</h3>
            </div>
            <div className='space-y-4'>
              {product.description && (
                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Descrição
                  </label>
                  <div className='p-3 bg-white rounded-lg border border-slate-200'>
                    <span className='text-slate-800'>{product.description}</span>
                  </div>
                </div>
              )}

              {product.observations && (
                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Observações
                  </label>
                  <div className='p-3 bg-white rounded-lg border border-slate-200'>
                    <span className='text-slate-800'>{product.observations}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Datas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='p-4 bg-white rounded-lg border border-slate-200 flex items-center gap-3'>
                <Calendar className='w-5 h-5 text-purple-600' />
                <div>
                  <div className='text-xs text-slate-500'>Criado em</div>
                  <div className='text-sm font-medium text-slate-800'>
                    {formatDate(product.createdAt)}
                  </div>
                </div>
              </div>
              <div className='p-4 bg-white rounded-lg border border-slate-200 flex items-center gap-3'>
                <Clock className='w-5 h-5 text-purple-600' />
                <div>
                  <div className='text-xs text-slate-500'>Atualizado em</div>
                  <div className='text-sm font-medium text-slate-800'>
                    {formatDate(product.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate('/admin/produtos')}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Voltar
              </button>
              <button
                onClick={() => navigate(`/admin/produtos/editar/${product.id}`)}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Produto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
