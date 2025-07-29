'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AppwriteProvider';
import type { ProtectedRouteProps } from '@/lib/types';

export default function ProtectedRoute({ 
  children, 
  requiredRole,
  fallback 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        // Redirect based on user role
        if (user.role === 'admin') {
          router.push('/admin/dashboard/overview');
        } else {
          router.push('/client/dashboard/overview');
        }
        return;
      }
    }
  }, [user, loading, requiredRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return fallback || null;
  }

  if (requiredRole && user.role !== requiredRole) {
    return fallback || null;
  }

  return <>{children}</>;
}