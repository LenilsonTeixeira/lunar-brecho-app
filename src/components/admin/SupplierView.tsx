import {
  X,
  Edit,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Calendar,
  Package,
} from 'lucide-react';

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
      <Building2 className='w-5 h-5 text-blue-600' />
    ) : (
      <User className='w-5 h-5 text-purple-600' />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-slate-200'>
          <div className='flex items-center gap-3'>
            {getTypeIcon(supplier.type)}
            <div>
              <h2 className='text-xl sm:text-2xl font-bold text-slate-800'>{supplier.name}</h2>
              <p className='text-sm text-slate-600'>
                {supplier.type === 'company' ? 'Empresa' : 'Pessoa Física'}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={onEdit}
              className='p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
              title='Editar'
            >
              <Edit className='w-5 h-5' />
            </button>
            <button
              onClick={onClose}
              className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Basic Info */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <span className='text-sm font-medium text-slate-600'>ID: #{supplier.id}</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-500'>
              <Package className='w-4 h-4' />
              <span>{supplier.productCount || 0} produtos</span>
            </div>
          </div>

          {/* Document */}
          <div className='bg-slate-50 rounded-lg p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <FileText className='w-4 h-4 text-slate-600' />
              <span className='font-semibold text-slate-700'>
                {supplier.type === 'individual' ? 'CPF' : 'CNPJ'}
              </span>
            </div>
            <p className='text-slate-800 font-mono'>{supplier.document}</p>
          </div>

          {/* Contact Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
              <Mail className='w-5 h-5' />
              Informações de Contato
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='bg-slate-50 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <Mail className='w-4 h-4 text-slate-600' />
                  <span className='font-semibold text-slate-700'>E-mail</span>
                </div>
                <p className='text-slate-800'>{supplier.email}</p>
              </div>

              <div className='bg-slate-50 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2'>
                  <Phone className='w-4 h-4 text-slate-600' />
                  <span className='font-semibold text-slate-700'>Telefone</span>
                </div>
                <p className='text-slate-800'>{supplier.phone}</p>
              </div>

              {supplier.contactPerson && (
                <div className='bg-slate-50 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <User className='w-4 h-4 text-slate-600' />
                    <span className='font-semibold text-slate-700'>Pessoa de Contato</span>
                  </div>
                  <p className='text-slate-800'>{supplier.contactPerson}</p>
                </div>
              )}

              {supplier.website && (
                <div className='bg-slate-50 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Globe className='w-4 h-4 text-slate-600' />
                    <span className='font-semibold text-slate-700'>Website</span>
                  </div>
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
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
              <MapPin className='w-5 h-5' />
              Endereço
            </h3>

            <div className='bg-slate-50 rounded-lg p-4'>
              <div className='space-y-2'>
                <p className='text-slate-800 font-medium'>{supplier.address}</p>
                <p className='text-slate-600'>
                  {supplier.city} - {supplier.state}
                </p>
                <p className='text-slate-600 font-mono'>{supplier.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {supplier.notes && (
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
                <FileText className='w-5 h-5' />
                Observações
              </h3>

              <div className='bg-slate-50 rounded-lg p-4'>
                <p className='text-slate-800 whitespace-pre-wrap'>{supplier.notes}</p>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
              <Calendar className='w-5 h-5' />
              Informações do Sistema
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {supplier.createdAt && (
                <div className='bg-slate-50 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Calendar className='w-4 h-4 text-slate-600' />
                    <span className='font-semibold text-slate-700'>Criado em</span>
                  </div>
                  <p className='text-slate-800'>{formatDate(supplier.createdAt)}</p>
                </div>
              )}

              {supplier.updatedAt && (
                <div className='bg-slate-50 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Calendar className='w-4 h-4 text-slate-600' />
                    <span className='font-semibold text-slate-700'>Atualizado em</span>
                  </div>
                  <p className='text-slate-800'>{formatDate(supplier.updatedAt)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-4 p-6 border-t border-slate-200'>
          <button
            onClick={onClose}
            className='px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200'
          >
            Fechar
          </button>
          <button
            onClick={onEdit}
            className='px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
          >
            Editar Fornecedor
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierView;
