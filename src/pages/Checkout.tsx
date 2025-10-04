import { useState } from 'react';
import { Link } from 'react-router';
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
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatToBRL } from '../utils/priceUtils';

const Checkout = () => {
  const { items, totalPrice } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [securePaymentExpanded, setSecurePaymentExpanded] = useState(false);
  const [helpExpanded, setHelpExpanded] = useState(false);
  const [shippingExpanded, setShippingExpanded] = useState(false);

  const deliveryFee = deliveryMethod === 'delivery' ? 5 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const handleZipCodeValidation = () => {
    // Simular validação de CEP
    if (zipCode.length === 8) {
      setAddress('Rua Exemplo, 123');
    }
  };

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6'>
          <div className='text-center py-16 sm:py-24'>
            <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-6'>
              Seu carrinho está vazio
            </h1>
            <p className='text-slate-600 mb-8 sm:mb-10 text-base sm:text-lg px-4'>
              Adicione alguns produtos para continuar com o checkout!
            </p>
            <Link
              to='/'
              className='inline-flex items-center gap-2 sm:gap-3 bg-sky-500 hover:bg-sky-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg font-medium'
            >
              <ArrowLeft className='w-5 h-5 sm:w-6 sm:h-6' />
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <div className='border-b border-slate-200 bg-white sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='text-2xl font-bold text-slate-900'>
              LUNAR BRECHÓ
            </Link>
            <Link
              to='/carrinho'
              className='flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors'
            >
              <ArrowLeft className='w-5 h-5' />
              <span>Voltar ao Carrinho</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className='bg-slate-50 border-b border-slate-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3'>
          <div className='flex items-center gap-2 text-sm'>
            <span className='text-sky-600 font-medium'>1. Envio</span>
            <span className='text-slate-400'>&gt;</span>
            <span className='text-slate-400'>2. Forma de pagamento</span>
            <span className='text-slate-400'>&gt;</span>
            <span className='text-slate-400'>3. Confirmação do pedido</span>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Left Column - Form */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Delivery Method */}
            <div className='bg-white border border-slate-200 rounded-lg p-6'>
              <h2 className='text-lg font-semibold text-slate-900 mb-4'>
                1. Como gostaria de receber seu pedido?
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    deliveryMethod === 'delivery'
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='delivery'
                    value='delivery'
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'delivery' | 'pickup')}
                    className='mr-3 text-slate-900 focus:ring-slate-900'
                  />
                  <div className='flex items-center gap-3'>
                    <Truck className='w-5 h-5 text-slate-600' />
                    <div>
                      <div className='font-medium text-slate-900'>Entregar no seu endereço</div>
                      <div className='text-sm text-slate-500'>Taxa de R$ 5,00</div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='delivery'
                    value='pickup'
                    checked={deliveryMethod === 'pickup'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'delivery' | 'pickup')}
                    className='mr-3 text-slate-900 focus:ring-slate-900'
                  />
                  <div className='flex items-center gap-3'>
                    <Store className='w-5 h-5 text-slate-600' />
                    <div>
                      <div className='font-medium text-slate-900'>Retirar na loja</div>
                      <div className='text-sm text-slate-500'>Grátis</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className='bg-white border border-slate-200 rounded-lg p-6'>
              <h3 className='text-sm font-semibold text-slate-700 mb-2'>Campos obrigatórios *</h3>
              <h4 className='text-lg font-semibold text-slate-900 mb-2'>Informações de contato</h4>
              <p className='text-sm text-slate-600 mb-6'>
                Insira seu e-mail. Se você já tiver uma conta, poderá fazer o login. Se você não
                tiver uma conta, poderá prosseguir como visitante e optar por concluir seu cadastro
                após a finalização da compra.
              </p>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>E-mail*</label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent'
                    placeholder='seu@email.com'
                  />
                </div>

                <label className='flex items-start gap-3'>
                  <input
                    type='checkbox'
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    className='mt-1 text-slate-900 focus:ring-slate-900'
                  />
                  <span className='text-sm text-slate-600'>
                    Desejo receber a newsletter e outras comunicações de marketing, conforme
                    estabelecido na{' '}
                    <span className='font-semibold text-slate-900'>Política de Privacidade</span>.
                    Você pode cancelar sua inscrição a qualquer momento clicando no link de
                    cancelamento de assinatura em qualquer comunicação eletrônica comercial ou
                    enviando um e-mail para contato@lunarbrecho.com.
                  </span>
                </label>
              </div>
            </div>

            {/* Delivery Address */}
            {deliveryMethod === 'delivery' && (
              <div className='bg-white border border-slate-200 rounded-lg p-6'>
                <h4 className='text-lg font-semibold text-slate-900 mb-2'>Endereço de entrega</h4>
                <div className='flex items-center gap-2 mb-4'>
                  <MapPin className='w-4 h-4 text-slate-600' />
                  <span className='text-sm text-slate-600'>Local: Brasil</span>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>Nome*</label>
                    <input
                      type='text'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Sobrenome*
                    </label>
                    <input
                      type='text'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent'
                    />
                  </div>
                </div>

                <div className='mt-4'>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>CEP*</label>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className='flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent'
                      placeholder='00000-000'
                      maxLength={9}
                    />
                    <button
                      onClick={handleZipCodeValidation}
                      className='px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium'
                    >
                      VALIDAR CEP
                    </button>
                  </div>
                </div>

                {address && (
                  <div className='mt-4'>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Endereço*
                    </label>
                    <input
                      type='text'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent'
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-slate-50 rounded-lg p-6 sticky top-24'>
              <h3 className='text-lg font-semibold text-slate-900 mb-6'>Resumo do seu pedido</h3>

              {/* Products */}
              <div className='space-y-4 mb-6'>
                {items.map((item) => (
                  <div key={item.id} className='flex gap-3'>
                    <div className='w-16 h-16 rounded-lg overflow-hidden flex-shrink-0'>
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
                      <h4 className='text-sm font-medium text-slate-900 line-clamp-2'>
                        {item.snapshot.name}
                      </h4>
                      <p className='text-xs text-slate-500 mt-1'>{item.snapshot.size}</p>
                      <p className='text-xs text-slate-500'>Qtd: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className='space-y-3 mb-6'>
                <div className='flex justify-between text-sm text-slate-600'>
                  <span>Subtotal</span>
                  <span>{formatToBRL(totalPrice / 0.95)}</span>
                </div>
                <div className='flex justify-between text-sm text-emerald-600'>
                  <span>Desconto PIX (5%)</span>
                  <span>-{formatToBRL(totalPrice / 0.95 - totalPrice)}</span>
                </div>
                <div className='flex justify-between text-sm text-slate-600'>
                  <span>{deliveryMethod === 'delivery' ? 'Envio padrão' : 'Retirada na loja'}</span>
                  <span>{deliveryFee === 0 ? 'Grátis' : formatToBRL(deliveryFee)}</span>
                </div>
                <div className='flex justify-between text-sm text-slate-600'>
                  <span>Impostos</span>
                  <span>R$ 0,00</span>
                </div>
                <div className='border-t border-slate-300 pt-3'>
                  <div className='flex justify-between text-lg font-bold text-slate-900'>
                    <span>Total</span>
                    <span>{formatToBRL(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Secure Payment */}
              <div className='mb-6'>
                <button
                  onClick={() => setSecurePaymentExpanded(!securePaymentExpanded)}
                  className='flex items-center justify-between w-full text-left'
                >
                  <h4 className='text-sm font-semibold text-slate-900 flex items-center gap-2'>
                    <Shield className='w-4 h-4' />
                    Pagamento seguro
                  </h4>
                  {securePaymentExpanded ? (
                    <ChevronUp className='w-4 h-4 text-slate-600' />
                  ) : (
                    <ChevronDown className='w-4 h-4 text-slate-600' />
                  )}
                </button>
                {securePaymentExpanded && (
                  <div className='mt-3 text-sm text-slate-600'>
                    <p className='mb-3'>
                      Sua segurança é muito importante para o Lunar Brechó, por isso garantimos o
                      mais alto nível de segurança em todas as nossas transações.
                    </p>
                    <div className='flex gap-2'>
                      <CreditCard className='w-6 h-4 text-slate-400' />
                      <span className='text-xs text-slate-500'>Pagamento seguro</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Help */}
              <div className='mb-6'>
                <button
                  onClick={() => setHelpExpanded(!helpExpanded)}
                  className='flex items-center justify-between w-full text-left'
                >
                  <h4 className='text-sm font-semibold text-slate-900 flex items-center gap-2'>
                    <HelpCircle className='w-4 h-4' />
                    Precisa de ajuda? Contate-nos
                  </h4>
                  {helpExpanded ? (
                    <ChevronUp className='w-4 h-4 text-slate-600' />
                  ) : (
                    <ChevronDown className='w-4 h-4 text-slate-600' />
                  )}
                </button>
                {helpExpanded && (
                  <div className='mt-3 text-sm text-slate-600'>
                    <p>Entre em contato conosco pelo WhatsApp ou e-mail.</p>
                  </div>
                )}
              </div>

              {/* Shipping/Returns */}
              <div className='mb-6'>
                <button
                  onClick={() => setShippingExpanded(!shippingExpanded)}
                  className='flex items-center justify-between w-full text-left'
                >
                  <h4 className='text-sm font-semibold text-slate-900 flex items-center gap-2'>
                    <Package className='w-4 h-4' />
                    Frete e devolução gratuitos
                  </h4>
                  {shippingExpanded ? (
                    <ChevronUp className='w-4 h-4 text-slate-600' />
                  ) : (
                    <ChevronDown className='w-4 h-4 text-slate-600' />
                  )}
                </button>
                {shippingExpanded && (
                  <div className='mt-3 text-sm text-slate-600'>
                    <p>Frete grátis para compras acima de R$ 100,00.</p>
                  </div>
                )}
              </div>

              {/* Continue Button */}
              <button className='w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors'>
                Continuar para Pagamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
