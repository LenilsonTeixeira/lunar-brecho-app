import { useState } from 'react';
import { useNavigate } from 'react-router';
import MoonIcon from '@/components/icon/MoonIcon';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Elementos decorativos de fundo */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
      </div>

      <div className='w-full max-w-md relative z-10'>
        {/* Logo com animação */}
        <div className='text-center mb-8 animate-fade-in-down'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 animate-pulse'></div>
              <MoonIcon className='w-10 h-10 text-purple-600 relative z-10 drop-shadow-lg' />
            </div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent'>
              LUNAR
            </h1>
          </div>
        </div>

        {/* Formulário de Login com animação */}
        <form
          onSubmit={handleSubmit}
          className='w-full text-center border border-white/40 rounded-3xl px-8 py-10 bg-white/80 backdrop-blur-xl shadow-2xl shadow-purple-200/50 animate-fade-in-up'
        >
          <h1 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Bem-vindo de volta
          </h1>
          <p className='text-gray-600 text-sm mt-2 mb-8'>
            Entre com suas credenciais para continuar
          </p>

          {/* Input de Email */}
          <div className='relative mb-5 group'>
            <div
              className={`flex items-center w-full bg-white/60 backdrop-blur-sm border-2 h-14 rounded-2xl overflow-hidden pl-5 gap-3 transition-all duration-300 ${
                emailFocused
                  ? 'border-purple-500 shadow-lg shadow-purple-200/50 scale-[1.02]'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <svg
                width='18'
                height='14'
                viewBox='0 0 16 11'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={`transition-colors duration-300 ${emailFocused ? 'text-purple-600' : 'text-gray-400'}`}
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z'
                  fill='currentColor'
                />
              </svg>
              <input
                type='email'
                placeholder='seu@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className='bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full pr-5 font-medium'
                required
              />
            </div>
          </div>

          {/* Input de Senha */}
          <div className='relative mb-6 group'>
            <div
              className={`flex items-center w-full bg-white/60 backdrop-blur-sm border-2 h-14 rounded-2xl overflow-hidden pl-5 gap-3 transition-all duration-300 ${
                passwordFocused
                  ? 'border-purple-500 shadow-lg shadow-purple-200/50 scale-[1.02]'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <svg
                width='14'
                height='18'
                viewBox='0 0 13 17'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className={`transition-colors duration-300 ${passwordFocused ? 'text-purple-600' : 'text-gray-400'}`}
              >
                <path
                  d='M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z'
                  fill='currentColor'
                />
              </svg>
              <input
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className='bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full pr-5 font-medium'
                required
              />
            </div>
          </div>

          {/* Mensagem de erro com animação */}
          {error && (
            <div className='mb-6 p-4 bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-xl animate-shake'>
              <p className='text-red-700 text-sm font-medium flex items-center justify-center gap-2'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* Botão de Login com gradiente e animações */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full h-14 rounded-2xl text-white font-bold text-base bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:shadow-2xl hover:shadow-purple-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group'
          >
            <span className='relative z-10 flex items-center justify-center gap-2'>
              {isLoading ? (
                <>
                  <svg
                    className='animate-spin h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <svg
                    className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7l5 5m0 0l-5 5m5-5H6'
                    />
                  </svg>
                </>
              )}
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out 0.2s both;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;
