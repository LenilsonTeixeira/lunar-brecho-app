# Gerenciamento de Cupons de Desconto

## Visão Geral

O sistema de gerenciamento de cupons de desconto permite aos administradores criar, editar, listar e desativar cupons com diferentes tipos de desconto e regras de negócio.

## Funcionalidades

### 📋 Listagem de Cupons

- Exibe todos os cupons em uma tabela responsiva
- Informações mostradas: código, tipo, valor, expiração, usos, status
- Ordenação por qualquer coluna (ascendente/descendente)
- Busca por código do cupom
- Filtros avançados por status, tipo e estado

### ➕ Criação de Cupons

- Modal com formulário completo
- Campos obrigatórios: código, tipo, valor, datas, limite de uso
- Campos opcionais: valor mínimo, limite por usuário
- Validação em tempo real
- Verificação de código único

### ✏️ Edição de Cupons

- Mesmo formulário da criação
- Código não pode ser alterado (regra de negócio)
- Todos os outros campos editáveis
- Validação preservada

### 🎛️ Controle de Status

- Toggle para ativar/desativar cupons
- Status automático baseado na data de expiração
- Cores distintas para diferentes status

### 📊 Estatísticas

- Total de cupons
- Cupons ativos
- Cupons inativos
- Cupons expirados

### 🔍 Filtros e Busca

- Busca por código
- Filtro por status (Ativo, Inativo, Expirado)
- Filtro por tipo (Percentual, Valor Fixo)
- Filtro por estado (Ativo/Inativo)
- Limpeza de filtros

### 📤 Exportação

- Exportação em CSV
- Download automático do arquivo
- Nome do arquivo com data

## Estrutura de Arquivos

```
src/
├── types/
│   └── coupon.ts              # Tipos TypeScript para cupons
├── services/
│   └── couponService.ts       # Serviço para API de cupons
├── hooks/
│   └── useCoupons.ts          # Hook personalizado para gerenciar cupons
├── components/admin/
│   ├── CouponForm.tsx         # Formulário de criação/edição
│   ├── CouponTableRow.tsx     # Linha da tabela de cupons
│   ├── CouponStatusBadge.tsx  # Badge de status
│   └── ConfirmDialog.tsx      # Diálogo de confirmação
└── pages/admin/
    └── Coupons.tsx            # Página principal
```

## Tipos de Cupom

### Percentual (%)

- Desconto baseado em porcentagem do valor total
- Máximo de 100%
- Exemplo: 10% de desconto

### Valor Fixo (R$)

- Desconto de valor fixo em reais
- Exemplo: R$ 15,50 de desconto

## Validações

### Código do Cupom

- Obrigatório
- Mínimo 3 caracteres
- Único no sistema
- Convertido para maiúsculas

### Valor do Desconto

- Deve ser maior que zero
- Percentual: máximo 100%
- Valor fixo: sem limite superior

### Datas

- Data de início obrigatória
- Data de expiração obrigatória
- Expiração deve ser posterior à data de início

### Limites de Uso

- Quantidade máxima obrigatória (> 0)
- Quantidade por usuário opcional (> 0)

### Valor Mínimo

- Opcional
- Deve ser >= 0 se informado

## Status dos Cupons

### Ativo (Verde)

- `isActive: true` E data atual <= data de expiração

### Inativo (Cinza)

- `isActive: false`

### Expirado (Vermelho)

- Data atual > data de expiração

## API Endpoints

```typescript
// Buscar cupons
GET /api/coupons?filters

// Buscar cupom por ID
GET /api/coupons/:id

// Criar cupom
POST /api/coupons

// Atualizar cupom
PUT /api/coupons/:id

// Deletar cupom
DELETE /api/coupons/:id

// Toggle status
PATCH /api/coupons/:id/toggle-status

// Verificar código
GET /api/coupons/check-code?code=XXX&excludeId=YYY

// Estatísticas
GET /api/coupons/stats

// Exportar
GET /api/coupons/export?format=csv
```

## Estados de Loading

- Loading inicial ao carregar a página
- Loading durante operações CRUD
- Loading durante exportação
- Indicadores visuais para todas as operações

## Tratamento de Erros

- Mensagens de erro específicas
- Fallback para operações que falham
- Validação client-side e server-side
- Feedback visual para o usuário

## Responsividade

- Layout adaptável para mobile, tablet e desktop
- Tabela com scroll horizontal em telas pequenas
- Formulário responsivo
- Botões e controles otimizados para touch

## Acessibilidade

- Labels semânticos
- ARIA labels nos botões
- Navegação por teclado
- Contraste adequado
- Screen reader friendly

## Performance

- Lazy loading de componentes
- Debounce na busca
- Otimização de re-renders
- Cache de dados quando apropriado

## Segurança

- Validação client-side e server-side
- Sanitização de inputs
- Verificação de permissões (a implementar)
- CSRF protection (a implementar)
