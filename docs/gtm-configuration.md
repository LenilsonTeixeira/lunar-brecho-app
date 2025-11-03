# Configuração do Google Tag Manager (GTM) - Lunar Brechó

## 🎯 Configuração Passo a Passo no Painel GTM

### **PASSO 1: Acessar o GTM**

1. Acesse [tagmanager.google.com](https://tagmanager.google.com)
2. Selecione seu container `GTM-MGSS6KWB`
3. Clique em "Workspace" (espaço de trabalho)

### **PASSO 2: Configurar Variáveis Personalizadas**

#### 2.1 Criar Variáveis de Data Layer

1. No menu lateral, clique em **"Variáveis"**
2. Clique em **"Nova"** para cada variável abaixo:

**Variável 1: Button Name**

- Nome: `Button Name`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `button_name`

**Variável 2: Location**

- Nome: `Location`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `location`

**Variável 3: Product ID**

- Nome: `Product ID`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `product_id`

**Variável 4: Product Name**

- Nome: `Product Name`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `product_name`

**Variável 5: Action**

- Nome: `Action`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `action`

**Variável 6: Cart Items Count**

- Nome: `Cart Items Count`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `cart_items_count`

**Variável 7: Total Value**

- Nome: `Total Value`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `total_value`

**Variável 8: Selected Size**

- Nome: `Selected Size`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `selected_size`

**Variável 9: Price**

- Nome: `Price`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `price`

**Variável 10: Delivery Method**

- Nome: `Delivery Method`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `delivery_method`

**Variável 11: Payment Method**

- Nome: `Payment Method`
- Tipo: `Variável de Camada de Dados`
- Nome da Variável da Camada de Dados: `payment_method`

### **PASSO 3: Configurar Triggers (Gatilhos)**

#### 3.1 Criar Triggers de Eventos

1. No menu lateral, clique em **"Gatilhos"**
2. Clique em **"Novo"** para cada trigger abaixo:

**Trigger 1: Button Click**

- Nome: `Button Click`
- Tipo: `Evento Personalizado`
- Nome do Evento: `button_click`

**Trigger 2: Product Action**

- Nome: `Product Action`
- Tipo: `Evento Personalizado`
- Nome do Evento: `product_action`

**Trigger 3: Cart Action**

- Nome: `Cart Action`
- Tipo: `Evento Personalizado`
- Nome do Evento: `cart_action`

**Trigger 4: Navigation**

- Nome: `Navigation`
- Tipo: `Evento Personalizado`
- Nome do Evento: `navigation`

**Trigger 5: Purchase**

- Nome: `Purchase`
- Tipo: `Evento Personalizado`
- Nome do Evento: `purchase`

### **PASSO 4: Configurar Google Analytics 4**

#### 4.1 Criar Tag do Google Analytics 4

1. No menu lateral, clique em **"Tags"**
2. Clique em **"Novo"**
3. Configure a tag principal do GA4:

**Tag Principal: Google Analytics 4 - Configuração**

- Nome: `GA4 - Configuração`
- Tipo: `Google Analytics: GA4 - Configuração`
- ID de Medição: `G-T2N2QE1QMD` (seu ID do GA4)
- Gatilho: `All Pages`

#### 4.2 Criar Tags de Eventos

**Tag 1: GA4 - Button Clicks**

- Nome: `GA4 - Button Clicks`
- Tipo: `Google Analytics: GA4 - Evento`
- ID de Medição: `G-T2N2QE1QMD`
- Nome do Evento: `button_click`
- Parâmetros:
  - `button_name`: `{{Button Name}}`
  - `location`: `{{Location}}`
- Gatilho: `Button Click`

**Tag 2: GA4 - Product Actions**

- Nome: `GA4 - Product Actions`
- Tipo: `Google Analytics: GA4 - Evento`
- ID de Medição: `G-T2N2QE1QMD`
- Nome do Evento: `product_action`
- Parâmetros:
  - `action`: `{{Action}}`
  - `product_id`: `{{Product ID}}`
  - `product_name`: `{{Product Name}}`
  - `selected_size`: `{{Selected Size}}`
  - `price`: `{{Price}}`
- Gatilho: `Product Action`

**Tag 3: GA4 - Cart Actions**

- Nome: `GA4 - Cart Actions`
- Tipo: `Google Analytics: GA4 - Evento`
- ID de Medição: `G-T2N2QE1QMD`
- Nome do Evento: `cart_action`
- Parâmetros:
  - `action`: `{{Action}}`
  - `cart_items_count`: `{{Cart Items Count}}`
  - `total_value`: `{{Total Value}}`
- Gatilho: `Cart Action`

**Tag 4: GA4 - Navigation**

- Nome: `GA4 - Navigation`
- Tipo: `Google Analytics: GA4 - Evento`
- ID de Medição: `G-T2N2QE1QMD`
- Nome do Evento: `navigation`
- Parâmetros:
  - `destination`: `{{destination}}`
  - `source`: `{{source}}`
- Gatilho: `Navigation`

**Tag 5: GA4 - Purchase**

- Nome: `GA4 - Purchase`
- Tipo: `Google Analytics: GA4 - Evento`
- ID de Medição: `G-T2N2QE1QMD`
- Nome do Evento: `purchase`
- Parâmetros:
  - `transaction_id`: `{{transaction_id}}`
  - `value`: `{{value}}`
  - `currency`: `{{currency}}`
  - `items`: `{{items}}`
- Gatilho: `Purchase`

### **PASSO 5: Testar a Configuração**

#### 5.1 Usar o Modo Preview

1. Clique em **"Visualizar"** no canto superior direito
2. Digite a URL do seu site: `http://localhost:5173` (ou sua URL de produção)
3. Clique em **"Conectar"**

#### 5.2 Testar Eventos

1. Navegue pelo site no modo preview
2. Clique nos botões implementados:
   - Logo do header
   - Botão do carrinho
   - "Adicionar ao Carrinho" em um produto
   - "Compre pelo WhatsApp" em um produto
   - "Prosseguir para Pagamento" no checkout
3. Verifique se os eventos aparecem no painel de debug do GTM

#### 5.3 Verificar no Console do Navegador

1. Abra o DevTools (F12)
2. Vá para a aba "Console"
3. Digite: `dataLayer`
4. Verifique se os eventos estão sendo enviados

### **PASSO 6: Publicar as Alterações**

#### 6.1 Criar Versão

1. Clique em **"Enviar"** no canto superior direito
2. Adicione um nome para a versão: `"Implementação inicial - Tracking de eventos"`
3. Adicione uma descrição: `"Configuração inicial do GTM com tracking de botões, produtos e carrinho"`
4. Clique em **"Publicar"**

### **PASSO 7: Configurar Goals no Google Analytics**

#### 7.1 Acessar o GA4

1. Acesse [analytics.google.com](https://analytics.google.com)
2. Selecione sua propriedade
3. Vá para **"Configurar" > "Eventos"**

#### 7.2 Marcar Eventos como Conversões

1. Clique em **"Criar evento"**
2. Configure os seguintes eventos como conversões:

**Conversão 1: Add to Cart**

- Nome do evento: `product_action`
- Condição: `action` = `add_to_cart`
- Marcar como conversão: ✅

**Conversão 2: WhatsApp Contact**

- Nome do evento: `product_action`
- Condição: `action` = `whatsapp_contact`
- Marcar como conversão: ✅

**Conversão 3: Proceed to Payment**

- Nome do evento: `button_click`
- Condição: `button_name` = `proceed_to_payment`
- Marcar como conversão: ✅

### **PASSO 8: Verificar Dados**

#### 8.1 Verificar em Tempo Real

1. No GA4, vá para **"Relatórios" > "Tempo real"**
2. Navegue pelo site e verifique se os eventos aparecem

#### 8.2 Verificar Relatórios de Eventos

1. Vá para **"Relatórios" > "Engajamento" > "Eventos"**
2. Verifique se os eventos customizados estão sendo registrados

## 🔍 Troubleshooting

### Problemas Comuns:

**1. Eventos não aparecem no GTM Preview**

- Verifique se o script do GTM está carregando
- Confirme se o ID do container está correto
- Verifique se não há erros no console

**2. Eventos não chegam ao GA4**

- Verifique se a tag do GA4 está configurada corretamente
- Confirme se o ID de medição está correto
- Verifique se os triggers estão funcionando

**3. Dados não aparecem nos relatórios**

- Aguarde até 24-48 horas para dados históricos
- Use "Tempo real" para verificar eventos imediatos
- Verifique se os eventos estão marcados como conversões

## 📊 Eventos Implementados

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

1. ✅ Configure as variáveis, triggers e tags no GTM
2. ✅ Teste os eventos usando o modo de preview do GTM
3. ✅ Configure goals e conversões no Google Analytics
4. ✅ Monitore os dados e otimize baseado nos insights
