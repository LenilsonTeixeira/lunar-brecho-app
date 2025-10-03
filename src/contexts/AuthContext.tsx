import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, ApiError } from '@/services';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  storeId?: string | null;
  active: boolean;
}

// Função para decodificar JWT (sem validação - apenas para extrair dados)
const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
};

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
    const refreshToken = localStorage.getItem('refreshToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao parsear dados do usuário:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
      }
    } else if (!token && refreshToken) {
      // Se não há token mas há refresh token, limpa tudo
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
    }

    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authService.login({ email, password });

      // Salva os tokens
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);

      // Decodifica o JWT para extrair os dados do usuário
      const decodedToken = decodeJWT(response.token);

      if (!decodedToken) {
        return { success: false, error: 'Erro ao processar token de autenticação.' };
      }

      // Extrai os dados do usuário do token JWT
      // Estrutura esperada: { id, firstName, lastName, role, sub (email), storeId? }
      const userData: User = {
        id: decodedToken.id || 'unknown',
        email: decodedToken.sub || email, // O email está no campo 'sub'
        firstName: decodedToken.firstName || 'Usuário',
        lastName: decodedToken.lastName || 'Admin',
        role: decodedToken.role || 'ADMIN',
        storeId: decodedToken.storeId || null,
        active: decodedToken.active !== undefined ? decodedToken.active : true,
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
      await authService.register(data);

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
    localStorage.removeItem('refreshToken');
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
