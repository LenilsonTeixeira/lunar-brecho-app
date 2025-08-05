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
  status: 'ativo' | 'inativo';
  sizes: Array<{
    size: string;
    quantity: number;
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
    status: 'ativo',
    sizes: [
      { size: 'P', quantity: 3 },
      { size: 'M', quantity: 5 },
      { size: 'G', quantity: 4 },
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
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <BarChart3 className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Estoque</h3>
            </div>

            <div className='space-y-3'>
              {mockProduct.sizes.map((sizeItem, index) => (
                <div key={index} className='p-4 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <span className='text-sm font-medium text-slate-600 bg-slate-200 px-3 py-1 rounded'>
                        Tamanho: {sizeItem.size}
                      </span>
                    </div>
                    <div className='text-right'>
                      <span className='text-sm font-semibold text-white bg-gradient-to-br from-purple-500 to-pink-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg'>
                        {sizeItem.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200'>
              <div className='flex justify-between items-center'>
                <span className='text-lg font-semibold text-slate-800'>Total em Estoque</span>
                <span className='text-xl font-bold text-purple-600'>
                  {mockProduct.totalQuantity}
                </span>
              </div>
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
