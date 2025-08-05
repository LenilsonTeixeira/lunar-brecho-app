import { useState, useEffect } from 'react';
import { Plus, X, Tag, DollarSign, BarChart3, Image, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface ProductSize {
  id: number;
  size: string;
  quantity: number;
}

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
  sizes: ProductSize[];
  mainImage: string;
  description?: string;
  observations?: string;
  createdAt?: string;
  updatedAt?: string;
}

const EditProduct = () => {
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
      { id: 1, size: 'P', quantity: 3 },
      { id: 2, size: 'M', quantity: 5 },
      { id: 3, size: 'G', quantity: 4 },
    ],
    mainImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop',
    description:
      'Vestido floral vintage com tecido leve e confortável. Ideal para eventos casuais e festas.',
    observations: 'Produto em excelente estado, apenas uma pequena marca na parte inferior.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
  };

  const [product] = useState<ProductItem>(mockProduct);
  const [productName, setProductName] = useState(mockProduct.name);
  const [productBrand, setProductBrand] = useState(mockProduct.brand);
  const [productCategory, setProductCategory] = useState(mockProduct.category);
  const [productType, setProductType] = useState<'novo' | 'bazar'>(mockProduct.type);
  const [productStatus, setProductStatus] = useState<'ativo' | 'inativo'>(mockProduct.status);
  const [productPrice, setProductPrice] = useState(mockProduct.price);
  const [productOfferPrice, setProductOfferPrice] = useState(mockProduct.offerPrice);
  const [productDescription, setProductDescription] = useState(mockProduct.description || '');
  const [productObservations, setProductObservations] = useState(mockProduct.observations || '');
  const [productImage, setProductImage] = useState(mockProduct.mainImage);
  const [sizes, setSizes] = useState<ProductSize[]>(mockProduct.sizes);

  useEffect(() => {
    // Em uma aplicação real, aqui você faria uma chamada para a API
    // para buscar os dados do produto pelo productId
    console.log('Carregando produto:', productId);
  }, [productId]);

  const addSize = () => {
    const newId = Math.max(...sizes.map((s) => s.id), 0) + 1;
    setSizes([
      ...sizes,
      {
        id: newId,
        size: '',
        quantity: 0,
      },
    ]);
  };

  const removeSize = (id: number) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter((s) => s.id !== id));
    }
  };

  const updateSize = (id: number, field: 'size' | 'quantity', value: string | number) => {
    setSizes(sizes.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProductImage('');
  };

  const calculateTotalQuantity = () => {
    return sizes.reduce((total, size) => total + size.quantity, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!productName.trim() || !productBrand.trim() || !productCategory.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validar preços
    if (productPrice <= 0 || productOfferPrice <= 0) {
      alert('Por favor, preencha preços válidos.');
      return;
    }

    // Validar tamanhos
    const invalidSizes = sizes.filter((s) => !s.size.trim() || s.quantity < 0);
    if (invalidSizes.length > 0) {
      alert('Por favor, preencha corretamente todos os tamanhos.');
      return;
    }

    // Simular atualização do produto
    const updatedProduct = {
      ...product,
      name: productName,
      brand: productBrand,
      category: productCategory,
      type: productType,
      status: productStatus,
      price: productPrice,
      offerPrice: productOfferPrice,
      description: productDescription,
      observations: productObservations,
      mainImage: productImage,
      sizes,
      totalQuantity: calculateTotalQuantity(),
    };

    console.log('Produto atualizado:', updatedProduct);
    alert('Produto atualizado com sucesso!');

    // Navegar de volta para a lista de produtos
    navigate('/admin/produtos');
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
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Editar Produto #{product.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações do produto abaixo
          </p>
        </div>

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
                <label className='text-sm font-semibold text-slate-700' htmlFor='product-name'>
                  Nome do Produto *
                </label>
                <input
                  id='product-name'
                  type='text'
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder='Digite o nome do produto'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='product-brand'>
                  Marca *
                </label>
                <input
                  id='product-brand'
                  type='text'
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                  placeholder='Digite a marca'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='product-category'>
                  Categoria *
                </label>
                <select
                  id='product-category'
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value=''>Selecione a categoria</option>
                  <option value='Blusas'>Blusas</option>
                  <option value='Body'>Body</option>
                  <option value='Blazer'>Blazer</option>
                  <option value='Calças'>Calças</option>
                  <option value='Vestidos'>Vestidos</option>
                  <option value='Jeans'>Jeans</option>
                  <option value='Croppeds'>Croppeds</option>
                  <option value='Conjuntos'>Conjuntos</option>
                  <option value='Bolsas'>Bolsas</option>
                  <option value='Sapatos'>Sapatos</option>
                  <option value='Bijuterias'>Bijuterias</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='product-type'>
                  Tipo *
                </label>
                <select
                  id='product-type'
                  value={productType}
                  onChange={(e) => setProductType(e.target.value as 'novo' | 'bazar')}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='novo'>Novo</option>
                  <option value='bazar'>Bazar</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='product-status'>
                  Status *
                </label>
                <select
                  id='product-status'
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.target.value as 'ativo' | 'inativo')}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='ativo'>Ativo</option>
                  <option value='inativo'>Inativo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Imagem do Produto */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Image className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Imagem do Produto</h3>
            </div>

            <div className='space-y-4'>
              {productImage && (
                <div className='flex justify-center'>
                  <img
                    src={productImage}
                    alt='Preview'
                    className='w-48 h-48 rounded-lg object-cover shadow-lg'
                  />
                </div>
              )}

              <div className='flex items-center gap-4'>
                <label className='flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors'>
                  <Image className='w-4 h-4' />
                  Escolher Imagem
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                </label>

                {productImage && (
                  <button
                    type='button'
                    onClick={removeImage}
                    className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
                  >
                    Remover Imagem
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preços */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <DollarSign className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Preços</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='product-price'>
                  Preço Original (R$) *
                </label>
                <input
                  id='product-price'
                  type='number'
                  min='0'
                  step='0.01'
                  value={productPrice}
                  onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm font-semibold text-slate-700'
                  htmlFor='product-offer-price'
                >
                  Preço de Oferta (R$) *
                </label>
                <input
                  id='product-offer-price'
                  type='number'
                  min='0'
                  step='0.01'
                  value={productOfferPrice}
                  onChange={(e) => setProductOfferPrice(parseFloat(e.target.value) || 0)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
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
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Tamanho *
                      </label>
                      <input
                        type='text'
                        value={size.size}
                        onChange={(e) => updateSize(size.id, 'size', e.target.value)}
                        placeholder='P, M, G, 36, 37, etc.'
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Quantidade *
                      </label>
                      <input
                        type='number'
                        min='0'
                        value={size.quantity}
                        onChange={(e) =>
                          updateSize(size.id, 'quantity', parseInt(e.target.value) || 0)
                        }
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    {sizes.length > 1 && (
                      <div className='flex flex-col gap-2'>
                        <label className='text-xs sm:text-sm font-medium text-slate-600'>
                          &nbsp;
                        </label>
                        <button
                          type='button'
                          onClick={() => removeSize(size.id)}
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
                <label
                  className='text-sm font-semibold text-slate-700'
                  htmlFor='product-description'
                >
                  Descrição
                </label>
                <textarea
                  id='product-description'
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder='Descreva o produto...'
                  rows={4}
                  className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm font-semibold text-slate-700'
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
                  className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Atualizar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
