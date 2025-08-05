import { ArrowLeft, User, Mail, Phone, Shield, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface UserItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'employee';
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
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
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    lastLogin: '2024-01-22T09:15:00Z',
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
      default:
        return status;
    }
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
            Usuário #{mockUser.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>Detalhes completos do usuário</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Status do Usuário */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Status do Usuário</h3>
            </div>
            <div className='flex items-center justify-between'>
              <span
                className={`px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(mockUser.status)}`}
              >
                {getStatusLabel(mockUser.status)}
              </span>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Nome Completo
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{mockUser.name}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Função</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center gap-2'>
                    {getRoleIcon(mockUser.role)}
                    <span className='text-slate-800'>{getRoleLabel(mockUser.role)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Phone className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Contato</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Email</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center gap-2'>
                    <Mail className='w-4 h-4 text-slate-400' />
                    <span className='text-slate-800'>{mockUser.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>Telefone</label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center gap-2'>
                    <Phone className='w-4 h-4 text-slate-400' />
                    <span className='text-slate-800'>{mockUser.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Acesso */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Shield className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Acesso</h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Último Login
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-slate-400' />
                    <span className='text-slate-800'>{formatDate(mockUser.lastLogin)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Nível de Acesso
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <div className='flex items-center gap-2'>
                    {getRoleIcon(mockUser.role)}
                    <span className='text-slate-800'>{getRoleLabel(mockUser.role)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Datas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Data de Cadastro
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockUser.createdAt)}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-semibold text-slate-700 mb-2 block'>
                  Última Atualização
                </label>
                <div className='p-3 bg-white rounded-lg border border-slate-200'>
                  <span className='text-slate-800'>{formatDate(mockUser.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='pt-6 border-t border-slate-200'>
            <div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4'>
              <button
                onClick={() => navigate('/admin/usuarios')}
                className='w-full sm:w-auto px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                Voltar
              </button>
              <button
                onClick={() => navigate(`/admin/usuarios/editar/${mockUser.id}`)}
                className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
              >
                Editar Usuário
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
