import { useState } from 'react';
import { ArrowLeft, Building2, User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';

const AddSupplier = () => {
  const navigate = useNavigate();
  const [supplierType, setSupplierType] = useState<'individual' | 'company'>('individual');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const supplierData = {
      name: formData.get('supplierName') as string,
      type: supplierType,
      document: formData.get('document') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      contactPerson: formData.get('contactPerson') as string,
      website: formData.get('website') as string,
      notes: formData.get('notes') as string,
    };

    console.log('Fornecedor a ser adicionado:', supplierData);
  };

  const formatDocument = (value: string, type: 'individual' | 'company') => {
    if (type === 'individual') {
      // Formatar CPF: 123.456.789-00
      const numbers = value.replace(/\D/g, '');
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      // Formatar CNPJ: 12.345.678/0001-90
      const numbers = value.replace(/\D/g, '');
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/fornecedores')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Adicionar Fornecedor
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações do fornecedor abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Tipo de Fornecedor */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2'>
              Tipo de Fornecedor
            </h3>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <button
                type='button'
                onClick={() => setSupplierType('individual')}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                  supplierType === 'individual'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'
                }`}
              >
                <User className='w-6 h-6' />
                <div className='text-left'>
                  <div className='font-semibold'>Pessoa Física</div>
                  <div className='text-xs'>CPF</div>
                </div>
              </button>
              <button
                type='button'
                onClick={() => setSupplierType('company')}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                  supplierType === 'company'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'
                }`}
              >
                <Building2 className='w-6 h-6' />
                <div className='text-left'>
                  <div className='font-semibold'>Empresa</div>
                  <div className='text-xs'>CNPJ</div>
                </div>
              </button>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2'>
              Informações Básicas
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Name */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='supplierName'
                >
                  {supplierType === 'individual' ? 'Nome Completo' : 'Razão Social'}
                </label>
                <input
                  id='supplierName'
                  name='supplierName'
                  type='text'
                  placeholder={
                    supplierType === 'individual'
                      ? 'Digite o nome completo'
                      : 'Digite a razão social'
                  }
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              {/* Document */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='document'
                >
                  {supplierType === 'individual' ? 'CPF' : 'CNPJ'}
                </label>
                <input
                  id='document'
                  name='document'
                  type='text'
                  placeholder={
                    supplierType === 'individual' ? '000.000.000-00' : '00.000.000/0000-00'
                  }
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                  onChange={(e) => {
                    e.target.value = formatDocument(e.target.value, supplierType);
                  }}
                  maxLength={supplierType === 'individual' ? 14 : 18}
                />
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2'>
              Informações de Contato
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Email */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='email'
                >
                  E-mail
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Digite o e-mail'
                    className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='phone'
                >
                  Telefone
                </label>
                <div className='relative'>
                  <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                  <input
                    id='phone'
                    name='phone'
                    type='text'
                    placeholder='(00) 00000-0000'
                    className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    required
                    onChange={(e) => {
                      e.target.value = formatPhone(e.target.value);
                    }}
                    maxLength={15}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Endereço */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2'>
              <MapPin className='w-5 h-5' />
              Endereço
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Address */}
              <div className='lg:col-span-2 flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='address'
                >
                  Endereço Completo
                </label>
                <input
                  id='address'
                  name='address'
                  type='text'
                  placeholder='Rua, número, complemento'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              {/* City */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='city'>
                  Cidade
                </label>
                <input
                  id='city'
                  name='city'
                  type='text'
                  placeholder='Digite a cidade'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              {/* State */}
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
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value=''>Selecione o estado</option>
                  <option value='AC'>Acre</option>
                  <option value='AL'>Alagoas</option>
                  <option value='AP'>Amapá</option>
                  <option value='AM'>Amazonas</option>
                  <option value='BA'>Bahia</option>
                  <option value='CE'>Ceará</option>
                  <option value='DF'>Distrito Federal</option>
                  <option value='ES'>Espírito Santo</option>
                  <option value='GO'>Goiás</option>
                  <option value='MA'>Maranhão</option>
                  <option value='MT'>Mato Grosso</option>
                  <option value='MS'>Mato Grosso do Sul</option>
                  <option value='MG'>Minas Gerais</option>
                  <option value='PA'>Pará</option>
                  <option value='PB'>Paraíba</option>
                  <option value='PR'>Paraná</option>
                  <option value='PE'>Pernambuco</option>
                  <option value='PI'>Piauí</option>
                  <option value='RJ'>Rio de Janeiro</option>
                  <option value='RN'>Rio Grande do Norte</option>
                  <option value='RS'>Rio Grande do Sul</option>
                  <option value='RO'>Rondônia</option>
                  <option value='RR'>Roraima</option>
                  <option value='SC'>Santa Catarina</option>
                  <option value='SP'>São Paulo</option>
                  <option value='SE'>Sergipe</option>
                  <option value='TO'>Tocantins</option>
                </select>
              </div>

              {/* Zip Code */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='zipCode'
                >
                  CEP
                </label>
                <input
                  id='zipCode'
                  name='zipCode'
                  type='text'
                  placeholder='00000-000'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                  onChange={(e) => {
                    e.target.value = formatZipCode(e.target.value);
                  }}
                  maxLength={9}
                />
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2'>
              <FileText className='w-5 h-5' />
              Informações Adicionais
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Contact Person */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='contactPerson'
                >
                  Pessoa de Contato
                </label>
                <input
                  id='contactPerson'
                  name='contactPerson'
                  type='text'
                  placeholder='Nome da pessoa de contato'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              {/* Website */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='website'
                >
                  Website
                </label>
                <div className='relative'>
                  <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                  <input
                    id='website'
                    name='website'
                    type='url'
                    placeholder='https://www.exemplo.com'
                    className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='notes'>
                Observações
              </label>
              <textarea
                id='notes'
                name='notes'
                rows={3}
                placeholder='Informações adicionais sobre o fornecedor...'
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Adicionar Fornecedor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;
