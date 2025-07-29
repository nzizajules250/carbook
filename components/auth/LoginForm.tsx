'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/components/shared/AppwriteProvider';
import { isValidEmail } from '@/lib/helpers';
import { cn } from '@/lib/helpers';

interface LoginFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function LoginForm({ onSuccess, className }: LoginFormProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
      onSuccess?.();
    } catch (error: any) {
      setErrors({ submit: error.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="label">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={cn(
              'input pl-10',
              errors.email && 'input-error'
            )}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className={cn(
              'input pl-10 pr-10',
              errors.password && 'input-error'
            )}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
            Forgot your password?
          </a>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="spinner mr-2"></div>
            Signing in...
          </div>
        ) : (
          'Sign in'
        )}
      </button>

      {/* Demo Accounts */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-600 text-center mb-4">
          Demo Accounts (for testing):
        </p>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: 'admin@carmanager.com',
                password: 'admin123'
              });
            }}
            className="btn-outline text-xs"
          >
            Admin Account
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: 'client@carmanager.com',
                password: 'client123'
              });
            }}
            className="btn-outline text-xs"
          >
            Client Account
          </button>
        </div>
      </div>
    </form>
  );
}