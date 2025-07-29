'use client';

import { useAuth } from './AppwriteProvider';
import type { UserRole } from '@/lib/types';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export default function RoleBasedRoute({ 
  children, 
  allowedRoles, 
  fallback 
}: RoleBasedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    return fallback || (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to view this content.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}