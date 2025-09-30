# Sistema de Feature Flags

Este documento descreve o sistema de feature flags implementado para controlar o acesso às funcionalidades do painel administrativo.

## Visão Geral

O sistema de feature flags permite habilitar ou desabilitar funcionalidades específicas do painel administrativo sem a necessidade de alterar o código. Isso é especialmente útil para:

- Controle de acesso a funcionalidades em desenvolvimento
- Liberação gradual de novas funcionalidades
- Controle de acesso baseado em permissões
- Testes A/B de funcionalidades

## Configuração Padrão

Por padrão, apenas as seguintes funcionalidades estão habilitadas:

- ✅ **Produtos** - Gestão completa de produtos
- ✅ **Categorias** - Gestão de categorias de produtos
- ❌ **Clientes** - Gestão de clientes (desabilitado)
- ❌ **Pedidos** - Gestão de pedidos (desabilitado)
- ❌ **Fornecedores** - Gestão de fornecedores (desabilitado)
- ❌ **Consignantes** - Gestão de consignantes (desabilitado)
- ❌ **Financeiro** - Contas a pagar/receber, fluxo de caixa (desabilitado)
- ❌ **Cupons** - Sistema de cupons de desconto (desabilitado)
- ❌ **Usuários** - Gestão de usuários do sistema (desabilitado)
- ❌ **Notificações** - Sistema de notificações (desabilitado)
- ❌ **Configurações** - Configurações do sistema (desabilitado)

## Como Funciona

### 1. Hook useFeatureFlags

O hook `useFeatureFlags` gerencia o estado das feature flags:

```typescript
const {
  featureFlags,
  updateFeatureFlag,
  updateFeatureFlags,
  resetFeatureFlags,
  isFeatureEnabled,
  areFeaturesEnabled,
} = useFeatureFlags();
```

### 2. Componente ProtectedRoute

O componente `ProtectedRoute` protege rotas baseado nas feature flags:

```typescript
<Route path='produtos' element={
  <ProtectedRoute>
    <ListProduct />
  </ProtectedRoute>
} />
```

### 3. Sidebar Inteligente

O sidebar automaticamente:

- Mostra apenas grupos que têm pelo menos um item habilitado
- Desabilita itens não permitidos com visual diferenciado
- Exibe badge "Em breve" para funcionalidades desabilitadas

## Estrutura de Arquivos

```
src/
├── hooks/
│   └── useFeatureFlags.ts          # Hook principal para gerenciar flags
├── components/
│   └── admin/
│       ├── ProtectedRoute.tsx      # Componente para proteger rotas
│       ├── FeatureFlagsDemo.tsx    # Componente de demonstração
│       └── sidebar/
│           └── Sidebar.tsx         # Sidebar com suporte a feature flags
└── pages/
    └── admin/
        └── Dashboard.tsx           # Dashboard com demo das flags
```

## Persistência

As feature flags são persistidas no `localStorage` do navegador com a chave `lunar-feature-flags`. Isso permite:

- Manter as configurações entre sessões
- Configurações específicas por usuário/dispositivo
- Reset fácil para configurações padrão

## Como Usar

### Verificando se uma funcionalidade está habilitada:

```typescript
const { isFeatureEnabled } = useFeatureFlags();

if (isFeatureEnabled('products')) {
  // Lógica para produtos
}
```

### Habilitando/Desabilitando uma funcionalidade:

```typescript
const { updateFeatureFlag } = useFeatureFlags();

// Habilitar produtos
updateFeatureFlag('products', true);

// Desabilitar clientes
updateFeatureFlag('customers', false);
```

### Habilitando múltiplas funcionalidades:

```typescript
const { updateFeatureFlags } = useFeatureFlags();

updateFeatureFlags({
  products: true,
  categories: true,
  customers: false,
});
```

### Resetando para configuração padrão:

```typescript
const { resetFeatureFlags } = useFeatureFlags();

resetFeatureFlags();
```

## Mapeamento de Rotas

Cada rota do admin está mapeada para uma feature flag específica:

| Rota                    | Feature Flag         | Status Padrão   |
| ----------------------- | -------------------- | --------------- |
| `/admin/produtos`       | `products`           | ✅ Habilitado   |
| `/admin/categorias`     | `categories`         | ✅ Habilitado   |
| `/admin/clientes`       | `customers`          | ❌ Desabilitado |
| `/admin/pedidos`        | `orders`             | ❌ Desabilitado |
| `/admin/fornecedores`   | `suppliers`          | ❌ Desabilitado |
| `/admin/consignantes`   | `consignors`         | ❌ Desabilitado |
| `/admin/contas-receber` | `accountsReceivable` | ❌ Desabilitado |
| `/admin/contas-pagar`   | `accountsPayable`    | ❌ Desabilitado |
| `/admin/fluxo-caixa`    | `cashFlow`           | ❌ Desabilitado |
| `/admin/cupons`         | `coupons`            | ❌ Desabilitado |
| `/admin/usuarios`       | `users`              | ❌ Desabilitado |
| `/admin/notificacoes`   | `notifications`      | ❌ Desabilitado |
| `/admin/configuracoes`  | `configurations`     | ❌ Desabilitado |

## Demonstração

O componente `FeatureFlagsDemo` está incluído no Dashboard e permite:

- Visualizar o status atual de todas as feature flags
- Habilitar/desabilitar funcionalidades em tempo real
- Resetar para configuração padrão
- Ver o impacto das mudanças no sidebar e nas rotas

## Considerações de Segurança

⚠️ **Importante**: Este sistema de feature flags é baseado no frontend e não deve ser considerado uma medida de segurança robusta. Para funcionalidades críticas, sempre implemente validações no backend.

## Extensibilidade

Para adicionar novas feature flags:

1. Adicione a nova flag na interface `FeatureFlags`
2. Atualize `DEFAULT_FEATURE_FLAGS`
3. Adicione o mapeamento de rota em `useRouteAccess`
4. Atualize o sidebar se necessário

## Troubleshooting

### Feature flags não estão sendo aplicadas:

- Verifique se o hook `useFeatureFlags` está sendo usado corretamente
- Confirme se as rotas estão envolvidas pelo `ProtectedRoute`
- Verifique o console do navegador para erros

### Configurações não persistem:

- Verifique se o `localStorage` está habilitado no navegador
- Confirme se não há conflitos com outras chaves do `localStorage`

### Sidebar não atualiza:

- Verifique se o componente está usando o hook `useFeatureFlags`
- Confirme se a função `getSidebarGroups` está sendo chamada corretamente
