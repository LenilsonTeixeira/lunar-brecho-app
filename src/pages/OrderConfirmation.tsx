import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  ArrowLeft,
  MapPin,
  Truck,
  Store,
  CreditCard,
  Wallet,
  Banknote,
  Edit3,
  X,
  Check,
  User,
  Phone,
  Package,
  Shield,
  Clock,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatToBRL } from '../utils/priceUtils';
import { customerService, orderService } from '../services';
import { CustomerRequest, OrderRequest } from '../services/types';
import { formatOrderForWhatsApp } from '../utils/orderFormatter';

const OrderConfirmation = () => {
  const { items, totalPrice, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Receber dados do Checkout via location state
  const [orderData, setOrderData] = useState({
    whatsapp: '',
    firstName: '',
    lastName: '',
    deliveryMethod: 'delivery',
    paymentMethod: 'pix',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    complement: '',
    customerId: null as string | null,
  });

  // Estado para edição
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  const [editedAddress, setEditedAddress] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    complement: '',
  });

  const [editedContact, setEditedContact] = useState({
    firstName: '',
    lastName: '',
    whatsapp: '',
  });

  // Carregar dados do Checkout ao montar o componente
  useEffect(() => {
    if (location.state && location.state.orderData) {
      const data = location.state.orderData;
      setOrderData(data);
      setEditedAddress({
        street: data.street,
        number: data.number,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        complement: data.complement,
      });
      setEditedContact({
        firstName: data.firstName,
        lastName: data.lastName,
        whatsapp: data.whatsapp,
      });
    } else {
      navigate('/checkout');
    }
  }, [location.state, navigate]);

  const calculateItemPrice = (item: {
    basePrice: number;
    discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'NONE';
    discountValue?: number;
  }) => {
    if (item.discountType === 'NONE' || !item.discountValue) {
      return item.basePrice;
    }
    if (item.discountType === 'PERCENTAGE') {
      return item.basePrice - (item.basePrice * item.discountValue) / 100;
    }
    if (item.discountType === 'FIXED_AMOUNT') {
      return Math.max(0, item.basePrice - item.discountValue);
    }
    return item.basePrice;
  };

  const deliveryFee = orderData.deliveryMethod === 'delivery' ? 5 : 0;
  const pixDiscount = orderData.paymentMethod === 'pix' ? 0.05 : 0;
  const subtotal = totalPrice;
  const discountAmount = subtotal * pixDiscount;
  const totalWithDiscount = subtotal - discountAmount;
  const finalTotal = totalWithDiscount + deliveryFee;

  const handleSaveAddress = () => {
    if (
      !editedAddress.street ||
      !editedAddress.number ||
      !editedAddress.neighborhood ||
      !editedAddress.city ||
      !editedAddress.state
    ) {
      alert('Por favor, preencha todos os campos obrigatórios do endereço.');
      return;
    }
    setOrderData({ ...orderData, ...editedAddress });
    setIsEditingAddress(false);
  };

  const handleSaveContact = () => {
    if (!editedContact.firstName || !editedContact.lastName || !editedContact.whatsapp) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setOrderData({
      ...orderData,
      firstName: editedContact.firstName,
      lastName: editedContact.lastName,
      whatsapp: editedContact.whatsapp,
    });
    setIsEditingContact(false);
  };

  const handleCancelEditAddress = () => {
    setEditedAddress({
      street: orderData.street,
      number: orderData.number,
      neighborhood: orderData.neighborhood,
      city: orderData.city,
      state: orderData.state,
      zipCode: orderData.zipCode,
      complement: orderData.complement,
    });
    setIsEditingAddress(false);
  };

  const handleCancelEditContact = () => {
    setEditedContact({
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      whatsapp: orderData.whatsapp,
    });
    setIsEditingContact(false);
  };

  const handleConfirmOrder = async () => {
    try {
      // Criar/Atualizar cliente antes de confirmar pedido
      const fullName = `${orderData.firstName} ${orderData.lastName}`.trim();
      const customerRequest: CustomerRequest = {
        name: fullName,
        phone: orderData.whatsapp.replace(/\D/g, ''),
        addresses:
          orderData.deliveryMethod === 'delivery'
            ? [
                {
                  street: orderData.street,
                  number: orderData.number,
                  complement: orderData.complement || undefined,
                  neighborhood: orderData.neighborhood || undefined,
                  city: orderData.city || undefined,
                  state: orderData.state || undefined,
                  zipCode: orderData.zipCode || undefined,
                  type: 'HOME',
                  isDefault: true,
                },
              ]
            : [],
      };

      let customerId = orderData.customerId;
      if (customerId) {
        await customerService.updateCustomer(customerId, customerRequest);
      } else {
        const created = await customerService.createCustomer(customerRequest);
        customerId = created.id;
      }

      // Criar pedido no backend
      const orderRequest: OrderRequest = {
        customer: {
          id: customerId,
          fullName: fullName,
          email: '', // Não temos email no formulário atual
          phone: orderData.whatsapp.replace(/\D/g, ''),
        },
        items: items.map((item) => {
          const itemPrice = calculateItemPrice(item.snapshot);
          const orderItem = {
            id: item.productId,
            externalId: item.productExternalId,
            name: item.snapshot.name,
            mainImageUrl: item.snapshot.mainImageUrl || '',
            mainImageThumbnailUrl: item.snapshot.mainThumbnailUrl || '',
            brand: item.snapshot.brand || '',
            size: item.snapshot.size,
            quantity: item.quantity,
            discountApplied:
              item.snapshot.discountType === 'PERCENTAGE'
                ? (item.snapshot.basePrice * (item.snapshot.discountValue || 0)) / 100
                : item.snapshot.discountValue || 0,
            unitPrice: itemPrice,
            subtotal: itemPrice * item.quantity,
          };

          return orderItem;
        }),
        financialSummary: {
          subtotal: subtotal,
          totalAmount: finalTotal,
          deliveryFee: deliveryFee,
          discountAmount: discountAmount,
        },
        status: 'PENDING',
        deliveryType: orderData.deliveryMethod === 'delivery' ? 'HOME_DELIVERY' : 'STORE_PICKUP',
        deliveryAddress: {
          id: '', // Será gerado pelo backend
          street: orderData.street,
          number: orderData.number,
          complement: orderData.complement || '',
          neighborhood: orderData.neighborhood || '',
          city: orderData.city || '',
          state: orderData.state || '',
          zipCode: orderData.zipCode || '',
        },
        paymentMethod:
          orderData.paymentMethod === 'pix'
            ? 'PIX'
            : orderData.paymentMethod === 'card'
              ? 'CREDIT_CARD'
              : 'CASH',
      };

      const createdOrder = await orderService.createOrder(orderRequest);

      // Formatar mensagem para WhatsApp usando o orderFormatter
      const formattedMessage = formatOrderForWhatsApp(createdOrder);

      // Enviar mensagem para WhatsApp
      const phoneNumber = '34996962488'; // Número fixo da loja
      const encodedMessage = encodeURIComponent(formattedMessage);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=55${phoneNumber}&text=${encodedMessage}`;

      // Debug: Log the message and URL
      // eslint-disable-next-line no-console
      console.log('Mensagem original:', formattedMessage);
      // eslint-disable-next-line no-console
      console.log('URL WhatsApp:', whatsappUrl);

      // Abrir WhatsApp
      window.open(whatsappUrl, '_blank');

      clearCart();
      alert('Pedido confirmado com sucesso! WhatsApp aberto para envio da mensagem.');
      navigate('/');
    } catch (error) {
      console.error('Erro ao confirmar pedido:', error);
      alert('Erro ao confirmar pedido. Tente novamente.');
    }
  };

  const getPaymentMethodName = () => {
    switch (orderData.paymentMethod) {
      case 'pix':
        return 'PIX';
      case 'card':
        return 'Cartão de Crédito/Débito';
      case 'cash':
        return 'Dinheiro';
      default:
        return '';
    }
  };

  const getPaymentIcon = () => {
    switch (orderData.paymentMethod) {
      case 'pix':
        return <Wallet className='w-5 h-5' />;
      case 'card':
        return <CreditCard className='w-5 h-5' />;
      case 'cash':
        return <Banknote className='w-5 h-5' />;
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30'>
      {/* Header */}
      <div className='bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-10'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 py-4'>
          <div className='flex items-center justify-between'>
            <Link
              to='/checkout'
              state={{ orderData }}
              className='flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              <span className='text-sm font-medium'>Voltar</span>
            </Link>
            <div className='flex items-center gap-3 text-sm'>
              <div className='flex items-center gap-1.5'>
                <div className='w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold'>
                  ✓
                </div>
                <span className='text-slate-400 hidden sm:inline'>Pedido</span>
              </div>
              <ChevronRight className='w-4 h-4 text-slate-300' />
              <div className='flex items-center gap-1.5'>
                <div className='w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold'>
                  2
                </div>
                <span className='text-purple-600 font-medium'>Confirmação</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10'>
        {/* Title Section */}
        <div className='text-center mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-900 mb-2'>
            Confirme seu Pedido
          </h1>
          <p className='text-slate-600'>
            Confira suas informações e confirme o pedido. Queremos garantir que tudo esteja certinho
            antes de finalizar!
          </p>
        </div>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-4'>
            {/* Contact Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
              <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center'>
                      <User className='w-5 h-5 text-purple-600' />
                    </div>
                    <h3 className='text-lg font-semibold text-slate-900'>Informações de Contato</h3>
                  </div>
                  {!isEditingContact && (
                    <button
                      onClick={() => setIsEditingContact(true)}
                      className='text-purple-600 hover:text-purple-700 transition-colors'
                    >
                      <Edit3 className='w-4 h-4' />
                    </button>
                  )}
                </div>

                {!isEditingContact ? (
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3'>
                      <User className='w-4 h-4 text-slate-400' />
                      <span className='text-slate-900'>
                        {orderData.firstName} {orderData.lastName}
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Phone className='w-4 h-4 text-slate-400' />
                      <span className='text-slate-900'>{orderData.whatsapp}</span>
                    </div>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    <div className='grid grid-cols-2 gap-3'>
                      <div>
                        <label className='block text-xs font-medium text-slate-600 mb-1.5'>
                          Nome
                        </label>
                        <input
                          type='text'
                          value={editedContact.firstName}
                          onChange={(e) =>
                            setEditedContact({ ...editedContact, firstName: e.target.value })
                          }
                          className='w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm'
                        />
                      </div>
                      <div>
                        <label className='block text-xs font-medium text-slate-600 mb-1.5'>
                          Sobrenome
                        </label>
                        <input
                          type='text'
                          value={editedContact.lastName}
                          onChange={(e) =>
                            setEditedContact({ ...editedContact, lastName: e.target.value })
                          }
                          className='w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm'
                        />
                      </div>
                    </div>
                    <div>
                      <label className='block text-xs font-medium text-slate-600 mb-1.5'>
                        WhatsApp
                      </label>
                      <input
                        type='text'
                        value={editedContact.whatsapp}
                        onChange={(e) =>
                          setEditedContact({ ...editedContact, whatsapp: e.target.value })
                        }
                        className='w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm'
                      />
                    </div>
                    <div className='flex gap-2 pt-2'>
                      <button
                        onClick={handleSaveContact}
                        className='flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2'
                      >
                        <Check className='w-4 h-4' />
                        Salvar
                      </button>
                      <button
                        onClick={handleCancelEditContact}
                        className='flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2'
                      >
                        <X className='w-4 h-4' />
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
              <div className='p-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center'>
                    {orderData.deliveryMethod === 'delivery' ? (
                      <Truck className='w-5 h-5 text-purple-600' />
                    ) : (
                      <Store className='w-5 h-5 text-purple-600' />
                    )}
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-slate-900'>
                      {orderData.deliveryMethod === 'delivery'
                        ? 'Entrega em domicílio'
                        : 'Retirada na loja'}
                    </h3>
                    <p className='text-sm text-slate-600'>
                      {orderData.deliveryMethod === 'delivery'
                        ? `Taxa: ${formatToBRL(5)}`
                        : 'Sem taxa adicional'}
                    </p>
                  </div>
                </div>

                {orderData.deliveryMethod === 'delivery' && (
                  <div className='bg-slate-50 rounded-xl p-4'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-2'>
                        <MapPin className='w-4 h-4 text-slate-500' />
                        <span className='text-sm font-medium text-slate-700'>
                          Endereço de entrega
                        </span>
                      </div>
                      {!isEditingAddress && (
                        <button
                          onClick={() => setIsEditingAddress(true)}
                          className='text-purple-600 hover:text-purple-700 transition-colors'
                        >
                          <Edit3 className='w-4 h-4' />
                        </button>
                      )}
                    </div>

                    {!isEditingAddress ? (
                      <div className='space-y-1 text-sm text-slate-600'>
                        <p className='font-medium text-slate-900'>
                          {orderData.street}, {orderData.number}
                          {orderData.complement && ` - ${orderData.complement}`}
                        </p>
                        <p>{orderData.neighborhood}</p>
                        <p>
                          {orderData.city} - {orderData.state}, CEP: {orderData.zipCode}
                        </p>
                      </div>
                    ) : (
                      <div className='space-y-3'>
                        <div className='grid grid-cols-3 gap-2'>
                          <input
                            type='text'
                            placeholder='Rua'
                            value={editedAddress.street}
                            onChange={(e) =>
                              setEditedAddress({ ...editedAddress, street: e.target.value })
                            }
                            className='col-span-2 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                          />
                          <input
                            type='text'
                            placeholder='Número'
                            value={editedAddress.number}
                            onChange={(e) =>
                              setEditedAddress({ ...editedAddress, number: e.target.value })
                            }
                            className='px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                          />
                        </div>
                        <input
                          type='text'
                          placeholder='Complemento'
                          value={editedAddress.complement}
                          onChange={(e) =>
                            setEditedAddress({ ...editedAddress, complement: e.target.value })
                          }
                          className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                        />
                        <input
                          type='text'
                          placeholder='Bairro'
                          value={editedAddress.neighborhood}
                          onChange={(e) =>
                            setEditedAddress({ ...editedAddress, neighborhood: e.target.value })
                          }
                          className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                        />
                        <div className='grid grid-cols-3 gap-2'>
                          <input
                            type='text'
                            placeholder='Cidade'
                            value={editedAddress.city}
                            onChange={(e) =>
                              setEditedAddress({ ...editedAddress, city: e.target.value })
                            }
                            className='px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                          />
                          <input
                            type='text'
                            placeholder='Estado'
                            value={editedAddress.state}
                            onChange={(e) =>
                              setEditedAddress({ ...editedAddress, state: e.target.value })
                            }
                            className='px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                            maxLength={2}
                          />
                          <input
                            type='text'
                            placeholder='CEP'
                            value={editedAddress.zipCode}
                            onChange={(e) =>
                              setEditedAddress({ ...editedAddress, zipCode: e.target.value })
                            }
                            className='px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm'
                          />
                        </div>
                        <div className='flex gap-2 pt-2'>
                          <button
                            onClick={handleSaveAddress}
                            className='flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors text-sm'
                          >
                            Salvar
                          </button>
                          <button
                            onClick={handleCancelEditAddress}
                            className='flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium transition-colors text-sm'
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
              <div className='p-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center'>
                    {getPaymentIcon()}
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-slate-900'>
                      {getPaymentMethodName()}
                    </h3>
                    {orderData.paymentMethod === 'pix' && (
                      <p className='text-sm text-emerald-600 font-medium'>
                        5% de desconto aplicado
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Items Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
              <div className='p-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center'>
                    <Package className='w-5 h-5 text-purple-600' />
                  </div>
                  <h3 className='text-lg font-semibold text-slate-900'>Itens do Pedido</h3>
                </div>

                <div className='space-y-3'>
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex gap-4 ${index < items.length - 1 ? 'pb-3 border-b border-slate-100' : ''}`}
                    >
                      <div className='w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0'>
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
                        <h4 className='text-sm font-medium text-slate-900 mb-1'>
                          {item.snapshot.name}
                        </h4>
                        <p className='text-xs text-slate-500'>
                          Tamanho: {item.snapshot.size} | Qtd: {item.quantity}
                        </p>
                        <p className='text-sm font-semibold text-purple-600 mt-1'>
                          {formatToBRL(calculateItemPrice(item.snapshot) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-20'>
              <h3 className='text-lg font-semibold text-slate-900 mb-4'>Resumo do Pedido</h3>

              <div className='space-y-3 pb-4 border-b border-slate-100'>
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Subtotal</span>
                  <span className='font-medium text-slate-900'>{formatToBRL(subtotal)}</span>
                </div>
                {orderData.paymentMethod === 'pix' && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-emerald-600'>Desconto PIX</span>
                    <span className='font-medium text-emerald-600'>
                      -{formatToBRL(discountAmount)}
                    </span>
                  </div>
                )}
                <div className='flex justify-between text-sm'>
                  <span className='text-slate-600'>Entrega</span>
                  <span className='font-medium text-slate-900'>
                    {deliveryFee === 0 ? 'Grátis' : formatToBRL(deliveryFee)}
                  </span>
                </div>
              </div>

              <div className='flex justify-between items-center pt-4 pb-6'>
                <span className='text-lg font-semibold text-slate-900'>Total</span>
                <span className='text-2xl font-bold text-purple-600'>
                  {formatToBRL(finalTotal)}
                </span>
              </div>

              <button
                onClick={handleConfirmOrder}
                className='w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2'
              >
                <MessageCircle className='w-5 h-5' />
                Confirmar e Enviar WhatsApp
              </button>

              {/* Security Info */}
              <div className='mt-6 pt-6 border-t border-slate-100'>
                <div className='flex items-start gap-3 text-xs text-slate-500'>
                  <Shield className='w-4 h-4 mt-0.5 flex-shrink-0' />
                  <p>
                    Seus dados estão seguros e protegidos. Você receberá uma confirmação via
                    WhatsApp.
                  </p>
                </div>
                <div className='flex items-start gap-3 text-xs text-slate-500 mt-3'>
                  <Clock className='w-4 h-4 mt-0.5 flex-shrink-0' />
                  <p>Tempo estimado de entrega: 3-5 dias úteis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
