import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { storeService } from '@/services/store/StoreService';
import { ApiError, StoreRequest } from '@/services/types';

const EditStore = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<StoreRequest>({
    name: '',
    slug: '',
    logo: null,
    description: null,
    phone: null,
    email: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    website: null,
    facebook: null,
    instagram: null,
    config: {
      pixKey: '',
    },
  });

  useEffect(() => {
    const fetchStore = async () => {
      if (!storeId) {
        setError('ID da loja não fornecido');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const storeData = await storeService.getStore(storeId);
        setFormData({
          name: storeData.name,
          slug: storeData.slug,
          logo: storeData.logo || null,
          description: storeData.description || null,
          phone: storeData.phone || null,
          email: storeData.email || null,
          address: storeData.address || null,
          city: storeData.city || null,
          state: storeData.state || null,
          zip: storeData.zip || null,
          website: storeData.website || null,
          facebook: storeData.facebook || null,
          instagram: storeData.instagram || null,
          config: storeData.config || { pixKey: '' },
        });
      } catch (err) {
        console.error('Erro ao buscar loja:', err);
        if (err instanceof ApiError) {
          switch (err.status) {
            case 404:
              setError('Loja não encontrada');
              break;
            case 401:
              setError('Não autorizado. Faça login novamente.');
              break;
            default:
              setError('Erro ao carregar loja. Tente novamente.');
          }
        } else {
          setError('Erro de conexão. Verifique sua internet.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || null,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [name]: value,
      },
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }));
    handleChange(e);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Nome da loja é obrigatório';
    }

    if (!formData.slug.trim()) {
      errors.slug = 'Slug é obrigatório';
    } else {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(formData.slug)) {
        errors.slug = 'Slug deve conter apenas letras minúsculas, números e hífens';
      }
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      setError('Por favor, corrija os erros no formulário.');
      return;
    }

    setSaving(true);

    try {
      const submitData: StoreRequest = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        logo: formData.logo?.trim() || null,
        description: formData.description?.trim() || null,
        phone: formData.phone?.trim() || null,
        email: formData.email?.trim() || null,
        address: formData.address?.trim() || null,
        city: formData.city?.trim() || null,
        state: formData.state?.trim() || null,
        zip: formData.zip?.trim() || null,
        website: formData.website?.trim() || null,
        facebook: formData.facebook?.trim() || null,
        instagram: formData.instagram?.trim() || null,
        config:
          formData.config?.pixKey?.trim() && formData.config.pixKey.trim() !== ''
            ? { pixKey: formData.config.pixKey.trim() }
            : undefined,
      };

      await storeService.updateStore(storeId!, submitData);
      navigate('/admin/lojas');
    } catch (err) {
      console.error('Erro ao atualizar loja:', err);
      if (err instanceof ApiError) {
        setError(`Erro ao atualizar loja: ${err.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='py-6 flex items-center justify-center bg-slate-50 min-h-screen'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin'></div>
          <p className='text-slate-600 font-medium'>Carregando loja...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full mx-auto px-4 sm:px-2 lg:px-2'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/lojas')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Editar Loja</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações da loja abaixo
          </p>
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
          {/* Validation Error Alert */}
          {Object.keys(fieldErrors).length > 0 && (
            <div className='bg-red-50 border-l-4 border-red-500 rounded-lg p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <svg className='h-5 w-5 text-red-500' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-semibold text-red-800'>
                    Preencha todos os campos obrigatórios
                  </h3>
                  <p className='text-sm text-red-700 mt-1'>
                    Por favor, corrija os campos destacados em vermelho antes de continuar.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4'>Informações Básicas</h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='name'>
                  Nome da Loja <span className='text-red-500'>*</span>
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder='Digite o nome da loja'
                  className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                    fieldErrors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                  }`}
                  required
                />
                {fieldErrors.name && (
                  <p className='text-sm text-red-600 flex items-center gap-1'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='slug'>
                  Slug <span className='text-red-500'>*</span>
                </label>
                <input
                  id='slug'
                  name='slug'
                  type='text'
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder='exemplo-loja'
                  className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                    fieldErrors.slug
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                  }`}
                  required
                />
                {fieldErrors.slug && (
                  <p className='text-sm text-red-600 flex items-center gap-1'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {fieldErrors.slug}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='logo'>
                  Logo (URL)
                </label>
                <input
                  id='logo'
                  name='logo'
                  type='text'
                  value={formData.logo || ''}
                  onChange={handleChange}
                  placeholder='https://exemplo.com/logo.png'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder='contato@loja.com'
                  className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                    fieldErrors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                  }`}
                />
                {fieldErrors.email && (
                  <p className='text-sm text-red-600 flex items-center gap-1'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='phone'
                >
                  Telefone
                </label>
                <input
                  id='phone'
                  name='phone'
                  type='text'
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder='(00) 00000-0000'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='website'
                >
                  Website
                </label>
                <input
                  id='website'
                  name='website'
                  type='url'
                  value={formData.website || ''}
                  onChange={handleChange}
                  placeholder='https://www.loja.com'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>
            </div>

            <div className='mt-6 flex flex-col gap-2'>
              <label
                className='text-sm sm:text-base font-semibold text-slate-700'
                htmlFor='description'
              >
                Descrição
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description || ''}
                onChange={handleChange}
                rows={4}
                placeholder='Descreva a loja...'
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none bg-white'
              />
            </div>
          </div>

          {/* Endereço */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4'>Endereço</h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='lg:col-span-2 flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='address'
                >
                  Endereço
                </label>
                <input
                  id='address'
                  name='address'
                  type='text'
                  value={formData.address || ''}
                  onChange={handleChange}
                  placeholder='Rua, número, complemento'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='city'>
                  Cidade
                </label>
                <input
                  id='city'
                  name='city'
                  type='text'
                  value={formData.city || ''}
                  onChange={handleChange}
                  placeholder='Cidade'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='state'
                >
                  Estado
                </label>
                <input
                  id='state'
                  name='state'
                  type='text'
                  value={formData.state || ''}
                  onChange={handleChange}
                  placeholder='Estado'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='zip'>
                  CEP
                </label>
                <input
                  id='zip'
                  name='zip'
                  type='text'
                  value={formData.zip || ''}
                  onChange={handleChange}
                  placeholder='00000-000'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4'>Redes Sociais</h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='facebook'
                >
                  Facebook
                </label>
                <input
                  id='facebook'
                  name='facebook'
                  type='url'
                  value={formData.facebook || ''}
                  onChange={handleChange}
                  placeholder='https://www.facebook.com/loja'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='instagram'
                >
                  Instagram
                </label>
                <input
                  id='instagram'
                  name='instagram'
                  type='url'
                  value={formData.instagram || ''}
                  onChange={handleChange}
                  placeholder='https://www.instagram.com/loja'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>
            </div>
          </div>

          {/* Configurações */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4'>Configurações</h3>

            <div className='flex flex-col gap-2'>
              <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='pixKey'>
                Chave PIX
              </label>
              <input
                id='pixKey'
                name='pixKey'
                type='text'
                value={formData.config?.pixKey || ''}
                onChange={handleConfigChange}
                placeholder='Chave PIX para pagamentos'
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
              />
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
                'Atualizar Loja'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStore;
