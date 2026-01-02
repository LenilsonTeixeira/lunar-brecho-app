import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../contexts/CartContext';
import { useCartDrawer } from '../contexts/CartDrawerContext';
import { formatToBRL, calculateFinalPrice } from '../utils/priceUtils';
import Drawer from './common/Drawer';

const CartDrawer = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const { isCartDrawerOpen, closeCartDrawer } = useCartDrawer();

  const handleIncreaseQuantity = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  if (items.length === 0) {
    return (
      <Drawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} title='Carrinho Vazio'>
        <div className='text-center py-8'>
          <ShoppingBag className='w-16 h-16 text-gray-300 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>Seu carrinho está vazio</h3>
          <p className='text-gray-500 mb-6'>Adicione alguns produtos para começar suas compras!</p>
          <button
            onClick={closeCartDrawer}
            className='inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors font-medium'
          >
            Continuar Comprando
          </button>
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer
      isOpen={isCartDrawerOpen}
      onClose={closeCartDrawer}
      title={`Sua seleção (${totalItems})`}
    >
      <div className='space-y-6'>
        {/* Cart Items */}
        <div className='space-y-3 sm:space-y-4'>
          {items.map((item) => (
            <div
              key={item.id}
              className='flex gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-100 last:border-0'
            >
              <Link
                to={`/produtos/${item.productId}`}
                onClick={closeCartDrawer}
                className='w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity'
              >
                <img
                  src={
                    item.snapshot.mainThumbnailImageUrl ||
                    item.snapshot.mainImageUrl ||
                    'https://via.placeholder.com/80'
                  }
                  alt={item.snapshot.name}
                  className='w-full h-full object-cover'
                />
              </Link>
              <div className='flex-1 min-w-0'>
                <Link
                  to={`/produtos/${item.productId}`}
                  onClick={closeCartDrawer}
                  className='hover:text-sky-600 transition-colors'
                >
                  <h4 className='text-xs sm:text-sm font-medium text-gray-900 line-clamp-2'>
                    {item.snapshot.name}
                  </h4>
                </Link>
                <p className='text-xs text-gray-500 mt-1'>Tamanho: {item.snapshot.size}</p>
                <p className='text-xs sm:text-sm font-semibold text-gray-900 mt-1'>
                  {formatToBRL(
                    calculateFinalPrice(
                      item.snapshot.basePrice,
                      item.snapshot.discountType,
                      item.snapshot.discountValue,
                    ),
                  )}
                </p>

                {/* Quantity Controls */}
                <div className='flex items-center justify-between mt-2 sm:mt-3'>
                  <div className='flex items-center gap-1 sm:gap-2'>
                    <button
                      onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                      disabled={item.quantity <= 1}
                      className='w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                      aria-label='Diminuir quantidade'
                    >
                      <Minus className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600' />
                    </button>
                    <span className='text-xs sm:text-sm font-medium text-gray-900 w-6 sm:w-8 text-center'>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                      className='w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 transition-colors'
                      aria-label='Aumentar quantidade'
                    >
                      <Plus className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600' />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='text-xs text-gray-500 hover:text-red-500 transition-colors underline'
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className='border-t border-gray-200 pt-4'>
          <div className='flex justify-between text-base sm:text-lg font-semibold text-gray-900'>
            <span>Subtotal</span>
            <span>{formatToBRL(totalPrice)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='space-y-2 sm:space-y-3 pt-4'>
          <button
            onClick={closeCartDrawer}
            className='w-full border border-gray-300 text-gray-900 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors hover:bg-gray-50 text-sm sm:text-base'
          >
            CONTINUAR COMPRANDO
          </button>

          <Link
            to='/checkout'
            onClick={closeCartDrawer}
            className='w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 sm:py-3 rounded-lg font-semibold transition-colors inline-block text-center text-sm sm:text-base'
          >
            PROSSEGUIR PARA O PAGAMENTO
          </Link>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
