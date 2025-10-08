import { useState } from 'react';
import { Plus, X, Package, User, MapPin, CreditCard, Store, Truck } from 'lucide-react';

interface OrderProduct {
  id: number;
  name: string;
  code: string;
  size: string;
  quantity: number;
  price: number;
}

interface OrderAddress {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

const AddOrder = () => {
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderStatus, setOrderStatus] = useState('pendente');

  const [products, setProducts] = useState<OrderProduct[]>([
    {
      id: 1,
      name: '',
      code: '',
      size: '',
      quantity: 1,
      price: 0,
    },
  ]);

  const [deliveryAddress, setDeliveryAddress] = useState<OrderAddress>({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const addProduct = () => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts([
      ...products,
      {
        id: newId,
        name: '',
        code: '',
        size: '',
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const updateProduct = (id: number, field: string, value: string | number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const updateAddress = (field: string, value: string) => {
    setDeliveryAddress({ ...deliveryAddress, [field]: value });
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!customerName.trim() || !customerPhone.trim() || !paymentMethod) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (deliveryType === 'delivery') {
      const requiredFields = ['cep', 'street', 'number', 'neighborhood', 'city', 'state'];
      const missingFields = requiredFields.filter(
        (field) => !deliveryAddress[field as keyof OrderAddress],
      );

      if (missingFields.length > 0) {
        alert('Por favor, preencha todos os campos obrigatórios do endereço de entrega.');
        return;
      }
    }

    // Validar produtos
    const invalidProducts = products.filter(
      (p) => !p.name.trim() || !p.code.trim() || p.price <= 0,
    );
    if (invalidProducts.length > 0) {
      alert('Por favor, preencha corretamente todos os produtos.');
      return;
    }

    // Simular criação do pedido
    const newOrder = {
      id: Date.now(),
      orderNumber: `#${Date.now()}`,
      customer: customerName,
      customerPhone,
      products,
      total: calculateTotal(),
      status: orderStatus,
      orderDate: new Date().toISOString(),
      paymentMethod,
      deliveryAddress:
        deliveryType === 'delivery'
          ? `${deliveryAddress.street}, ${deliveryAddress.number} - ${deliveryAddress.neighborhood}, ${deliveryAddress.city}/${deliveryAddress.state}`
          : 'Retirada na Loja',
      deliveryType,
      address: deliveryType === 'delivery' ? deliveryAddress : undefined,
    };

    console.log('Novo pedido criado:', newOrder);
    alert('Pedido criado com sucesso!');

    // Limpar formulário
    setCustomerName('');
    setCustomerPhone('');
    setPaymentMethod('');
    setOrderStatus('pendente');
    setDeliveryType('delivery');
    setProducts([
      {
        id: 1,
        name: '',
        code: '',
        size: '',
        quantity: 1,
        price: 0,
      },
    ]);
    setDeliveryAddress({
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    });
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

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                onClick={addProduct}
                className='flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300'
              >
                <Plus className='w-4 h-4' />
                Adicionar Produto
              </button>
            </div>

            <div className='space-y-4'>
              {products.map((productItem, index) => (
                <div
                  key={productItem.id}
                  className='p-4 bg-white rounded-lg border border-slate-200'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <h4 className='text-sm font-semibold text-slate-800'>Produto {index + 1}</h4>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
                    <div className='md:col-span-2 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Código do Produto *
                      </label>
                      <input
                        type='text'
                        value={productItem.code}
                        onChange={(e) => updateProduct(productItem.id, 'code', e.target.value)}
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='md:col-span-5 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Nome do Produto *
                      </label>
                      <input
                        type='text'
                        value={productItem.name}
                        onChange={(e) => updateProduct(productItem.id, 'name', e.target.value)}
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='md:col-span-1 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        Tamanho
                      </label>
                      <input
                        type='text'
                        value={productItem.size}
                        onChange={(e) => updateProduct(productItem.id, 'size', e.target.value)}
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      />
                    </div>

                    <div className='md:col-span-1 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>Qtd *</label>
                      <input
                        type='number'
                        min='1'
                        value={productItem.quantity}
                        onChange={(e) =>
                          updateProduct(productItem.id, 'quantity', parseInt(e.target.value) || 1)
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
                        value={productItem.price}
                        onChange={(e) =>
                          updateProduct(productItem.id, 'price', parseFloat(e.target.value) || 0)
                        }
                        className='outline-none py-2 px-3 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                        required
                      />
                    </div>

                    <div className='md:col-span-1 flex flex-col gap-2'>
                      <label className='text-xs sm:text-sm font-medium text-slate-600'>
                        &nbsp;
                      </label>
                      {products.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeProduct(productItem.id)}
                          className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                          aria-label='Remover produto'
                        >
                          <X className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className='mt-3 text-right'>
                    <span className='text-sm font-medium text-slate-600'>
                      Subtotal: {formatPrice(productItem.quantity * productItem.price)}
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
                  value='delivery'
                  checked={deliveryType === 'delivery'}
                  onChange={(e) => setDeliveryType(e.target.value as 'delivery' | 'pickup')}
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
                  value='pickup'
                  checked={deliveryType === 'pickup'}
                  onChange={(e) => setDeliveryType(e.target.value as 'delivery' | 'pickup')}
                  className='w-4 h-4 text-purple-600 border-slate-300 focus:ring-purple-500'
                />
                <div className='flex items-center gap-2'>
                  <Store className='w-4 h-4 text-purple-600' />
                  <span className='text-sm font-medium text-slate-700'>Retirada na Loja</span>
                </div>
              </label>
            </div>

            {deliveryType === 'pickup' && (
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
          {deliveryType === 'delivery' && (
            <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
              <div className='flex items-center gap-3 mb-4'>
                <MapPin className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Endereço de Entrega</h3>
              </div>

              <div className='space-y-4'>
                {/* CEP and Street */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-medium text-slate-600' htmlFor='cep'>
                      CEP *
                    </label>
                    <input
                      id='cep'
                      type='text'
                      value={deliveryAddress.cep}
                      onChange={(e) => updateAddress('cep', e.target.value)}
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
                {deliveryType === 'pickup' ? 'Pagamento e Retirada' : 'Método de Pagamento'}
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
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value=''>Selecione a forma de pagamento</option>
                  <option value='PIX'>PIX</option>
                  <option value='Cartão de Crédito'>Cartão de Crédito</option>
                  <option value='Cartão de Débito'>Cartão de Débito</option>
                  <option value='Dinheiro'>Dinheiro</option>
                  <option value='Transferência Bancária'>Transferência Bancária</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='order-status'>
                  Status do Pedido
                </label>
                <select
                  id='order-status'
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='pendente'>Pendente</option>
                  <option value='aprovado'>Aprovado</option>
                  <option value='enviado'>Enviado</option>
                  <option value='entregue'>Entregue</option>
                  <option value='cancelado'>Cancelado</option>
                </select>
              </div>
            </div>

            {deliveryType === 'pickup' && (
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
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Criar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
