import { useState, useEffect } from 'react';
import { DollarSign, User, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface AccountsReceivableItem {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  customer: string;
  customerPhone: string;
  paymentMethod: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

const EditAccountsReceivable = () => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockAccount: AccountsReceivableItem = {
    id: parseInt(accountId || '1'),
    description: 'Venda de Vestido Floral - Maria Silva',
    amount: 129.9,
    dueDate: '2024-02-15',
    status: 'pending',
    customer: 'Maria Silva Santos',
    customerPhone: '(34) 99668-3137',
    paymentMethod: 'PIX',
    notes: 'Venda realizada em 15/01/2024. Cliente solicitou pagamento em 2x.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
  };

  const [account] = useState<AccountsReceivableItem>(mockAccount);
  const [description, setDescription] = useState(mockAccount.description);
  const [amount, setAmount] = useState(mockAccount.amount);
  const [dueDate, setDueDate] = useState(mockAccount.dueDate);
  const [status, setStatus] = useState<'pending' | 'paid' | 'overdue'>(mockAccount.status);
  const [customer, setCustomer] = useState(mockAccount.customer);
  const [customerPhone, setCustomerPhone] = useState(mockAccount.customerPhone);
  const [paymentMethod, setPaymentMethod] = useState(mockAccount.paymentMethod);
  const [notes, setNotes] = useState(mockAccount.notes || '');

  useEffect(() => {
    // Em uma aplicação real, aqui você faria uma chamada para a API
    // para buscar os dados da conta pelo accountId
    console.log('Carregando conta:', accountId);
  }, [accountId]);

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!description.trim() || !customer.trim() || !customerPhone.trim() || !paymentMethod.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (amount <= 0) {
      alert('Por favor, informe um valor válido.');
      return;
    }

    if (!dueDate) {
      alert('Por favor, informe a data de vencimento.');
      return;
    }

    // Simular atualização da conta
    const updatedAccount = {
      ...account,
      description,
      amount,
      dueDate,
      status,
      customer,
      customerPhone,
      paymentMethod,
      notes,
    };

    console.log('Conta atualizada:', updatedAccount);
    alert('Conta atualizada com sucesso!');

    // Navegar de volta para a lista de contas
    navigate('/admin/contas-receber');
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/contas-receber')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Editar Conta a Receber #{account.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações da conta a receber abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <FileText className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='description'>
                  Descrição *
                </label>
                <input
                  id='description'
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Descrição da conta a receber'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='amount'>
                  Valor (R$) *
                </label>
                <input
                  id='amount'
                  type='number'
                  min='0'
                  step='0.01'
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  placeholder='0,00'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>
          </div>

          {/* Informações do Cliente */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações do Cliente</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='customer'>
                  Nome do Cliente *
                </label>
                <input
                  id='customer'
                  type='text'
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder='Nome completo do cliente'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='customer-phone'>
                  Telefone *
                </label>
                <input
                  id='customer-phone'
                  type='tel'
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(formatPhone(e.target.value))}
                  placeholder='(11) 99999-9999'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <DollarSign className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Pagamento</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='payment-method'>
                  Método de Pagamento *
                </label>
                <select
                  id='payment-method'
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value=''>Selecione o método</option>
                  <option value='PIX'>PIX</option>
                  <option value='Cartão de Crédito'>Cartão de Crédito</option>
                  <option value='Cartão de Débito'>Cartão de Débito</option>
                  <option value='Dinheiro'>Dinheiro</option>
                  <option value='Transferência Bancária'>Transferência Bancária</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='due-date'>
                  Data de Vencimento *
                </label>
                <input
                  id='due-date'
                  type='date'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='status'>
                  Status *
                </label>
                <select
                  id='status'
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'pending' | 'paid' | 'overdue')}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='pending'>Pendente</option>
                  <option value='paid'>Pago</option>
                  <option value='overdue'>Vencido</option>
                </select>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <FileText className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Observações</h3>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-semibold text-slate-700' htmlFor='notes'>
                Observações sobre a Conta
              </label>
              <textarea
                id='notes'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder='Observações sobre a conta a receber...'
                rows={4}
                className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Atualizar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountsReceivable;
