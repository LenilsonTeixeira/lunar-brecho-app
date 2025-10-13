import { ArrowLeft, Building2, User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';
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
  createdAt?: string;
  updatedAt?: string;
  productCount?: number;
}

const ViewSupplier = () => {
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
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
    productCount: 25,
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTypeIcon = (type: string) => {
    return type === 'company' ? <Building2 className='w-4 h-4' /> : <User className='w-4 h-4' />;
  };

  const getTypeLabel = (type: string) => {
    return type === 'company' ? 'Empresa' : 'Pessoa Física';
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
            Fornecedor #{mockSupplier.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes completos do fornecedor</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Building2 className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Nome/Razão Social
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockSupplier.name}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Tipo</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center gap-2'>
                    {getTypeIcon(mockSupplier.type)}
                    <span className='text-slate-800'>{getTypeLabel(mockSupplier.type)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  {mockSupplier.type === 'company' ? 'CNPJ' : 'CPF'}
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockSupplier.document}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Produtos Fornecidos
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockSupplier.productCount || 0} produtos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Phone className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Contato</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Email</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center gap-2'>
                    <Mail className='w-4 h-4 text-slate-400' />
                    <span className='text-slate-800'>{mockSupplier.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Telefone</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center gap-2'>
                    <Phone className='w-4 h-4 text-slate-400' />
                    <span className='text-slate-800'>{mockSupplier.phone}</span>
                  </div>
                </div>
              </div>

              {mockSupplier.contactPerson && (
                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Pessoa de Contato
                  </label>
                  <div className='p-3 bg-white rounded-lg border border-slate-200'>
                    <div className='flex items-center gap-2'>
                      <User className='w-4 h-4 text-slate-400' />
                      <span className='text-slate-800'>{mockSupplier.contactPerson}</span>
                    </div>
                  </div>
                </div>
              )}

              {mockSupplier.website && (
                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>Website</label>
                  <div className='p-3 bg-white rounded-lg border border-slate-200'>
                    <div className='flex items-center gap-2'>
                      <Globe className='w-4 h-4 text-slate-400' />
                      <a
                        href={mockSupplier.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 underline'
                      >
                        {mockSupplier.website}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Endereço */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <MapPin className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Endereço</h3>
            </div>
            <div className='p-3 bg-white rounded-lg border border-slate-200'>
              <div className='space-y-1'>
                <p className='text-slate-800'>{mockSupplier.address}</p>
                <p className='text-slate-600'>
                  {mockSupplier.city} - {mockSupplier.state}
                </p>
                <p className='text-slate-600 font-mono'>CEP: {mockSupplier.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Observações */}
          {mockSupplier.notes && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <FileText className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Observações</h3>
              </div>
              <div className='p-3 bg-white rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{mockSupplier.notes}</span>
              </div>
            </div>
          )}

          {/* Datas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Criação
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockSupplier.createdAt)}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Última Atualização
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockSupplier.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate('/admin/fornecedores')}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Voltar
              </button>
              <button
                onClick={() => navigate(`/admin/fornecedores/editar/${mockSupplier.id}`)}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Fornecedor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSupplier;
