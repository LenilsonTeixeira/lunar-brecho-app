import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, Plus, FolderOpen, ImageOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  productService,
  ApiError,
  ProductResponse,
  categoryService,
  CategoryResponse,
} from '@/services';

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
  totalCurrentStock: number;
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  mainImageUrl?: string;
  description?: string;
  observations?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ListProduct = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Load products and categories on component mount
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [currentPage]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getProducts(currentPage, 100);
      const formattedProducts: ProductItem[] = response.content.map((product: ProductResponse) => ({
        id: product.id,
        externalId: product.externalId,
        name: product.name,
        category: product.category.name,
        brand: product.brand || '',
        color: product.color,
        type: product.type,
        basePrice: product.basePrice,
        discountType: product.discountType,
        discountValue: product.discountValue,
        totalCurrentStock: product.totalCurrentStock || 0,
        status: product.status,
        mainImageUrl:
          product.mainImageUrl && product.mainImageUrl.trim() !== ''
            ? product.mainImageUrl
            : undefined,
        description: product.description || '',
        observations: product.observations || '',
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }));
      setProducts(formattedProducts);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      if (error instanceof ApiError) {
        setError(`Erro ao carregar produtos: ${error.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await categoryService.getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      // Não definir erro aqui para não quebrar a funcionalidade principal
    } finally {
      setCategoriesLoading(false);
    }
  };

  const types = ['Todos os Tipos', 'Novo', 'Bazar'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesType =
      selectedType === '' ||
      selectedType === 'Todos os Tipos' ||
      (selectedType === 'Novo' && product.type === 'NEW') ||
      (selectedType === 'Bazar' && product.type === 'BAZAAR');

    return matchesSearch && matchesCategory && matchesType;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleViewProduct = (product: ProductItem) => {
    navigate(`/admin/produtos/visualizar/${product.id}`);
  };

  const handleEditProduct = (product: ProductItem) => {
    navigate(`/admin/produtos/editar/${product.id}`);
  };

  const handleDeleteProduct = async (product: ProductItem) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
      setLoading(true);
      setError(null);
      try {
        await productService.deleteProduct(product.id);
        await loadProducts();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        if (error instanceof ApiError) {
          setError(`Erro ao excluir produto: ${error.message}`);
        } else {
          setError('Erro de conexão. Tente novamente.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-slate-900 mb-2'>Produtos</h1>
              <p className='text-base text-slate-600'>
                Gerencie o catálogo de produtos da sua loja
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/produtos/adicionar')}
              className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Plus className='w-4 h-4' />
              Adicionar Produto
            </button>
          </div>
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

        {/* Filters and Search */}
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar produtos...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='w-full px-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                disabled={categoriesLoading}
              >
                <option value=''>Todas as Categorias</option>
                {categoriesLoading ? (
                  <option value='' disabled>
                    Carregando categorias...
                  </option>
                ) : (
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className='w-full px-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedType('');
              }}
              className='px-4 py-2 sm:py-3 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className='bg-slate-50 rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Produto
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Categoria
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Marca
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Preços
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {loading ? (
                  <tr>
                    <td colSpan={6} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin'></div>
                        <p className='font-medium'>Carregando produtos...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className='hover:bg-slate-50 transition-colors duration-200 shadow-sm'
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          {product.mainImageUrl ? (
                            <img
                              src={product.mainImageUrl}
                              alt={product.name}
                              className='w-12 h-12 rounded-lg object-cover'
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const placeholder = target.nextElementSibling;
                                if (placeholder) {
                                  (placeholder as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                          ) : (
                            <div className='w-12 h-12 rounded-lg bg-gray-100 border-2 border-gray-300 flex items-center justify-center'>
                              <ImageOff className='w-6 h-6 text-gray-400' />
                            </div>
                          )}
                          <div>
                            <p className='text-sm font-medium text-slate-900'>{product.name}</p>
                            <p className='text-sm text-slate-600'>ID: {product.externalId}</p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-sm text-slate-900'>{product.category}</span>
                      </td>
                      <td className='px-6 py-4 text-sm text-slate-900'>{product.brand}</td>
                      <td className='px-6 py-4'>
                        <div className='space-y-1'>
                          <p className='text-sm text-slate-900'>{formatPrice(product.basePrice)}</p>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-3 py-1 rounded-sm text-sm ${
                            product.status === 'ACTIVE'
                              ? 'bg-green-300 text-slate-900'
                              : product.status === 'OUT_OF_STOCK'
                                ? 'bg-orange-300 text-slate-900'
                                : 'bg-red-300 text-slate-900'
                          }`}
                        >
                          {product.status === 'ACTIVE'
                            ? 'Ativo'
                            : product.status === 'OUT_OF_STOCK'
                              ? 'Esgotado'
                              : 'Inativo'}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1 sm:gap-2'>
                          <button
                            onClick={() => handleViewProduct(product)}
                            className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                            title='Visualizar'
                          >
                            <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                            title='Editar'
                          >
                            <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product)}
                            className='p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                            title='Excluir'
                          >
                            <Trash2 className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center'>
                          <FolderOpen className='w-8 h-8 text-slate-400' />
                        </div>
                        <h3 className='text-lg font-semibold text-slate-800 mb-2'>
                          Nenhum produto encontrado
                        </h3>
                        <p className='text-base text-slate-600'>
                          Tente ajustar os filtros ou criar um novo produto.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredProducts.length > 0 && (
            <div className='px-6 py-4 border-t border-slate-200 bg-slate-50'>
              <div className='flex items-center justify-between text-sm text-slate-600'>
                <span>
                  Mostrando {filteredProducts.length} de {totalElements} produtos
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='mt-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4'>
            <div className='text-xs sm:text-sm text-slate-600'>
              Página {currentPage + 1} de {totalPages} ({totalElements} produtos)
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Anterior
              </button>
              <span className='px-2 sm:px-3 py-2 bg-purple-600 text-white text-xs sm:text-sm rounded-lg'>
                {currentPage + 1}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage >= totalPages - 1}
                className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
