import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, ApiError } from '@/services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  storeId?: string | null;
  active: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se há token salvo no localStorage ao inicializar
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao parsear dados do usuário:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await apiService.login({ email, password });

      // Salva o token
      localStorage.setItem('authToken', response.token);

      // Para obter dados do usuário, precisaríamos de um endpoint adicional
      // Por enquanto, vamos usar dados básicos
      const userData = {
        id: 'temp-id',
        email,
        firstName: 'Usuário',
        lastName: 'Admin',
        role: 'ADMIN',
        storeId: null,
        active: true,
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);

      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            return { success: false, error: 'Dados inválidos. Verifique email e senha.' };
          case 401:
            return { success: false, error: 'Credenciais inválidas.' };
          default:
            return { success: false, error: 'Erro interno do servidor.' };
        }
      }

      return { success: false, error: 'Erro de conexão. Tente novamente.' };
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      await apiService.register(data);

      return { success: true };
    } catch (error) {
      console.error('Erro no cadastro:', error);

      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            return { success: false, error: 'Dados inválidos. Verifique os campos preenchidos.' };
          case 409:
            return { success: false, error: 'Este email já está em uso.' };
          default:
            return { success: false, error: 'Erro interno do servidor.' };
        }
      }

      return { success: false, error: 'Erro de conexão. Tente novamente.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
