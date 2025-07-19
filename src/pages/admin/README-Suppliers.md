# Sistema de Fornecedores - Lunar Brechó

## 📋 Visão Geral

O sistema de fornecedores permite o cadastro, consulta, edição e inativação de fornecedores do brechó. Fornecedores podem ser pessoas físicas ou jurídicas que vendem produtos, prestam serviços ou fornecem insumos à loja.

## 🎯 Funcionalidades

### ✅ Implementadas

- **Cadastro de Fornecedores**: Formulário completo para adicionar novos fornecedores
- **Listagem de Fornecedores**: Tabela responsiva com busca e filtros
- **Visualização de Detalhes**: Modal com informações completas do fornecedor
- **Edição de Fornecedores**: Formulário para atualizar dados existentes
- **Exclusão de Fornecedores**: Confirmação antes de remover fornecedores
- **Status Ativo/Inativo**: Controle de status dos fornecedores
- **Busca e Filtros**: Pesquisa por nome, documento ou e-mail
- **Formatação Automática**: CPF, CNPJ, telefone e CEP formatados automaticamente

### 🔧 Características Técnicas

- **Tipos de Fornecedor**: Pessoa Física (CPF) e Empresa (CNPJ)
- **Validação de Formulários**: Campos obrigatórios e validação de e-mail
- **Interface Responsiva**: Funciona em desktop, tablet e mobile
- **Design System**: Segue o padrão visual do projeto (purple/pink gradient)
- **Componentes Reutilizáveis**: Form, View e modais modulares

## 📁 Estrutura de Arquivos

```
src/
├── pages/admin/
│   ├── Supplier.tsx          # Listagem de fornecedores
│   ├── AddSupplier.tsx       # Página de adição
│   └── README-Suppliers.md   # Esta documentação
├── components/admin/
│   ├── SupplierForm.tsx      # Formulário modal (criar/editar)
│   └── SupplierView.tsx      # Modal de visualização
└── App.tsx                   # Rotas adicionadas
```

## 🗂️ Modelo de Dados

### Interface SupplierItem

```typescript
interface SupplierItem {
  id: number;
  name: string; // Nome/Razão Social
  type: 'individual' | 'company'; // Tipo de fornecedor
  document: string; // CPF ou CNPJ
  email: string; // E-mail de contato
  phone: string; // Telefone
  address: string; // Endereço completo
  city: string; // Cidade
  state: string; // Estado (UF)
  zipCode: string; // CEP
  contactPerson?: string; // Pessoa de contato
  website?: string; // Website (opcional)
  notes?: string; // Observações
  status: 'active' | 'inactive'; // Status do fornecedor
  createdAt?: string; // Data de criação
  updatedAt?: string; // Data de atualização
  productCount?: number; // Quantidade de produtos
}
```

## 🚀 Como Usar

### 1. Acessar a Listagem

- Navegue para `/admin/fornecedores`
- Visualize todos os fornecedores cadastrados
- Use a busca para filtrar por nome, documento ou e-mail

### 2. Adicionar Novo Fornecedor

- Clique em "Novo Fornecedor" na listagem
- Ou acesse diretamente `/admin/fornecedores/adicionar`
- Preencha o formulário com as informações necessárias
- Selecione o tipo (Pessoa Física ou Empresa)
- Defina o status (Ativo ou Inativo)

### 3. Editar Fornecedor

- Na listagem, clique no ícone de editar (lápis)
- Ou na visualização, clique em "Editar Fornecedor"
- Modifique os campos desejados
- Salve as alterações

### 4. Visualizar Detalhes

- Na listagem, clique no ícone de visualizar (olho)
- Veja todas as informações do fornecedor
- Acesse links para website (se disponível)

### 5. Excluir Fornecedor

- Na listagem, clique no ícone de excluir (lixeira)
- Confirme a ação no modal de confirmação
- ⚠️ **Atenção**: Esta ação não pode ser desfeita

## 🎨 Interface e UX

### Design System

- **Cores**: Gradiente purple-600 to pink-500
- **Ícones**: Lucide React (Building2, User, Mail, Phone, etc.)
- **Tipografia**: Inter font family
- **Espaçamento**: Sistema de espaçamento consistente

### Componentes Visuais

- **Badges de Status**: Verde (Ativo) / Vermelho (Inativo)
- **Ícones de Tipo**: Building2 (Empresa) / User (Pessoa Física)
- **Formatação**: CPF, CNPJ, telefone e CEP formatados
- **Loading States**: Spinners durante operações assíncronas

### Responsividade

- **Desktop**: Layout completo com sidebar
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Interface mobile-first com menu hambúrguer

## 🔧 Funcionalidades Avançadas

### Formatação Automática

- **CPF**: `123.456.789-00`
- **CNPJ**: `12.345.678/0001-90`
- **Telefone**: `(11) 99999-9999`
- **CEP**: `01234-567`

### Validações

- Campos obrigatórios marcados com `*`
- Validação de formato de e-mail
- Validação de URL para website
- Máximo de caracteres para documentos

### Estados de Loading

- Spinner durante criação/edição
- Feedback visual para ações
- Botões desabilitados durante operações

## 🔮 Próximas Melhorias

### Funcionalidades Planejadas

- [ ] Integração com API real
- [ ] Upload de documentos (contratos, notas fiscais)
- [ ] Histórico de transações por fornecedor
- [ ] Relatórios de fornecedores
- [ ] Avaliação e feedback de fornecedores
- [ ] Notificações automáticas
- [ ] Exportação de dados (CSV, PDF)

### Melhorias Técnicas

- [ ] Cache de dados com React Query
- [ ] Validação mais robusta com Zod
- [ ] Testes unitários e de integração
- [ ] Otimização de performance
- [ ] Acessibilidade (ARIA labels, navegação por teclado)

## 🐛 Troubleshooting

### Problemas Comuns

1. **Formulário não salva**

   - Verifique se todos os campos obrigatórios estão preenchidos
   - Confirme se o e-mail está em formato válido

2. **Busca não funciona**

   - Certifique-se de que o termo de busca está correto
   - Tente buscar por nome, documento ou e-mail

3. **Formatação não aplicada**
   - Verifique se o tipo de fornecedor está correto
   - Os campos são formatados automaticamente ao digitar

## 📞 Suporte

Para dúvidas ou problemas com o sistema de fornecedores, consulte:

- Documentação técnica do projeto
- Issues no repositório
- Equipe de desenvolvimento

---

**Desenvolvido para Lunar Brechó** 🛍️
_Sistema de gestão completo para brechós_
