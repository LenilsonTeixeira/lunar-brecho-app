import {
  X,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  User,
  Clock,
  FileText,
  BarChart3,
  Activity,
  CreditCard,
  Receipt,
} from 'lucide-react';

interface CashBoxSession {
  id: number;
  date: string;
  status: 'open' | 'closed';
  openingAmount: number;
  totalEntries: number;
  totalExits: number;
  finalBalance: number;
  openedBy: string;
  closedBy?: string;
  openedAt: string;
  closedAt?: string;
  notes?: string;
}

interface CashFlowMovement {
  id: number;
  sessionId: number;
  type: 'entry' | 'exit';
  amount: number;
  description: string;
  paymentMethod: 'money' | 'card' | 'pix' | 'boleto' | 'transfer';
  category: 'sale' | 'supplier' | 'withdrawal' | 'fee' | 'adjustment' | 'refund' | 'other';
  referenceType?: 'accounts_receivable' | 'accounts_payable';
  referenceId?: number;
  createdAt: string;
  createdBy: string;
}

interface CashFlowSessionViewProps {
  session: CashBoxSession;
  movements: CashFlowMovement[];
  onClose: () => void;
  onEdit?: () => void;
}

const CashFlowSessionView = ({ session, movements, onClose, onEdit }: CashFlowSessionViewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
      case 'closed':
        return 'bg-gradient-to-r from-slate-500 to-gray-500 text-white';
      default:
        return 'bg-gradient-to-r from-slate-500 to-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Aberto';
      case 'closed':
        return 'Fechado';
      default:
        return 'Desconhecido';
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'money':
        return 'Dinheiro';
      case 'card':
        return 'Cartão';
      case 'pix':
        return 'PIX';
      case 'boleto':
        return 'Boleto';
      case 'transfer':
        return 'Transferência';
      default:
        return 'Desconhecido';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'sale':
        return 'Venda';
      case 'supplier':
        return 'Fornecedor';
      case 'withdrawal':
        return 'Retirada';
      case 'fee':
        return 'Taxa';
      case 'adjustment':
        return 'Ajuste';
      case 'refund':
        return 'Estorno';
      case 'other':
        return 'Outros';
      default:
        return 'Desconhecido';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'money':
        return <DollarSign className='w-4 h-4' />;
      case 'card':
        return <CreditCard className='w-4 h-4' />;
      case 'pix':
        return <Activity className='w-4 h-4' />;
      case 'boleto':
        return <Receipt className='w-4 h-4' />;
      case 'transfer':
        return <BarChart3 className='w-4 h-4' />;
      default:
        return <DollarSign className='w-4 h-4' />;
    }
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-300'>
      <div className='bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-7xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-4 duration-300'>
        {/* Header */}
        <div className='relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-3 sm:p-4 text-white'>
          <div className='absolute inset-0 bg-black/20'></div>
          <div className='relative flex items-center justify-between'>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 sm:gap-3 mb-1'>
                <div className='w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0'>
                  <BarChart3 className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                </div>
                <div className='min-w-0 flex-1'>
                  <h2 className='text-lg sm:text-xl font-bold truncate'>Sessão #{session.id}</h2>
                  <p className='text-slate-300 text-xs sm:text-sm truncate'>
                    {new Date(session.date).toLocaleDateString('pt-BR', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2 sm:gap-4 flex-shrink-0'>
              <div className='flex flex-col items-end gap-1'>
                <span
                  className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(session.status)}`}
                >
                  <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full'></div>
                  <span className='hidden sm:inline'>{getStatusText(session.status)}</span>
                  <span className='sm:hidden'>{getStatusText(session.status).charAt(0)}</span>
                </span>
                <span className='text-slate-300 text-xs sm:text-sm'>
                  <span className='hidden sm:inline'>Saldo: </span>
                  <span className='font-bold text-white'>R$ {session.finalBalance.toFixed(2)}</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className='p-1.5 sm:p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 backdrop-blur-sm'
              >
                <X className='w-4 h-4 sm:w-5 sm:h-5' />
              </button>
            </div>
          </div>
        </div>

        <div className='overflow-y-auto max-h-[calc(98vh-180px)] sm:max-h-[calc(95vh-200px)]'>
          <div className='p-3 sm:p-6'>
            {/* Financial Overview Cards */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6'>
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-1 sm:mb-2'>
                  <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center'>
                    <DollarSign className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                  </div>
                  <span className='text-xs font-medium text-blue-600 bg-blue-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full'>
                    <span className='hidden sm:inline'>Abertura</span>
                    <span className='sm:hidden'>Abr</span>
                  </span>
                </div>
                <p className='text-lg sm:text-xl font-bold text-blue-900'>
                  R$ {session.openingAmount.toFixed(2)}
                </p>
                <p className='text-xs text-blue-600 mt-1 hidden sm:block'>Valor inicial</p>
              </div>

              <div className='bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-1 sm:mb-2'>
                  <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center'>
                    <TrendingUp className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                  </div>
                  <span className='text-xs font-medium text-emerald-600 bg-emerald-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full'>
                    <span className='hidden sm:inline'>Entradas</span>
                    <span className='sm:hidden'>Ent</span>
                  </span>
                </div>
                <p className='text-lg sm:text-xl font-bold text-emerald-900'>
                  R$ {session.totalEntries.toFixed(2)}
                </p>
                <p className='text-xs text-emerald-600 mt-1 hidden sm:block'>Total recebido</p>
              </div>

              <div className='bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-1 sm:mb-2'>
                  <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center'>
                    <TrendingDown className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                  </div>
                  <span className='text-xs font-medium text-red-600 bg-red-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full'>
                    <span className='hidden sm:inline'>Saídas</span>
                    <span className='sm:hidden'>Sai</span>
                  </span>
                </div>
                <p className='text-lg sm:text-xl font-bold text-red-900'>
                  R$ {session.totalExits.toFixed(2)}
                </p>
                <p className='text-xs text-red-600 mt-1 hidden sm:block'>Total pago</p>
              </div>

              <div className='bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:shadow-lg transition-all duration-300'>
                <div className='flex items-center justify-between mb-1 sm:mb-2'>
                  <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg flex items-center justify-center'>
                    <BarChart3 className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                  </div>
                  <span className='text-xs font-medium text-slate-600 bg-slate-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full'>
                    <span className='hidden sm:inline'>Saldo</span>
                    <span className='sm:hidden'>Sal</span>
                  </span>
                </div>
                <p className='text-lg sm:text-xl font-bold text-slate-900'>
                  R$ {session.finalBalance.toFixed(2)}
                </p>
                <p className='text-xs text-slate-600 mt-1 hidden sm:block'>Saldo final</p>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6'>
              {/* Session Details */}
              <div className='lg:col-span-1'>
                <div className='bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4'>
                  <h3 className='text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4 flex items-center gap-2'>
                    <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg flex items-center justify-center'>
                      <User className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                    </div>
                    <span className='hidden sm:inline'>Detalhes da Sessão</span>
                    <span className='sm:hidden'>Detalhes</span>
                  </h3>
                  <div className='space-y-2 sm:space-y-3'>
                    <div className='flex items-center gap-2 sm:gap-3 p-2 bg-white/50 rounded-lg'>
                      <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center'>
                        <Calendar className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='text-xs sm:text-sm font-medium text-slate-700'>Data</p>
                        <p className='text-xs sm:text-sm text-slate-600 truncate'>
                          {new Date(session.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-2 sm:gap-3 p-2 bg-white/50 rounded-lg'>
                      <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center'>
                        <User className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='text-xs sm:text-sm font-medium text-slate-700'>Aberto por</p>
                        <p className='text-xs sm:text-sm text-slate-600 truncate'>
                          {session.openedBy}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-2 sm:gap-3 p-2 bg-white/50 rounded-lg'>
                      <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center'>
                        <Clock className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='text-xs sm:text-sm font-medium text-slate-700'>Aberto em</p>
                        <p className='text-xs sm:text-sm text-slate-600 truncate'>
                          {new Date(session.openedAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    {session.closedBy && (
                      <div className='flex items-center gap-2 sm:gap-3 p-2 bg-white/50 rounded-lg'>
                        <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center'>
                          <User className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <p className='text-xs sm:text-sm font-medium text-slate-700'>
                            Fechado por
                          </p>
                          <p className='text-xs sm:text-sm text-slate-600 truncate'>
                            {session.closedBy}
                          </p>
                        </div>
                      </div>
                    )}

                    {session.closedAt && (
                      <div className='flex items-center gap-2 sm:gap-3 p-2 bg-white/50 rounded-lg'>
                        <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center'>
                          <Clock className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <p className='text-xs sm:text-sm font-medium text-slate-700'>
                            Fechado em
                          </p>
                          <p className='text-xs sm:text-sm text-slate-600 truncate'>
                            {new Date(session.closedAt).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Movements Section */}
              <div className='lg:col-span-2'>
                <div className='bg-white border border-slate-200 rounded-lg sm:rounded-xl shadow-sm'>
                  <div className='p-3 sm:p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg sm:rounded-t-xl'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h3 className='text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2'>
                          <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center'>
                            <Activity className='w-3 h-3 sm:w-4 sm:h-4 text-white' />
                          </div>
                          <span className='hidden sm:inline'>Movimentações</span>
                          <span className='sm:hidden'>Mov.</span>
                        </h3>
                        <p className='text-xs sm:text-sm text-slate-600 mt-1'>
                          {movements.length} movimentação{movements.length !== 1 ? 'ões' : ''}{' '}
                          registrada{movements.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className='flex items-center gap-2 sm:gap-3'>
                        <div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm'>
                          <div className='w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full'></div>
                          <span className='text-emerald-700 font-medium hidden sm:inline'>
                            Entradas
                          </span>
                          <span className='text-emerald-700 font-medium sm:hidden'>Ent</span>
                        </div>
                        <div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm'>
                          <div className='w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full'></div>
                          <span className='text-red-700 font-medium hidden sm:inline'>Saídas</span>
                          <span className='text-red-700 font-medium sm:hidden'>Sai</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='overflow-x-auto max-h-64 sm:max-h-96'>
                    <table className='w-full min-w-[600px]'>
                      <thead className='bg-slate-50 border-b border-slate-200 sticky top-0'>
                        <tr>
                          <th className='px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                            Tipo
                          </th>
                          <th className='px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                            Descrição
                          </th>
                          <th className='px-2 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                            Valor
                          </th>
                          <th className='px-2 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                            Forma
                          </th>
                          <th className='px-2 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                            Categoria
                          </th>
                          <th className='px-2 sm:px-4 py-2 sm:py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                            Hora
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-slate-100'>
                        {movements.length > 0 ? (
                          movements.map((movement, index) => (
                            <tr
                              key={movement.id}
                              className='hover:bg-slate-50/50 transition-all duration-200 group'
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <td className='px-2 sm:px-4 py-2 sm:py-3'>
                                <span
                                  className={`inline-flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${
                                    movement.type === 'entry'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                      : 'bg-red-100 text-red-800 border border-red-200'
                                  }`}
                                >
                                  <div
                                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                      movement.type === 'entry' ? 'bg-emerald-500' : 'bg-red-500'
                                    }`}
                                  ></div>
                                  <span className='hidden sm:inline'>
                                    {movement.type === 'entry' ? 'Entrada' : 'Saída'}
                                  </span>
                                  <span className='sm:hidden'>
                                    {movement.type === 'entry' ? 'Ent' : 'Sai'}
                                  </span>
                                </span>
                              </td>
                              <td className='px-2 sm:px-4 py-2 sm:py-3'>
                                <span className='text-xs sm:text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors truncate block max-w-[120px] sm:max-w-none'>
                                  {movement.description}
                                </span>
                              </td>
                              <td className='px-2 sm:px-4 py-2 sm:py-3 text-center'>
                                <span
                                  className={`text-xs sm:text-sm font-bold ${
                                    movement.type === 'entry' ? 'text-emerald-600' : 'text-red-600'
                                  }`}
                                >
                                  R$ {movement.amount.toFixed(2)}
                                </span>
                              </td>
                              <td className='px-2 sm:px-4 py-2 sm:py-3 text-center'>
                                <div className='flex items-center justify-center gap-1 sm:gap-2'>
                                  <div className='w-5 h-5 sm:w-6 sm:h-6 bg-slate-100 rounded-lg flex items-center justify-center'>
                                    {getPaymentMethodIcon(movement.paymentMethod)}
                                  </div>
                                  <span className='text-xs sm:text-sm font-medium text-slate-700 hidden sm:inline'>
                                    {getPaymentMethodText(movement.paymentMethod)}
                                  </span>
                                  <span className='text-xs sm:text-sm font-medium text-slate-700 sm:hidden'>
                                    {getPaymentMethodText(movement.paymentMethod).charAt(0)}
                                  </span>
                                </div>
                              </td>
                              <td className='px-2 sm:px-4 py-2 sm:py-3 text-center'>
                                <span className='text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full'>
                                  <span className='hidden sm:inline'>
                                    {getCategoryText(movement.category)}
                                  </span>
                                  <span className='sm:hidden'>
                                    {getCategoryText(movement.category).charAt(0)}
                                  </span>
                                </span>
                              </td>
                              <td className='px-2 sm:px-4 py-2 sm:py-3 text-center'>
                                <span className='text-xs sm:text-sm font-medium text-slate-600'>
                                  {new Date(movement.createdAt).toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className='px-2 sm:px-4 py-6 sm:py-8 text-center'>
                              <div className='flex flex-col items-center gap-2 sm:gap-3'>
                                <div className='w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center'>
                                  <Activity className='w-5 h-5 sm:w-6 sm:h-6 text-slate-400' />
                                </div>
                                <div>
                                  <p className='text-slate-500 font-medium text-sm sm:text-base'>
                                    Nenhuma movimentação
                                  </p>
                                  <p className='text-slate-400 text-xs sm:text-sm'>
                                    Nenhuma movimentação registrada nesta sessão.
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {session.notes && (
              <div className='bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6'>
                <div className='flex items-start gap-2 sm:gap-3'>
                  <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <FileText className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
                  </div>
                  <div>
                    <h3 className='text-base sm:text-lg font-bold text-amber-800 mb-1 sm:mb-2'>
                      Observações
                    </h3>
                    <p className='text-amber-700 leading-relaxed text-sm sm:text-base'>
                      {session.notes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='flex gap-2 sm:gap-4 p-3 sm:p-6 border-t border-slate-200 bg-slate-50'>
          <button
            onClick={onClose}
            className='flex-1 py-2.5 sm:py-3 px-4 sm:px-6 border border-slate-300 text-slate-700 font-semibold rounded-lg sm:rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 text-sm sm:text-base'
          >
            Fechar
          </button>
          {onEdit && session.status === 'open' && (
            <button
              onClick={onEdit}
              className='flex-1 py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base'
            >
              <span className='hidden sm:inline'>Editar Sessão</span>
              <span className='sm:hidden'>Editar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CashFlowSessionView;
