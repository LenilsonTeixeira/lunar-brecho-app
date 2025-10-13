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

O componente `ProtectedRoute` protege rotas baseado nas feature flags e roles de usuário:

```typescript
// Proteção baseada em feature flag
<Route path='produtos' element={
  <ProtectedRoute>
    <ListProduct />
  </ProtectedRoute>
} />

// Proteção para super admins
<Route path='feature-flags' element={
  <ProtectedRoute requireSuperAdmin={true}>
    <FeatureFlags />
  </ProtectedRoute>
} />
```

### 3. Sidebar Inteligente

O sidebar automaticamente:

- Mostra apenas grupos que têm pelo menos um item habilitado
- **Oculta completamente** itens desabilitados pelas feature flags
- Exibe apenas funcionalidades habilitadas

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

## Controle de Acesso

### Página de Feature Flags

🔒 **Acesso Restrito**: A página de gerenciamento de feature flags (`/admin/feature-flags`) está protegida e **apenas usuários com role `SUPER_ADMIN`** podem acessá-la.

- Usuários com role `ADMIN` não verão o link no sidebar
- Tentativas de acesso direto à URL serão redirecionadas para `/admin`
- O ProtectedRoute verifica automaticamente a role do usuário

### Roles de Usuário

O sistema suporta as seguintes roles:

- **SUPER_ADMIN**:
  - ✅ Pode acessar rotas habilitadas diretamente via URL (ignora feature flags, exceto dashboard)
  - ✅ Único role que pode acessar e gerenciar feature flags
  - ⚠️ **No sidebar**: vê apenas as opções habilitadas pelas feature flags (igual aos admins)
  - ⚠️ **Dashboard**: respeita a feature flag para todos (não aparece se desabilitado)
- **ADMIN**:
  - ⚠️ Acesso apenas às funcionalidades habilitadas via feature flags
  - ❌ Não pode acessar feature flags
  - ⚠️ Vê apenas opções habilitadas no sidebar
  - ❌ Redirecionado se tentar acessar rotas desabilitadas

## Considerações de Segurança

⚠️ **Importante**: Este sistema de feature flags é baseado no frontend e não deve ser considerado uma medida de segurança robusta. Para funcionalidades críticas, sempre implemente validações no backend.

✅ **Proteção de Role**: A página de feature flags possui proteção adicional baseada em role de usuário, impedindo que administradores regulares alterem as configurações.

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
