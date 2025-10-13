import { useState, useEffect } from 'react';
import { User, Shield, ArrowLeft, Lock, Eye, EyeOff, Key, Settings } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface UserItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'employee' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  department?: string;
  position?: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  permissions?: string[];
  loginAttempts?: number;
  isLocked?: boolean;
  notes?: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  critical?: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
}

const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'permissions' | 'security'>('basic');

  // Mock data - em uma aplicação real, isso viria de uma API
  const mockUser: UserItem = {
    id: parseInt(userId || '1'),
    name: 'João Silva Santos',
    email: 'joao.silva@lunarbrecho.com',
    phone: '(34) 99999-9999',
    role: 'admin',
    status: 'active',
    department: 'TI',
    position: 'Administrador de Sistema',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    lastLogin: '2024-01-22T09:15:00Z',
    permissions: [
      'system.access',
      'system.settings',
      'users.manage',
      'roles.manage',
      'audit.logs',
      'products.view',
      'products.create',
      'products.edit',
      'products.delete',
      'categories.manage',
      'consignors.manage',
      'suppliers.manage',
      'customers.manage',
      'orders.manage',
      'coupons.manage',
      'accounts.receivable',
      'accounts.payable',
      'cashflow.manage',
      'reports.view',
      'notifications.manage',
    ],
    loginAttempts: 0,
    isLocked: false,
    notes: 'Usuário administrador com acesso completo ao sistema.',
  };

  const [user] = useState<UserItem>(mockUser);
  const [userName, setUserName] = useState(mockUser.name);
  const [userEmail, setUserEmail] = useState(mockUser.email);
  const [userPhone, setUserPhone] = useState(mockUser.phone);
  const [userRole, setUserRole] = useState<'admin' | 'manager' | 'employee' | 'viewer'>(
    mockUser.role,
  );
  const [userStatus, setUserStatus] = useState<'active' | 'inactive' | 'pending'>(mockUser.status);
  const [userPassword, setUserPassword] = useState('');
  const [userDepartment, setUserDepartment] = useState(mockUser.department || '');
  const [userPosition, setUserPosition] = useState(mockUser.position || '');
  const [userNotes, setUserNotes] = useState(mockUser.notes || '');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    mockUser.permissions || [],
  );

  // System roles with predefined permissions
  const systemRoles: Role[] = [
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Acesso completo ao sistema',
      color: 'bg-red-100 text-red-800 border-red-200',
      permissions: ['*'], // All permissions
    },
    {
      id: 'manager',
      name: 'Gerente',
      description: 'Acesso gerencial com limitações',
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      permissions: [
        'products.view',
        'products.create',
        'products.edit',
        'categories.manage',
        'customers.manage',
        'orders.manage',
        'coupons.manage',
        'accounts.receivable',
        'accounts.payable',
        'cashflow.manage',
        'reports.view',
      ],
    },
    {
      id: 'employee',
      name: 'Funcionário',
      description: 'Acesso operacional básico',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      permissions: ['products.view', 'customers.manage', 'orders.manage', 'reports.view'],
    },
    {
      id: 'viewer',
      name: 'Visualizador',
      description: 'Apenas visualização',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      permissions: ['products.view', 'reports.view'],
    },
  ];

  // Comprehensive system permissions
  const availablePermissions: Permission[] = [
    // Sistema
    {
      id: 'system.access',
      name: 'Acesso ao Sistema',
      description: 'Pode acessar o sistema',
      category: 'Sistema',
      critical: true,
    },
    {
      id: 'system.settings',
      name: 'Configurações do Sistema',
      description: 'Pode alterar configurações do sistema',
      category: 'Sistema',
      critical: true,
    },
    {
      id: 'users.manage',
      name: 'Gerenciar Usuários',
      description: 'Pode gerenciar usuários do sistema',
      category: 'Sistema',
      critical: true,
    },
    {
      id: 'roles.manage',
      name: 'Gerenciar Funções',
      description: 'Pode gerenciar funções e permissões',
      category: 'Sistema',
      critical: true,
    },
    {
      id: 'audit.logs',
      name: 'Logs de Auditoria',
      description: 'Pode visualizar logs de auditoria',
      category: 'Sistema',
      critical: true,
    },

    // Gestão de Estoque
    {
      id: 'products.view',
      name: 'Visualizar Produtos',
      description: 'Pode visualizar produtos',
      category: 'Gestão de Estoque',
    },
    {
      id: 'products.create',
      name: 'Criar Produtos',
      description: 'Pode criar novos produtos',
      category: 'Gestão de Estoque',
    },
    {
      id: 'products.edit',
      name: 'Editar Produtos',
      description: 'Pode editar produtos existentes',
      category: 'Gestão de Estoque',
    },
    {
      id: 'products.delete',
      name: 'Excluir Produtos',
      description: 'Pode excluir produtos',
      category: 'Gestão de Estoque',
    },
    {
      id: 'products.bulk',
      name: 'Operações em Lote',
      description: 'Pode realizar operações em lote',
      category: 'Gestão de Estoque',
    },
    {
      id: 'categories.manage',
      name: 'Gerenciar Categorias',
      description: 'Pode gerenciar categorias',
      category: 'Gestão de Estoque',
    },
    {
      id: 'inventory.manage',
      name: 'Gerenciar Estoque',
      description: 'Pode gerenciar estoque',
      category: 'Gestão de Estoque',
    },

    // Parceiros
    {
      id: 'consignors.manage',
      name: 'Gerenciar Consignantes',
      description: 'Pode gerenciar consignantes',
      category: 'Parceiros',
    },
    {
      id: 'suppliers.manage',
      name: 'Gerenciar Fornecedores',
      description: 'Pode gerenciar fornecedores',
      category: 'Parceiros',
    },
    {
      id: 'partners.view',
      name: 'Visualizar Parceiros',
      description: 'Pode visualizar parceiros',
      category: 'Parceiros',
    },

    // Vendas & Marketing
    {
      id: 'customers.manage',
      name: 'Gerenciar Clientes',
      description: 'Pode gerenciar clientes',
      category: 'Vendas & Marketing',
    },
    {
      id: 'orders.manage',
      name: 'Gerenciar Pedidos',
      description: 'Pode gerenciar pedidos',
      category: 'Vendas & Marketing',
    },
    {
      id: 'orders.create',
      name: 'Criar Pedidos',
      description: 'Pode criar novos pedidos',
      category: 'Vendas & Marketing',
    },
    {
      id: 'orders.cancel',
      name: 'Cancelar Pedidos',
      description: 'Pode cancelar pedidos',
      category: 'Vendas & Marketing',
    },
    {
      id: 'coupons.manage',
      name: 'Gerenciar Cupons',
      description: 'Pode gerenciar cupons',
      category: 'Vendas & Marketing',
    },
    {
      id: 'promotions.manage',
      name: 'Gerenciar Promoções',
      description: 'Pode gerenciar promoções',
      category: 'Vendas & Marketing',
    },

    // Financeiro
    {
      id: 'accounts.receivable',
      name: 'Contas a Receber',
      description: 'Pode gerenciar contas a receber',
      category: 'Financeiro',
    },
    {
      id: 'accounts.payable',
      name: 'Contas a Pagar',
      description: 'Pode gerenciar contas a pagar',
      category: 'Financeiro',
    },
    {
      id: 'cashflow.manage',
      name: 'Fluxo de Caixa',
      description: 'Pode gerenciar fluxo de caixa',
      category: 'Financeiro',
    },
    {
      id: 'payments.manage',
      name: 'Gerenciar Pagamentos',
      description: 'Pode gerenciar pagamentos',
      category: 'Financeiro',
    },
    {
      id: 'refunds.manage',
      name: 'Gerenciar Reembolsos',
      description: 'Pode gerenciar reembolsos',
      category: 'Financeiro',
    },
    {
      id: 'financial.reports',
      name: 'Relatórios Financeiros',
      description: 'Pode visualizar relatórios financeiros',
      category: 'Financeiro',
    },

    // Relatórios e Analytics
    {
      id: 'reports.view',
      name: 'Visualizar Relatórios',
      description: 'Pode visualizar relatórios',
      category: 'Relatórios',
    },
    {
      id: 'reports.export',
      name: 'Exportar Relatórios',
      description: 'Pode exportar relatórios',
      category: 'Relatórios',
    },
    {
      id: 'analytics.view',
      name: 'Analytics',
      description: 'Pode visualizar analytics',
      category: 'Relatórios',
    },
    {
      id: 'dashboard.manage',
      name: 'Gerenciar Dashboard',
      description: 'Pode personalizar dashboard',
      category: 'Relatórios',
    },

    // Notificações e Comunicação
    {
      id: 'notifications.manage',
      name: 'Gerenciar Notificações',
      description: 'Pode gerenciar notificações',
      category: 'Comunicação',
    },
    {
      id: 'notifications.send',
      name: 'Enviar Notificações',
      description: 'Pode enviar notificações',
      category: 'Comunicação',
    },
    {
      id: 'communications.manage',
      name: 'Gerenciar Comunicações',
      description: 'Pode gerenciar comunicações',
      category: 'Comunicação',
    },
  ];

  useEffect(() => {
    // Em uma aplicação real, aqui você faria uma chamada para a API
    // para buscar os dados do usuário pelo userId
    console.log('Carregando usuário:', userId);
  }, [userId]);

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId],
    );
  };

  const handleRoleChange = (role: 'admin' | 'manager' | 'employee' | 'viewer') => {
    setUserRole(role);

    const selectedRole = systemRoles.find((r) => r.id === role);
    if (selectedRole) {
      if (role === 'admin') {
        setSelectedPermissions(availablePermissions.map((p) => p.id));
      } else {
        setSelectedPermissions(selectedRole.permissions);
      }
    }
  };

  const handleSelectAllPermissions = (category: string) => {
    const categoryPermissions = availablePermissions
      .filter((p) => p.category === category)
      .map((p) => p.id);

    const hasAllCategoryPermissions = categoryPermissions.every((p) =>
      selectedPermissions.includes(p),
    );

    if (hasAllCategoryPermissions) {
      setSelectedPermissions((prev) => prev.filter((p) => !categoryPermissions.includes(p)));
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...categoryPermissions])]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se todos os campos obrigatórios estão preenchidos
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert('Por favor, informe um email válido.');
      return;
    }

    // Simular atualização do usuário
    const updatedUser = {
      ...user,
      name: userName,
      email: userEmail,
      phone: userPhone,
      role: userRole,
      status: userStatus,
      department: userDepartment,
      position: userPosition,
      notes: userNotes,
      permissions: selectedPermissions,
    };

    console.log('Usuário atualizado:', updatedUser);
    alert('Usuário atualizado com sucesso!');

    // Navegar de volta para a lista de usuários
    navigate('/admin/usuarios');
  };

  const groupedPermissions = availablePermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  const getRoleColor = (roleId: string) => {
    const role = systemRoles.find((r) => r.id === roleId);
    return role?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='mb-8'>
          <div className='flex items-center gap-4 mb-4'>
            <button
              onClick={() => navigate('/admin/usuarios')}
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300'
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar
            </button>
          </div>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
            Editar Usuário #{user.id} - {user.name}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações e permissões do usuário do sistema
          </p>
        </div>

        {/* Tab Navigation */}
        <div className='mb-6'>
          <div className='flex space-x-1 bg-white p-1 rounded-lg shadow-sm'>
            <button
              onClick={() => setActiveTab('basic')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'basic'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <User className='w-4 h-4 inline mr-2' />
              Informações Básicas
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'permissions'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Shield className='w-4 h-4 inline mr-2' />
              Permissões
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'security'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Lock className='w-4 h-4 inline mr-2' />
              Segurança
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className='space-y-6'>
              <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
                <div className='flex items-center gap-3 mb-4'>
                  <User className='w-5 h-5 text-purple-600' />
                  <h3 className='text-lg font-semibold text-slate-800'>Informações Pessoais</h3>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='user-name'>
                      Nome Completo *
                    </label>
                    <input
                      id='user-name'
                      type='text'
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder='Nome completo do usuário'
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='user-email'>
                      Email *
                    </label>
                    <input
                      id='user-email'
                      type='email'
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder='email@exemplo.com'
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='user-phone'>
                      Telefone *
                    </label>
                    <input
                      id='user-phone'
                      type='tel'
                      value={userPhone}
                      onChange={(e) => setUserPhone(formatPhone(e.target.value))}
                      placeholder='(11) 99999-9999'
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                      maxLength={15}
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label
                      className='text-sm font-semibold text-slate-700'
                      htmlFor='user-department'
                    >
                      Departamento
                    </label>
                    <input
                      id='user-department'
                      type='text'
                      value={userDepartment}
                      onChange={(e) => setUserDepartment(e.target.value)}
                      placeholder='Ex: Vendas, Estoque, Financeiro'
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='user-position'>
                      Cargo
                    </label>
                    <input
                      id='user-position'
                      type='text'
                      value={userPosition}
                      onChange={(e) => setUserPosition(e.target.value)}
                      placeholder='Ex: Vendedor, Gerente, Analista'
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='user-status'>
                      Status *
                    </label>
                    <select
                      id='user-status'
                      value={userStatus}
                      onChange={(e) =>
                        setUserStatus(e.target.value as 'active' | 'inactive' | 'pending')
                      }
                      className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                      required
                    >
                      <option value='active'>Ativo</option>
                      <option value='inactive'>Inativo</option>
                      <option value='pending'>Pendente</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
                <div className='flex items-center gap-3 mb-4'>
                  <Settings className='w-5 h-5 text-purple-600' />
                  <h3 className='text-lg font-semibold text-slate-800'>Função do Sistema</h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                  {systemRoles.map((role) => (
                    <label
                      key={role.id}
                      className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all duration-200 ${
                        userRole === role.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-slate-200 bg-white hover:border-purple-300'
                      }`}
                    >
                      <input
                        type='radio'
                        name='role'
                        value={role.id}
                        checked={userRole === role.id}
                        onChange={(e) => handleRoleChange(e.target.value as any)}
                        className='sr-only'
                      />
                      <div className='flex flex-col items-center text-center'>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${getRoleColor(role.id)}`}
                        >
                          <Shield className='w-4 h-4' />
                        </div>
                        <h4 className='font-semibold text-slate-800'>{role.name}</h4>
                        <p className='text-xs text-slate-500 mt-1'>{role.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === 'permissions' && (
            <div className='space-y-6'>
              <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <Shield className='w-5 h-5 text-purple-600' />
                    <h3 className='text-lg font-semibold text-slate-800'>Permissões do Sistema</h3>
                  </div>
                  <div className='text-sm text-slate-500'>
                    {selectedPermissions.length} de {availablePermissions.length} permissões
                    selecionadas
                  </div>
                </div>

                <div className='space-y-4'>
                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category} className='border border-slate-200 rounded-lg p-4 bg-white'>
                      <div className='flex items-center justify-between mb-3'>
                        <h4 className='font-semibold text-slate-800'>{category}</h4>
                        <button
                          type='button'
                          onClick={() => handleSelectAllPermissions(category)}
                          className='text-xs text-purple-600 hover:text-purple-700 font-medium'
                        >
                          {permissions.every((p) => selectedPermissions.includes(p.id))
                            ? 'Desmarcar Todos'
                            : 'Marcar Todos'}
                        </button>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        {permissions.map((permission) => (
                          <label
                            key={permission.id}
                            className='flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50'
                          >
                            <input
                              type='checkbox'
                              checked={selectedPermissions.includes(permission.id)}
                              onChange={() => handlePermissionToggle(permission.id)}
                              className='w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500'
                            />
                            <div className='flex-1'>
                              <div className='flex items-center gap-2'>
                                <span className='text-sm font-medium text-slate-800'>
                                  {permission.name}
                                </span>
                                {permission.critical && (
                                  <span className='px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full'>
                                    Crítico
                                  </span>
                                )}
                              </div>
                              <p className='text-xs text-slate-500'>{permission.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className='space-y-6'>
              <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
                <div className='flex items-center gap-3 mb-4'>
                  <Lock className='w-5 h-5 text-purple-600' />
                  <h3 className='text-lg font-semibold text-slate-800'>
                    Configurações de Segurança
                  </h3>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm font-semibold text-slate-700' htmlFor='user-password'>
                      Nova Senha (opcional)
                    </label>
                    <div className='relative'>
                      <input
                        id='user-password'
                        type={showPassword ? 'text' : 'password'}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder='Deixe em branco para manter a senha atual'
                        className='outline-none py-2 sm:py-3 px-4 pr-10 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white w-full'
                        minLength={8}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600'
                      >
                        {showPassword ? (
                          <EyeOff className='w-4 h-4' />
                        ) : (
                          <Eye className='w-4 h-4' />
                        )}
                      </button>
                    </div>
                    <p className='text-xs text-slate-500'>Mínimo 8 caracteres</p>
                  </div>
                </div>
              </div>

              <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
                <div className='flex items-center gap-3 mb-4'>
                  <Key className='w-5 h-5 text-purple-600' />
                  <h3 className='text-lg font-semibold text-slate-800'>Observações</h3>
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-semibold text-slate-700' htmlFor='user-notes'>
                    Observações
                  </label>
                  <textarea
                    id='user-notes'
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder='Observações sobre o usuário, restrições especiais, etc.'
                    rows={3}
                    className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white resize-none'
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation and Submit */}
          <div className='flex items-center justify-between pt-6 border-t border-slate-200'>
            <div className='flex gap-2'>
              {activeTab !== 'basic' && (
                <button
                  type='button'
                  onClick={() =>
                    setActiveTab(activeTab === 'permissions' ? 'basic' : 'permissions')
                  }
                  className='px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-300'
                >
                  Anterior
                </button>
              )}
              {activeTab !== 'security' && (
                <button
                  type='button'
                  onClick={() => setActiveTab(activeTab === 'basic' ? 'permissions' : 'security')}
                  className='px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300'
                >
                  Próximo
                </button>
              )}
            </div>

            {activeTab === 'security' && (
              <button
                type='submit'
                className='px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Atualizar Usuário
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
