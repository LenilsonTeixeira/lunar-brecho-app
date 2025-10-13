import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  Lock,
  Key,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
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

const ViewUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

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
    notes:
      'Usuário administrador com acesso completo ao sistema. Responsável pela configuração e manutenção do sistema.',
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'manager':
        return 'Gerente';
      case 'employee':
        return 'Funcionário';
      case 'viewer':
        return 'Visualizador';
      default:
        return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className='w-4 h-4 text-red-600' />;
      case 'manager':
        return <Shield className='w-4 h-4 text-orange-600' />;
      case 'employee':
        return <Shield className='w-4 h-4 text-blue-600' />;
      case 'viewer':
        return <Shield className='w-4 h-4 text-gray-600' />;
      default:
        return <Shield className='w-4 h-4' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-300 text-slate-950';
      case 'inactive':
        return 'bg-red-300 text-slate-950';
      case 'pending':
        return 'bg-yellow-300 text-slate-950';
      default:
        return 'bg-slate-300 text-slate-950';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  const getPermissionLabel = (permissionId: string) => {
    const permissionLabels: Record<string, string> = {
      'system.access': 'Acesso ao Sistema',
      'system.settings': 'Configurações do Sistema',
      'users.manage': 'Gerenciar Usuários',
      'roles.manage': 'Gerenciar Funções',
      'audit.logs': 'Logs de Auditoria',
      'products.view': 'Visualizar Produtos',
      'products.create': 'Criar Produtos',
      'products.edit': 'Editar Produtos',
      'products.delete': 'Excluir Produtos',
      'categories.manage': 'Gerenciar Categorias',
      'consignors.manage': 'Gerenciar Consignantes',
      'suppliers.manage': 'Gerenciar Fornecedores',
      'customers.manage': 'Gerenciar Clientes',
      'orders.manage': 'Gerenciar Pedidos',
      'coupons.manage': 'Gerenciar Cupons',
      'accounts.receivable': 'Contas a Receber',
      'accounts.payable': 'Contas a Pagar',
      'cashflow.manage': 'Fluxo de Caixa',
      'reports.view': 'Visualizar Relatórios',
      'notifications.manage': 'Gerenciar Notificações',
    };
    return permissionLabels[permissionId] || permissionId;
  };

  const getPermissionCategory = (permissionId: string) => {
    if (
      permissionId.startsWith('system') ||
      permissionId.startsWith('users') ||
      permissionId.startsWith('roles') ||
      permissionId.startsWith('audit')
    ) {
      return 'Sistema';
    } else if (permissionId.startsWith('products') || permissionId.startsWith('categories')) {
      return 'Gestão de Estoque';
    } else if (permissionId.startsWith('consignors') || permissionId.startsWith('suppliers')) {
      return 'Parceiros';
    } else if (
      permissionId.startsWith('customers') ||
      permissionId.startsWith('orders') ||
      permissionId.startsWith('coupons')
    ) {
      return 'Vendas & Marketing';
    } else if (permissionId.startsWith('accounts') || permissionId.startsWith('cashflow')) {
      return 'Financeiro';
    } else {
      return 'Outros';
    }
  };

  const groupedPermissions =
    mockUser.permissions?.reduce(
      (acc, permission) => {
        const category = getPermissionCategory(permission);
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(permission);
        return acc;
      },
      {} as Record<string, string[]>,
    ) || {};

  const getSecurityStatus = () => {
    if (mockUser.isLocked) {
      return {
        status: 'locked',
        icon: <Lock className='w-4 h-4 text-red-600' />,
        label: 'Bloqueado',
        color: 'text-red-600',
      };
    } else if ((mockUser.loginAttempts || 0) > 0) {
      return {
        status: 'warning',
        icon: <AlertTriangle className='w-4 h-4 text-yellow-600' />,
        label: 'Tentativas de Login',
        color: 'text-yellow-600',
      };
    } else {
      return {
        status: 'secure',
        icon: <CheckCircle className='w-4 h-4 text-green-600' />,
        label: 'Seguro',
        color: 'text-green-600',
      };
    }
  };

  const securityStatus = getSecurityStatus();

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
            Usuário #{mockUser.id} - {mockUser.name}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Detalhes completos do usuário do sistema
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* User Status and Security */}
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-slate-800'>Status e Segurança</h3>
                <div className='flex items-center gap-2'>
                  {securityStatus.icon}
                  <span className={`text-sm font-medium ${securityStatus.color}`}>
                    {securityStatus.label}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='p-4 bg-slate-50 rounded-lg'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Activity className='w-4 h-4 text-purple-600' />
                    <span className='text-sm font-medium text-slate-700'>Status</span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(mockUser.status)}`}
                  >
                    {getStatusLabel(mockUser.status)}
                  </span>
                </div>

                <div className='p-4 bg-slate-50 rounded-lg'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Shield className='w-4 h-4 text-purple-600' />
                    <span className='text-sm font-medium text-slate-700'>Função</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    {getRoleIcon(mockUser.role)}
                    <span className='text-sm font-medium text-slate-800'>
                      {getRoleLabel(mockUser.role)}
                    </span>
                  </div>
                </div>

                <div className='p-4 bg-slate-50 rounded-lg'>
                  <div className='flex items-center gap-2 mb-2'>
                    <Key className='w-4 h-4 text-purple-600' />
                    <span className='text-sm font-medium text-slate-700'>Tentativas de Login</span>
                  </div>
                  <span className='text-sm font-medium text-slate-800'>
                    {mockUser.loginAttempts || 0} tentativas
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <User className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Informações Pessoais</h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Nome Completo
                  </label>
                  <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                    <span className='text-slate-800'>{mockUser.name}</span>
                  </div>
                </div>

                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>Email</label>
                  <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                    <div className='flex items-center gap-2'>
                      <Mail className='w-4 h-4 text-slate-400' />
                      <span className='text-slate-800'>{mockUser.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Telefone
                  </label>
                  <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                    <div className='flex items-center gap-2'>
                      <Phone className='w-4 h-4 text-slate-400' />
                      <span className='text-slate-800'>{mockUser.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Departamento
                  </label>
                  <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                    <span className='text-slate-800'>{mockUser.department || 'Não informado'}</span>
                  </div>
                </div>

                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>Cargo</label>
                  <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                    <span className='text-slate-800'>{mockUser.position || 'Não informado'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <Shield className='w-5 h-5 text-purple-600' />
                  <h3 className='text-lg font-semibold text-slate-800'>Permissões do Sistema</h3>
                </div>
                <span className='text-sm text-slate-500'>
                  {mockUser.permissions?.length || 0} permissões
                </span>
              </div>

              <div className='space-y-4'>
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div
                    key={category}
                    className='border border-slate-200 rounded-lg p-4 bg-slate-50'
                  >
                    <h4 className='font-semibold text-slate-800 mb-3'>{category}</h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                      {permissions.map((permission) => (
                        <div
                          key={permission}
                          className='flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200'
                        >
                          <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                          <span className='text-sm text-slate-700'>
                            {getPermissionLabel(permission)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* System Activity */}
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <Activity className='w-5 h-5 text-purple-600' />
                <h3 className='text-lg font-semibold text-slate-800'>Atividade do Sistema</h3>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Último Login
                  </label>
                  <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4 text-slate-400' />
                      <span className='text-slate-800'>{formatDate(mockUser.lastLogin)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Data de Cadastro
                  </label>
                  <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                    <span className='text-slate-800'>{formatDate(mockUser.createdAt)}</span>
                  </div>
                </div>

                <div>
                  <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                    Última Atualização
                  </label>
                  <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                    <span className='text-slate-800'>{formatDate(mockUser.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {mockUser.notes && (
              <div className='bg-white rounded-xl shadow-lg p-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <Settings className='w-5 h-5 text-purple-600' />
                  <h3 className='text-lg font-semibold text-slate-800'>Observações</h3>
                </div>
                <div className='p-3 bg-slate-50 rounded-lg border border-slate-200'>
                  <p className='text-sm text-slate-700'>{mockUser.notes}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4'>Ações</h3>
              <div className='space-y-3'>
                <button
                  onClick={() => navigate(`/admin/usuarios/editar/${mockUser.id}`)}
                  className='w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
                >
                  Editar Usuário
                </button>
                {mockUser.isLocked && (
                  <button
                    onClick={() => console.log('Desbloquear usuário:', mockUser.id)}
                    className='w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300'
                  >
                    Desbloquear Usuário
                  </button>
                )}
                <button
                  onClick={() => navigate('/admin/usuarios')}
                  className='w-full px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300'
                >
                  Voltar à Lista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
