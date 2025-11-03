import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, Plus, FolderOpen, ImageOff } from 'lucide-react';
import { useNavigate } from 'react-router';
import CategoryForm from '../../components/admin/CategoryForm';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { categoryService, ApiError, CategoryResponse } from '@/services';

interface CategoryItem {
  id: string;
  externalId: string;
  name: string;
  image: string;
  totalProducts?: number;
  description?: string;
  orderDisplay?: number;
  status: 'ACTIVE' | 'INACTIVE';
}

interface CategoryFormData {
  name: string;
  image: File | null;
  description: string;
  orderDisplay: number | '';
  previewImage: string;
}

const Category = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | undefined>(undefined);
  const [deletingCategory, setDeletingCategory] = useState<CategoryItem | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoryService.getCategories();
      const formattedCategories: CategoryItem[] = response.map((cat: CategoryResponse) => ({
        id: cat.id,
        externalId: cat.externalId,
        name: cat.name,
        image: cat.imageUrl || '',
        totalProducts: cat.totalProducts || 0,
        description: cat.description || '',
        orderDisplay: cat.orderDisplay,
        status: cat.status || 'ACTIVE',
      }));
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      if (error instanceof ApiError) {
        setError(`Erro ao carregar categorias: ${error.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (data: CategoryFormData) => {
    setLoading(true);
    setError(null);
    try {
      const categoryData = {
        name: data.name,
        description: data.description || '',
        orderDisplay: data.orderDisplay !== '' ? Number(data.orderDisplay) : undefined,
      };

      const response = await categoryService.createCategory(categoryData);

      // 2. Upload image if provided (synchronously after creation)
      if (data.image) {
        await categoryService.uploadCategoryImage(response.id, data.image);
      }

      // 3. Reload categories to get updated data
      await loadCategories();
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      if (error instanceof ApiError) {
        setError(`Erro ao criar categoria: ${error.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (data: CategoryFormData) => {
    if (!editingCategory) return;

    setLoading(true);
    setError(null);
    try {
      const categoryData = {
        name: data.name,
        description: editingCategory.description || '',
        orderDisplay: data.orderDisplay !== '' ? Number(data.orderDisplay) : undefined,
      };

      await categoryService.updateCategory(editingCategory.id, categoryData);

      // 2. Upload new image if provided (synchronously after update)
      if (data.image) {
        await categoryService.uploadCategoryImage(editingCategory.id, data.image);
      }

      // 3. Reload categories to get updated data
      await loadCategories();
      setShowForm(false);
      setEditingCategory(undefined);
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      if (error instanceof ApiError) {
        setError(`Erro ao atualizar categoria: ${error.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewCategory = (category: CategoryItem) => {
    navigate(`/admin/categorias/visualizar/${category.id}`);
  };

  const handleEditCategory = (category: CategoryItem) => {
    navigate(`/admin/categorias/editar/${category.id}`);
  };

  const handleDeleteCategory = (category: CategoryItem) => {
    setDeletingCategory(category);
  };

  const confirmDelete = async () => {
    if (!deletingCategory) return;

    setLoading(true);
    setError(null);
    try {
      await categoryService.deleteCategory(deletingCategory.id);

      // Reload categories to get updated data
      await loadCategories();
      setDeletingCategory(undefined);
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      if (error instanceof ApiError) {
        setError(`Erro ao excluir categoria: ${error.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-slate-900 mb-2'>Categorias</h1>
              <p className='text-base text-slate-600'>
                Gerencie as categorias de produtos da sua loja
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/categorias/adicionar')}
              className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Plus className='w-4 h-4' />
              Nova Categoria
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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar categorias...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              />
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => setSearchTerm('')}
              className='px-4 py-2 sm:py-3 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Categories Table */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto md:overflow-x-visible'>
            <table className='w-full md:min-w-full min-w-[600px]'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700 min-w-[80px]'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700 min-w-[120px]'>
                    Imagem
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700 min-w-[200px]'>
                    Nome
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700 min-w-[100px]'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-center text-sm font-semibold text-slate-700 min-w-[120px]'>
                    Quantidade de Produtos
                  </th>
                  <th className='px-6 py-4 text-center text-sm font-semibold text-slate-700 min-w-[120px]'>
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
                        <p className='font-medium'>Carregando categorias...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className='hover:bg-slate-50 transition-colors duration-200 shadow-sm'
                    >
                      <td className='px-6 py-4'>
                        <span className='text-sm font-medium text-slate-900'>
                          #{category.externalId}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        {category.image ? (
                          <>
                            <img
                              src={category.image}
                              alt={category.name}
                              className='w-12 h-12 rounded-lg object-cover'
                              loading='lazy'
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const placeholder = target.nextElementSibling;
                                if (placeholder) {
                                  (placeholder as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                            <div
                              className='w-12 h-12 rounded-lg bg-gray-100 border-2 border-gray-300 flex items-center justify-center'
                              style={{ display: 'none' }}
                            >
                              <ImageOff className='w-6 h-6 text-gray-400' />
                            </div>
                          </>
                        ) : (
                          <div className='w-12 h-12 rounded-lg bg-gray-100 border-2 border-gray-300 flex items-center justify-center'>
                            <ImageOff className='w-6 h-6 text-gray-400' />
                          </div>
                        )}
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-sm font-medium text-slate-900'>{category.name}</span>
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-3 py-1 rounded-sm text-sm ${
                            category.status === 'ACTIVE'
                              ? 'bg-green-300 text-slate-900'
                              : 'bg-red-300 text-slate-900'
                          }`}
                        >
                          {category.status === 'ACTIVE' ? 'Ativa' : 'Inativa'}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <div className='flex items-center justify-center'>
                          <span className='text-sm font-semibold text-white bg-gradient-to-br from-purple-500 to-pink-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg'>
                            {category.totalProducts || 0}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1 sm:gap-2 justify-center'>
                          <button
                            onClick={() => handleViewCategory(category)}
                            className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                            title='Visualizar'
                          >
                            <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleEditCategory(category)}
                            className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                            title='Editar'
                          >
                            <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category)}
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
                          Nenhuma categoria encontrada
                        </h3>
                        <p className='text-base text-slate-600'>
                          Tente ajustar os filtros ou criar uma nova categoria.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredCategories.length > 0 && (
            <div className='px-6 py-4 border-t border-slate-200 bg-slate-50'>
              <div className='flex items-center justify-between text-sm text-slate-600'>
                <span>
                  Mostrando {filteredCategories.length} de {categories.length} categorias
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
          onCancel={() => {
            setShowForm(false);
            setEditingCategory(undefined);
          }}
          isLoading={loading}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingCategory}
        title='Excluir Categoria'
        message={`Tem certeza que deseja excluir a categoria "${deletingCategory?.name}"? Esta ação não pode ser desfeita.`}
        confirmText='Excluir'
        cancelText='Cancelar'
        onConfirm={confirmDelete}
        onCancel={() => setDeletingCategory(undefined)}
        type='danger'
      />
    </div>
  );
};

export default Category;
