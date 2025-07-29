import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

interface ConsignorFormData {
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
}

interface ConsignorFormProps {
  consignor?: ConsignorItem;
  onSubmit: (data: ConsignorFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConsignorForm = ({
  consignor,
  onSubmit,
  onCancel,
  isLoading = false,
}: ConsignorFormProps) => {
  const [formData, setFormData] = useState<ConsignorFormData>({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    paymentMethod: 'pix',
    pixKey: '',
    bankAccount: {
      bank: '',
      agency: '',
      account: '',
      accountType: 'checking',
    },
    status: 'active',
  });

  useEffect(() => {
    if (consignor) {
      setFormData({
        name: consignor.name,
        cpf: consignor.cpf,
        email: consignor.email,
        phone: consignor.phone,
        paymentMethod: consignor.paymentMethod,
        pixKey: consignor.pixKey,
        bankAccount: consignor.bankAccount,
        status: consignor.status,
      });
    }
  }, [consignor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBankAccountChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bankAccount: {
        ...prev.bankAccount,
        [field]: value,
      },
    }));
  };

  const formatCPF = (value: string) => {
    const cpf = value.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    const phone = value.replace(/\D/g, '');
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const banks = [
    'Banco do Brasil',
    'Itaú',
    'Bradesco',
    'Santander',
    'Caixa Econômica',
    'Nubank',
    'Inter',
    'Banrisul',
    'Sicredi',
    'Sicoob',
    'Outro',
  ];

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-slate-200'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-slate-800'>
              {consignor ? 'Editar Consignante' : 'Novo Consignante'}
            </h2>
            <p className='text-sm text-slate-600 mt-1'>
              {consignor
                ? 'Atualize as informações do consignante'
                : 'Preencha as informações do novo consignante'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Informações Pessoais */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800'>Informações Pessoais</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Nome Completo *
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  placeholder='Digite o nome completo'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>CPF *</label>
                <input
                  type='text'
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                  className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  placeholder='000.000.000-00'
                  maxLength={14}
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>E-mail *</label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  placeholder='exemplo@email.com'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Telefone *
                </label>
                <input
                  type='text'
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                  className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  placeholder='(00) 00000-0000'
                  maxLength={15}
                  required
                />
              </div>
            </div>
          </div>

          {/* Informações Bancárias */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800'>Informações de Pagamento</h3>

            {/* Método de Pagamento */}
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-3'>
                Método de Pagamento *
              </label>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                <label className='flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors'>
                  <input
                    type='radio'
                    name='paymentMethod'
                    value='pix'
                    checked={formData.paymentMethod === 'pix'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className='w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500'
                  />
                  <div>
                    <span className='text-sm font-medium text-slate-700'>PIX</span>
                    <p className='text-xs text-slate-500'>Transferência instantânea</p>
                  </div>
                </label>

                <label className='flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors'>
                  <input
                    type='radio'
                    name='paymentMethod'
                    value='money'
                    checked={formData.paymentMethod === 'money'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className='w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500'
                  />
                  <div>
                    <span className='text-sm font-medium text-slate-700'>Dinheiro</span>
                    <p className='text-xs text-slate-500'>Pagamento em espécie</p>
                  </div>
                </label>

                <label className='flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors'>
                  <input
                    type='radio'
                    name='paymentMethod'
                    value='bank_transfer'
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className='w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500'
                  />
                  <div>
                    <span className='text-sm font-medium text-slate-700'>
                      Transferência Bancária
                    </span>
                    <p className='text-xs text-slate-500'>Depósito em conta</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Chave PIX - Mostrar apenas se PIX for selecionado */}
            {formData.paymentMethod === 'pix' && (
              <div>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>
                  Chave PIX *
                </label>
                <input
                  type='text'
                  value={formData.pixKey}
                  onChange={(e) => handleInputChange('pixKey', e.target.value)}
                  className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  placeholder='Digite a chave PIX (CPF, e-mail, telefone ou chave aleatória)'
                  required={formData.paymentMethod === 'pix'}
                />
              </div>
            )}

            {/* Informações Bancárias - Mostrar apenas se Transferência Bancária for selecionada */}
            {formData.paymentMethod === 'bank_transfer' && (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>
                      Banco *
                    </label>
                    <select
                      value={formData.bankAccount.bank}
                      onChange={(e) => handleBankAccountChange('bank', e.target.value)}
                      className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                      required={formData.paymentMethod === 'bank_transfer'}
                    >
                      <option value=''>Selecione um banco</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>
                      Agência *
                    </label>
                    <input
                      type='text'
                      value={formData.bankAccount.agency}
                      onChange={(e) => handleBankAccountChange('agency', e.target.value)}
                      className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                      placeholder='0000'
                      required={formData.paymentMethod === 'bank_transfer'}
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>
                      Conta *
                    </label>
                    <input
                      type='text'
                      value={formData.bankAccount.account}
                      onChange={(e) => handleBankAccountChange('account', e.target.value)}
                      className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                      placeholder='00000-0'
                      required={formData.paymentMethod === 'bank_transfer'}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>
                      Tipo de Conta *
                    </label>
                    <select
                      value={formData.bankAccount.accountType}
                      onChange={(e) =>
                        handleBankAccountChange(
                          'accountType',
                          e.target.value as 'checking' | 'savings',
                        )
                      }
                      className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                      required={formData.paymentMethod === 'bank_transfer'}
                    >
                      <option value='checking'>Conta Corrente</option>
                      <option value='savings'>Conta Poupança</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className='flex items-center justify-end gap-4 pt-6 border-t border-slate-200'>
            <button
              type='button'
              onClick={onCancel}
              className='px-6 py-3 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Cancelar
            </button>
            <button
              type='submit'
              disabled={isLoading}
              className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  {consignor ? 'Atualizando...' : 'Criando...'}
                </div>
              ) : consignor ? (
                'Atualizar Consignante'
              ) : (
                'Criar Consignante'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsignorForm;
