import { ArrowLeft, User, CreditCard, TrendingUp, Package, DollarSign } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

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
  createdAt?: string;
  updatedAt?: string;
  totalProducts?: number;
  productsForSale?: number;
  soldProducts?: number;
  totalCommission?: number;
}

const ViewConsignor = () => {
  const navigate = useNavigate();
  const { consignorId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockConsignor: ConsignorItem = {
    id: parseInt(consignorId || '1'),
    name: 'Maria Silva Santos',
    cpf: '123.456.789-00',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-9999',
    paymentMethod: 'pix',
    pixKey: 'maria.silva@email.com',
    bankAccount: {
      bank: 'Banco do Brasil',
      agency: '1234',
      account: '12345-6',
      accountType: 'checking',
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    totalProducts: 45,
    productsForSale: 32,
    soldProducts: 13,
    totalCommission: 1250.0,
  };

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

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'pix':
        return 'PIX';
      case 'money':
        return 'Dinheiro';
      case 'bank_transfer':
        return 'Transferência Bancária';
      default:
        return method;
    }
  };

  const getAccountTypeLabel = (type: string) => {
    return type === 'checking' ? 'Conta Corrente' : 'Conta Poupança';
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/consignantes')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Consignante #{mockConsignor.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes completos do consignante</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Informações Pessoais */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Pessoais</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Nome Completo
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockConsignor.name}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>CPF</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800 font-mono'>{mockConsignor.cpf}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>E-mail</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockConsignor.email}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Telefone</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockConsignor.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <CreditCard className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Pagamento</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Método de Pagamento
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>
                    {getPaymentMethodLabel(mockConsignor.paymentMethod)}
                  </span>
                </div>
              </div>

              {mockConsignor.paymentMethod === 'pix' && (
                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Chave PIX
                  </label>
                  <div className='p-3 bg-white rounded-lg border border-slate-200'>
                    <span className='text-slate-800 font-mono'>{mockConsignor.pixKey}</span>
                  </div>
                </div>
              )}

              {mockConsignor.paymentMethod === 'bank_transfer' && (
                <>
                  <div>
                    <label className='text-sm font-semibold text-slate-700 mb-2 block'>Banco</label>
                    <div className='p-3 bg-white rounded-lg border border-slate-200'>
                      <span className='text-slate-800'>{mockConsignor.bankAccount.bank}</span>
                    </div>
                  </div>

                  <div>
                    <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                      Agência
                    </label>
                    <div className='p-3 bg-white rounded-lg border border-slate-200'>
                      <span className='text-slate-800'>{mockConsignor.bankAccount.agency}</span>
                    </div>
                  </div>

                  <div>
                    <label className='text-sm font-semibold text-slate-700 mb-2 block'>Conta</label>
                    <div className='p-3 bg-white rounded-lg border border-slate-200'>
                      <span className='text-slate-800'>{mockConsignor.bankAccount.account}</span>
                    </div>
                  </div>

                  <div>
                    <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                      Tipo de Conta
                    </label>
                    <div className='p-3 bg-white rounded-lg border border-slate-200'>
                      <span className='text-slate-800'>
                        {getAccountTypeLabel(mockConsignor.bankAccount.accountType)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Estatísticas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <TrendingUp className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Estatísticas</h3>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center'>
                <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Package className='w-6 h-6 text-purple-600' />
                </div>
                <p className='text-2xl font-bold text-slate-800'>
                  {mockConsignor.totalProducts || 0}
                </p>
                <p className='text-xs text-slate-600'>Total de Produtos</p>
              </div>

              <div className='text-center'>
                <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Package className='w-6 h-6 text-green-600' />
                </div>
                <p className='text-2xl font-bold text-slate-800'>
                  {mockConsignor.productsForSale || 0}
                </p>
                <p className='text-xs text-slate-600'>À Venda</p>
              </div>

              <div className='text-center'>
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Package className='w-6 h-6 text-blue-600' />
                </div>
                <p className='text-2xl font-bold text-slate-800'>
                  {mockConsignor.soldProducts || 0}
                </p>
                <p className='text-xs text-slate-600'>Vendidos</p>
              </div>

              <div className='text-center'>
                <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <DollarSign className='w-6 h-6 text-green-600' />
                </div>
                <p className='text-lg font-bold text-green-600'>
                  {formatCurrency(mockConsignor.totalCommission || 0)}
                </p>
                <p className='text-xs text-slate-600'>Comissão Total</p>
              </div>
            </div>
          </div>

          {/* Datas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Sistema</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Criação
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockConsignor.createdAt)}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Última Atualização
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockConsignor.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate(`/admin/consignantes/historico/${mockConsignor.id}`)}
                className='w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Ver Histórico
              </button>
              <button
                onClick={() => navigate(`/admin/consignantes/editar/${mockConsignor.id}`)}
                className='w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
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

export default ViewConsignor;
