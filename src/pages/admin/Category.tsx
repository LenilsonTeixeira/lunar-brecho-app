import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router';
import CategoryForm from '../../components/admin/CategoryForm';
import CategoryView from '../../components/admin/CategoryView';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

interface CategoryItem {
  id: number;
  name: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  productCount?: number;
  description?: string;
}

interface CategoryFormData {
  name: string;
  image: File | null;
  previewImage: string;
}

const Category = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | undefined>();
  const [viewingCategory, setViewingCategory] = useState<CategoryItem | undefined>();
  const [deletingCategory, setDeletingCategory] = useState<CategoryItem | undefined>();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: 1,
      name: 'Body',
      image:
        'https://acdn-us.mitiendanube.com/stores/004/414/596/products/86c1af187bed52a509db2649e0144039-424f199920b186aca517177081243046-1024-1024.webp',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z',
      productCount: 25,
      description: 'Roupas íntimas femininas confortáveis e elegantes',
    },
    {
      id: 2,
      name: 'Calças',
      image:
        'https://acdn-us.mitiendanube.com/stores/004/414/596/products/imagem-whatsapp-2025-01-27-as-17-05-21_981ec453-811c39988cd9bd47c317380867063164-1024-1024.webp',
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-18T16:20:00Z',
      productCount: 42,
      description: 'Calças femininas para todos os estilos e ocasiões',
    },
    {
      id: 3,
      name: 'Blusas',
      image: 'https://cdn.awsli.com.br/1538/1538522/produto/340598723/img_2977-24c9s0rovs.jpeg',
      createdAt: '2024-01-12T11:00:00Z',
      updatedAt: '2024-01-19T13:30:00Z',
      productCount: 38,
      description: 'Blusas femininas elegantes e versáteis',
    },
    {
      id: 4,
      name: 'Macaquinhos',
      image: 'https://cdn.awsli.com.br/1538/1538522/produto/338746166/img_1715-zdjy3qfnl6.jpeg',
      createdAt: '2024-01-08T08:45:00Z',
      updatedAt: '2024-01-17T15:10:00Z',
      productCount: 15,
      description: 'Macaquinhos femininos para um visual único',
    },
    {
      id: 5,
      name: 'Vestidos',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/335928056/3d0ae793-6d64-4785-9eea-7638f716b531-rc61dwiw7t.jpeg',
      createdAt: '2024-01-05T12:20:00Z',
      updatedAt: '2024-01-16T10:55:00Z',
      productCount: 31,
      description: 'Vestidos femininos para ocasiões especiais',
    },
    {
      id: 6,
      name: 'Jeans',
      image:
        'https://acdn-us.mitiendanube.com/stores/004/414/596/products/img_6792-ref-24637-5afcdc908780ab980017283342510339-1024-1024.webp',
      createdAt: '2024-01-03T14:30:00Z',
      updatedAt: '2024-01-15T11:25:00Z',
      productCount: 28,
      description: 'Jeans femininos com diferentes lavagens e cortes',
    },
    {
      id: 7,
      name: 'Chinelos',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/246582579/f7c2f065-cd4d-4eb4-bb35-284c857de334-oxj4tjwkcp.jpeg',
      createdAt: '2024-01-01T16:00:00Z',
      updatedAt: '2024-01-14T09:40:00Z',
      productCount: 12,
      description: 'Chinelos confortáveis para o dia a dia',
    },
    {
      id: 8,
      name: 'Croppeds',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/210614200/whatsapp-image-2023-03-30-at-15-23-39-rhjycw.jpg',
      createdAt: '2024-01-07T13:45:00Z',
      updatedAt: '2024-01-13T17:15:00Z',
      productCount: 19,
      description: 'Croppeds femininos para um visual moderno',
    },
    {
      id: 9,
      name: 'Conjuntos',
      image: 'https://cdn.awsli.com.br/1538/1538522/produto/338700026/img_1646-vnkljmtjrp.jpeg',
      createdAt: '2024-01-09T10:10:00Z',
      updatedAt: '2024-01-12T14:50:00Z',
      productCount: 22,
      description: 'Conjuntos femininos coordenados e elegantes',
    },
    {
      id: 10,
      name: 'Macacão',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/299448951/71601444-a299-4587-ad99-bf170e7f9760-9ikj2wsrqb.jpeg',
      createdAt: '2024-01-06T11:35:00Z',
      updatedAt: '2024-01-11T16:05:00Z',
      productCount: 8,
      description: 'Macacões femininos para um visual único',
    },
    {
      id: 11,
      name: 'Shorts',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/217419654/whatsapp-image-2023-05-17-at-13-40-07-65w1r2wpb9.jpeg',
      createdAt: '2024-01-04T15:20:00Z',
      updatedAt: '2024-01-10T12:30:00Z',
      productCount: 16,
      description: 'Shorts femininos para o verão',
    },
  ]);

  const handleCreateCategory = async (data: CategoryFormData) => {
    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCategory: CategoryItem = {
        id: Math.max(...categories.map((c) => c.id)) + 1,
        name: data.name,
        image: data.previewImage || 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        productCount: 0,
        description: '',
      };

      setCategories((prev) => [...prev, newCategory]);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (data: CategoryFormData) => {
    if (!editingCategory) return;

    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedCategory: CategoryItem = {
        ...editingCategory,
        name: data.name,
        image: data.previewImage || editingCategory.image,
        updatedAt: new Date().toISOString(),
      };

      setCategories((prev) =>
        prev.map((cat) => (cat.id === editingCategory.id ? updatedCategory : cat)),
      );
      setShowForm(false);
      setEditingCategory(undefined);
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = (category: CategoryItem) => {
    setDeletingCategory(category);
  };

  const confirmDelete = async () => {
    if (!deletingCategory) return;

    setLoading(true);
    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCategories((prev) => prev.filter((cat) => cat.id !== deletingCategory.id));
      setDeletingCategory(undefined);
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: CategoryItem) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleView = (category: CategoryItem) => {
    setViewingCategory(category);
    setShowView(true);
  };

  const handleCloseView = () => {
    setShowView(false);
    setViewingCategory(undefined);
  };

  const handleEditFromView = () => {
    if (viewingCategory) {
      setEditingCategory(viewingCategory);
      setShowView(false);
      setShowForm(true);
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
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Categorias</h1>
              <p className='text-sm sm:text-base text-slate-600'>
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
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[80px]'>
                    ID
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[120px]'>
                    Imagem
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[200px]'>
                    Nome
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700 min-w-[120px]'>
                    Quantidade de Produtos
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700 min-w-[120px]'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {loading ? (
                  <tr>
                    <td colSpan={5} className='py-12 text-center text-slate-500'>
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
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          #{category.id}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='w-12 h-12 rounded-lg overflow-hidden border border-slate-200'>
                          <img
                            src={category.image}
                            alt={category.name}
                            className='w-full h-full object-cover'
                            loading='lazy'
                          />
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='text-xs sm:text-sm font-medium text-slate-800'>
                          {category.name}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <div className='flex items-center justify-center'>
                          <span className='text-xs sm:text-sm font-medium text-slate-50 bg-black w-8 h-8 rounded-full flex items-center justify-center'>
                            {category.productCount || 0}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-1 sm:gap-2 justify-center'>
                          <button
                            onClick={() => handleView(category)}
                            className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                            title='Visualizar'
                          >
                            <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                          <button
                            onClick={() => handleEdit(category)}
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
                    <td colSpan={5} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center'>
                          <FolderOpen className='w-8 h-8 text-slate-400' />
                        </div>
                        <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                          Nenhuma categoria encontrada
                        </h3>
                        <p className='text-sm sm:text-base text-slate-600'>
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

      {/* View Modal */}
      {showView && viewingCategory && (
        <CategoryView
          category={viewingCategory}
          onClose={handleCloseView}
          onEdit={handleEditFromView}
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
