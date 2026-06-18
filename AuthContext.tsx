import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'mae' | 'empresa' | null;

interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciais de demonstração
const CREDENTIALS = {
  mae: { email: 'Girassol@gmail.com', password: '12345', name: 'Ana Beatriz' },
  empresa: { email: 'Alianca@gmail.com', password: '12345', name: 'TechVida Solutions' },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('alianca_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    if (!role) return false;
    const cred = CREDENTIALS[role];
    if (email.toLowerCase() === cred.email.toLowerCase() && password === cred.password) {
      const userData: User = { email: cred.email, role, name: cred.name };
      setUser(userData);
      localStorage.setItem('alianca_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alianca_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
