import { useState } from 'react';
import { useNavigate } from 'react-router';
import MoonIcon from '@/components/icon/MoonIcon';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'ADMIN' as 'SUPER_ADMIN' | 'ADMIN',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError('Todos os campos são obrigatórios');
      return false;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      } else {
        setError(result.error || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setError('Erro ao cadastrar usuário. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4'>
        <div className='w-full max-w-md text-center'>
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-8 h-8 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Cadastro realizado!</h2>
            <p className='text-gray-600 mb-4'>
              Usuário criado com sucesso. Redirecionando para login...
            </p>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <MoonIcon className='w-8 h-8 text-purple-600' />
            <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              LUNAR
            </h1>
          </div>
          <p className='text-slate-600 text-sm'>Sistema Administrativo</p>
        </div>

        {/* Formulário de Cadastro */}
        <form
          onSubmit={handleSubmit}
          className='max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-lg'
        >
          <h1 className='text-gray-900 text-3xl mt-10 font-medium'>Cadastrar</h1>
          <p className='text-gray-500 text-sm mt-2'>Crie sua conta para continuar</p>

          {/* Nome */}
          <div className='flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z'
                fill='#6B7280'
              />
              <path
                d='M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z'
                fill='#6B7280'
              />
            </svg>
            <input
              type='text'
              name='firstName'
              placeholder='Nome'
              value={formData.firstName}
              onChange={handleInputChange}
              className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'
              required
            />
          </div>

          {/* Sobrenome */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z'
                fill='#6B7280'
              />
              <path
                d='M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z'
                fill='#6B7280'
              />
            </svg>
            <input
              type='text'
              name='lastName'
              placeholder='Sobrenome'
              value={formData.lastName}
              onChange={handleInputChange}
              className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'
              required
            />
          </div>

          {/* Email */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <svg
              width='16'
              height='11'
              viewBox='0 0 16 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z'
                fill='#6B7280'
              />
            </svg>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
              className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'
              required
            />
          </div>

          {/* Senha */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <svg
              width='13'
              height='17'
              viewBox='0 0 13 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z'
                fill='#6B7280'
              />
            </svg>
            <input
              type='password'
              name='password'
              placeholder='Senha (mín. 6 caracteres)'
              value={formData.password}
              onChange={handleInputChange}
              className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'
              required
            />
          </div>

          {/* Confirmar Senha */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <svg
              width='13'
              height='17'
              viewBox='0 0 13 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z'
                fill='#6B7280'
              />
            </svg>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirmar senha'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className='bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full'
              required
            />
          </div>

          {/* Role */}
          <div className='flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12 2L2 7L12 12L22 7L12 2Z' fill='#6B7280' />
              <path d='M2 17L12 22L22 17' fill='#6B7280' />
              <path d='M2 12L12 17L22 12' fill='#6B7280' />
            </svg>
            <select
              name='role'
              value={formData.role}
              onChange={handleInputChange}
              className='bg-transparent text-gray-500 outline-none text-sm w-full h-full appearance-none cursor-pointer'
              required
            >
              <option value='ADMIN'>Administrador</option>
              <option value='SUPER_ADMIN'>Super Administrador</option>
            </select>
          </div>

          {error && (
            <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
              <p className='text-red-700 text-sm'>{error}</p>
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className='mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <p className='text-gray-500 text-sm mt-3 mb-11'>
            Já tem uma conta?
            <a
              className='text-indigo-500 hover:text-indigo-600 transition-colors ml-1'
              href='/admin/login'
              onClick={(e) => {
                e.preventDefault();
                navigate('/admin/login');
              }}
            >
              Faça login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
