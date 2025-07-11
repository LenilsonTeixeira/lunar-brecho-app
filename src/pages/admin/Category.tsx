import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router';

const Category = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Body',
      image:
        'https://acdn-us.mitiendanube.com/stores/004/414/596/products/86c1af187bed52a509db2649e0144039-424f199920b186aca517177081243046-1024-1024.webp',
    },
    {
      id: 2,
      name: 'Calças',
      image:
        'https://acdn-us.mitiendanube.com/stores/004/414/596/products/imagem-whatsapp-2025-01-27-as-17-05-21_981ec453-811c39988cd9bd47c317380867063164-1024-1024.webp',
    },
    {
      id: 3,
      name: 'Blusas',
      image: 'https://cdn.awsli.com.br/1538/1538522/produto/340598723/img_2977-24c9s0rovs.jpeg',
    },
    {
      id: 4,
      name: 'Macaquinhos',
      image: 'https://cdn.awsli.com.br/1538/1538522/produto/338746166/img_1715-zdjy3qfnl6.jpeg',
    },
    {
      id: 5,
      name: 'Vestidos',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/335928056/3d0ae793-6d64-4785-9eea-7638f716b531-rc61dwiw7t.jpeg',
    },
    {
      id: 6,
      name: 'Jeans',
      image:
        'https://acdn-us.mitiendanube.com/stores/004/414/596/products/img_6792-ref-24637-5afcdc908780ab980017283342510339-1024-1024.webp',
    },
    {
      id: 7,
      name: 'Chinelos',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/246582579/f7c2f065-cd4d-4eb4-bb35-284c857de334-oxj4tjwkcp.jpeg',
    },
    {
      id: 8,
      name: 'Croppeds',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/210614200/whatsapp-image-2023-03-30-at-15-23-39-rhjycw.jpg',
    },
    {
      id: 9,
      name: 'Conjuntos',
      image: 'https://cdn.awsli.com.br/1538/1538522/produto/338700026/img_1646-vnkljmtjrp.jpeg',
    },
    {
      id: 10,
      name: 'Macacão',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/299448951/71601444-a299-4587-ad99-bf170e7f9760-9ikj2wsrqb.jpeg',
    },
    {
      id: 11,
      name: 'Shorts',
      image:
        'https://cdn.awsli.com.br/1538/1538522/produto/217419654/whatsapp-image-2023-05-17-at-13-40-07-65w1r2wpb9.jpeg',
    },
  ]);

  const handleDeleteCategory = (categoryId: number) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
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
        <div className='bg-slate-50 rounded-xl shadow-lg overflow-hidden'>
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
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700 min-w-[120px]'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {filteredCategories.map((category) => (
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
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <button
                          className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                          title='Visualizar'
                        >
                          <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <button
                          className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                          title='Editar'
                        >
                          <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <button
                          className='p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                          title='Excluir'
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                <FolderOpen className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                Nenhuma categoria encontrada
              </h3>
              <p className='text-sm sm:text-base text-slate-600'>
                Tente ajustar os filtros ou criar uma nova categoria.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCategories.length > 0 && (
          <div className='mt-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4'>
            <div className='text-xs sm:text-sm text-slate-600'>
              Mostrando {filteredCategories.length} de {categories.length} categorias
            </div>
            <div className='flex items-center gap-2'>
              <button className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                Anterior
              </button>
              <span className='px-2 sm:px-3 py-2 bg-purple-600 text-white text-xs sm:text-sm rounded-lg'>
                1
              </span>
              <button className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
