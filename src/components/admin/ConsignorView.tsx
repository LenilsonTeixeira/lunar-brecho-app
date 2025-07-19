import {
  X,
  User,
  Mail,
  Phone,
  CreditCard,
  QrCode,
  Building2,
  Edit,
  TrendingUp,
  Package,
  DollarSign,
} from 'lucide-react';

interface ConsignorItem {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  paymentMethod: 'pix' | 'money' | 'bank_transfer';
  pixKey: string;
  bankAccount: {
    bank: string;
    agency: string;
    account: string;
    accountType: 'checking' | 'savings';
  };
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
  totalProducts?: number;
  productsForSale?: number;
  soldProducts?: number;
  totalCommission?: number;
}

interface ConsignorViewProps {
  consignor: ConsignorItem;
  onClose: () => void;
  onEdit: () => void;
}

const ConsignorView = ({ consignor, onClose, onEdit }: ConsignorViewProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
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

  const getAccountTypeLabel = (type: string) => {
    return type === 'checking' ? 'Conta Corrente' : 'Conta Poupança';
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-slate-200'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center'>
              <User className='w-6 h-6 text-purple-600' />
            </div>
            <div>
              <h2 className='text-xl sm:text-2xl font-bold text-slate-800'>{consignor.name}</h2>
              <p className='text-sm text-slate-600'>Consignante #{consignor.id}</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={onEdit}
              className='p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors'
              title='Editar'
            >
              <Edit className='w-5 h-5' />
            </button>
            <button
              onClick={onClose}
              className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Informações Pessoais */}
          <div className='bg-slate-50 rounded-xl p-6'>
            <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              Informações Pessoais
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Nome Completo
                </label>
                <p className='text-sm font-medium text-slate-800'>{consignor.name}</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>CPF</label>
                <p className='text-sm font-medium text-slate-800'>{consignor.cpf}</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2'>
                  <Mail className='w-4 h-4 text-purple-600' />
                  E-mail
                </label>
                <p className='text-sm font-medium text-slate-800'>{consignor.email}</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2'>
                  <Phone className='w-4 h-4 text-purple-600' />
                  Telefone
                </label>
                <p className='text-sm font-medium text-slate-800'>{consignor.phone}</p>
              </div>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className='bg-slate-50 rounded-xl p-6'>
            <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4'>
              <CreditCard className='w-5 h-5 text-purple-600' />
              Informações de Pagamento
            </h3>

            <div className='space-y-4'>
              {/* Método de Pagamento */}
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-2'>
                  Método de Pagamento
                </label>
                <div className='flex items-center gap-2'>
                  <span className='inline-flex px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800'>
                    {consignor.paymentMethod === 'pix' && 'PIX'}
                    {consignor.paymentMethod === 'money' && 'Dinheiro'}
                    {consignor.paymentMethod === 'bank_transfer' && 'Transferência Bancária'}
                  </span>
                </div>
              </div>

              {/* Chave PIX - Mostrar apenas se PIX for selecionado */}
              {consignor.paymentMethod === 'pix' && (
                <div>
                  <label className='block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2'>
                    <QrCode className='w-4 h-4 text-purple-600' />
                    Chave PIX
                  </label>
                  <p className='text-sm font-medium text-slate-800 bg-white px-3 py-2 rounded-lg border border-slate-200'>
                    {consignor.pixKey}
                  </p>
                </div>
              )}

              {/* Informações Bancárias - Mostrar apenas se Transferência Bancária for selecionada */}
              {consignor.paymentMethod === 'bank_transfer' && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1 flex items-center gap-2'>
                      <Building2 className='w-4 h-4 text-purple-600' />
                      Banco
                    </label>
                    <p className='text-sm font-medium text-slate-800'>
                      {consignor.bankAccount.bank || 'Não informado'}
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1'>Agência</label>
                    <p className='text-sm font-medium text-slate-800'>
                      {consignor.bankAccount.agency || 'Não informada'}
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1'>Conta</label>
                    <p className='text-sm font-medium text-slate-800'>
                      {consignor.bankAccount.account || 'Não informada'}
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-600 mb-1'>
                      Tipo de Conta
                    </label>
                    <p className='text-sm font-medium text-slate-800'>
                      {getAccountTypeLabel(consignor.bankAccount.accountType)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Estatísticas */}
          <div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6'>
            <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4'>
              <TrendingUp className='w-5 h-5 text-purple-600' />
              Estatísticas
            </h3>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
                <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Package className='w-5 h-5 text-purple-600' />
                </div>
                <p className='text-2xl font-bold text-slate-800'>{consignor.totalProducts || 0}</p>
                <p className='text-xs text-slate-600'>Total de Produtos</p>
              </div>

              <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
                <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Package className='w-5 h-5 text-green-600' />
                </div>
                <p className='text-2xl font-bold text-slate-800'>
                  {consignor.productsForSale || 0}
                </p>
                <p className='text-xs text-slate-600'>À Venda</p>
              </div>

              <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
                <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Package className='w-5 h-5 text-blue-600' />
                </div>
                <p className='text-2xl font-bold text-slate-800'>{consignor.soldProducts || 0}</p>
                <p className='text-xs text-slate-600'>Vendidos</p>
              </div>

              <div className='bg-white rounded-lg p-4 text-center shadow-sm'>
                <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <DollarSign className='w-5 h-5 text-green-600' />
                </div>
                <p className='text-lg font-bold text-green-600'>
                  {formatCurrency(consignor.totalCommission || 0)}
                </p>
                <p className='text-xs text-slate-600'>Comissão Total</p>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className='bg-slate-50 rounded-xl p-6'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4'>Informações Adicionais</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Data de Cadastro
                </label>
                <p className='text-sm font-medium text-slate-800'>
                  {formatDate(consignor.createdAt || '')}
                </p>
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Última Atualização
                </label>
                <p className='text-sm font-medium text-slate-800'>
                  {formatDate(consignor.updatedAt || '')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-end gap-4 p-6 border-t border-slate-200'>
          <button
            onClick={onClose}
            className='px-6 py-3 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
          >
            Fechar
          </button>
          <button
            onClick={onEdit}
            className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
          >
            Editar Consignante
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsignorView;
