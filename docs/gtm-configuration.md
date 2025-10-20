# Configuração do Google Tag Manager (GTM) - Lunar Brechó

## Eventos Implementados

### 1. Eventos de Botão (button_click)

- **button_name**: Nome do botão clicado
- **location**: Localização do botão na página
- **Dados adicionais**: Contexto específico do clique

### 2. Eventos de Produto (product_action)

- **action**: Ação realizada (add_to_cart, whatsapp_contact)
- **product_id**: ID do produto
- **product_name**: Nome do produto
- **Dados adicionais**: Tamanho selecionado, preço, etc.

### 3. Eventos de Carrinho (cart_action)

- **action**: Ação no carrinho (open_cart, view_cart, proceed_to_payment)
- **Dados adicionais**: Quantidade de itens, valor total, etc.

### 4. Eventos de Navegação (navigation)

- **destination**: Destino da navegação
- **source**: Origem da navegação

### 5. Eventos de Compra (purchase)

- **transaction_id**: ID da transação
- **value**: Valor da compra
- **currency**: Moeda (padrão: BRL)
- **items**: Array de itens comprados

## Configuração no GTM

### Variáveis Personalizadas

1. **Button Name** - Data Layer Variable: `button_name`
2. **Location** - Data Layer Variable: `location`
3. **Product ID** - Data Layer Variable: `product_id`
4. **Product Name** - Data Layer Variable: `product_name`
5. **Action** - Data Layer Variable: `action`
6. **Cart Items Count** - Data Layer Variable: `cart_items_count`
7. **Total Value** - Data Layer Variable: `total_value`

### Triggers

1. **Button Click** - Custom Event: `button_click`
2. **Product Action** - Custom Event: `product_action`
3. **Cart Action** - Custom Event: `cart_action`
4. **Navigation** - Custom Event: `navigation`
5. **Purchase** - Custom Event: `purchase`

### Tags Sugeridas

1. **Google Analytics 4 - Button Clicks**

   - Trigger: Button Click
   - Event Name: `button_click`
   - Parameters: button_name, location

2. **Google Analytics 4 - Product Actions**

   - Trigger: Product Action
   - Event Name: `product_action`
   - Parameters: action, product_id, product_name

3. **Google Analytics 4 - Cart Actions**

   - Trigger: Cart Action
   - Event Name: `cart_action`
   - Parameters: action, cart_items_count, total_value

4. **Google Analytics 4 - Purchase**
   - Trigger: Purchase
   - Event Name: `purchase`
   - Parameters: transaction_id, value, currency, items

## Exemplos de Eventos Enviados

### Clique no botão "Adicionar ao Carrinho"

```javascript
{
  event: 'button_click',
  button_name: 'add_to_cart',
  location: 'product_detail',
  product_id: '123',
  product_name: 'Blusa Feminina',
  selected_size: 'M',
  price: 45.90
}
```

### Ação de produto "WhatsApp"

```javascript
{
  event: 'product_action',
  action: 'whatsapp_contact',
  product_id: '123',
  product_name: 'Blusa Feminina',
  selected_size: 'M'
}
```

### Abertura do carrinho

```javascript
{
  event: 'cart_action',
  action: 'open_cart',
  cart_items_count: 3
}
```

### Prosseguir para pagamento

```javascript
{
  event: 'button_click',
  button_name: 'proceed_to_payment',
  location: 'checkout',
  cart_items_count: 3,
  total_value: 137.70,
  delivery_method: 'delivery',
  payment_method: 'pix'
}
```

## Benefícios da Implementação

1. **Rastreamento Completo**: Todos os cliques importantes são capturados
2. **Dados Estruturados**: Informações organizadas e consistentes
3. **Flexibilidade**: Fácil adição de novos eventos
4. **Análise Avançada**: Possibilidade de criar funis de conversão
5. **Otimização**: Identificação de pontos de melhoria na UX

## Próximos Passos

1. Configure as variáveis, triggers e tags no GTM
2. Teste os eventos usando o modo de preview do GTM
3. Configure goals e conversões no Google Analytics
4. Monitore os dados e otimize baseado nos insights
