import { useState, useEffect } from 'react';
import { Building2, Phone, MapPin, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

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

const EditSupplier = () => {
  const navigate = useNavigate();
  const { supplierId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockSupplier: SupplierItem = {
    id: parseInt(supplierId || '1'),
    name: 'Fornecedor ABC Ltda',
    type: 'company',
    document: '12.345.678/0001-90',
    email: 'contato@fornecedorabc.com.br',
    phone: '(11) 99999-1234',
    address: 'Rua das Indústrias, 500',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    contactPerson: 'João Silva',
    website: 'https://www.fornecedorabc.com.br',
    notes: 'Fornecedor confiável com produtos de qualidade.',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
    productCount: 25,
  };

  const [supplier] = useState<SupplierItem>(mockSupplier);
  const [supplierName, setSupplierName] = useState(mockSupplier.name);
  const [supplierType, setSupplierType] = useState<'individual' | 'company'>(mockSupplier.type);
  const [supplierDocument, setSupplierDocument] = useState(mockSupplier.document);
  const [supplierEmail, setSupplierEmail] = useState(mockSupplier.email);
  const [supplierPhone, setSupplierPhone] = useState(mockSupplier.phone);
  const [supplierAddress, setSupplierAddress] = useState(mockSupplier.address);
  const [supplierCity, setSupplierCity] = useState(mockSupplier.city);
  const [supplierState, setSupplierState] = useState(mockSupplier.state);
  const [supplierZipCode, setSupplierZipCode] = useState(mockSupplier.zipCode);
  const [supplierContactPerson, setSupplierContactPerson] = useState(
    mockSupplier.contactPerson || '',
  );
  const [supplierWebsite, setSupplierWebsite] = useState(mockSupplier.website || '');
  const [supplierNotes, setSupplierNotes] = useState(mockSupplier.notes || '');

  useEffect(() => {
    // Em uma aplicação real, aqui você faria uma chamada para a API
    // para buscar os dados do fornecedor pelo supplierId
    console.log('Carregando fornecedor:', supplierId);
  }, [supplierId]);

  const formatDocument = (value: string, type: 'individual' | 'company') => {
    const cleaned = value.replace(/\D/g, '');
    if (type === 'individual') {
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
      if (match) {
        return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
      }
    } else {
      const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
      if (match) {
        return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
      }
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const formatZipCode = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{5})(\d{3})$/);
    if (match) {
      return `${match[1]}-${match[2]}`;
    }
    return value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se todos os campos obrigatórios estão preenchidos
    if (
      !supplierName.trim() ||
      !supplierDocument.trim() ||
      !supplierEmail.trim() ||
      !supplierPhone.trim()
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validar endereço
    if (
      !supplierAddress.trim() ||
      !supplierCity.trim() ||
      !supplierState.trim() ||
      !supplierZipCode.trim()
    ) {
      alert('Por favor, preencha todos os campos do endereço.');
      return;
    }

    // Simular atualização do fornecedor
    const updatedSupplier = {
      ...supplier,
      name: supplierName,
      type: supplierType,
      document: supplierDocument,
      email: supplierEmail,
      phone: supplierPhone,
      address: supplierAddress,
      city: supplierCity,
      state: supplierState,
      zipCode: supplierZipCode,
      contactPerson: supplierContactPerson,
      website: supplierWebsite,
      notes: supplierNotes,
    };

    console.log('Fornecedor atualizado:', updatedSupplier);
    alert('Fornecedor atualizado com sucesso!');

    // Navegar de volta para a lista de fornecedores
    navigate('/admin/fornecedores');
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
            Editar Fornecedor #{supplier.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações do fornecedor abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Building2 className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-name'>
                  Nome/Razão Social *
                </label>
                <input
                  id='supplier-name'
                  type='text'
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  placeholder='Digite o nome ou razão social'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-type'>
                  Tipo *
                </label>
                <select
                  id='supplier-type'
                  value={supplierType}
                  onChange={(e) => setSupplierType(e.target.value as 'individual' | 'company')}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='company'>Empresa</option>
                  <option value='individual'>Pessoa Física</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-document'>
                  {supplierType === 'company' ? 'CNPJ' : 'CPF'} *
                </label>
                <input
                  id='supplier-document'
                  type='text'
                  value={supplierDocument}
                  onChange={(e) =>
                    setSupplierDocument(formatDocument(e.target.value, supplierType))
                  }
                  placeholder={supplierType === 'company' ? '00.000.000/0000-00' : '000.000.000-00'}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Phone className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Contato</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-email'>
                  Email *
                </label>
                <input
                  id='supplier-email'
                  type='email'
                  value={supplierEmail}
                  onChange={(e) => setSupplierEmail(e.target.value)}
                  placeholder='contato@empresa.com.br'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-phone'>
                  Telefone *
                </label>
                <input
                  id='supplier-phone'
                  type='tel'
                  value={supplierPhone}
                  onChange={(e) => setSupplierPhone(formatPhone(e.target.value))}
                  placeholder='(11) 99999-9999'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm font-semibold text-slate-700'
                  htmlFor='supplier-contact-person'
                >
                  Pessoa de Contato
                </label>
                <input
                  id='supplier-contact-person'
                  type='text'
                  value={supplierContactPerson}
                  onChange={(e) => setSupplierContactPerson(e.target.value)}
                  placeholder='Nome da pessoa de contato'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-website'>
                  Website
                </label>
                <input
                  id='supplier-website'
                  type='url'
                  value={supplierWebsite}
                  onChange={(e) => setSupplierWebsite(e.target.value)}
                  placeholder='https://www.empresa.com.br'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <MapPin className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Endereço</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-address'>
                  Endereço *
                </label>
                <input
                  id='supplier-address'
                  type='text'
                  value={supplierAddress}
                  onChange={(e) => setSupplierAddress(e.target.value)}
                  placeholder='Rua, número, complemento'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-city'>
                  Cidade *
                </label>
                <input
                  id='supplier-city'
                  type='text'
                  value={supplierCity}
                  onChange={(e) => setSupplierCity(e.target.value)}
                  placeholder='Nome da cidade'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-state'>
                  Estado *
                </label>
                <select
                  id='supplier-state'
                  value={supplierState}
                  onChange={(e) => setSupplierState(e.target.value)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
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

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-zip-code'>
                  CEP *
                </label>
                <input
                  id='supplier-zip-code'
                  type='text'
                  value={supplierZipCode}
                  onChange={(e) => setSupplierZipCode(formatZipCode(e.target.value))}
                  placeholder='00000-000'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <FileText className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Observações</h3>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-semibold text-slate-700' htmlFor='supplier-notes'>
                Observações sobre o Fornecedor
              </label>
              <textarea
                id='supplier-notes'
                value={supplierNotes}
                onChange={(e) => setSupplierNotes(e.target.value)}
                placeholder='Observações sobre o fornecedor...'
                rows={4}
                className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Atualizar Fornecedor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupplier;
