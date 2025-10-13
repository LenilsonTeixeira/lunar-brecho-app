import { useState } from 'react';
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Plus,
  Shield,
  UserCheck,
  UserX,
  Clock,
  Lock,
} from 'lucide-react';
import { useNavigate } from 'react-router';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'employee' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  department?: string;
  position?: string;
  lastLogin?: string;
  createdAt?: string;
  permissions?: string[];
  loginAttempts?: number;
  isLocked?: boolean;
}

const ListUser = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>(
    'all',
  );
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'manager' | 'employee' | 'viewer'>(
    'all',
  );

  // Mock data - substitua por dados reais da sua API
  const users: User[] = [
    {
      id: 1,
      name: 'João Silva Santos',
      email: 'joao.silva@lunarbrecho.com',
      phone: '(11) 99999-1234',
      role: 'admin',
      status: 'active',
      department: 'TI',
      position: 'Administrador de Sistema',
      lastLogin: '2024-01-22T09:15:00Z',
      createdAt: '2024-01-15T10:30:00Z',
      permissions: ['*'],
      loginAttempts: 0,
      isLocked: false,
    },
    {
      id: 2,
      name: 'Maria Costa Oliveira',
      email: 'maria.costa@lunarbrecho.com',
      phone: '(11) 98888-5678',
      role: 'manager',
      status: 'active',
      department: 'Vendas',
      position: 'Gerente de Vendas',
      lastLogin: '2024-01-21T14:30:00Z',
      createdAt: '2024-01-10T08:15:00Z',
      permissions: [
        'products.view',
        'products.create',
        'products.edit',
        'customers.manage',
        'orders.manage',
      ],
      loginAttempts: 0,
      isLocked: false,
    },
    {
      id: 3,
      name: 'Pedro Almeida Ferreira',
      email: 'pedro.almeida@lunarbrecho.com',
      phone: '(11) 97777-9012',
      role: 'employee',
      status: 'active',
      department: 'Estoque',
      position: 'Auxiliar de Estoque',
      lastLogin: '2024-01-20T16:45:00Z',
      createdAt: '2024-01-05T12:20:00Z',
      permissions: ['products.view', 'customers.manage', 'orders.manage'],
      loginAttempts: 0,
      isLocked: false,
    },
    {
      id: 4,
      name: 'Ana Rodrigues Lima',
      email: 'ana.rodrigues@lunarbrecho.com',
      phone: '(11) 96666-3456',
      role: 'employee',
      status: 'inactive',
      department: 'Financeiro',
      position: 'Auxiliar Financeiro',
      lastLogin: '2024-01-15T10:20:00Z',
      createdAt: '2023-12-20T09:45:00Z',
      permissions: ['products.view', 'accounts.receivable', 'accounts.payable'],
      loginAttempts: 3,
      isLocked: true,
    },
    {
      id: 5,
      name: 'Carlos Eduardo Santos',
      email: 'carlos.santos@lunarbrecho.com',
      phone: '(11) 95555-7890',
      role: 'manager',
      status: 'active',
      department: 'Financeiro',
      position: 'Gerente Financeiro',
      lastLogin: '2024-01-22T08:30:00Z',
      createdAt: '2024-01-08T14:10:00Z',
      permissions: [
        'products.view',
        'accounts.receivable',
        'accounts.payable',
        'cashflow.manage',
        'financial.reports',
      ],
      loginAttempts: 0,
      isLocked: false,
    },
    {
      id: 6,
      name: 'Fernanda Silva Costa',
      email: 'fernanda.silva@lunarbrecho.com',
      phone: '(11) 94444-1234',
      role: 'viewer',
      status: 'pending',
      department: 'Marketing',
      position: 'Analista de Marketing',
      lastLogin: undefined,
      createdAt: '2024-01-22T11:00:00Z',
      permissions: ['products.view', 'reports.view'],
      loginAttempts: 0,
      isLocked: false,
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'manager':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'employee':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'viewer':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-slate-100 text-slate-800 border border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-800 border border-slate-200';
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewUser = (user: User) => {
    navigate(`/admin/usuarios/visualizar/${user.id}`);
  };

  const handleEditUser = (user: User) => {
    navigate(`/admin/usuarios/editar/${user.id}`);
  };

  const handleDeleteUser = (user: User) => {
    // Implementar lógica de exclusão
    console.log('Excluir usuário:', user);
  };

  const handleUnlockUser = (user: User) => {
    // Implementar lógica de desbloqueio
    console.log('Desbloquear usuário:', user);
  };

  const getSystemStats = () => {
    const total = users.length;
    const active = users.filter((u) => u.status === 'active').length;
    const inactive = users.filter((u) => u.status === 'inactive').length;
    const pending = users.filter((u) => u.status === 'pending').length;
    const locked = users.filter((u) => u.isLocked).length;

    return { total, active, inactive, pending, locked };
  };

  const stats = getSystemStats();

  return (
    <div className='py-6 flex flex-col bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
                Gerenciamento de Usuários
              </h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Controle de acesso e permissões do sistema
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/usuarios/adicionar')}
              className='flex items-center justify-center gap-2 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Plus className='w-4 h-4' />
              Adicionar Usuário
            </button>
          </div>
        </div>

        {/* System Stats */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
          <div className='bg-white rounded-xl shadow-lg p-4 border border-slate-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Total de Usuários</p>
                <p className='text-2xl font-bold text-slate-800'>{stats.total}</p>
              </div>
              <div className='w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center'>
                <UserCheck className='w-4 h-4 text-purple-600' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-4 border border-slate-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Ativos</p>
                <p className='text-2xl font-bold text-green-600'>{stats.active}</p>
              </div>
              <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                <UserCheck className='w-4 h-4 text-green-600' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-4 border border-slate-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Inativos</p>
                <p className='text-2xl font-bold text-red-600'>{stats.inactive}</p>
              </div>
              <div className='w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center'>
                <UserX className='w-4 h-4 text-red-600' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-4 border border-slate-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Pendentes</p>
                <p className='text-2xl font-bold text-yellow-600'>{stats.pending}</p>
              </div>
              <div className='w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center'>
                <Clock className='w-4 h-4 text-yellow-600' />
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-lg p-4 border border-slate-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Bloqueados</p>
                <p className='text-2xl font-bold text-orange-600'>{stats.locked}</p>
              </div>
              <div className='w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center'>
                <Lock className='w-4 h-4 text-orange-600' />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
              <input
                type='text'
                placeholder='Buscar usuários...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className='px-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
            >
              <option value='all'>Todos os Status</option>
              <option value='active'>Ativos</option>
              <option value='inactive'>Inativos</option>
              <option value='pending'>Pendentes</option>
            </select>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className='px-4 py-2 sm:py-3 text-sm border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
            >
              <option value='all'>Todas as Funções</option>
              <option value='admin'>Administradores</option>
              <option value='manager'>Gerentes</option>
              <option value='employee'>Funcionários</option>
              <option value='viewer'>Visualizadores</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setRoleFilter('all');
              }}
              className='px-4 py-2 sm:py-3 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all duration-300'
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Usuário
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Função
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Último Login
                  </th>
                  <th className='px-6 py-4 text-left text-xs sm:text-sm font-semibold text-slate-700'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className='hover:bg-slate-50 transition-colors duration-200 shadow-sm'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div>
                          <p className='text-xs sm:text-sm font-medium text-slate-800'>
                            {user.name}
                          </p>
                          <p className='text-xs text-slate-500'>{user.email}</p>
                          <p className='text-xs text-slate-500'>{user.phone}</p>
                          {user.department && (
                            <p className='text-xs text-slate-400'>
                              {user.department} • {user.position}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getRoleColor(user.role)}`}
                      >
                        <Shield className='w-3 h-3 mr-1' />
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex flex-col gap-1'>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getStatusColor(user.status)}`}
                        >
                          {getStatusLabel(user.status)}
                        </span>
                        {user.isLocked && (
                          <span className='inline-flex items-center px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full'>
                            <Lock className='w-3 h-3 mr-1' />
                            Bloqueado
                          </span>
                        )}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-xs sm:text-sm text-slate-700'>
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <button
                          onClick={() => handleViewUser(user)}
                          className='p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200'
                          title='Visualizar'
                        >
                          <Eye className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className='p-1.5 sm:p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200'
                          title='Editar'
                        >
                          <Edit className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        {user.isLocked && (
                          <button
                            onClick={() => handleUnlockUser(user)}
                            className='p-1.5 sm:p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200'
                            title='Desbloquear'
                          >
                            <Lock className='w-3 h-3 sm:w-4 sm:h-4' />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className='p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                          title='Excluir'
                        >
                          <Trash2 className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center'>
                <Search className='w-8 h-8 text-slate-400' />
              </div>
              <h3 className='text-base sm:text-lg font-medium text-slate-800 mb-2'>
                Nenhum usuário encontrado
              </h3>
              <p className='text-sm sm:text-base text-slate-600'>
                Tente ajustar os filtros ou adicionar um novo usuário.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className='mt-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4'>
            <div className='text-xs sm:text-sm text-slate-600'>
              Mostrando {filteredUsers.length} de {users.length} usuários
            </div>
            <div className='flex items-center gap-2'>
              <button className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                Anterior
              </button>
              <span className='px-2 sm:px-3 py-2 bg-purple-600 text-white text-xs sm:text-sm rounded-lg'>
                1
              </span>
              <button className='px-2 sm:px-3 py-2 text-xs sm:text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200'>
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUser;
