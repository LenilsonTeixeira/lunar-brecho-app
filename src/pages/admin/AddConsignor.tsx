import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const AddConsignor = () => {
  const navigate = useNavigate();
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
  });

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validação condicional baseada no método de pagamento
    if (formData.paymentMethod === 'pix' && !formData.pixKey.trim()) {
      alert('Por favor, preencha a chave PIX.');
      return;
    }

    if (formData.paymentMethod === 'bank_transfer') {
      if (
        !formData.bankAccount.bank ||
        !formData.bankAccount.agency ||
        !formData.bankAccount.account
      ) {
        alert('Por favor, preencha todas as informações bancárias.');
        return;
      }
    }

    // Implementar lógica de envio do formulário
    console.log('Consignante a ser adicionado:', formData);
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
            Adicionar Consignante
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações do consignante abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Informações Pessoais */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2'>
              Informações Pessoais
            </h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='name'>
                  Nome Completo
                </label>
                <input
                  id='name'
                  type='text'
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder='Digite o nome completo'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm sm:text-base font-semibold text-slate-700' htmlFor='cpf'>
                  CPF
                </label>
                <input
                  id='cpf'
                  type='text'
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', formatCPF(e.target.value))}
                  placeholder='000.000.000-00'
                  maxLength={14}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='email'
                >
                  E-mail
                </label>
                <input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder='exemplo@email.com'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label
                  className='text-sm sm:text-base font-semibold text-slate-700'
                  htmlFor='phone'
                >
                  Telefone
                </label>
                <input
                  id='phone'
                  type='text'
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                  placeholder='(00) 00000-0000'
                  maxLength={15}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>
          </div>

          {/* Informações de Pagamento */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2'>
              Informações de Pagamento
            </h3>

            {/* Método de Pagamento - Cards Modernos */}
            <div className='space-y-4'>
              <label className='text-sm sm:text-base font-semibold text-slate-700 block'>
                Método de Pagamento
              </label>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* PIX Card */}
                <div
                  onClick={() => handleInputChange('paymentMethod', 'pix')}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    formData.paymentMethod === 'pix'
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === 'pix'
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-slate-300'
                      }`}
                    >
                      {formData.paymentMethod === 'pix' && (
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                          <svg
                            className='w-5 h-5 text-green-600'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 10V3L4 14h7v7l9-11h-7z'
                            />
                          </svg>
                        </div>
                        <span className='font-semibold text-slate-800'>PIX</span>
                      </div>
                      <p className='text-xs text-slate-600'>Transferência instantânea</p>
                    </div>
                  </div>
                </div>

                {/* Dinheiro Card */}
                <div
                  onClick={() => handleInputChange('paymentMethod', 'money')}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    formData.paymentMethod === 'money'
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === 'money'
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-slate-300'
                      }`}
                    >
                      {formData.paymentMethod === 'money' && (
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <div className='w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center'>
                          <svg
                            className='w-5 h-5 text-yellow-600'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                            />
                          </svg>
                        </div>
                        <span className='font-semibold text-slate-800'>Dinheiro</span>
                      </div>
                      <p className='text-xs text-slate-600'>Pagamento presencial</p>
                    </div>
                  </div>
                </div>

                {/* Transferência Bancária Card */}
                <div
                  onClick={() => handleInputChange('paymentMethod', 'bank_transfer')}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    formData.paymentMethod === 'bank_transfer'
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-slate-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === 'bank_transfer'
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-slate-300'
                      }`}
                    >
                      {formData.paymentMethod === 'bank_transfer' && (
                        <div className='w-2 h-2 bg-white rounded-full'></div>
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                          <svg
                            className='w-5 h-5 text-blue-600'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                            />
                          </svg>
                        </div>
                        <span className='font-semibold text-slate-800'>Transferência</span>
                      </div>
                      <p className='text-xs text-slate-600'>Transferência bancária</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campos Condicionais */}
            <div className='mt-6'>
              {formData.paymentMethod === 'pix' && (
                <div className='flex flex-col gap-2'>
                  <label
                    className='text-sm sm:text-base font-semibold text-slate-700'
                    htmlFor='pixKey'
                  >
                    Chave PIX
                  </label>
                  <input
                    id='pixKey'
                    type='text'
                    value={formData.pixKey}
                    onChange={(e) => handleInputChange('pixKey', e.target.value)}
                    placeholder='Digite a chave PIX'
                    className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    required={formData.paymentMethod === 'pix'}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Informações Bancárias - Apenas para Transferência Bancária */}
          {formData.paymentMethod === 'bank_transfer' && (
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2'>
                Informações Bancárias
              </h3>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label
                    className='text-sm sm:text-base font-semibold text-slate-700'
                    htmlFor='bank'
                  >
                    Banco
                  </label>
                  <select
                    id='bank'
                    value={formData.bankAccount.bank}
                    onChange={(e) => handleBankAccountChange('bank', e.target.value)}
                    className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    required={formData.paymentMethod === 'bank_transfer'}
                  >
                    <option value=''>Selecione o banco</option>
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    className='text-sm sm:text-base font-semibold text-slate-700'
                    htmlFor='agency'
                  >
                    Agência
                  </label>
                  <input
                    id='agency'
                    type='text'
                    value={formData.bankAccount.agency}
                    onChange={(e) => handleBankAccountChange('agency', e.target.value)}
                    placeholder='Digite a agência'
                    className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    required={formData.paymentMethod === 'bank_transfer'}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label
                    className='text-sm sm:text-base font-semibold text-slate-700'
                    htmlFor='account'
                  >
                    Conta
                  </label>
                  <input
                    id='account'
                    type='text'
                    value={formData.bankAccount.account}
                    onChange={(e) => handleBankAccountChange('account', e.target.value)}
                    placeholder='Digite o número da conta'
                    className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    required={formData.paymentMethod === 'bank_transfer'}
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label
                    className='text-sm sm:text-base font-semibold text-slate-700'
                    htmlFor='accountType'
                  >
                    Tipo de Conta
                  </label>
                  <select
                    id='accountType'
                    value={formData.bankAccount.accountType}
                    onChange={(e) => handleBankAccountChange('accountType', e.target.value as any)}
                    className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  >
                    <option value='checking'>Conta Corrente</option>
                    <option value='savings'>Conta Poupança</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Observações */}
          <div className='flex flex-col gap-2'>
            <label
              className='text-sm sm:text-base font-semibold text-slate-700'
              htmlFor='observations'
            >
              Observações
            </label>
            <textarea
              id='observations'
              rows={3}
              className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none bg-white'
              placeholder='Informações adicionais sobre o consignante...'
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
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
