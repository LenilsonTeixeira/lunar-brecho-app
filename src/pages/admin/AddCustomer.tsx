import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { customerService } from '@/services/customer/CustomerService';
import { ApiError, CustomerRequest } from '@/services/types';

const AddCustomer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const [formData, setFormData] = useState<CustomerRequest>({
    externalId: null,
    name: '',
    email: null,
    phone: '',
    address: null,
    neighborhood: null,
    number: null,
    city: null,
    state: null,
    zip: null,
    complement: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Formatação do CEP enquanto digita
    if (name === 'zip') {
      const cleanValue = value.replace(/\D/g, '');
      const formattedValue = cleanValue.replace(/(\d{5})(\d)/, '$1-$2');
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue || null,
      }));

      // Auto-consulta quando tiver 8 dígitos
      if (cleanValue.length === 8) {
        handleZipCodeValidation(cleanValue);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value || null,
      }));
    }

    // Limpa erro do campo quando o usuário começa a digitar
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleZipCodeValidation = async (zipCodeValue?: string) => {
    const zipToValidate = zipCodeValue || formData.zip?.replace(/\D/g, '') || '';
    const cleanZipCode = zipToValidate.replace(/\D/g, '');

    if (cleanZipCode.length !== 8) {
      return;
    }

    try {
      setIsLoadingCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP não encontrado. Verifique o número digitado.');
        return;
      }

      // Preencher campos automaticamente com os dados da API
      setFormData((prev) => ({
        ...prev,
        address: data.logradouro || prev.address,
        neighborhood: data.bairro || prev.neighborhood,
        city: data.localidade || prev.city,
        state: data.uf || prev.state,
        complement: data.complemento || prev.complement,
        zip: data.cep || cleanZipCode.replace(/(\d{5})(\d{3})/, '$1-$2'),
      }));
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      setError('Erro ao consultar CEP. Tente novamente.');
    } finally {
      setIsLoadingCep(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
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

    setLoading(true);

    try {
      const submitData: CustomerRequest = {
        externalId: formData.externalId?.trim() || null,
        name: formData.name.trim(),
        email: formData.email?.trim() || null,
        phone: formData.phone.trim(),
        address: formData.address?.trim() || null,
        neighborhood: formData.neighborhood?.trim() || null,
        number: formData.number?.trim() || null,
        city: formData.city?.trim() || null,
        state: formData.state?.trim() || null,
        zip: formData.zip?.trim() || null,
        complement: formData.complement?.trim() || null,
      };

      await customerService.createCustomer(submitData);
      navigate('/admin/clientes');
    } catch (err) {
      console.error('Erro ao criar cliente:', err);
      if (err instanceof ApiError) {
        setError(`Erro ao criar cliente: ${err.message}`);
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50 min-h-screen'>
      <div className='w-full mx-auto px-4 sm:px-2 lg:px-2'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/clientes')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Adicionar Cliente</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações do cliente abaixo
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
                  Nome <span className='text-red-500'>*</span>
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Digite o nome completo'
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
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='phone'
                >
                  Telefone <span className='text-red-500'>*</span>
                </label>
                <input
                  id='phone'
                  name='phone'
                  type='tel'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='(00) 00000-0000'
                  className={`outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                    fieldErrors.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                  }`}
                  required
                />
                {fieldErrors.phone && (
                  <p className='text-sm text-red-600 flex items-center gap-1'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {fieldErrors.phone}
                  </p>
                )}
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
                  placeholder='email@exemplo.com'
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
            </div>
          </div>

          {/* Endereço */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4'>Endereço</h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* CEP - Primeiro campo */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='zip'>
                  CEP
                </label>
                <div className='flex gap-2'>
                  <input
                    id='zip'
                    name='zip'
                    type='text'
                    value={formData.zip || ''}
                    onChange={handleChange}
                    onBlur={() => {
                      const cleanZip = formData.zip?.replace(/\D/g, '') || '';
                      if (cleanZip.length === 8) {
                        handleZipCodeValidation(cleanZip);
                      }
                    }}
                    placeholder='00000-000'
                    maxLength={9}
                    className='flex-1 outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  />
                  <button
                    type='button'
                    onClick={() => {
                      const cleanZip = formData.zip?.replace(/\D/g, '') || '';
                      if (cleanZip.length === 8) {
                        handleZipCodeValidation(cleanZip);
                      } else {
                        setError('CEP deve conter 8 dígitos');
                      }
                    }}
                    disabled={isLoadingCep}
                    className='px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-sm sm:text-base shadow-md hover:shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isLoadingCep ? (
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    ) : (
                      'BUSCAR'
                    )}
                  </button>
                </div>
                {isLoadingCep && <p className='text-xs text-slate-500'>Buscando endereço...</p>}
              </div>

              {/* Rua/Logradouro */}
              <div className='lg:col-span-2 flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='address'
                >
                  Rua/Logradouro
                </label>
                <input
                  id='address'
                  name='address'
                  type='text'
                  value={formData.address || ''}
                  onChange={handleChange}
                  placeholder='Nome da rua'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              {/* Número */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='number'
                >
                  Número
                </label>
                <input
                  id='number'
                  name='number'
                  type='text'
                  value={formData.number || ''}
                  onChange={handleChange}
                  placeholder='123'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              {/* Complemento */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='complement'
                >
                  Complemento
                </label>
                <input
                  id='complement'
                  name='complement'
                  type='text'
                  value={formData.complement || ''}
                  onChange={handleChange}
                  placeholder='Apartamento, bloco, etc.'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              {/* Bairro */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='neighborhood'
                >
                  Bairro
                </label>
                <input
                  id='neighborhood'
                  name='neighborhood'
                  type='text'
                  value={formData.neighborhood || ''}
                  onChange={handleChange}
                  placeholder='Nome do bairro'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              {/* Cidade */}
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
                  placeholder='Nome da cidade'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              {/* Estado */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='state'
                >
                  Estado
                </label>
                <select
                  id='state'
                  name='state'
                  value={formData.state || ''}
                  onChange={handleChange}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                >
                  <option value=''>Selecione o estado</option>
                  <option value='SP'>São Paulo</option>
                  <option value='RJ'>Rio de Janeiro</option>
                  <option value='MG'>Minas Gerais</option>
                  <option value='RS'>Rio Grande do Sul</option>
                  <option value='PR'>Paraná</option>
                  <option value='SC'>Santa Catarina</option>
                  <option value='BA'>Bahia</option>
                  <option value='GO'>Goiás</option>
                  <option value='PE'>Pernambuco</option>
                  <option value='CE'>Ceará</option>
                  <option value='PA'>Pará</option>
                  <option value='MA'>Maranhão</option>
                  <option value='ES'>Espírito Santo</option>
                  <option value='PB'>Paraíba</option>
                  <option value='MT'>Mato Grosso</option>
                  <option value='MS'>Mato Grosso do Sul</option>
                  <option value='PI'>Piauí</option>
                  <option value='RN'>Rio Grande do Norte</option>
                  <option value='AL'>Alagoas</option>
                  <option value='SE'>Sergipe</option>
                  <option value='RO'>Rondônia</option>
                  <option value='TO'>Tocantins</option>
                  <option value='AC'>Acre</option>
                  <option value='AP'>Amapá</option>
                  <option value='AM'>Amazonas</option>
                  <option value='RR'>Roraima</option>
                  <option value='DF'>Distrito Federal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Criando...
                </>
              ) : (
                'Criar Cliente'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
