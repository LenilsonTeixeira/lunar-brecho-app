import { useState } from 'react';
import { User, Mail, Phone, CreditCard, QrCode, Building2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

const AddConsignor = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    paymentMethod: 'pix' as 'pix' | 'money' | 'bank_transfer',
    pixKey: '',
    bankAccount: {
      bank: '',
      agency: '',
      account: '',
      accountType: 'checking' as 'checking' | 'savings',
    },
    status: 'active' as 'active' | 'inactive',
  });

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implementar lógica de envio do formulário
    console.log('Consignante a ser adicionado:', formData);
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <Link
              to='/admin/consignantes'
              className='flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
            >
              <ArrowLeft className='w-5 h-5' />
              Voltar para Consignantes
            </Link>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Adicionar Consignante
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações do novo consignante
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-8'
        >
          {/* Informações Pessoais */}
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold text-slate-800 flex items-center gap-2'>
              <User className='w-6 h-6 text-purple-600' />
              Informações Pessoais
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2'>
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
                <label className='block text-sm font-medium text-slate-700 mb-2'>CPF *</label>
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

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2'>
                  <Mail className='w-4 h-4 text-purple-600' />
                  E-mail *
                </label>
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
                <label className='block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2'>
                  <Phone className='w-4 h-4 text-purple-600' />
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

          {/* Informações de Pagamento */}
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold text-slate-800 flex items-center gap-2'>
              <CreditCard className='w-6 h-6 text-purple-600' />
              Informações de Pagamento
            </h2>

            {/* Método de Pagamento */}
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-3'>
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
                    className='w-5 h-5 text-purple-600 border-slate-300 focus:ring-purple-500'
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
                    className='w-5 h-5 text-purple-600 border-slate-300 focus:ring-purple-500'
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
                    className='w-5 h-5 text-purple-600 border-slate-300 focus:ring-purple-500'
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
                <label className='block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2'>
                  <QrCode className='w-4 h-4 text-purple-600' />
                  Chave PIX *
                </label>
                <input
                  type='text'
                  value={formData.pixKey}
                  onChange={(e) => handleInputChange('pixKey', e.target.value)}
                  className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  placeholder='Digite a chave PIX (CPF, e-mail, telefone ou chave aleatória)'
                  required
                />
              </div>
            )}

            {/* Informações Bancárias - Mostrar apenas se Transferência Bancária for selecionada */}
            {formData.paymentMethod === 'bank_transfer' && (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2'>
                      <Building2 className='w-4 h-4 text-purple-600' />
                      Banco *
                    </label>
                    <select
                      value={formData.bankAccount.bank}
                      onChange={(e) => handleBankAccountChange('bank', e.target.value)}
                      className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                      required
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
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Agência *
                    </label>
                    <input
                      type='text'
                      value={formData.bankAccount.agency}
                      onChange={(e) => handleBankAccountChange('agency', e.target.value)}
                      className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                      placeholder='0000'
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Conta *</label>
                    <input
                      type='text'
                      value={formData.bankAccount.account}
                      onChange={(e) => handleBankAccountChange('account', e.target.value)}
                      className='w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                      placeholder='00000-0'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
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
                      required
                    >
                      <option value='checking'>Conta Corrente</option>
                      <option value='savings'>Conta Poupança</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Status */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-slate-800'>Status</h2>

            <div className='flex items-center gap-6'>
              <label className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='status'
                  value='active'
                  checked={formData.status === 'active'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className='w-5 h-5 text-purple-600 border-slate-300 focus:ring-purple-500'
                />
                <span className='text-sm font-medium text-slate-700'>Ativo</span>
              </label>

              <label className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='status'
                  value='inactive'
                  checked={formData.status === 'inactive'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className='w-5 h-5 text-purple-600 border-slate-300 focus:ring-purple-500'
                />
                <span className='text-sm font-medium text-slate-700'>Inativo</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-6 border-t border-slate-200'>
            <button
              type='submit'
              className='w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Adicionar Consignante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddConsignor;
