# Análise e Refatoração do Modelo de Produto

## Estado Atual

### Modelos de Produto

Atualmente, o projeto utiliza dois modelos de produto:

#### 1. **Modelo Legado** (`src/types/product.ts`)

```typescript
export interface Product {
  id: string;
  images: string[];
  name: string;
  price: number;
  brand: string;
  description: string;
  sizes: string[];
  type: 'Novo' | 'Bazar';
  category: string;
  amount: number;
  observations: string;
}
```

**Uso atual:**

- Sistema de carrinho (`CartContext`)
- Algumas partes antigas do código

**Limitações:**

- Não suporta variantes de produto adequadamente
- Não tem informações de desconto
- Estrutura simplificada demais
- Campos obrigatórios quando deveriam ser opcionais

#### 2. **Modelo Novo** (`src/services/types/index.ts`)

```typescript
export interface ProductResponse {
  id: string;
  externalId: string;
  mainImageUrl?: string;
  mainThumbnailUrl?: string;
  name: string;
  description?: string;
  brand?: string;
  observations?: string;
  category: CategoryResponse;
  type: 'NEW' | 'BAZAAR';
  basePrice: number;
  discountType: 'PERCENTAGE' | 'FIXED' | 'NONE';
  discountValue?: number;
  status: 'ACTIVE' | 'INACTIVE';
  variants: ProductVariant[];
  images: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
}
```

**Uso atual:**

- API de produtos
- Listagem de produtos
- Detalhes de produto
- Administração de produtos

**Vantagens:**

- Estrutura completa e robusta
- Suporta variantes (tamanhos) adequadamente
- Sistema de descontos flexível
- Campos opcionais adequados
- Informações de categoria completas
- Metadados de timestamps

---

## Problemas Identificados

### 1. Conversão entre Modelos

Atualmente, `ProductItem.tsx` precisa converter `ProductResponse` para `Product` para usar o carrinho:

```typescript
const convertToLegacyProduct = (): Product => {
  // Lógica de conversão complexa
  // Pode causar perda de informações
  // Manutenção duplicada
};
```

**Impactos:**

- Código duplicado
- Risco de bugs na conversão
- Perda de informações (descontos, variantes)
- Manutenção difícil

### 2. Sistema de Carrinho Desatualizado

O `CartContext` usa o modelo legado, o que limita:

- Não sabe qual variante específica foi selecionada (só o tamanho como string)
- Não tem informações de desconto do produto
- Não tem referência ao `externalId` do produto
- Validação de estoque inadequada (usa `amount` total em vez de `stockAvailable` por variante)

### 3. Inconsistências

- Tipo de produto: `'NEW' | 'BAZAAR'` vs `'Novo' | 'Bazar'`
- Categoria: objeto completo vs string simples
- Imagens: array de URLs vs array de objetos com metadados
- Marca: campo obrigatório no modelo legado, opcional no novo

---

## Sugestões de Refatoração

### Fase 1: Atualizar Sistema de Carrinho (Recomendado)

#### 1.1. Criar novo tipo para CartItem

```typescript
// src/types/cart.ts
export interface CartItemNew {
  id: string; // ID único do item no carrinho
  productId: string;
  productExternalId: string;
  variantId: string; // ID da variante selecionada
  quantity: number;

  // Snapshot do produto no momento da adição (para exibição)
  snapshot: {
    name: string;
    mainImageUrl?: string;
    mainThumbnailUrl?: string;
    brand?: string;
    type: 'NEW' | 'BAZAAR';
    category: string;
    basePrice: number;
    discountType: 'PERCENTAGE' | 'FIXED' | 'NONE';
    discountValue?: number;
    size: string;
    stockAvailable: number;
  };
}
```

**Vantagens:**

- Referência correta a variantes
- Informações de desconto preservadas
- Snapshot garante que preço não mude após adicionar ao carrinho
- Validação de estoque por variante

#### 1.2. Atualizar CartContext

```typescript
const addToCart = (product: ProductResponse, quantity: number, variantId: string) => {
  // Lógica usando o novo modelo
};
```

#### 1.3. Remover Conversão de ProductItem

```typescript
// Remover função convertToLegacyProduct
// Usar ProductResponse diretamente

const handleAddToCart = (e: React.MouseEvent) => {
  const variant = product.variants.find((v) => v.size === selectedSize);
  if (variant) {
    addToCart(product, 1, variant.id);
  }
};
```

### Fase 2: Deprecar Modelo Legado

1. Migrar todo código que usa `Product` para `ProductResponse`
2. Manter `Product` apenas para compatibilidade temporária
3. Adicionar comentários `@deprecated` no tipo `Product`
4. Criar utilitários de conversão se necessário para transição

### Fase 3: Melhorias Adicionais

1. **Cache de Produtos**: Implementar cache do produto completo no carrinho
2. **Validação de Estoque**: Sincronizar com API antes de finalizar compra
3. **Cálculo de Preços**: Centralizar lógica de cálculo de preços com desconto
4. **TypeScript Strict**: Melhorar tipagem para evitar conversões

---

## Impacto das Mudanças

### Arquivos Afetados

- ✅ `src/components/product/ProductItem.tsx` - Já atualizado com TODO
- ⚠️ `src/contexts/CartContext.tsx` - Precisa refatoração completa
- ⚠️ `src/types/cart.ts` - Precisa novo modelo
- ⚠️ `src/pages/Cart.tsx` - Precisa adaptação
- ⚠️ `src/pages/ProductDetail.tsx` - Precisa adaptação no handleAddToCart

### Esforço Estimado

- **Fase 1** (CartContext): 4-6 horas
- **Fase 2** (Deprecar modelo legado): 2-3 horas
- **Fase 3** (Melhorias): 3-4 horas
- **Total**: 9-13 horas

---

## Melhorias Já Implementadas

### 1. ViewProduct.tsx

- ✅ Campo de marca mantém tamanho do input mesmo quando vazio
- ✅ Exibe "Não informado" quando marca está vazia

### 2. ProductTitleSection.tsx

- ✅ Label de marca não é exibida quando campo está vazio

### 3. ProductItem.tsx

- ✅ Adicionado comentário TODO para refatoração futura
- ✅ Cálculo de estoque total extraído para variável
- ✅ Código documentado para facilitar refatoração

---

## Recomendações

1. **Priorizar Fase 1**: Sistema de carrinho é crítico e deve usar modelo correto
2. **Testes**: Adicionar testes unitários antes de refatorar CartContext
3. **Documentação**: Atualizar documentação da API interna
4. **Migration Guide**: Criar guia de migração para equipe
5. **Feature Flag**: Considerar usar feature flag para rollout gradual

---

## Conclusão

O modelo novo (`ProductResponse`) é mais robusto e completo. A refatoração do sistema de carrinho para usar este modelo diretamente eliminará conversões desnecessárias, reduzirá bugs e facilitará manutenção futura.

A implementação deve ser feita de forma incremental, começando pelo CartContext, depois migrando componentes dependentes, e finalmente deprecando o modelo legado.
