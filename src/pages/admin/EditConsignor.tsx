import { useState, useEffect } from 'react';
import { User, Phone, CreditCard, ArrowLeft } from 'lucide-react';
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

const EditConsignor = () => {
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

  const [consignor] = useState<ConsignorItem>(mockConsignor);
  const [consignorName, setConsignorName] = useState(mockConsignor.name);
  const [consignorCpf, setConsignorCpf] = useState(mockConsignor.cpf);
  const [consignorEmail, setConsignorEmail] = useState(mockConsignor.email);
  const [consignorPhone, setConsignorPhone] = useState(mockConsignor.phone);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'money' | 'bank_transfer'>(
    mockConsignor.paymentMethod,
  );
  const [pixKey, setPixKey] = useState(mockConsignor.pixKey);
  const [bankAccount, setBankAccount] = useState(mockConsignor.bankAccount);

  useEffect(() => {
    // Em uma aplicação real, aqui você faria uma chamada para a API
    // para buscar os dados do consignante pelo consignorId
    console.log('Carregando consignante:', consignorId);
  }, [consignorId]);

  const formatCpf = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return value;
  };

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
    if (
      !consignorName.trim() ||
      !consignorCpf.trim() ||
      !consignorEmail.trim() ||
      !consignorPhone.trim()
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validar método de pagamento
    if (paymentMethod === 'pix' && !pixKey.trim()) {
      alert('Por favor, informe a chave PIX.');
      return;
    }

    if (paymentMethod === 'bank_transfer') {
      if (!bankAccount.bank.trim() || !bankAccount.agency.trim() || !bankAccount.account.trim()) {
        alert('Por favor, preencha todas as informações bancárias.');
        return;
      }
    }

    // Simular atualização do consignante
    const updatedConsignor = {
      ...consignor,
      name: consignorName,
      cpf: consignorCpf,
      email: consignorEmail,
      phone: consignorPhone,
      paymentMethod,
      pixKey,
      bankAccount,
    };

    console.log('Consignante atualizado:', updatedConsignor);
    alert('Consignante atualizado com sucesso!');

    // Navegar de volta para a lista de consignantes
    navigate('/admin/consignantes');
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
            Editar Consignante #{consignor.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações do consignante abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='consignor-name'>
                  Nome Completo *
                </label>
                <input
                  id='consignor-name'
                  type='text'
                  value={consignorName}
                  onChange={(e) => setConsignorName(e.target.value)}
                  placeholder='Digite o nome completo'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='consignor-cpf'>
                  CPF *
                </label>
                <input
                  id='consignor-cpf'
                  type='text'
                  value={consignorCpf}
                  onChange={(e) => setConsignorCpf(formatCpf(e.target.value))}
                  placeholder='000.000.000-00'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                  maxLength={14}
                />
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Phone className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Contato</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='consignor-email'>
                  Email *
                </label>
                <input
                  id='consignor-email'
                  type='email'
                  value={consignorEmail}
                  onChange={(e) => setConsignorEmail(e.target.value)}
                  placeholder='email@exemplo.com'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='consignor-phone'>
                  Telefone *
                </label>
                <input
                  id='consignor-phone'
                  type='tel'
                  value={consignorPhone}
                  onChange={(e) => setConsignorPhone(formatPhone(e.target.value))}
                  placeholder='(11) 99999-9999'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                  maxLength={15}
                />
              </div>
            </div>
          </div>

          {/* Método de Pagamento */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <CreditCard className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Método de Pagamento</h3>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
              <button
                type='button'
                onClick={() => setPaymentMethod('pix')}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                  paymentMethod === 'pix'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'
                }`}
              >
                <CreditCard className='w-5 h-5' />
                <div className='text-left'>
                  <div className='font-semibold'>PIX</div>
                  <div className='text-xs'>Pagamento instantâneo</div>
                </div>
              </button>

              <button
                type='button'
                onClick={() => setPaymentMethod('money')}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                  paymentMethod === 'money'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'
                }`}
              >
                <CreditCard className='w-5 h-5' />
                <div className='text-left'>
                  <div className='font-semibold'>Dinheiro</div>
                  <div className='text-xs'>Pagamento em espécie</div>
                </div>
              </button>

              <button
                type='button'
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'
                }`}
              >
                <CreditCard className='w-5 h-5' />
                <div className='text-left'>
                  <div className='font-semibold'>Transferência</div>
                  <div className='text-xs'>Transferência bancária</div>
                </div>
              </button>
            </div>

            {/* Campos específicos do método de pagamento */}
            {paymentMethod === 'pix' && (
              <div className='space-y-4'>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-semibold text-slate-700' htmlFor='pix-key'>
                    Chave PIX *
                  </label>
                  <input
                    id='pix-key'
                    type='text'
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    placeholder='Digite a chave PIX'
                    className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    required
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className='space-y-4'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='bank-name'>
                      Banco *
                    </label>
                    <input
                      id='bank-name'
                      type='text'
                      value={bankAccount.bank}
                      onChange={(e) => setBankAccount({ ...bankAccount, bank: e.target.value })}
                      placeholder='Nome do banco'
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='bank-agency'>
                      Agência *
                    </label>
                    <input
                      id='bank-agency'
                      type='text'
                      value={bankAccount.agency}
                      onChange={(e) => setBankAccount({ ...bankAccount, agency: e.target.value })}
                      placeholder='Número da agência'
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='bank-account'>
                      Conta *
                    </label>
                    <input
                      id='bank-account'
                      type='text'
                      value={bankAccount.account}
                      onChange={(e) => setBankAccount({ ...bankAccount, account: e.target.value })}
                      placeholder='Número da conta'
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='account-type'>
                      Tipo de Conta *
                    </label>
                    <select
                      id='account-type'
                      value={bankAccount.accountType}
                      onChange={(e) =>
                        setBankAccount({
                          ...bankAccount,
                          accountType: e.target.value as 'checking' | 'savings',
                        })
                      }
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    >
                      <option value='checking'>Conta Corrente</option>
                      <option value='savings'>Conta Poupança</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'money' && (
              <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
                <div className='flex items-start gap-3'>
                  <CreditCard className='w-5 h-5 text-green-600 mt-0.5' />
                  <div>
                    <h4 className='text-sm font-semibold text-green-800 mb-1'>
                      Pagamento em Dinheiro
                    </h4>
                    <p className='text-sm text-green-700'>
                      O pagamento será realizado em dinheiro diretamente com o consignante.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Atualizar Consignante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditConsignor;
