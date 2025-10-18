import { OrderResponse } from '../services/types';
import { formatToBRL } from './priceUtils';
import { ENV } from '../config/env';

/**
 * Formata os dados de um pedido em uma string para o WhatsApp.
 * @param orderData - Os dados do pedido.
 * @returns A mensagem formatada.
 */
export const formatOrderForWhatsApp = (orderData: OrderResponse) => {
  const itemsText = orderData.items
    .map((item) => {
      return `${item.quantity}x ${item.name} (${item.size}) - ${formatToBRL(item.subtotal)}
📋 Código: ${item.externalId}`;
    })
    .join('\n\n');

  const deliveryText =
    orderData.deliveryType === 'HOME_DELIVERY'
      ? `\n*Taxa de Entrega:* ${formatToBRL(orderData.financialSummary.deliveryFee)}`
      : '\n*Retirada na Loja*';

  const discountText =
    orderData.financialSummary.discountAmount > 0
      ? `\n*Desconto:* -${formatToBRL(orderData.financialSummary.discountAmount)}`
      : '';

  const message = `
🛍️ *NOVO PEDIDO - LUNAR BRECHÓ 🌙*

👤 *Cliente:*
Nome: ${orderData.customer.fullName}
WhatsApp: ${orderData.customer.phone}
${orderData.customer.email ? `Email: ${orderData.customer.email}` : ''}

📦 *Itens do Pedido:* (${orderData.items.length} ${orderData.items.length === 1 ? 'item' : 'itens'})
${itemsText}

🚚 *Entrega:*
${
  orderData.deliveryType === 'HOME_DELIVERY'
    ? `📍 Entregar no endereço:
${orderData.deliveryAddress.street}, ${orderData.deliveryAddress.number}${orderData.deliveryAddress.complement ? ` - ${orderData.deliveryAddress.complement}` : ''}
${orderData.deliveryAddress.neighborhood}, ${orderData.deliveryAddress.city} - ${orderData.deliveryAddress.state}
CEP: ${orderData.deliveryAddress.zipCode}`
    : '🏪 Retirar na loja'
}

💳 *Pagamento:* ${getPaymentMethodName(orderData.paymentMethod)}
${orderData.paymentMethod === 'PIX' ? '' : ''}
${
  orderData.paymentMethod === 'PIX'
    ? `
🔑 *Chave PIX para pagamento:*
${ENV.PIX_KEY}

💡 *Instruções:*
1. Copie a chave PIX acima
2. Abra seu app de pagamento (banco/PIX)
3. Cole a chave e confirme o pagamento
4. Envie o comprovante por aqui`
    : ''
}

💰 *Resumo Financeiro:*
*Subtotal:* ${formatToBRL(orderData.financialSummary.subtotal)}${discountText}${deliveryText}
*Total:* ${formatToBRL(orderData.financialSummary.totalAmount)}

📋 *Status:* ${getStatusName(orderData.status)}
${orderData.externalId ? `*Pedido:* ${orderData.externalId}` : ''}

⏰ *Pedido realizado em:* ${formatOrderTimestamp()}

✅ *Aguardando confirmação*
  `;

  return message.trim();
};

/**
 * Converte o método de pagamento para nome legível.
 */
const getPaymentMethodName = (paymentMethod: string): string => {
  switch (paymentMethod) {
    case 'PIX':
      return 'PIX';
    case 'CREDIT_CARD':
      return 'Cartão de Crédito';
    case 'DEBIT_CARD':
      return 'Cartão de Débito';
    case 'CASH':
      return 'Dinheiro';
    default:
      return paymentMethod;
  }
};

/**
 * Converte o status do pedido para nome legível.
 */
const getStatusName = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'Pendente';
    case 'APPROVED':
      return 'Aprovado';
    case 'SENT':
      return 'Enviado';
    case 'DELIVERED':
      return 'Entregue';
    case 'CANCELLED':
      return 'Cancelado';
    default:
      return status;
  }
};

/**
 * Formata a data e hora atual no padrão brasileiro.
 */
const formatOrderTimestamp = (): string => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

/**
 * Formata os dados de um produto individual para o WhatsApp.
 * @param product - Os dados do produto.
 * @param selectedSize - O tamanho selecionado.
 * @returns A mensagem formatada.
 */
export const formatProductForWhatsApp = (
  product: {
    externalId?: string;
    name: string;
    basePrice: number;
    mainImageUrl?: string;
    mainThumbnailUrl?: string;
    variants?: Array<{
      size: string;
      stockAvailable?: number;
    }>;
  },
  selectedSize: string,
) => {
  const selectedVariant = product.variants?.find((v) => v.size === selectedSize);

  const message = `
🛍️ *Produto Lunar Brechó*

*${product.name}*
Tamanho: ${selectedSize}

${product.externalId ? `📋 Código: ${product.externalId}` : ''}
${selectedVariant ? `📦 Estoque: ${selectedVariant.stockAvailable} unidades` : ''}

Gostaria de mais informações sobre este produto!
  `;

  return message.trim();
};
