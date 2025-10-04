import { CartItem } from '../types/cart';
import { formatToBRL } from './priceUtils';

/**
 * Formata os dados de um pedido em uma string para o WhatsApp.
 * @param orderData - Os dados do pedido.
 * @returns A mensagem formatada.
 */
export const formatOrderForWhatsApp = (orderData: {
  id?: string;
  customer?: {
    name: string;
    phone: string;
  };
  address?: {
    street: string;
    number: string;
    details?: string;
    cep: string;
    neighborhood: string;
    city: string;
    state: string;
    reference?: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryOption?: 'pickup' | 'delivery';
  deliveryFee?: number;
}) => {
  const itemsText = orderData.items
    .map((item) => `${item.quantity}x ${item.snapshot.name} (${item.snapshot.size})`)
    .join('\n');

  const deliveryText =
    orderData.deliveryOption === 'delivery'
      ? `\n*Taxa de Entrega:* ${formatToBRL(orderData.deliveryFee || 0)}`
      : '\n*Retirada na Loja*';

  const message = `
🛍️ *Pedido Lunar Brechó*

${orderData.customer ? `*Cliente:* ${orderData.customer.name} - (${orderData.customer.phone})\n` : ''}${
    orderData.address
      ? `*Endereço:* ${orderData.address.street}, ${orderData.address.number}${orderData.address.details ? ` - (${orderData.address.details})` : ''}
CEP: ${orderData.address.cep} - Bairro: ${orderData.address.neighborhood}
${orderData.address.city}-${orderData.address.state}${orderData.address.reference ? `\n- (${orderData.address.reference})` : ''}\n`
      : ''
  }*Itens:*
${itemsText}

*Subtotal:* ${formatToBRL(orderData.subtotal)}${deliveryText}
*Total:* ${formatToBRL(orderData.subtotal + (orderData.deliveryFee || 0))}
  `;

  return message.trim();
};

/**
 * Formata os dados de um produto individual para o WhatsApp.
 * @param product - Os dados do produto.
 * @param selectedSize - O tamanho selecionado.
 * @returns A mensagem formatada.
 */
export const formatProductForWhatsApp = (
  product: {
    name: string;
    basePrice: number;
    variants?: Array<{
      size: string;
      stockAvailable?: number;
    }>;
  },
  selectedSize: string,
) => {
  const selectedVariant = product.variants?.find((v) => v.size === selectedSize);
  const price = formatToBRL(product.basePrice * 0.95); // Aplicando desconto PIX

  const message = `
🛍️ *Produto Lunar Brechó*

*${product.name}*
Tamanho: ${selectedSize}
Preço: ${price}
${selectedVariant ? `Estoque: ${selectedVariant.stockAvailable} unidades` : ''}

Gostaria de mais informações sobre este produto!
  `;

  return message.trim();
};
