import { useState } from 'react';
import { Search, Edit, Trash2, Eye, Plus } from 'lucide-react';

const ListProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Mock data - substitua por dados reais da sua API
  const products = [
    {
      id: 1,
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
      mainImage:
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Blazer Clássico',
      category: 'Blazer',
      brand: 'H&M',
      type: 'novo',
      price: 120.0,
      offerPrice: 95.0,
      totalQuantity: 5,
      status: 'ativo',
      sizes: [
        { size: 'M', quantity: 2 },
        { size: 'G', quantity: 3 },
      ],
      mainImage:
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Bolsa de Couro',
      category: 'Bolsas',
      brand: 'Marca Local',
      type: 'bazar',
      price: 150.0,
      offerPrice: 89.9,
      totalQuantity: 3,
      status: 'inativo',
      sizes: [{ size: 'Único', quantity: 3 }],
      mainImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      name: 'Sapatos de Salto',
      category: 'Sapatos',
      brand: 'Renner',
      type: 'novo',
      price: 180.0,
      offerPrice: 140.0,
      totalQuantity: 8,
      status: 'ativo',
      sizes: [
        { size: '36', quantity: 2 },
        { size: '37', quantity: 3 },
        { size: '38', quantity: 3 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
    },
    {
      id: 5,
      name: 'Blusa Básica Algodão',
      category: 'Blusas',
      brand: 'C&A',
      type: 'novo',
      price: 45.0,
      offerPrice: 35.0,
      totalQuantity: 15,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 4 },
        { size: 'M', quantity: 6 },
        { size: 'G', quantity: 5 },
      ],
      mainImage:
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop',
    },
    {
      id: 6,
      name: 'Body Rendado',
      category: 'Body',
      brand: 'Fashion Nova',
      type: 'bazar',
      price: 65.0,
      offerPrice: 45.0,
      totalQuantity: 7,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 2 },
        { size: 'M', quantity: 3 },
        { size: 'G', quantity: 2 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop',
    },
    {
      id: 7,
      name: 'Calça Jeans Skinny',
      category: 'Calças',
      brand: "Levi's",
      type: 'bazar',
      price: 120.0,
      offerPrice: 85.0,
      totalQuantity: 10,
      status: 'ativo',
      sizes: [
        { size: '36', quantity: 3 },
        { size: '38', quantity: 4 },
        { size: '40', quantity: 3 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop',
    },
    {
      id: 8,
      name: 'Vestido Longo Elegante',
      category: 'Vestidos',
      brand: 'Shein',
      type: 'novo',
      price: 95.0,
      offerPrice: 75.0,
      totalQuantity: 6,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 2 },
        { size: 'M', quantity: 2 },
        { size: 'G', quantity: 2 },
      ],
      mainImage:
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop',
    },
    {
      id: 9,
      name: 'Jeans Mom Fit',
      category: 'Jeans',
      brand: 'Calvin Klein',
      type: 'bazar',
      price: 180.0,
      offerPrice: 120.0,
      totalQuantity: 8,
      status: 'ativo',
      sizes: [
        { size: '36', quantity: 2 },
        { size: '38', quantity: 3 },
        { size: '40', quantity: 3 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop',
    },
    {
      id: 10,
      name: 'Cropped Top Estampado',
      category: 'Croppeds',
      brand: 'Forever 21',
      type: 'novo',
      price: 55.0,
      offerPrice: 40.0,
      totalQuantity: 12,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 4 },
        { size: 'M', quantity: 5 },
        { size: 'G', quantity: 3 },
      ],
      mainImage:
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop',
    },
    {
      id: 11,
      name: 'Conjunto Shorts + Top',
      category: 'Conjuntos',
      brand: 'Zara',
      type: 'novo',
      price: 110.0,
      offerPrice: 85.0,
      totalQuantity: 9,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 3 },
        { size: 'M', quantity: 4 },
        { size: 'G', quantity: 2 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop',
    },
    {
      id: 12,
      name: 'Blusa Transparente',
      category: 'Blusas',
      brand: 'H&M',
      type: 'bazar',
      price: 75.0,
      offerPrice: 55.0,
      totalQuantity: 6,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 2 },
        { size: 'M', quantity: 2 },
        { size: 'G', quantity: 2 },
      ],
      mainImage:
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop',
    },
    {
      id: 13,
      name: 'Body Esportivo',
      category: 'Body',
      brand: 'Nike',
      type: 'novo',
      price: 85.0,
      offerPrice: 65.0,
      totalQuantity: 11,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 3 },
        { size: 'M', quantity: 4 },
        { size: 'G', quantity: 4 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop',
    },
    {
      id: 14,
      name: 'Calça Palazzo',
      category: 'Calças',
      brand: 'Mango',
      type: 'bazar',
      price: 130.0,
      offerPrice: 95.0,
      totalQuantity: 7,
      status: 'ativo',
      sizes: [
        { size: '36', quantity: 2 },
        { size: '38', quantity: 3 },
        { size: '40', quantity: 2 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop',
    },
    {
      id: 15,
      name: 'Vestido Midi Floral',
      category: 'Vestidos',
      brand: 'Forever 21',
      type: 'novo',
      price: 85.0,
      offerPrice: 65.0,
      totalQuantity: 8,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 3 },
        { size: 'M', quantity: 3 },
        { size: 'G', quantity: 2 },
      ],
      mainImage:
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop',
    },
    {
      id: 16,
      name: 'Jeans Boyfriend',
      category: 'Jeans',
      brand: "Levi's",
      type: 'bazar',
      price: 160.0,
      offerPrice: 110.0,
      totalQuantity: 6,
      status: 'ativo',
      sizes: [
        { size: '36', quantity: 2 },
        { size: '38', quantity: 2 },
        { size: '40', quantity: 2 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop',
    },
    {
      id: 17,
      name: 'Cropped Cardigan',
      category: 'Croppeds',
      brand: 'Zara',
      type: 'novo',
      price: 95.0,
      offerPrice: 75.0,
      totalQuantity: 10,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 3 },
        { size: 'M', quantity: 4 },
        { size: 'G', quantity: 3 },
      ],
      mainImage:
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop',
    },
    {
      id: 18,
      name: 'Conjunto Pijama',
      category: 'Conjuntos',
      brand: 'H&M',
      type: 'bazar',
      price: 120.0,
      offerPrice: 85.0,
      totalQuantity: 5,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 2 },
        { size: 'M', quantity: 2 },
        { size: 'G', quantity: 1 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop',
    },
    {
      id: 19,
      name: 'Blusa de Seda',
      category: 'Blusas',
      brand: 'Mango',
      type: 'novo',
      price: 110.0,
      offerPrice: 85.0,
      totalQuantity: 9,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 3 },
        { size: 'M', quantity: 3 },
        { size: 'G', quantity: 3 },
      ],
      mainImage:
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&h=100&fit=crop',
    },
    {
      id: 20,
      name: 'Body Lace',
      category: 'Body',
      brand: "Victoria's Secret",
      type: 'bazar',
      price: 95.0,
      offerPrice: 65.0,
      totalQuantity: 4,
      status: 'ativo',
      sizes: [
        { size: 'P', quantity: 1 },
        { size: 'M', quantity: 2 },
        { size: 'G', quantity: 1 },
      ],
      mainImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop',
    },
  ];

  const categories = [
    'Todas as Categorias',
    'Blusas',
    'Body',
    'Blazer',
    'Calças',
    'Vestidos',
    'Jeans',
    'Croppeds',
    'Conjuntos',
    'Bolsas',
    'Sapatos',
    'Bijuterias',
  ];

  const types = ['Todos os Tipos', 'Novo', 'Bazar'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === '' ||
      selectedCategory === 'Todas as Categorias' ||
      product.category === selectedCategory;
    const matchesType =
      selectedType === '' ||
      selectedType === 'Todos os Tipos' ||
      product.type === selectedType.toLowerCase();

    return matchesSearch && matchesCategory && matchesType;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h1 className='text-3xl font-bold text-slate-800 mb-2'>Produtos</h1>
              <p className='text-slate-600'>Gerencie o catálogo de produtos do brechó</p>
            </div>
            <button className='flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'>
              <Plus className='w-4 h-4' />
              Adicionar Produto
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar produtos...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
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
              className='px-4 py-3 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
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
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>Tipo</th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Preços
                  </th>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-slate-700'>
                    Estoque
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
                {filteredProducts.map((product) => (
                  <tr key={product.id} className='hover:bg-slate-50 transition-colors duration-200'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className='w-12 h-12 rounded-lg object-cover'
                        />
                        <div>
                          <p className='font-medium text-slate-800'>{product.name}</p>
                          <p className='text-sm text-slate-500'>ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='px-3 py-1 bg-purple-300 text-slate-950 rounded-sm text-sm font-medium'>
                        {product.category}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-slate-700'>{product.brand}</td>
                    <td className='px-6 py-4'>
                      <span
                        className={`px-3 py-1 rounded-sm text-sm font-medium ${
                          product.type === 'novo'
                            ? 'bg-sky-300 text-slate-950'
                            : 'bg-yellow-300 text-slate-950'
                        }`}
                      >
                        {product.type === 'novo' ? 'Novo' : 'Bazar'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='space-y-1'>
                        <p className='text-sm text-slate-500 line-through'>
                          {formatPrice(product.price)}
                        </p>
                        <p className='font-semibold text-slate-800'>
                          {formatPrice(product.offerPrice)}
                        </p>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='space-y-1'>
                        {product.sizes.map((sizeItem, index) => (
                          <div
                            key={index}
                            className='flex items-center justify-between min-w-[80px]'
                          >
                            <span className='text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded'>
                              {sizeItem.size}
                            </span>
                            <span className='text-sm font-medium text-slate-700 ml-2'>
                              {sizeItem.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`px-3 py-1 rounded-sm text-sm font-medium ${
                          product.status === 'ativo'
                            ? 'bg-green-300 text-slate-950'
                            : 'bg-red-300 text-slate-950'
                        }`}
                      >
                        {product.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2'>
                        <button
                          className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                          title='Visualizar'
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        <button
                          className='p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                          title='Editar'
                        >
                          <Edit className='w-4 h-4' />
                        </button>
                        <button
                          className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                          title='Excluir'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                <Search className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-lg font-medium text-slate-800 mb-2'>Nenhum produto encontrado</h3>
              <p className='text-slate-600'>
                Tente ajustar os filtros ou adicionar um novo produto.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className='mt-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4'>
            <div className='text-sm text-slate-600'>
              Mostrando {filteredProducts.length} de {products.length} produtos
            </div>
            <div className='flex items-center gap-2'>
              <button className='px-3 py-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                Anterior
              </button>
              <span className='px-3 py-2 bg-purple-600 text-white rounded-lg'>1</span>
              <button className='px-3 py-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
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
