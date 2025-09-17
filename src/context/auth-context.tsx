
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserRole } from '@/lib/types';

interface AuthContextType {
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('userRole') as UserRole | null;
      if (storedRole) {
        setRole(storedRole);
      }
    } catch (error) {
      console.error('Failed to access localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newRole: UserRole) => {
    setRole(newRole);
     try {
      localStorage.setItem('userRole', newRole);
    } catch (error) {
      console.error('Failed to access localStorage:', error);
    }
  };

  const logout = () => {
    setRole(null);
    try {
      localStorage.removeItem('userRole');
    } catch (error) {
      console.error('Failed to access localStorage:', error);
    }
  };

  const isAuthenticated = !!role;

  return (
    <AuthContext.Provider value={{ role, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
