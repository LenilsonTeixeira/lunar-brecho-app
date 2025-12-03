import { useState } from 'react';
import { Plus, X, Package, User, MapPin, CreditCard, Store, Truck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { orderService } from '../../services/order/OrderService';
import { OrderRequest } from '../../services/types';

interface OrderItem {
  id: string;
  externalId: string;
  name: string;
  brand: string;
  size: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

const AddOrder = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [deliveryType, setDeliveryType] = useState<'STORE_PICKUP' | 'HOME_DELIVERY'>(
    'HOME_DELIVERY',
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH'>(
    'PIX',
  );
  const [orderStatus, setOrderStatus] = useState<
    'PENDING' | 'APPROVED' | 'SENT' | 'DELIVERED' | 'CANCELLED'
  >('PENDING');

  const [items, setItems] = useState<OrderItem[]>([
    {
      id: 'temp-1',
      externalId: '',
      name: '',
      brand: '',
      size: '',
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    },
  ]);

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const addItem = () => {
    const newId = `temp-${Date.now()}`;
    setItems([
      ...items,
      {
        id: newId,
        externalId: '',
        name: '',
        brand: '',
        size: '',
        quantity: 1,
        unitPrice: 0,
        subtotal: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.subtotal = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      }),
    );
  };

  const updateAddress = (field: string, value: string) => {
    setDeliveryAddress({ ...deliveryAddress, [field]: value });
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.subtotal;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (deliveryType === 'HOME_DELIVERY') {
      const requiredFields = ['street', 'number', 'neighborhood', 'city', 'state', 'zipCode'];
      const missingFields = requiredFields.filter(
        (field) => !deliveryAddress[field as keyof typeof deliveryAddress],
      );

      if (missingFields.length > 0) {
        alert('Por favor, preencha todos os campos obrigatórios do endereço de entrega.');
        return;
      }
    }

    // Validar itens
    const invalidItems = items.filter(
      (item) => !item.name.trim() || !item.externalId.trim() || item.unitPrice <= 0,
    );
    if (invalidItems.length > 0) {
      alert('Por favor, preencha corretamente todos os itens.');
      return;
    }

    try {
      setSaving(true);

      const orderRequest: OrderRequest = {
        customer: {
          id: '', // Será gerado pelo backend
          fullName: customerName,
          email: customerEmail,
          phone: customerPhone,
        },
        items: items.map((item) => ({
          id: item.id,
          externalId: item.externalId,
          name: item.name,
          mainImageUrl: '',
          mainImageThumbnailUrl: '',
          brand: item.brand,
          size: item.size,
          quantity: item.quantity,
          discountApplied: 0,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal,
        })),
        financialSummary: {
          subtotal: calculateTotal(),
          totalAmount: calculateTotal(),
          deliveryFee: 0,
          discountAmount: 0,
        },
        status: orderStatus,
        deliveryType,
        deliveryAddress:
          deliveryType === 'HOME_DELIVERY'
            ? {
                id: '',
                street: deliveryAddress.street,
                number: deliveryAddress.number,
                complement: deliveryAddress.complement,
                neighborhood: deliveryAddress.neighborhood,
                city: deliveryAddress.city,
                state: deliveryAddress.state,
                zipCode: deliveryAddress.zipCode,
              }
            : {
                id: '',
                street: 'Retirada na Loja',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                zipCode: '',
              },
        paymentMethod,
      };

      await orderService.createOrder(orderRequest);
      alert('Pedido criado com sucesso!');
      navigate('/admin/pedidos');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao criar pedido. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>Novo Pedido</h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Preencha as informações do pedido abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Customer Information */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações do Cliente</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='customer-name'>
                  Nome Completo *
                </label>
                <input
                  id='customer-name'
                  type='text'
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder='Digite o nome completo'
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
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder='(11) 99999-9999'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='customer-email'>
                  Email *
                </label>
                <input
                  id='customer-email'
                  type='email'
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder='email@exemplo.com'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                />
              </div>
            </div>
          </div>

          {/* Products - Dynamic Management */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <Package className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Produtos</h3>
              </div>
              <button
                type='button'
                onClick={addItem}
                className='flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300'
              >
                <Plus className='w-4 h-4' />
                Adicionar Item
              </button>
            </div>

            <div className='space-y-4'>
              {items.map((item, index) => (
                <div key={item.id} className='p-4 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center justify-between mb-3'>
                    <h4 className='text-sm font-semibold text-slate-800'>Item {index + 1}</h4>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
                    <div className='md:col-span-2 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Código do Item *
                      </label>
                      <input
                        type='text'
                        value={item.externalId}
                        onChange={(e) => updateItem(item.id, 'externalId', e.target.value)}
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='md:col-span-3 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Nome do Item *
                      </label>
                      <input
                        type='text'
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='md:col-span-2 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>Marca</label>
                      <input
                        type='text'
                        value={item.brand}
                        onChange={(e) => updateItem(item.id, 'brand', e.target.value)}
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      />
                    </div>

                    <div className='md:col-span-1 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Tamanho
                      </label>
                      <input
                        type='text'
                        value={item.size}
                        onChange={(e) => updateItem(item.id, 'size', e.target.value)}
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      />
                    </div>

                    <div className='md:col-span-1 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>Qtd *</label>
                      <input
                        type='number'
                        min='1'
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)
                        }
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='md:col-span-2 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Preço (R$) *
                      </label>
                      <input
                        type='number'
                        min='0'
                        step='0.01'
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)
                        }
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='md:col-span-1 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        &nbsp;
                      </label>
                      {items.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeItem(item.id)}
                          className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                          aria-label='Remover item'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className='mt-3 text-right'>
                    <span className='text-sm font-medium text-slate-600'>
                      Subtotal: {formatPrice(item.subtotal)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className='mt-4 p-4 bg-purple-50 rounded-lg'>
              <div className='flex justify-between items-center'>
                <span className='text-lg font-semibold text-slate-800'>Total do Pedido:</span>
                <span className='text-xl font-bold text-purple-600'>
                  {formatPrice(calculateTotal())}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Type Selection */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Truck className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Tipo de Entrega</h3>
            </div>

            <div className='flex items-center gap-6'>
              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='radio'
                  name='deliveryType'
                  value='HOME_DELIVERY'
                  checked={deliveryType === 'HOME_DELIVERY'}
                  onChange={(e) =>
                    setDeliveryType(e.target.value as 'HOME_DELIVERY' | 'STORE_PICKUP')
                  }
                  className='w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500'
                />
                <div className='flex items-center gap-2'>
                  <Truck className='w-4 h-4 text-purple-600' />
                  <span className='text-sm font-medium text-slate-700'>Entrega em Domicílio</span>
                </div>
              </label>

              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='radio'
                  name='deliveryType'
                  value='STORE_PICKUP'
                  checked={deliveryType === 'STORE_PICKUP'}
                  onChange={(e) =>
                    setDeliveryType(e.target.value as 'HOME_DELIVERY' | 'STORE_PICKUP')
                  }
                  className='w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500'
                />
                <div className='flex items-center gap-2'>
                  <Store className='w-4 h-4 text-purple-600' />
                  <span className='text-sm font-medium text-slate-700'>Retirada na Loja</span>
                </div>
              </label>
            </div>

            {deliveryType === 'STORE_PICKUP' && (
              <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                <div className='flex items-start gap-3'>
                  <Store className='w-5 h-5 text-blue-600 mt-0.5' />
                  <div>
                    <h4 className='text-sm font-semibold text-blue-800 mb-1'>Retirada na Loja</h4>
                    <p className='text-sm text-blue-700'>
                      O cliente retirará o pedido diretamente em nossa loja física. Não é necessário
                      preencher endereço de entrega.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Address - Conditional */}
          {deliveryType === 'HOME_DELIVERY' && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <MapPin className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Endereço de Entrega</h3>
              </div>

              <div className='space-y-4'>
                {/* CEP and Street */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-slate-600' htmlFor='zipCode'>
                      CEP *
                    </label>
                    <input
                      id='zipCode'
                      type='text'
                      value={deliveryAddress.zipCode}
                      onChange={(e) => updateAddress('zipCode', e.target.value)}
                      placeholder='00000-000'
                      className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-slate-600' htmlFor='street'>
                      Rua *
                    </label>
                    <input
                      id='street'
                      type='text'
                      value={deliveryAddress.street}
                      onChange={(e) => updateAddress('street', e.target.value)}
                      placeholder='Nome da rua'
                      className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>
                </div>

                {/* Number and Complement */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-slate-600' htmlFor='number'>
                      Número *
                    </label>
                    <input
                      id='number'
                      type='text'
                      value={deliveryAddress.number}
                      onChange={(e) => updateAddress('number', e.target.value)}
                      placeholder='123'
                      className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-slate-600' htmlFor='complement'>
                      Complemento
                    </label>
                    <input
                      id='complement'
                      type='text'
                      value={deliveryAddress.complement}
                      onChange={(e) => updateAddress('complement', e.target.value)}
                      placeholder='Apartamento, bloco, etc.'
                      className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    />
                  </div>
                </div>

                {/* Neighborhood and City */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-slate-600' htmlFor='neighborhood'>
                      Bairro *
                    </label>
                    <input
                      id='neighborhood'
                      type='text'
                      value={deliveryAddress.neighborhood}
                      onChange={(e) => updateAddress('neighborhood', e.target.value)}
                      placeholder='Nome do bairro'
                      className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-slate-600' htmlFor='city'>
                      Cidade *
                    </label>
                    <input
                      id='city'
                      type='text'
                      value={deliveryAddress.city}
                      onChange={(e) => updateAddress('city', e.target.value)}
                      placeholder='Nome da cidade'
                      className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>
                </div>

                {/* State */}
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium text-slate-600' htmlFor='state'>
                    Estado *
                  </label>
                  <select
                    id='state'
                    value={deliveryAddress.state}
                    onChange={(e) => updateAddress('state', e.target.value)}
                    className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    required
                  >
                    <option value=''>Selecione o estado</option>
                    <option value='SP'>São Paulo</option>
                    <option value='RJ'>Rio de Janeiro</option>
                    <option value='MG'>Minas Gerais</option>
                    <option value='RS'>Rio Grande do Sul</option>
                    <option value='PR'>Paraná</option>
                    <option value='SC'>Santa Catarina</option>
                    <option value='BA'>Bahia</option>
                    <option value='GO'>Goiás</option>
                    <option value='PE'>Pernambuco</option>
                    <option value='CE'>Ceará</option>
                    <option value='PA'>Pará</option>
                    <option value='MA'>Maranhão</option>
                    <option value='ES'>Espírito Santo</option>
                    <option value='PB'>Paraíba</option>
                    <option value='MT'>Mato Grosso</option>
                    <option value='MS'>Mato Grosso do Sul</option>
                    <option value='PI'>Piauí</option>
                    <option value='RN'>Rio Grande do Norte</option>
                    <option value='AL'>Alagoas</option>
                    <option value='SE'>Sergipe</option>
                    <option value='RO'>Rondônia</option>
                    <option value='TO'>Tocantins</option>
                    <option value='AC'>Acre</option>
                    <option value='AP'>Amapá</option>
                    <option value='AM'>Amazonas</option>
                    <option value='RR'>Roraima</option>
                    <option value='DF'>Distrito Federal</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <CreditCard className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>
                {deliveryType === 'STORE_PICKUP' ? 'Pagamento e Retirada' : 'Método de Pagamento'}
              </h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='payment-method'>
                  Forma de Pagamento *
                </label>
                <select
                  id='payment-method'
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value as 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH',
                    )
                  }
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value=''>Selecione a forma de pagamento</option>
                  <option value='PIX'>PIX</option>
                  <option value='CREDIT_CARD'>Cartão de Crédito</option>
                  <option value='DEBIT_CARD'>Cartão de Débito</option>
                  <option value='CASH'>Dinheiro</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='order-status'>
                  Status do Pedido
                </label>
                <select
                  id='order-status'
                  value={orderStatus}
                  onChange={(e) =>
                    setOrderStatus(
                      e.target.value as 'PENDING' | 'APPROVED' | 'SENT' | 'DELIVERED' | 'CANCELLED',
                    )
                  }
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='PENDING'>Pendente</option>
                  <option value='APPROVED'>Aprovado</option>
                  <option value='SENT'>Enviado</option>
                  <option value='DELIVERED'>Entregue</option>
                  <option value='CANCELLED'>Cancelado</option>
                </select>
              </div>
            </div>

            {deliveryType === 'STORE_PICKUP' && (
              <div className='mt-4 p-4 bg-green-50 border border-green-200 rounded-lg'>
                <div className='flex items-start gap-3'>
                  <Store className='w-5 h-5 text-green-600 mt-0.5' />
                  <div>
                    <h4 className='text-sm font-semibold text-green-800 mb-1'>
                      Informações de Retirada
                    </h4>
                    <p className='text-sm text-green-700 mb-2'>
                      O cliente deve apresentar documento de identificação e comprovante de
                      pagamento na retirada.
                    </p>
                    <div className='text-xs text-green-600'>
                      <p>
                        <strong>Horário de Funcionamento:</strong> Segunda a Sexta, 9h às 18h
                      </p>
                      <p>
                        <strong>Prazo para Retirada:</strong> 7 dias após a confirmação do pedido
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              disabled={saving}
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {saving ? 'Criando...' : 'Criar Pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
