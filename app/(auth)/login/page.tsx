'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Car } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/components/shared/AppwriteProvider';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on user role
      if (user.role === 'admin') {
        router.push('/admin/dashboard/overview');
      } else {
        router.push('/client/dashboard/overview');
      }
    }
  }, [user, loading, router]);

  const handleLoginSuccess = () => {
    // Redirect will be handled by the useEffect above
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Car Manager</h1>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link 
                href="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <div className="w-32 h-32 mx-auto mb-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Car className="w-16 h-16" />
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Manage Your Fleet
              </h2>
              <p className="text-xl text-primary-100 max-w-md">
                Keep track of vehicles, maintenance, expenses, and more with our comprehensive car management system.
              </p>
              
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-primary-200">Vehicles Managed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1,200+</div>
                  <div className="text-primary-200">Service Records</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-primary-200">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-primary-200">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}