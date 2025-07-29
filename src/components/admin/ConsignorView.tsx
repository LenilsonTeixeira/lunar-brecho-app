import { X, User } from 'lucide-react';

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

  const getAccountTypeLabel = (type: string) => {
    return type === 'checking' ? 'Conta Corrente' : 'Conta Poupança';
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
                  <User className='w-4 h-4 text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Consignante #{consignor.id}</h2>
                  <p className='text-slate-300 text-sm'>{consignor.name}</p>
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
          {/* Primeira linha - Nome e CPF */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Nome Completo */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Nome Completo</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{consignor.name}</span>
              </div>
            </div>

            {/* CPF */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>CPF</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800 font-mono'>{consignor.cpf}</span>
              </div>
            </div>
          </div>

          {/* Segunda linha - E-mail e Telefone */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* E-mail */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>E-mail</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{consignor.email}</span>
              </div>
            </div>

            {/* Telefone */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Telefone</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{consignor.phone}</span>
              </div>
            </div>
          </div>

          {/* Método de Pagamento */}
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <label className='text-sm font-semibold text-slate-700'>Método de Pagamento</label>
            </div>
            <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
              <span className='text-slate-800'>
                {consignor.paymentMethod === 'pix' && 'PIX'}
                {consignor.paymentMethod === 'money' && 'Dinheiro'}
                {consignor.paymentMethod === 'bank_transfer' && 'Transferência Bancária'}
              </span>
            </div>
          </div>

          {/* Chave PIX - Mostrar apenas se PIX for selecionado */}
          {consignor.paymentMethod === 'pix' && (
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Chave PIX</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800 font-mono'>{consignor.pixKey}</span>
              </div>
            </div>
          )}

          {/* Informações Bancárias - Mostrar apenas se Transferência Bancária for selecionada */}
          {consignor.paymentMethod === 'bank_transfer' && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Banco */}
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <label className='text-sm font-semibold text-slate-700'>Banco</label>
                </div>
                <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>
                    {consignor.bankAccount.bank || 'Não informado'}
                  </span>
                </div>
              </div>

              {/* Agência */}
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <label className='text-sm font-semibold text-slate-700'>Agência</label>
                </div>
                <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>
                    {consignor.bankAccount.agency || 'Não informada'}
                  </span>
                </div>
              </div>

              {/* Conta */}
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <label className='text-sm font-semibold text-slate-700'>Conta</label>
                </div>
                <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>
                    {consignor.bankAccount.account || 'Não informada'}
                  </span>
                </div>
              </div>

              {/* Tipo de Conta */}
              <div>
                <div className='flex items-center gap-2 mb-2'>
                  <label className='text-sm font-semibold text-slate-700'>Tipo de Conta</label>
                </div>
                <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>
                    {getAccountTypeLabel(consignor.bankAccount.accountType)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Estatísticas */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {/* Total de Produtos */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Total de Produtos</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800 text-lg'>{consignor.totalProducts || 0}</span>
              </div>
            </div>

            {/* Produtos à Venda */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>À Venda</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800 text-lg'>{consignor.productsForSale || 0}</span>
              </div>
            </div>

            {/* Produtos Vendidos */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Vendidos</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800 text-lg'>{consignor.soldProducts || 0}</span>
              </div>
            </div>

            {/* Comissão Total */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Comissão Total</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-green-600 text-lg'>
                  {formatCurrency(consignor.totalCommission || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Datas */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Data de Criação */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Data de Criação</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(consignor.createdAt)}</span>
              </div>
            </div>

            {/* Última Atualização */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <label className='text-sm font-semibold text-slate-700'>Última Atualização</label>
              </div>
              <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                <span className='text-slate-800'>{formatDate(consignor.updatedAt)}</span>
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
                Editar Consignante
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsignorView;
