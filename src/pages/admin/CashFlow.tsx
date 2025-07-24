import { useState } from 'react';
import { Edit, Eye, Plus, DollarSign, TrendingUp, TrendingDown, Lock, Unlock } from 'lucide-react';
import { Link } from 'react-router';
import CashFlowSessionView from '../../components/admin/CashFlowSessionView';

interface CashFlowSession {
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

const CashFlow = () => {
  const [viewingSession, setViewingSession] = useState<CashFlowSession | null>(null);
  const [sessions] = useState<CashFlowSession[]>([
    {
      id: 1,
      date: '2024-02-15',
      status: 'closed',
      openingAmount: 500.0,
      totalEntries: 1250.9,
      totalExits: 320.5,
      finalBalance: 1430.4,
      openedBy: 'João Silva',
      closedBy: 'Maria Santos',
      openedAt: '2024-02-15T08:00:00Z',
      closedAt: '2024-02-15T18:30:00Z',
      notes: 'Caixa fechado com sucesso',
    },
    {
      id: 2,
      date: '2024-02-16',
      status: 'open',
      openingAmount: 1430.4,
      totalEntries: 890.0,
      totalExits: 150.0,
      finalBalance: 2170.4,
      openedBy: 'Maria Santos',
      openedAt: '2024-02-16T08:15:00Z',
    },
    {
      id: 3,
      date: '2024-02-14',
      status: 'closed',
      openingAmount: 300.0,
      totalEntries: 980.5,
      totalExits: 780.6,
      finalBalance: 499.9,
      openedBy: 'Ana Costa',
      closedBy: 'João Silva',
      openedAt: '2024-02-14T08:30:00Z',
      closedAt: '2024-02-14T18:45:00Z',
      notes: 'Movimentação normal do dia',
    },
  ]);

  const [movements] = useState<CashFlowMovement[]>([
    {
      id: 1,
      sessionId: 1,
      type: 'entry',
      amount: 89.9,
      description: 'Venda #1234 - Blusa Feminina',
      paymentMethod: 'card',
      category: 'sale',
      referenceType: 'accounts_receivable',
      referenceId: 1,
      createdAt: '2024-02-15T10:30:00Z',
      createdBy: 'João Silva',
    },
    {
      id: 2,
      sessionId: 1,
      type: 'entry',
      amount: 129.9,
      description: 'Venda #1235 - Calça Jeans',
      paymentMethod: 'pix',
      category: 'sale',
      referenceType: 'accounts_receivable',
      referenceId: 2,
      createdAt: '2024-02-15T11:15:00Z',
      createdBy: 'João Silva',
    },
    {
      id: 3,
      sessionId: 1,
      type: 'exit',
      amount: 150.0,
      description: 'Compra de Estoque - Fornecedor ABC',
      paymentMethod: 'transfer',
      category: 'supplier',
      referenceType: 'accounts_payable',
      referenceId: 1,
      createdAt: '2024-02-15T14:20:00Z',
      createdBy: 'João Silva',
    },
    {
      id: 4,
      sessionId: 1,
      type: 'exit',
      amount: 50.0,
      description: 'Retirada para despesas pessoais',
      paymentMethod: 'money',
      category: 'withdrawal',
      createdAt: '2024-02-15T16:45:00Z',
      createdBy: 'João Silva',
    },
    {
      id: 5,
      sessionId: 2,
      type: 'entry',
      amount: 199.9,
      description: 'Venda #1236 - Vestido',
      paymentMethod: 'card',
      category: 'sale',
      createdAt: '2024-02-16T09:30:00Z',
      createdBy: 'Maria Santos',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Unlock className='w-4 h-4' />;
      case 'closed':
        return <Lock className='w-4 h-4' />;
      default:
        return <Lock className='w-4 h-4' />;
    }
  };

  const getMovementTypeColor = (type: string) => {
    switch (type) {
      case 'entry':
        return 'bg-green-100 text-green-800';
      case 'exit':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMovementTypeText = (type: string) => {
    switch (type) {
      case 'entry':
        return 'Entrada';
      case 'exit':
        return 'Saída';
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

  const openSessions = sessions.filter((session) => session.status === 'open');
  const totalEntries = sessions.reduce((sum, session) => sum + session.totalEntries, 0);
  const totalExits = sessions.reduce((sum, session) => sum + session.totalExits, 0);
  const currentBalance = openSessions.length > 0 ? openSessions[0].finalBalance : 0;

  const handleViewSession = (session: CashFlowSession) => {
    setViewingSession(session);
  };

  const handleCloseView = () => {
    setViewingSession(null);
  };

  const handleEditSession = () => {
    // Implementar edição de sessão se necessário
    console.log('Editar sessão:', viewingSession);
  };

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Fluxo de Caixa</h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Controle financeiro diário e movimentações de caixa
              </p>
            </div>
            <div className='flex gap-3'>
              {openSessions.length === 0 && (
                <Link
                  to='/admin/fluxo-caixa/abrir'
                  className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
                >
                  <Unlock className='w-4 h-4' />
                  Abrir Caixa
                </Link>
              )}
              <Link
                to='/admin/fluxo-caixa/movimentacao/adicionar'
                className='flex items-center justify-center gap-2 w-full sm:w-auto sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
              >
                <Plus className='w-4 h-4' />
                Nova Movimentação
              </Link>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Saldo Atual</p>
                <p className='text-2xl font-bold text-slate-800'>R$ {currentBalance.toFixed(2)}</p>
              </div>
              <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center'>
                <DollarSign className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Total Entradas</p>
                <p className='text-2xl font-bold text-green-600'>R$ {totalEntries.toFixed(2)}</p>
              </div>
              <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center'>
                <TrendingUp className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Total Saídas</p>
                <p className='text-2xl font-bold text-red-600'>R$ {totalExits.toFixed(2)}</p>
              </div>
              <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center'>
                <TrendingDown className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Table */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto md:overflow-x-visible'>
            <table className='w-full md:min-w-full min-w-[800px]'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Data
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Abertura
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Entradas
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Saídas
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Saldo Final
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Responsável
                  </th>
                  <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {sessions.map((session) => (
                  <tr key={session.id} className='hover:bg-slate-50 transition-colors duration-200'>
                    <td className='px-6 py-4'>
                      <span className='text-xs sm:text-sm font-medium text-slate-800'>
                        {new Date(session.date).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}
                      >
                        {getStatusIcon(session.status)}
                        {getStatusText(session.status)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <span className='text-xs sm:text-sm font-medium text-slate-800'>
                        R$ {session.openingAmount.toFixed(2)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <span className='text-xs sm:text-sm font-bold text-green-600'>
                        R$ {session.totalEntries.toFixed(2)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <span className='text-xs sm:text-sm font-bold text-red-600'>
                        R$ {session.totalExits.toFixed(2)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <span className='text-xs sm:text-sm font-bold text-slate-800'>
                        R$ {session.finalBalance.toFixed(2)}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div>
                        <span className='text-xs sm:text-sm font-medium text-slate-800 block'>
                          {session.openedBy}
                        </span>
                        {session.closedBy && (
                          <span className='text-xs text-slate-500'>
                            Fechado por: {session.closedBy}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1 sm:gap-2 justify-center'>
                        <button
                          onClick={() => handleViewSession(session)}
                          className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                          title='Visualizar'
                        >
                          <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        {session.status === 'open' && (
                          <>
                            <button
                              className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                              title='Editar'
                            >
                              <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                            </button>
                            <Link
                              to={`/admin/fluxo-caixa/fechar/${session.id}`}
                              className='p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                              title='Fechar Caixa'
                            >
                              <Lock className='w-3 h-3 sm:w-4 sm:h-4' />
                            </Link>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Movements */}
        {openSessions.length > 0 && (
          <div className='mt-8'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold text-slate-800'>Movimentações Recentes</h2>
              <button className='text-sm text-purple-600 hover:text-purple-700 font-medium'>
                Ver Todas
              </button>
            </div>
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              <div className='overflow-x-auto md:overflow-x-visible'>
                <table className='w-full md:min-w-full min-w-[800px]'>
                  <thead className='bg-slate-50 border-b border-slate-200'>
                    <tr>
                      <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                        Tipo
                      </th>
                      <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                        Descrição
                      </th>
                      <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                        Valor
                      </th>
                      <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                        Forma
                      </th>
                      <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                        Categoria
                      </th>
                      <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                        Responsável
                      </th>
                      <th className='px-6 py-4 text-center text-xs sm:text-sm font-semibold text-slate-700'>
                        Hora
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-200'>
                    {movements.slice(0, 5).map((movement) => (
                      <tr
                        key={movement.id}
                        className='hover:bg-slate-50 transition-colors duration-200'
                      >
                        <td className='px-6 py-4'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getMovementTypeColor(movement.type)}`}
                          >
                            {getMovementTypeText(movement.type)}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='text-xs sm:text-sm font-medium text-slate-800'>
                            {movement.description}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center'>
                          <span
                            className={`text-xs sm:text-sm font-bold ${movement.type === 'entry' ? 'text-green-600' : 'text-red-600'}`}
                          >
                            R$ {movement.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center'>
                          <span className='text-xs sm:text-sm font-medium text-slate-800'>
                            {getPaymentMethodText(movement.paymentMethod)}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center'>
                          <span className='text-xs sm:text-sm font-medium text-slate-800'>
                            {getCategoryText(movement.category)}
                          </span>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='text-xs sm:text-sm font-medium text-slate-800'>
                            {movement.createdBy}
                          </span>
                        </td>
                        <td className='px-6 py-4 text-center'>
                          <span className='text-xs sm:text-sm font-medium text-slate-800'>
                            {new Date(movement.createdAt).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Session View Modal */}
      {viewingSession && (
        <CashFlowSessionView
          session={viewingSession}
          movements={movements.filter((m) => m.sessionId === viewingSession.id)}
          onClose={handleCloseView}
          onEdit={handleEditSession}
        />
      )}
    </div>
  );
};

export default CashFlow;
