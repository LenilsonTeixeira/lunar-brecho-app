import { X, Building2, User, Mail, Phone, MapPin, Globe, FileText, Calendar } from 'lucide-react';

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

interface SupplierViewProps {
  supplier: SupplierItem;
  onClose: () => void;
  onEdit: () => void;
}

const SupplierView = ({ supplier, onClose, onEdit }: SupplierViewProps) => {
  const getTypeIcon = (type: string) => {
    return type === 'company' ? (
      <Building2 className='w-4 h-4 text-white' />
    ) : (
      <User className='w-4 h-4 text-white' />
    );
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

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-white'>
          <div className='absolute inset-0 bg-black/20'></div>
          <div className='relative flex items-center justify-between'>
            <div>
              <div className='flex items-center gap-3 mb-1'>
                <div className='w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                  {getTypeIcon(supplier.type)}
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Fornecedor #{supplier.id}</h2>
                  <p className='text-slate-300 text-sm'>{supplier.name}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        <div className='p-4 space-y-4'>
          {/* Primeira linha - Tipo e Documento */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Tipo do Fornecedor */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Building2 className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Tipo do Fornecedor</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800 font-medium'>
                  {supplier.type === 'company' ? 'Empresa' : 'Pessoa Física'}
                </span>
              </div>
            </div>

            {/* Documento */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <FileText className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>
                  {supplier.type === 'individual' ? 'CPF' : 'CNPJ'}
                </label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800 font-mono'>{supplier.document}</span>
              </div>
            </div>
          </div>

          {/* Segunda linha - E-mail e Telefone */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* E-mail */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Mail className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>E-mail</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{supplier.email}</span>
              </div>
            </div>

            {/* Telefone */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Phone className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Telefone</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{supplier.phone}</span>
              </div>
            </div>
          </div>

          {/* Terceira linha - Pessoa de Contato e Website */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Pessoa de Contato (se disponível) */}
            {supplier.contactPerson && (
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <User className='w-4 h-4 text-slate-600' />
                  <label className='text-sm font-semibold text-slate-700'>Pessoa de Contato</label>
                </div>
                <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{supplier.contactPerson}</span>
                </div>
              </div>
            )}

            {/* Website (se disponível) */}
            {supplier.website && (
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <Globe className='w-4 h-4 text-slate-600' />
                  <label className='text-sm font-semibold text-slate-700'>Website</label>
                </div>
                <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                  <a
                    href={
                      supplier.website.startsWith('http')
                        ? supplier.website
                        : `https://${supplier.website}`
                    }
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-purple-600 hover:text-purple-700 underline'
                  >
                    {supplier.website}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Endereço - Largura total */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <MapPin className='w-4 h-4 text-slate-600' />
              <label className='text-sm font-semibold text-slate-700'>Endereço</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='space-y-1'>
                <p className='text-slate-800 font-medium'>{supplier.address}</p>
                <p className='text-slate-600'>
                  {supplier.city} - {supplier.state}
                </p>
                <p className='text-slate-600 font-mono'>{supplier.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Observações (se disponível) - Largura total */}
          {supplier.notes && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <FileText className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Observações</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <p className='text-slate-800 whitespace-pre-wrap'>{supplier.notes}</p>
              </div>
            </div>
          )}

          {/* Datas */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Data de Criação */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Data de Criação</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(supplier.createdAt)}</span>
              </div>
            </div>

            {/* Última Atualização */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Calendar className='w-4 h-4 text-slate-600' />
                <label className='text-sm font-semibold text-slate-700'>Última Atualização</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(supplier.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={onClose}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Fechar
              </button>
              <button
                onClick={onEdit}
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

export default SupplierView;
