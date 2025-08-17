import { ArrowLeft, Package, Tag, DollarSign, BarChart3, Image } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import ProductTypeBadge from '../../components/product/ProductTypeBadge';

interface ProductItem {
  id: number;
  name: string;
  category: string;
  brand: string;
  type: 'novo' | 'bazar';
  price: number;
  offerPrice: number;
  totalQuantity: number;
  initialStock: number;
  soldQuantity: number;
  reservedQuantity: number;
  status: 'ativo' | 'inativo';
  sizes: Array<{
    size: string;
    quantity: number;
    initialQuantity: number;
    soldQuantity: number;
    reservedQuantity: number;
  }>;
  images: string[];
  description?: string;
  observations?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ViewProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockProduct: ProductItem = {
    id: parseInt(productId || '1'),
    name: 'Vestido Floral Vintage',
    category: 'Vestidos',
    brand: 'Zara',
    type: 'bazar',
    price: 89.9,
    offerPrice: 59.9,
    totalQuantity: 12,
    initialStock: 25,
    soldQuantity: 8,
    reservedQuantity: 5,
    status: 'ativo',
    sizes: [
      { size: 'P', quantity: 3, initialQuantity: 8, soldQuantity: 3, reservedQuantity: 2 },
      { size: 'M', quantity: 5, initialQuantity: 10, soldQuantity: 3, reservedQuantity: 2 },
      { size: 'G', quantity: 4, initialQuantity: 7, soldQuantity: 2, reservedQuantity: 1 },
    ],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop',
      '',
      '',
      '',
    ],
    description:
      'Vestido floral vintage com tecido leve e confortável. Ideal para eventos casuais e festas.',
    observations: 'Produto em excelente estado, apenas uma pequena marca na parte inferior.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-300 text-slate-950';
      case 'inativo':
        return 'bg-red-300 text-slate-950';
      default:
        return 'bg-slate-300 text-slate-950';
    }
  };

  // Filtrar apenas imagens que existem
  const existingImages = mockProduct.images.filter((img) => img);

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
            Produto #{mockProduct.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes completos do produto</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Status do Produto */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Package className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Status do Produto</h3>
            </div>
            <div className='flex items-center justify-between'>
              <span
                className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(mockProduct.status)}`}
              >
                {mockProduct.status === 'ativo' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>

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
                  <span className='text-slate-800'>{mockProduct.name}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Marca</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockProduct.brand}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Categoria</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='px-3 py-1 bg-purple-300 text-slate-950 rounded-sm text-sm font-medium'>
                    {mockProduct.category}
                  </span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Tipo</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <ProductTypeBadge
                    type={mockProduct.type === 'novo' ? 'Novo' : 'Bazar'}
                    variant='compact'
                  />
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
                  <div key={index} className='relative group'>
                    <div className='aspect-square rounded-lg overflow-hidden border-2 border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300'>
                      <img
                        src={image}
                        alt={`Imagem ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                      <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                        <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                          <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg'>
                            <Image className='w-4 h-4 text-purple-600' />
                          </div>
                        </div>
                      </div>
                    </div>
                    {index === 0 && (
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

          {/* Preços */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <DollarSign className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Preços</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Preço Original
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-500 line-through'>
                    {formatPrice(mockProduct.price)}
                  </span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Preço de Oferta
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800 font-semibold'>
                    {formatPrice(mockProduct.offerPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Estoque */}
          <div className='p-4 sm:p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-6'>
              <BarChart3 className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Estoque</h3>
            </div>

            {/* Resumo Geral do Estoque */}
            <div className='mb-6 p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200'>
              <h4 className='text-base sm:text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                Resumo Geral
              </h4>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
                <div className='text-center'>
                  <div className='text-xl sm:text-2xl font-bold text-purple-600 mb-1'>
                    {mockProduct.initialStock}
                  </div>
                  <div className='text-xs sm:text-sm text-slate-600'>Estoque Inicial</div>
                </div>
                <div className='text-center'>
                  <div className='text-xl sm:text-2xl font-bold text-blue-600 mb-1'>
                    {mockProduct.totalQuantity}
                  </div>
                  <div className='text-xs sm:text-sm text-slate-600'>Estoque Atual</div>
                </div>
                <div className='text-center'>
                  <div className='text-xl sm:text-2xl font-bold text-green-600 mb-1'>
                    {mockProduct.soldQuantity}
                  </div>
                  <div className='text-xs sm:text-sm text-slate-600'>Vendidos</div>
                </div>
                <div className='text-center'>
                  <div className='text-xl sm:text-2xl font-bold text-orange-600 mb-1'>
                    {mockProduct.reservedQuantity}
                  </div>
                  <div className='text-xs sm:text-sm text-slate-600'>Reservados</div>
                </div>
              </div>
            </div>

            {/* Detalhamento por Tamanho */}
            <div className='space-y-3'>
              <h4 className='text-base sm:text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2'>
                Detalhamento por Tamanho
              </h4>

              {mockProduct.sizes.map((sizeItem, index) => (
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
                          {sizeItem.quantity}
                        </div>
                        <div className='text-xs text-slate-500'>Disponível</div>
                      </div>
                    </div>
                  </div>

                  {/* Métricas do Tamanho */}
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                    {/* Estoque Inicial */}
                    <div className='relative p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-sm transition-all duration-300'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-xs font-semibold text-blue-700 uppercase tracking-wide'>
                          Inicial
                        </span>
                      </div>
                      <div className='text-lg sm:text-xl font-bold text-blue-700 mb-1'>
                        {sizeItem.initialQuantity}
                      </div>
                      <div className='text-xs text-blue-600'>Unidades cadastradas</div>
                    </div>

                    {/* Quantidade Vendida */}
                    <div className='relative p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-sm transition-all duration-300'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-xs font-semibold text-green-700 uppercase tracking-wide'>
                          Vendidos
                        </span>
                      </div>
                      <div className='text-lg sm:text-xl font-bold text-green-700 mb-1'>
                        {sizeItem.soldQuantity}
                      </div>
                      <div className='text-xs text-blue-600'>Unidades vendidas</div>
                    </div>

                    {/* Quantidade Reservada */}
                    <div className='relative p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 hover:shadow-sm transition-all duration-300'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-xs font-semibold text-orange-700 uppercase tracking-wide'>
                          Reservados
                        </span>
                      </div>
                      <div className='text-lg sm:text-xl font-bold text-orange-700 mb-1'>
                        {sizeItem.reservedQuantity}
                      </div>
                      <div className='text-xs text-orange-600'>Unidades reservadas</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Descrição e Observações */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='space-y-4'>
              {mockProduct.description && (
                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Descrição
                  </label>
                  <div className='p-3 bg-white rounded-lg border border-slate-200'>
                    <span className='text-slate-800'>{mockProduct.description}</span>
                  </div>
                </div>
              )}

              {mockProduct.observations && (
                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Observações
                  </label>
                  <div className='p-3 bg-white rounded-lg border border-slate-200'>
                    <span className='text-slate-800'>{mockProduct.observations}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Datas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Criação
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockProduct.createdAt)}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Última Atualização
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockProduct.updatedAt)}</span>
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
                onClick={() => navigate(`/admin/produtos/editar/${mockProduct.id}`)}
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
