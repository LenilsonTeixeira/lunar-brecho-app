import { useState, useEffect } from 'react';
import { User, Phone, Shield, ArrowLeft } from 'lucide-react';
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

const EditUser = () => {
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

  const [user] = useState<UserItem>(mockUser);
  const [userName, setUserName] = useState(mockUser.name);
  const [userEmail, setUserEmail] = useState(mockUser.email);
  const [userPhone, setUserPhone] = useState(mockUser.phone);
  const [userRole, setUserRole] = useState<'admin' | 'manager' | 'employee'>(mockUser.role);
  const [userStatus, setUserStatus] = useState<'active' | 'inactive'>(mockUser.status);

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
    };

    console.log('Usuário atualizado:', updatedUser);
    alert('Usuário atualizado com sucesso!');

    // Navegar de volta para a lista de usuários
    navigate('/admin/usuarios');
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
            Editar Usuário #{user.id}
          </h1>
          <p className='text-sm sm:text-base text-slate-600'>
            Modifique as informações do usuário abaixo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-6'
        >
          {/* Informações Básicas */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <User className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações Básicas</h3>
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
                <label className='text-sm font-semibold text-slate-700' htmlFor='user-role'>
                  Função *
                </label>
                <select
                  id='user-role'
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as 'admin' | 'manager' | 'employee')}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='admin'>Administrador</option>
                  <option value='manager'>Gerente</option>
                  <option value='employee'>Funcionário</option>
                </select>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Phone className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Contato</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
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
            </div>
          </div>

          {/* Informações de Acesso */}
          <div className='p-6 bg-slate-50 rounded-lg border border-slate-200'>
            <div className='flex items-center gap-3 mb-4'>
              <Shield className='w-5 h-5 text-purple-600' />
              <h3 className='text-lg font-semibold text-slate-800'>Informações de Acesso</h3>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='user-status'>
                  Status *
                </label>
                <select
                  id='user-status'
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value as 'active' | 'inactive')}
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                  required
                >
                  <option value='active'>Ativo</option>
                  <option value='inactive'>Inativo</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='text-sm font-semibold text-slate-700' htmlFor='user-password'>
                  Nova Senha (opcional)
                </label>
                <input
                  id='user-password'
                  type='password'
                  placeholder='Deixe em branco para manter a senha atual'
                  className='outline-none py-2 sm:py-3 px-4 text-sm sm:text-base rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 bg-white'
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-4'>
            <button
              type='submit'
              className='w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Atualizar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
