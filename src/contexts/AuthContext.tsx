// src/contexts/AuthContext.tsx
// Authentication context with JWT persistence

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  email?: string;
  phone?: string;
  role: 'admin' | 'student';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('sv_token');
      const storedUser = localStorage.getItem('sv_user');

      if (storedToken && storedUser) {
        // Check if token is expired (basic check by decoding payload)
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        if (payload.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired, clear storage
          localStorage.removeItem('sv_token');
          localStorage.removeItem('sv_user');
        }
      }
    } catch {
      // Invalid token in storage, clear it
      localStorage.removeItem('sv_token');
      localStorage.removeItem('sv_user');
    }
  }, []);

  const login = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('sv_token', newToken);
    localStorage.setItem('sv_user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sv_token');
    localStorage.removeItem('sv_user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
