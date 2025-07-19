import { useState, useEffect } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';

interface SupplierItem {
  id: number;
  name: string;
  type: 'individual' | 'company';
  document: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson?: string;
  website?: string;
  notes?: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
  productCount?: number;
}

interface SupplierFormData {
  name: string;
  type: 'individual' | 'company';
  document: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  website: string;
  notes: string;
  status: 'active' | 'inactive';
}

interface SupplierFormProps {
  supplier?: SupplierItem;
  onSubmit: (data: SupplierFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const SupplierForm = ({ supplier, onSubmit, onCancel, isLoading = false }: SupplierFormProps) => {
  const [supplierType, setSupplierType] = useState<'individual' | 'company'>(
    supplier?.type || 'individual',
  );
  const [status, setStatus] = useState<'active' | 'inactive'>(supplier?.status || 'active');

  const [formData, setFormData] = useState<SupplierFormData>({
    name: supplier?.name || '',
    type: supplier?.type || 'individual',
    document: supplier?.document || '',
    email: supplier?.email || '',
    phone: supplier?.phone || '',
    address: supplier?.address || '',
    city: supplier?.city || '',
    state: supplier?.state || '',
    zipCode: supplier?.zipCode || '',
    contactPerson: supplier?.contactPerson || '',
    website: supplier?.website || '',
    notes: supplier?.notes || '',
    status: supplier?.status || 'active',
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        type: supplier.type,
        document: supplier.document,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        city: supplier.city,
        state: supplier.state,
        zipCode: supplier.zipCode,
        contactPerson: supplier.contactPerson || '',
        website: supplier.website || '',
        notes: supplier.notes || '',
        status: supplier.status,
      });
      setSupplierType(supplier.type);
      setStatus(supplier.status);
    }
  }, [supplier]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof SupplierFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-slate-200'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-slate-800'>
              {supplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}
            </h2>
            <p className='text-sm text-slate-600 mt-1'>
              {supplier
                ? 'Atualize as informações do fornecedor'
                : 'Preencha as informações do fornecedor'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Supplier Type Selection */}
          <div>
            <label className='text-sm sm:text-base font-semibold text-slate-700 mb-3 block'>
              Tipo de Fornecedor
            </label>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <button
                type='button'
                onClick={() => {
                  setSupplierType('individual');
                  handleInputChange('type', 'individual');
                }}
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
                onClick={() => {
                  setSupplierType('company');
                  handleInputChange('type', 'company');
                }}
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

          {/* Basic Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                type='text'
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={
                  supplierType === 'individual' ? 'Digite o nome completo' : 'Digite a razão social'
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
                type='text'
                value={formData.document}
                onChange={(e) => {
                  const formatted = formatDocument(e.target.value, supplierType);
                  handleInputChange('document', formatted);
                }}
                placeholder={
                  supplierType === 'individual' ? '000.000.000-00' : '00.000.000/0000-00'
                }
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                required
                maxLength={supplierType === 'individual' ? 14 : 18}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Email */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='email'>
                E-mail
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                <input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder='Digite o e-mail'
                  className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='phone'>
                Telefone
              </label>
              <div className='relative'>
                <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                <input
                  id='phone'
                  type='text'
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    handleInputChange('phone', formatted);
                  }}
                  placeholder='(00) 00000-0000'
                  className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
              <MapPin className='w-5 h-5' />
              Endereço
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Address */}
              <div className='md:col-span-2 flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='address'
                >
                  Endereço Completo
                </label>
                <input
                  id='address'
                  type='text'
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
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
                  type='text'
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
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
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
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
                  type='text'
                  value={formData.zipCode}
                  onChange={(e) => {
                    const formatted = formatZipCode(e.target.value);
                    handleInputChange('zipCode', formatted);
                  }}
                  placeholder='00000-000'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                  maxLength={9}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
              <FileText className='w-5 h-5' />
              Informações Adicionais
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                  type='text'
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
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
                    type='url'
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
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
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder='Informações adicionais sobre o fornecedor...'
                className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
              />
            </div>

            {/* Status */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm sm:text-base font-semibold text-slate-700'>Status</label>
              <div className='flex gap-4'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='radio'
                    name='status'
                    value='active'
                    checked={status === 'active'}
                    onChange={(e) => {
                      setStatus(e.target.value as 'active' | 'inactive');
                      handleInputChange('status', e.target.value);
                    }}
                    className='w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500'
                  />
                  <span className='text-sm text-slate-700'>Ativo</span>
                </label>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='radio'
                    name='status'
                    value='inactive'
                    checked={status === 'inactive'}
                    onChange={(e) => {
                      setStatus(e.target.value as 'active' | 'inactive');
                      handleInputChange('status', e.target.value);
                    }}
                    className='w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500'
                  />
                  <span className='text-sm text-slate-700'>Inativo</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex items-center justify-end gap-4 pt-6 border-t border-slate-200'>
            <button
              type='button'
              onClick={onCancel}
              className='px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200'
            >
              Cancelar
            </button>
            <button
              type='submit'
              disabled={isLoading}
              className='px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  {supplier ? 'Atualizando...' : 'Criando...'}
                </div>
              ) : supplier ? (
                'Atualizar Fornecedor'
              ) : (
                'Criar Fornecedor'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
