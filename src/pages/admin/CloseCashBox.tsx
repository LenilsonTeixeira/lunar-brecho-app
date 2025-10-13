import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Lock,
  DollarSign,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Calculator,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

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

interface CloseCashBoxFormData {
  closingAmount: string;
  notes: string;
  discrepancy: number;
}

const CloseCashBox = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();

  const [formData, setFormData] = useState<CloseCashBoxFormData>({
    closingAmount: '',
    notes: '',
    discrepancy: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentSession, setCurrentSession] = useState<CashBoxSession | null>(null);
  const [movements, setMovements] = useState<CashFlowMovement[]>([]);

  // Simular dados da sessão atual
  useEffect(() => {
    const mockSession: CashBoxSession = {
      id: parseInt(sessionId || '2'),
      date: '2024-02-16',
      status: 'open',
      openingAmount: 1430.4,
      totalEntries: 890.0,
      totalExits: 150.0,
      finalBalance: 2170.4,
      openedBy: 'Maria Santos',
      openedAt: '2024-02-16T08:15:00Z',
    };

    const mockMovements: CashFlowMovement[] = [
      {
        id: 1,
        sessionId: parseInt(sessionId || '2'),
        type: 'entry',
        amount: 199.9,
        description: 'Venda #1236 - Vestido',
        paymentMethod: 'card',
        category: 'sale',
        createdAt: '2024-02-16T09:30:00Z',
        createdBy: 'Maria Santos',
      },
      {
        id: 2,
        sessionId: parseInt(sessionId || '2'),
        type: 'entry',
        amount: 299.9,
        description: 'Venda #1237 - Calça Jeans',
        paymentMethod: 'pix',
        category: 'sale',
        createdAt: '2024-02-16T10:15:00Z',
        createdBy: 'Maria Santos',
      },
      {
        id: 3,
        sessionId: parseInt(sessionId || '2'),
        type: 'entry',
        amount: 390.2,
        description: 'Venda #1238 - Blusa',
        paymentMethod: 'money',
        category: 'sale',
        createdAt: '2024-02-16T11:00:00Z',
        createdBy: 'Maria Santos',
      },
      {
        id: 4,
        sessionId: parseInt(sessionId || '2'),
        type: 'exit',
        amount: 150.0,
        description: 'Compra de Estoque',
        paymentMethod: 'transfer',
        category: 'supplier',
        createdAt: '2024-02-16T14:20:00Z',
        createdBy: 'Maria Santos',
      },
    ];

    setCurrentSession(mockSession);
    setMovements(mockMovements);
  }, [sessionId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Calculate discrepancy when closing amount changes
    if (name === 'closingAmount' && currentSession) {
      const closingAmount = parseFloat(value) || 0;
      const expectedAmount = currentSession.finalBalance;
      const discrepancy = closingAmount - expectedAmount;
      setFormData((prev) => ({
        ...prev,
        discrepancy,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.closingAmount.trim()) {
      newErrors.closingAmount = 'O valor de fechamento é obrigatório';
    } else {
      const amount = parseFloat(formData.closingAmount);
      if (isNaN(amount) || amount < 0) {
        newErrors.closingAmount = 'O valor deve ser um número positivo';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmCloseCashBox = async () => {
    setLoading(true);
    setShowConfirmDialog(false);

    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (currentSession) {
        const closedSession: CashBoxSession = {
          ...currentSession,
          status: 'closed',
          finalBalance: parseFloat(formData.closingAmount),
          closedBy: 'Usuário Atual', // Em produção, pegar do contexto de autenticação
          closedAt: new Date().toISOString(),
          notes: formData.notes.trim() || undefined,
        };

        // Em produção, salvar na API
        console.log('Caixa fechado com sucesso:', closedSession);
      }

      // Navegar de volta para o fluxo de caixa
      navigate('/admin/fluxo-caixa');
    } catch (error) {
      console.error('Erro ao fechar caixa:', error);
      setErrors({ general: 'Erro ao fechar caixa. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (formData.closingAmount || formData.notes) {
      setShowConfirmDialog(true);
    } else {
      navigate('/admin/fluxo-caixa');
    }
  };

  const confirmCancel = () => {
    setShowConfirmDialog(false);
    navigate('/admin/fluxo-caixa');
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

  if (!currentSession) {
    return (
      <div className='py-6 flex flex-col justify-center items-center bg-slate-50'>
        <div className='w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
        <p className='mt-4 text-slate-600'>Carregando sessão...</p>
      </div>
    );
  }

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <Link
              to='/admin/fluxo-caixa'
              className='flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-200'
            >
              <ArrowLeft className='w-4 h-4' />
              <span className='text-sm font-medium'>Voltar</span>
            </Link>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Fechar Caixa</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Registre o fechamento do caixa para o dia de hoje
          </p>
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4'>
            <div className='flex items-start gap-3'>
              <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0 mt-0.5' />
              <div>
                <h3 className='text-sm font-semibold text-red-800 mb-1'>Erro</h3>
                <p className='text-sm text-red-700'>{errors.general}</p>
              </div>
            </div>
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Form Section */}
          <div className='lg:col-span-1'>
            <form
              onSubmit={handleSubmit}
              className='bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-6'
            >
              {/* Session Summary */}
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <Calculator className='w-4 h-4 text-blue-600' />
                  </div>
                  <h3 className='text-sm font-semibold text-blue-800'>Resumo da Sessão</h3>
                </div>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-blue-700'>Abertura:</span>
                    <span className='font-medium text-blue-800'>
                      R$ {currentSession.openingAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-green-700'>Entradas:</span>
                    <span className='font-medium text-green-800'>
                      R$ {currentSession.totalEntries.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-red-700'>Saídas:</span>
                    <span className='font-medium text-red-800'>
                      R$ {currentSession.totalExits.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between border-t border-blue-200 pt-2'>
                    <span className='text-blue-800 font-semibold'>Saldo Esperado:</span>
                    <span className='font-bold text-blue-800'>
                      R$ {currentSession.finalBalance.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Closing Amount */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='closingAmount'
                >
                  Valor de Fechamento (R$) *
                </label>
                <div className='relative'>
                  <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
                  <input
                    id='closingAmount'
                    name='closingAmount'
                    type='number'
                    step='0.01'
                    min='0'
                    placeholder='0,00'
                    value={formData.closingAmount}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                      errors.closingAmount
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    }`}
                    required
                    disabled={loading}
                  />
                </div>
                {errors.closingAmount && (
                  <p className='text-xs text-red-600'>{errors.closingAmount}</p>
                )}
                <p className='text-xs text-slate-500'>
                  Informe o valor em dinheiro encontrado no caixa
                </p>
              </div>

              {/* Discrepancy Display */}
              {formData.closingAmount && (
                <div
                  className={`border rounded-lg p-4 ${
                    Math.abs(formData.discrepancy) > 0.01
                      ? 'bg-red-50 border-red-200'
                      : 'bg-green-50 border-green-200'
                  }`}
                >
                  <div className='flex items-center gap-2 mb-2'>
                    <span
                      className={`text-sm font-semibold ${
                        Math.abs(formData.discrepancy) > 0.01 ? 'text-red-800' : 'text-green-800'
                      }`}
                    >
                      Diferença:
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        formData.discrepancy > 0 ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {formData.discrepancy > 0 ? '+' : ''}R$ {formData.discrepancy.toFixed(2)}
                    </span>
                  </div>
                  <p
                    className={`text-xs ${
                      Math.abs(formData.discrepancy) > 0.01 ? 'text-red-700' : 'text-green-700'
                    }`}
                  >
                    {Math.abs(formData.discrepancy) > 0.01
                      ? 'Há uma diferença entre o valor esperado e o valor encontrado.'
                      : 'Valor encontrado confere com o esperado.'}
                  </p>
                </div>
              )}

              {/* Notes */}
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='notes'
                >
                  Observações
                </label>
                <textarea
                  id='notes'
                  name='notes'
                  rows={4}
                  placeholder='Observações sobre o fechamento do caixa (opcional)'
                  value={formData.notes}
                  onChange={handleInputChange}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 bg-white resize-none'
                  disabled={loading}
                />
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4'>
                <button
                  type='button'
                  onClick={handleCancel}
                  disabled={loading}
                  className='flex-1 py-2 sm:py-3 px-4 sm:px-6 border border-slate-300 text-slate-700 text-sm sm:text-base font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-red-700 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  <div className='flex items-center justify-center gap-2'>
                    {loading ? (
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    ) : (
                      <Lock className='w-4 h-4' />
                    )}
                    {loading ? 'Fechando Caixa...' : 'Fechar Caixa'}
                  </div>
                </button>
              </div>
            </form>
          </div>

          {/* Movements Section */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-lg font-bold text-slate-800'>Movimentações do Dia</h2>
                <div className='flex items-center gap-4 text-sm'>
                  <div className='flex items-center gap-2'>
                    <TrendingUp className='w-4 h-4 text-green-600' />
                    <span className='text-green-700'>
                      Entradas: R$ {currentSession.totalEntries.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <TrendingDown className='w-4 h-4 text-red-600' />
                    <span className='text-red-700'>
                      Saídas: R$ {currentSession.totalExits.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full min-w-[600px]'>
                  <thead className='bg-slate-50 border-b border-slate-200'>
                    <tr>
                      <th className='px-4 py-3 text-left text-xs font-semibold text-slate-700'>
                        Tipo
                      </th>
                      <th className='px-4 py-3 text-left text-xs font-semibold text-slate-700'>
                        Descrição
                      </th>
                      <th className='px-4 py-3 text-center text-xs font-semibold text-slate-700'>
                        Valor
                      </th>
                      <th className='px-4 py-3 text-center text-xs font-semibold text-slate-700'>
                        Forma
                      </th>
                      <th className='px-4 py-3 text-center text-xs font-semibold text-slate-700'>
                        Hora
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-200'>
                    {movements.map((movement) => (
                      <tr
                        key={movement.id}
                        className='hover:bg-slate-50 transition-colors duration-200'
                      >
                        <td className='px-4 py-3'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              movement.type === 'entry'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {movement.type === 'entry' ? 'Entrada' : 'Saída'}
                          </span>
                        </td>
                        <td className='px-4 py-3'>
                          <span className='text-sm font-medium text-slate-800'>
                            {movement.description}
                          </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                          <span
                            className={`text-sm font-bold ${
                              movement.type === 'entry' ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            R$ {movement.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                          <span className='text-sm font-medium text-slate-800'>
                            {getPaymentMethodText(movement.paymentMethod)}
                          </span>
                        </td>
                        <td className='px-4 py-3 text-center'>
                          <span className='text-sm font-medium text-slate-800'>
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

              {movements.length === 0 && (
                <div className='text-center py-8 text-slate-500'>
                  <p>Nenhuma movimentação registrada hoje.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title={
          formData.closingAmount || formData.notes ? 'Cancelar Fechamento' : 'Confirmar Fechamento'
        }
        message={
          formData.closingAmount || formData.notes
            ? 'Tem certeza que deseja cancelar o fechamento do caixa? Os dados preenchidos serão perdidos.'
            : `Tem certeza que deseja fechar o caixa com o valor de R$ ${parseFloat(formData.closingAmount || '0').toFixed(2)}?`
        }
        confirmText={formData.closingAmount || formData.notes ? 'Cancelar' : 'Fechar Caixa'}
        cancelText='Voltar'
        onConfirm={formData.closingAmount || formData.notes ? confirmCancel : confirmCloseCashBox}
        onCancel={() => setShowConfirmDialog(false)}
        type={formData.closingAmount || formData.notes ? 'warning' : 'danger'}
      />
    </div>
  );
};

export default CloseCashBox;
