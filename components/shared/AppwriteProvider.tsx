'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '@/lib/appwrite/auth';
import type { User, AuthContextType } from '@/lib/types';
import type { Models } from 'appwrite';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser({
          ...currentUser,
          role: currentUser.prefs?.role || 'client',
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      await authService.login({ email, password });
      await checkAuthState();
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      setLoading(true);
      await authService.createUserAccount({ email, password, name });
      
      // Set default role as client
      await authService.updatePreferences({ role: 'client' });
      await checkAuthState();
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await authService.logout();
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Logout failed');
    }
  }

  async function updateProfile(data: Partial<User>) {
    try {
      if (data.role && user) {
        await authService.updatePreferences({ ...user.prefs, role: data.role });
      }
      await checkAuthState();
    } catch (error: any) {
      throw new Error(error.message || 'Profile update failed');
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;