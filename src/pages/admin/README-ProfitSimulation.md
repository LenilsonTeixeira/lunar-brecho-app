# Simulação de Lucro por Produto e por Vendedor

## Visão Geral

Esta funcionalidade permite ao administrador simular o lucro esperado para produtos, considerando se são produtos diretos (comprados pela loja) ou consignados (de terceiros).

## Funcionalidades

### Campos do Formulário

- **Tipo do Produto**: Dropdown para selecionar entre "Direto" ou "Consignado"
- **Preço de Venda Base**: Valor base do produto (R$)
- **Desconto Aplicado**: Percentual de desconto (0-100%)
- **Custo de Aquisição**: Valor pago pela loja (obrigatório apenas para produtos diretos)
- **Comissão do Vendedor**: Percentual de comissão (obrigatório apenas para produtos consignados)
- **Taxa da Plataforma**: Percentual da taxa cobrada pela plataforma
- **Outros Custos**: Custos adicionais em reais

### Validações

- Preço de venda deve ser maior que zero
- Desconto deve estar entre 0% e 100%
- Custo de aquisição é obrigatório para produtos diretos
- Comissão do vendedor é obrigatória para produtos consignados (0-100%)
- Taxa da plataforma deve estar entre 0% e 100%
- Outros custos não podem ser negativos

### Cálculos Realizados

#### Para Produtos Diretos:

1. **Preço Final** = Preço Base - Desconto
2. **Lucro Bruto** = Preço Final - Custo de Aquisição
3. **Lucro Líquido** = Lucro Bruto - Taxa da Plataforma - Outros Custos

#### Para Produtos Consignados:

1. **Preço Final** = Preço Base - Desconto
2. **Valor ao Vendedor** = Preço Final × Comissão
3. **Lucro Líquido** = Preço Final - Valor ao Vendedor - Taxa da Plataforma - Outros Custos

### Resultados Exibidos

- **Preço Final**: Valor após aplicação do desconto
- **Lucro Bruto**: Lucro antes dos custos operacionais
- **Lucro Líquido**: Lucro após todos os custos
- **Margem de Lucro**: Percentual de lucro sobre o preço final
- **Valor Repassado ao Vendedor**: Apenas para produtos consignados
- **Detalhamento dos Custos**: Breakdown completo de todos os custos

## Endpoint da API

```
POST /api/profit/simulate
```

### Request Body:

```json
{
  "productType": "DIRECT" | "CONSIGNED",
  "baseSalePrice": 100.00,
  "discountPercentage": 10.0,
  "acquisitionCost": 50.00, // apenas para produtos diretos
  "sellerCommission": 30.0, // apenas para produtos consignados
  "platformFee": 5.0,
  "otherCosts": 2.50
}
```

### Response:

```json
{
  "finalPrice": 90.0,
  "grossProfit": 40.0,
  "netProfit": 37.5,
  "profitMargin": 41.67,
  "sellerAmount": 27.0, // apenas para produtos consignados
  "costBreakdown": {
    "acquisitionCost": 50.0,
    "platformFee": 4.5,
    "otherCosts": 2.5,
    "sellerCommission": 27.0, // apenas para produtos consignados
    "totalCosts": 84.0
  },
  "summary": {
    "originalPrice": 100.0,
    "discountAmount": 10.0,
    "finalPrice": 90.0,
    "profitType": "net"
  }
}
```

## Componentes

### ProfitSimulationForm

Formulário responsivo com validação em tempo real e campos dinâmicos baseados no tipo de produto.

### ProfitSimulationResults

Exibe os resultados da simulação em cards organizados com formatação adequada de moeda e percentuais.

### useProfitSimulation

Hook personalizado para gerenciar o estado da simulação e comunicação com a API.

## Responsividade

A interface é totalmente responsiva e funciona bem em:

- Desktop (layout em duas colunas)
- Tablet (layout adaptativo)
- Mobile (layout em coluna única)

## Tecnologias Utilizadas

- React com TypeScript
- TailwindCSS para estilização
- Lucide React para ícones
- Formulários com validação em tempo real
- Layout responsivo e moderno
