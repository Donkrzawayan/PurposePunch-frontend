import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { usePostApiAuthLogin, usePostApiAuthRegister } from '../api/generated/auth/auth';
import type { LoginCommand, RegisterCommand } from '../api/generated/model';
import { getErrorMessage } from '../utils/errorUtils';
import { t } from '../textResources';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  isRegistering: boolean;
  loginError: string | null;
  registerError: string | null;
  login: (data: LoginCommand) => Promise<void>;
  register: (data: RegisterCommand) => Promise<void>;
  logout: () => void;
  clearErrors: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const loginMutation = usePostApiAuthLogin();
  const registerMutation = usePostApiAuthRegister();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (data: LoginCommand) => {
    try {
      const response = await loginMutation.mutateAsync({ data });
      setToken(response.token);
      localStorage.setItem('token', response.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (data: RegisterCommand) => {
    try {
      await registerMutation.mutateAsync({ data });
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');

    loginMutation.reset();
    registerMutation.reset();
  };

    // Destructure reset functions to maintain stable references for useCallback dependencies,
    // preventing unnecessary re-renders.
  const { reset: resetLogin } = loginMutation;
  const { reset: resetRegister } = registerMutation;

  const clearErrors = useCallback(() => {
    resetLogin();
    resetRegister();
  }, [resetLogin, resetRegister]);

  const loginError = loginMutation.isError ? getErrorMessage(loginMutation.error, t.login.error) : null;
  const registerError = registerMutation.isError ? getErrorMessage(registerMutation.error, t.register.errors.failed) : null;

  return (
    <AuthContext.Provider value={{
      token, isAuthenticated,
      isLoggingIn: loginMutation.isPending, isRegistering: registerMutation.isPending,
      loginError, registerError,
      login, register, logout,
      clearErrors
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
