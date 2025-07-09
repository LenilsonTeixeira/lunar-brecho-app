import { useState } from 'react';
import { Link } from 'react-router';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, X, Tag, Truck, Store } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatToBRL } from '../utils/priceUtils';

const Cart = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    // Simular aplicação do cupom
    setTimeout(() => {
      setIsApplyingCoupon(false);
      alert('Cupom aplicado com sucesso!');
    }, 1000);
  };

  const deliveryFee = deliveryOption === 'delivery' ? 5 : 0;
  const finalTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className='min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6'>
          <div className='text-center py-16 sm:py-24'>
            <ShoppingBag className='w-20 h-20 sm:w-24 sm:h-24 text-slate-300 mx-auto mb-6 sm:mb-8' />
            <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-6'>
              Seu carrinho está vazio
            </h1>
            <p className='text-slate-600 mb-8 sm:mb-10 text-base sm:text-lg px-4'>
              Adicione alguns produtos para começar suas compras!
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
    <div className='min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-4 sm:gap-0'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <Link
              to='/'
              className='flex items-center gap-2 sm:gap-3 text-slate-600 hover:text-sky-600 transition-colors text-base sm:text-lg'
            >
              <ArrowLeft className='w-5 h-5 sm:w-6 sm:h-6' />
              <span className='hidden sm:inline'>Voltar</span>
            </Link>
            <h1 className='text-2xl sm:text-3xl font-bold text-slate-800'>Carrinho</h1>
            <span className='bg-sky-100 text-sky-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium'>
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </span>
          </div>
          <button
            onClick={handleClearCart}
            disabled={isClearing}
            className='flex items-center gap-2 sm:gap-3 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50 text-base sm:text-lg self-start sm:self-auto'
          >
            <Trash2 className='w-5 h-5 sm:w-6 sm:h-6' />
            <span className='hidden sm:inline'>Limpar Carrinho</span>
          </button>
        </div>

        <div className='grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12'>
          {/* Lista de Produtos - Design Moderno e Responsivo */}
          <div className='lg:col-span-2'>
            <div className='space-y-4 sm:space-y-6'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300'
                >
                  {/* Card Header */}
                  <div className='p-4 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white'>
                    <div className='flex items-start justify-between'>
                      <div className='flex items-center gap-3 sm:gap-4'>
                        <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-slate-100 flex-shrink-0'>
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-semibold text-slate-800 text-base sm:text-lg leading-tight line-clamp-2'>
                            {item.product.name}
                          </h3>
                          <div className='flex items-center gap-2 mt-1'>
                            <span className='text-xs sm:text-sm text-slate-500'>Tamanho:</span>
                            <span className='px-2 sm:px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs sm:text-sm font-medium'>
                              {item.selectedSize}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='text-slate-400 hover:text-red-500 transition-colors p-1 sm:p-2 rounded-full hover:bg-red-50 flex-shrink-0'
                      >
                        <X className='w-4 h-4 sm:w-5 sm:h-5' />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className='p-4 sm:p-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-center'>
                      {/* Preços */}
                      <div className='space-y-2'>
                        <div className='text-xl sm:text-2xl font-bold text-slate-800'>
                          {formatToBRL(item.product.price * 0.95)}
                        </div>
                      </div>

                      {/* Controles de Quantidade */}
                      <div className='flex flex-col items-center space-y-2 sm:space-y-3'>
                        <span className='text-xs sm:text-sm font-medium text-slate-600'>
                          Quantidade
                        </span>
                        <div className='flex items-center gap-2 sm:gap-3'>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors'
                          >
                            <Minus className='w-3 h-3 sm:w-4 sm:h-4 text-slate-600' />
                          </button>
                          <span className='w-10 sm:w-12 text-center font-bold text-base sm:text-lg text-slate-800'>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.amount}
                            className='w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                          >
                            <Plus className='w-3 h-3 sm:w-4 sm:h-4 text-slate-600' />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className='text-center sm:text-right'>
                        <div className='space-y-1'>
                          <p className='text-xs sm:text-sm text-slate-500'>Subtotal</p>
                          <div className='text-lg sm:text-2xl font-bold text-slate-800'>
                            {formatToBRL(item.product.price * 0.95 * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumo do Pedido - Responsivo */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 lg:sticky lg:top-32'>
              <h2 className='text-xl sm:text-2xl font-bold text-slate-800 mb-6 sm:mb-8'>
                Resumo do Pedido
              </h2>

              {/* Cupom de Desconto */}
              <div className='mb-6 sm:mb-8'>
                <div className='bg-slate-50 rounded-lg p-4'>
                  <h3 className='text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2'>
                    <Tag className='w-4 h-4' />
                    Cupom de Desconto
                  </h3>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder='Digite seu cupom'
                      className='flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent'
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim() || isApplyingCoupon}
                      className='px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isApplyingCoupon ? 'Aplicando...' : 'Aplicar'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Opções de Entrega */}
              <div className='mb-6 sm:mb-8'>
                <h3 className='text-sm font-semibold text-slate-700 mb-3'>Forma de Entrega</h3>
                <div className='space-y-3'>
                  <label className='flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors'>
                    <input
                      type='radio'
                      name='delivery'
                      value='pickup'
                      checked={deliveryOption === 'pickup'}
                      onChange={(e) => setDeliveryOption(e.target.value as 'pickup' | 'delivery')}
                      className='mr-3 text-sky-500 focus:ring-sky-500'
                    />
                    <div className='flex items-center gap-3'>
                      <Store className='w-5 h-5 text-slate-600' />
                      <div>
                        <div className='font-medium text-slate-800'>Retirar na Loja</div>
                        <div className='text-sm text-slate-500'>Grátis</div>
                      </div>
                    </div>
                  </label>

                  <label className='flex items-center p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors'>
                    <input
                      type='radio'
                      name='delivery'
                      value='delivery'
                      checked={deliveryOption === 'delivery'}
                      onChange={(e) => setDeliveryOption(e.target.value as 'pickup' | 'delivery')}
                      className='mr-3 text-sky-500 focus:ring-sky-500'
                    />
                    <div className='flex items-center gap-3'>
                      <Truck className='w-5 h-5 text-slate-600' />
                      <div>
                        <div className='font-medium text-slate-800'>Entrega em Casa</div>
                        <div className='text-sm text-slate-500'>Taxa de R$ 5,00</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Resumo Financeiro */}
              <div className='space-y-4 sm:space-y-6 mb-6 sm:mb-8'>
                <div className='flex justify-between text-slate-600 text-base sm:text-lg'>
                  <span>
                    Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                  </span>
                  <span>{formatToBRL(totalPrice / 0.95)}</span>
                </div>
                <div className='flex justify-between text-green-600 font-medium text-base sm:text-lg'>
                  <span>Desconto PIX (5%)</span>
                  <span>-{formatToBRL(totalPrice / 0.95 - totalPrice)}</span>
                </div>
                {deliveryOption === 'delivery' && (
                  <div className='flex justify-between text-slate-600 text-base sm:text-lg'>
                    <span>Taxa de Entrega</span>
                    <span>{formatToBRL(deliveryFee)}</span>
                  </div>
                )}
                <div className='border-t border-slate-200 pt-4 sm:pt-6'>
                  <div className='flex justify-between text-xl sm:text-2xl font-bold text-slate-800'>
                    <span>Total</span>
                    <span>{formatToBRL(finalTotal)}</span>
                  </div>
                  <p className='text-sm sm:text-base text-slate-500 mt-1 sm:mt-2'>
                    ou 6x de {formatToBRL(finalTotal / 6)}
                  </p>
                </div>
              </div>

              <button className='w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 sm:py-5 rounded-lg font-semibold transition-colors mb-4 sm:mb-6 text-base sm:text-lg'>
                Finalizar Compra
              </button>

              <Link
                to='/'
                className='w-full border border-slate-300 text-slate-700 hover:bg-slate-50 py-4 sm:py-5 rounded-lg font-semibold transition-colors inline-block text-center text-base sm:text-lg'
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
