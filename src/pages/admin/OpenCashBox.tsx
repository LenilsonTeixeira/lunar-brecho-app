import { useState } from 'react';
import { ArrowLeft, Unlock, DollarSign, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
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

interface OpenCashBoxFormData {
  openingAmount: string;
  notes: string;
}

const OpenCashBox = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OpenCashBoxFormData>({
    openingAmount: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.openingAmount.trim()) {
      newErrors.openingAmount = 'O valor de abertura é obrigatório';
    } else {
      const amount = parseFloat(formData.openingAmount);
      if (isNaN(amount) || amount < 0) {
        newErrors.openingAmount = 'O valor deve ser um número positivo';
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

  const confirmOpenCashBox = async () => {
    setLoading(true);
    setShowConfirmDialog(false);

    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newSession: CashBoxSession = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        status: 'open',
        openingAmount: parseFloat(formData.openingAmount),
        totalEntries: 0,
        totalExits: 0,
        finalBalance: parseFloat(formData.openingAmount),
        openedBy: 'Usuário Atual', // Em produção, pegar do contexto de autenticação
        openedAt: new Date().toISOString(),
        notes: formData.notes.trim() || undefined,
      };

      // Em produção, salvar na API
      console.log('Caixa aberto com sucesso:', newSession);

      // Navegar de volta para o fluxo de caixa
      navigate('/admin/fluxo-caixa');
    } catch (error) {
      console.error('Erro ao abrir caixa:', error);
      setErrors({ general: 'Erro ao abrir caixa. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (formData.openingAmount || formData.notes) {
      setShowConfirmDialog(true);
    } else {
      navigate('/admin/fluxo-caixa');
    }
  };

  const confirmCancel = () => {
    setShowConfirmDialog(false);
    navigate('/admin/fluxo-caixa');
  };

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
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Abrir Caixa</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Registre a abertura do caixa para o dia de hoje
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

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Opening Amount */}
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm sm:text-base font-semibold text-slate-700'
              htmlFor='openingAmount'
            >
              Valor de Abertura (R$) *
            </label>
            <div className='relative'>
              <DollarSign className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
              <input
                id='openingAmount'
                name='openingAmount'
                type='number'
                step='0.01'
                min='0'
                placeholder='0,00'
                value={formData.openingAmount}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border transition-all duration-300 bg-white ${
                  errors.openingAmount
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                }`}
                required
                disabled={loading}
              />
            </div>
            {errors.openingAmount && <p className='text-xs text-red-600'>{errors.openingAmount}</p>}
            <p className='text-xs text-slate-500'>
              Informe o valor em dinheiro disponível para abertura do caixa
            </p>
          </div>

          {/* Current Date Display */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                <Unlock className='w-5 h-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm font-medium text-blue-800'>Data de Abertura</p>
                <p className='text-sm text-blue-600'>
                  {new Date().toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='notes'>
              Observações
            </label>
            <textarea
              id='notes'
              name='notes'
              rows={4}
              placeholder='Observações sobre a abertura do caixa (opcional)'
              value={formData.notes}
              onChange={handleInputChange}
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-white resize-none'
              disabled={loading}
            />
          </div>

          {/* Important Information */}
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <div className='flex items-start gap-3'>
              <div className='w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                <span className='text-yellow-600 text-sm font-bold'>!</span>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-yellow-800 mb-1'>
                  Informações Importantes
                </h3>
                <ul className='text-sm text-yellow-700 space-y-1'>
                  <li>• Apenas um caixa pode estar aberto por vez</li>
                  <li>• O valor de abertura será o saldo inicial do dia</li>
                  <li>• Todas as movimentações serão registradas automaticamente</li>
                  <li>• O caixa deve ser fechado ao final do expediente</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='pt-4 flex gap-4'>
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
              className='flex-1 py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              <div className='flex items-center justify-center gap-2'>
                {loading ? (
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                ) : (
                  <Unlock className='w-4 h-4' />
                )}
                {loading ? 'Abrindo Caixa...' : 'Abrir Caixa'}
              </div>
            </button>
          </div>
        </form>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title={
          formData.openingAmount || formData.notes ? 'Cancelar Abertura' : 'Confirmar Abertura'
        }
        message={
          formData.openingAmount || formData.notes
            ? 'Tem certeza que deseja cancelar a abertura do caixa? Os dados preenchidos serão perdidos.'
            : `Tem certeza que deseja abrir o caixa com o valor de R$ ${parseFloat(formData.openingAmount || '0').toFixed(2)}?`
        }
        confirmText={formData.openingAmount || formData.notes ? 'Cancelar' : 'Abrir Caixa'}
        cancelText='Voltar'
        onConfirm={formData.openingAmount || formData.notes ? confirmCancel : confirmOpenCashBox}
        onCancel={() => setShowConfirmDialog(false)}
        type={formData.openingAmount || formData.notes ? 'warning' : 'info'}
      />
    </div>
  );
};

export default OpenCashBox;
