import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MapPin,
  Truck,
  Store,
  CreditCard,
  Shield,
  HelpCircle,
  Package,
  Wallet,
  Banknote,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useCartDrawer } from '../contexts/CartDrawerContext';
import { formatToBRL, calculateFinalPrice } from '../utils/priceUtils';
import { customerService } from '../services';
import { useGTM } from '../hooks/useGTM';

const Checkout = () => {
  const { items } = useCart();
  const { openCartDrawer } = useCartDrawer();
  const navigate = useNavigate();
  const { trackButtonClick, trackCartAction } = useGTM();
  const location = useLocation();
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'cash'>('pix');
  const [whatsapp, setWhatsapp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [manualAddress, setManualAddress] = useState(false);
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');
  const [securePaymentExpanded, setSecurePaymentExpanded] = useState(false);
  const [helpExpanded, setHelpExpanded] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Restaurar dados ao voltar da tela de confirmação
  useEffect(() => {
    if (location.state && location.state.orderData) {
      const data = location.state.orderData;
      setWhatsapp(data.whatsapp);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setDeliveryMethod(data.deliveryMethod);
      setPaymentMethod(data.paymentMethod);
      setStreet(data.street);
      setNumber(data.number);
      setNeighborhood(data.neighborhood);
      setCity(data.city);
      setState(data.state);
      setZipCode(data.zipCode);
      setComplement(data.complement);
    }
  }, [location.state]);

  const deliveryFee = deliveryMethod === 'delivery' ? 6 : 0;

  // Calcula o subtotal baseado no método de pagamento
  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      // Calcula o preço com desconto aplicado (preço PIX/dinheiro)
      const pixPrice = calculateFinalPrice(
        item.snapshot.basePrice,
        item.snapshot.discountType,
        item.snapshot.discountValue,
      );

      // Para cartão, usa o preço base sem desconto
      // TODO: Verificar se existe campo específico para preço de cartão no backend
      const cardPrice = item.snapshot.basePrice;

      // Usa o preço apropriado baseado no método de pagamento
      const itemPrice = paymentMethod === 'pix' || paymentMethod === 'cash' ? pixPrice : cardPrice;

      return total + itemPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const finalTotal = subtotal + deliveryFee;

  const handleZipCodeValidation = async () => {
    const cleanZipCode = zipCode.replace(/\D/g, '');

    if (cleanZipCode.length !== 8) {
      alert('CEP deve conter 8 dígitos');
      return;
    }

    try {
      setIsLoadingCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado. Verifique o número digitado.');
        return;
      }

      // Preencher campos automaticamente com os dados da API
      setStreet(data.logradouro || '');
      setNeighborhood(data.bairro || '');
      setCity(data.localidade || '');
      setState(data.uf || '');
      setComplement(data.complemento || '');

      // Formatar CEP com hífen
      setZipCode(data.cep || cleanZipCode);
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      alert('Erro ao consultar CEP. Tente novamente.');
    } finally {
      setIsLoadingCep(false);
    }
  };

  const sanitizePhone = (value: string) => value.replace(/\D/g, '');

  const handleWhatsappBlur = async () => {
    const number = sanitizePhone(whatsapp);
    if (!number) return;
    try {
      setIsLoadingCustomer(true);
      const customer = await customerService.getCustomerByPhone(number);
      if (customer) {
        setCustomerId(customer.id);
        if (customer.name) {
          const parts = customer.name.trim().split(/\s+/);
          setFirstName(parts[0] || '');
          setLastName(parts.slice(1).join(' ') || '');
        }
        const address = customer.addresses?.find((a) => a.isDefault) || customer.addresses?.[0];
        if (address) {
          setDeliveryMethod('delivery');
          setStreet(address.street || '');
          setNumber(address.number || '');
          setNeighborhood(address.neighborhood || '');
          setCity(address.city || '');
          setState(address.state || '');
          setZipCode(address.zipCode || '');
          setComplement(address.complement || '');
        }
      } else {
        setCustomerId(null);
      }
    } catch (error) {
      console.error('Erro buscando cliente por telefone', error);
    } finally {
      setIsLoadingCustomer(false);
    }
  };

  const handleProceedToConfirmation = () => {
    trackButtonClick('proceed_to_payment', 'checkout', {
      cart_items_count: items.length,
      total_value: items.reduce((sum, item) => sum + item.snapshot.basePrice * item.quantity, 0),
      delivery_method: deliveryMethod,
      payment_method: paymentMethod,
    });

    trackCartAction('proceed_to_payment', {
      cart_items_count: items.length,
      total_value: items.reduce((sum, item) => sum + item.snapshot.basePrice * item.quantity, 0),
    });

    // Validação básica dos campos obrigatórios
    if (!whatsapp || !firstName || !lastName) {
      alert('Por favor, preencha todos os campos obrigatórios de contato.');
      return;
    }

    if (deliveryMethod === 'delivery' && (!street || !number || !neighborhood || !city || !state)) {
      alert('Por favor, preencha todos os campos obrigatórios de endereço.');
      return;
    }

    // Preparar dados do pedido para passar para a tela de confirmação
    const orderData = {
      whatsapp,
      firstName,
      lastName,
      deliveryMethod,
      paymentMethod,
      street: deliveryMethod === 'delivery' ? street : '',
      number: deliveryMethod === 'delivery' ? number : '',
      neighborhood: deliveryMethod === 'delivery' ? neighborhood : '',
      city: deliveryMethod === 'delivery' ? city : '',
      state: deliveryMethod === 'delivery' ? state : '',
      zipCode: deliveryMethod === 'delivery' ? zipCode : '',
      complement: deliveryMethod === 'delivery' ? complement : '',
      customerId,
    };

    // Navegar para a tela de confirmação passando os dados
    navigate('/order-confirmation', { state: { orderData } });
  };

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-slate-50 pt-80 sm:pt-24 pb-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6'>
          <div className='bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center'>
            <div className='w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Package className='w-8 h-8 sm:w-10 sm:h-10 text-purple-600' />
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4'>
              Seu carrinho está vazio
            </h1>
            <p className='text-slate-600 mb-8 sm:mb-10 text-sm sm:text-base px-4 max-w-md mx-auto'>
              Adicione alguns produtos para continuar com o checkout!
            </p>
            <Link
              to='/'
              className='inline-flex items-center gap-2 sm:gap-3 bg-sky-500 hover:bg-sky-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-colors text-sm sm:text-base font-semibold shadow-md hover:shadow-lg'
            >
              <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header */}
      <div className='border-b border-slate-300 bg-slate-900 shadow-lg sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='flex items-center gap-2 hover:scale-105 transition-transform'>
              <h1 className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                LUNAR BRECHÓ
              </h1>
            </Link>
            <Link
              to='/'
              className='flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors text-sm sm:text-base'
            >
              <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
              <span className='hidden sm:inline'>Voltar</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className='bg-white border-b border-slate-200 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6'>
          <div className='flex items-center gap-2 text-xs sm:text-sm overflow-x-auto'>
            <span className='text-sky-600 font-semibold whitespace-nowrap'>1. Pedido</span>
            <span className='text-slate-400'>&gt;</span>
            <span className='text-slate-400 whitespace-nowrap'>2. Confirmação</span>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10'>
        <div className='grid lg:grid-cols-3 gap-6 sm:gap-8'>
          {/* Left Column - Form */}
          <div className='lg:col-span-2 space-y-6 sm:space-y-8'>
            {/* Contact and Delivery */}
            <div className='bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm'>
              <h2 className='text-base sm:text-lg font-bold text-slate-900 mb-5 sm:mb-6'>
                1. Contato e Entrega
              </h2>

              {/* WhatsApp */}
              <div className='mb-5'>
                <label className='block text-sm font-semibold text-slate-700 mb-2'>WhatsApp*</label>
                <input
                  type='tel'
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  onBlur={handleWhatsappBlur}
                  className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                  placeholder='(99) 99999-9999'
                />
                {isLoadingCustomer && (
                  <p className='text-xs text-slate-500 mt-1'>Buscando cliente...</p>
                )}
              </div>

              {/* Name Fields */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5'>
                <div>
                  <label className='block text-sm font-semibold text-slate-700 mb-2'>Nome*</label>
                  <input
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                    placeholder='Seu nome'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-slate-700 mb-2'>
                    Sobrenome*
                  </label>
                  <input
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                    placeholder='Seu sobrenome'
                  />
                </div>
              </div>

              {/* Delivery Method */}
              <div className='mb-5'>
                <h3 className='text-sm font-semibold text-slate-700 mb-3'>
                  Como gostaria de receber seu pedido?
                </h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                  <label
                    className={`flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <input
                      type='radio'
                      name='delivery'
                      value='delivery'
                      checked={deliveryMethod === 'delivery'}
                      onChange={(e) => setDeliveryMethod(e.target.value as 'delivery' | 'pickup')}
                      className='mr-3 mt-1 sm:mt-0 text-purple-600 focus:ring-purple-600'
                    />
                    <div className='flex items-center gap-2 sm:gap-3'>
                      <Truck className='w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0' />
                      <div>
                        <div className='font-semibold text-slate-900 text-sm sm:text-base'>
                          Entregar no seu endereço
                        </div>
                        <div className='text-xs sm:text-sm text-slate-500'>Taxa de R$ 6,00</div>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <input
                      type='radio'
                      name='delivery'
                      value='pickup'
                      checked={deliveryMethod === 'pickup'}
                      onChange={(e) => setDeliveryMethod(e.target.value as 'delivery' | 'pickup')}
                      className='mr-3 mt-1 sm:mt-0 text-purple-600 focus:ring-purple-600'
                    />
                    <div className='flex items-center gap-2 sm:gap-3'>
                      <Store className='w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0' />
                      <div>
                        <div className='font-semibold text-slate-900 text-sm sm:text-base'>
                          Retirar na loja
                        </div>
                        <div className='text-xs sm:text-sm text-slate-500'>Grátis</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Delivery Address - Conditional */}
              {deliveryMethod === 'delivery' && (
                <div className='mt-5'>
                  <div className='flex items-center gap-2 mb-4'>
                    <MapPin className='w-4 h-4 text-purple-600' />
                    <h3 className='text-sm font-semibold text-slate-700'>Endereço de entrega</h3>
                  </div>

                  {!manualAddress && (
                    <>
                      <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-2'>
                          CEP*
                        </label>
                        <div className='flex flex-col sm:flex-row gap-2'>
                          <input
                            type='text'
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className='flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                            placeholder='00000-000'
                            maxLength={9}
                          />
                          <button
                            onClick={handleZipCodeValidation}
                            disabled={isLoadingCep}
                            className='px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-sm sm:text-base shadow-md hover:shadow-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed'
                          >
                            {isLoadingCep ? 'VALIDANDO...' : 'VALIDAR CEP'}
                          </button>
                        </div>
                      </div>

                      <label className='flex items-start gap-2 mt-3 cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={manualAddress}
                          onChange={(e) => setManualAddress(e.target.checked)}
                          className='mt-1 text-purple-600 focus:ring-purple-600'
                        />
                        <span className='text-xs sm:text-sm text-slate-600'>
                          Não sei meu CEP — digitar endereço manualmente
                        </span>
                      </label>
                    </>
                  )}

                  {manualAddress && (
                    <label className='flex items-start gap-2 mb-4 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={manualAddress}
                        onChange={(e) => setManualAddress(e.target.checked)}
                        className='mt-1 text-purple-600 focus:ring-purple-600'
                      />
                      <span className='text-xs sm:text-sm text-slate-600'>
                        Não sei meu CEP — digitar endereço manualmente
                      </span>
                    </label>
                  )}

                  {/* Campos de endereço - aparecem após validar CEP ou ao marcar manual */}
                  {(street || manualAddress) && (
                    <div className='space-y-4 mt-4'>
                      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div className='sm:col-span-2'>
                          <label className='block text-sm font-semibold text-slate-700 mb-2'>
                            Rua*
                          </label>
                          <input
                            type='text'
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                            placeholder='Nome da rua'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-semibold text-slate-700 mb-2'>
                            Número*
                          </label>
                          <input
                            type='text'
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                            placeholder='123'
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div>
                          <label className='block text-sm font-semibold text-slate-700 mb-2'>
                            Bairro*
                          </label>
                          <input
                            type='text'
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                            className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                            placeholder='Bairro'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-semibold text-slate-700 mb-2'>
                            Cidade*
                          </label>
                          <input
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                            placeholder='Cidade'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-semibold text-slate-700 mb-2'>
                            Estado*
                          </label>
                          <input
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                            placeholder='SP'
                            maxLength={2}
                          />
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-2'>
                          Complemento
                        </label>
                        <input
                          type='text'
                          value={complement}
                          onChange={(e) => setComplement(e.target.value)}
                          className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all text-sm sm:text-base'
                          placeholder='Apto, bloco, etc.'
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className='bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm'>
              <h2 className='text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-5'>
                2. Qual será a forma de pagamento?
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4'>
                <label
                  className={`flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'pix'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='payment'
                    value='pix'
                    checked={paymentMethod === 'pix'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'card' | 'cash')}
                    className='mr-3 mt-1 sm:mt-0 text-purple-600 focus:ring-purple-600'
                  />
                  <div className='flex items-center gap-2 sm:gap-3'>
                    <Wallet className='w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0' />
                    <div>
                      <div className='font-semibold text-slate-900 text-sm sm:text-base'>PIX</div>
                      <div className='text-xs sm:text-sm text-slate-500'>Pagamento instantâneo</div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='payment'
                    value='card'
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'card' | 'cash')}
                    className='mr-3 mt-1 sm:mt-0 text-purple-600 focus:ring-purple-600'
                  />
                  <div className='flex items-center gap-2 sm:gap-3'>
                    <CreditCard className='w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0' />
                    <div>
                      <div className='font-semibold text-slate-900 text-sm sm:text-base'>
                        Cartão
                      </div>
                      <div className='text-xs sm:text-sm text-slate-500'>Crédito/Débito</div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='payment'
                    value='cash'
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'card' | 'cash')}
                    className='mr-3 mt-1 sm:mt-0 text-purple-600 focus:ring-purple-600'
                  />
                  <div className='flex items-center gap-2 sm:gap-3'>
                    <Banknote className='w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0' />
                    <div>
                      <div className='font-semibold text-slate-900 text-sm sm:text-base'>
                        Dinheiro
                      </div>
                      <div className='text-xs sm:text-sm text-slate-500'>Na entrega</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm sticky top-24'>
              <h3 className='text-base sm:text-lg font-bold text-slate-900 mb-5 sm:mb-6'>
                Resumo do seu pedido
              </h3>

              {/* Products */}
              <div className='space-y-3 sm:space-y-4 mb-5 sm:mb-6 max-h-64 overflow-y-auto'>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className='flex gap-3 pb-3 border-b border-slate-100 last:border-0'
                  >
                    <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100'>
                      <img
                        src={
                          item.snapshot.mainThumbnailUrl ||
                          item.snapshot.mainImageUrl ||
                          'https://via.placeholder.com/64'
                        }
                        alt={item.snapshot.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h4 className='text-xs sm:text-sm font-semibold text-slate-900 line-clamp-2'>
                        {item.snapshot.name}
                      </h4>
                      <p className='text-xs text-slate-500 mt-1'>Tamanho: {item.snapshot.size}</p>
                      <p className='text-xs text-slate-500'>Quantidade: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className='space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 bg-slate-50 rounded-lg p-3 sm:p-4'>
                <div className='flex justify-between text-xs sm:text-sm text-slate-600'>
                  <span>Subtotal</span>
                  <span className='font-medium'>{formatToBRL(subtotal)}</span>
                </div>
                <div className='flex justify-between text-xs sm:text-sm text-slate-600'>
                  <span>{deliveryMethod === 'delivery' ? 'Envio padrão' : 'Retirada na loja'}</span>
                  <span className='font-medium'>
                    {deliveryFee === 0 ? 'Grátis' : formatToBRL(deliveryFee)}
                  </span>
                </div>
                <div className='flex justify-between text-xs sm:text-sm text-slate-600'>
                  <span>Impostos</span>
                  <span className='font-medium'>R$ 0,00</span>
                </div>
                <div className='border-t-2 border-slate-300 pt-2.5 sm:pt-3 mt-2'>
                  <div className='flex justify-between text-base sm:text-lg font-bold text-slate-900'>
                    <span>Total</span>
                    <span className='text-purple-600'>{formatToBRL(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Secure Payment */}
              <div className='mb-4 sm:mb-5 border-b border-slate-200 pb-4 sm:pb-5'>
                <button
                  onClick={() => setSecurePaymentExpanded(!securePaymentExpanded)}
                  className='flex items-center justify-between w-full text-left hover:text-purple-600 transition-colors'
                >
                  <h4 className='text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2'>
                    <Shield className='w-4 h-4 text-purple-600' />
                    Pagamento seguro
                  </h4>
                  {securePaymentExpanded ? (
                    <ChevronUp className='w-4 h-4 text-slate-400' />
                  ) : (
                    <ChevronDown className='w-4 h-4 text-slate-400' />
                  )}
                </button>
                {securePaymentExpanded && (
                  <div className='mt-3 text-xs sm:text-sm text-slate-600 bg-purple-50 rounded-lg p-3'>
                    <p className='mb-2'>
                      Sua segurança é muito importante para o Lunar Brechó, por isso garantimos o
                      mais alto nível de segurança em todas as nossas transações.
                    </p>
                    <div className='flex gap-2 items-center'>
                      <CreditCard className='w-5 h-5 text-purple-600' />
                      <span className='text-xs font-medium text-purple-700'>Pagamento seguro</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Help */}
              <div className='mb-4 sm:mb-5 border-b border-slate-200 pb-4 sm:pb-5'>
                <button
                  onClick={() => setHelpExpanded(!helpExpanded)}
                  className='flex items-center justify-between w-full text-left hover:text-purple-600 transition-colors'
                >
                  <h4 className='text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2'>
                    <HelpCircle className='w-4 h-4 text-purple-600' />
                    Precisa de ajuda? Contate-nos
                  </h4>
                  {helpExpanded ? (
                    <ChevronUp className='w-4 h-4 text-slate-400' />
                  ) : (
                    <ChevronDown className='w-4 h-4 text-slate-400' />
                  )}
                </button>
                {helpExpanded && (
                  <div className='mt-3 text-xs sm:text-sm text-slate-600 bg-sky-50 rounded-lg p-3'>
                    <p>Entre em contato conosco pelo WhatsApp ou e-mail.</p>
                  </div>
                )}
              </div>

              {/* View Cart Button */}
              <button
                onClick={() => {
                  trackButtonClick('view_cart', 'checkout', {
                    cart_items_count: items.length,
                  });
                  trackCartAction('view_cart', {
                    cart_items_count: items.length,
                  });
                  openCartDrawer();
                }}
                className='w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 sm:py-3 rounded-lg font-medium transition-colors mb-3 sm:mb-4 text-sm sm:text-base border border-slate-200'
              >
                <Package className='w-4 h-4 sm:w-5 sm:h-5' />
                Ver Carrinho de Compras
              </button>

              {/* Continue Button */}
              <button
                onClick={handleProceedToConfirmation}
                className='w-full bg-gray-900 hover:bg-gray-800 text-white py-3 sm:py-3.5 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg text-sm sm:text-base'
              >
                PROSSEGUIR PARA O PAGAMENTO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
