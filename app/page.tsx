'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Car, 
  Users, 
  Shield, 
  BarChart3, 
  Clock, 
  DollarSign,
  CheckCircle,
  ArrowRight 
} from 'lucide-react';
import { useAuth } from '@/components/shared/AppwriteProvider';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Redirect authenticated users to their dashboard
      if (user.role === 'admin') {
        router.push('/admin/dashboard/overview');
      } else {
        router.push('/client/dashboard/overview');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Don't render the landing page if user is authenticated (they'll be redirected)
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Car Manager</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/login"
                className="text-gray-700 hover:text-primary-600 font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/register"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Manage Your Fleet
              <span className="block text-primary-200">With Confidence</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Comprehensive vehicle management system to track your fleet, schedule maintenance, 
              monitor expenses, and generate insightful reports all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-50 px-8 py-3 text-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/login"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 text-lg"
              >
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <Car className="w-full h-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Fleet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From individual car owners to large fleet managers, our platform provides 
              all the tools you need to stay organized and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Car className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Vehicle Tracking
              </h3>
              <p className="text-gray-600">
                Keep detailed records of all your vehicles including specifications, 
                documentation, and current status.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Maintenance Scheduling
              </h3>
              <p className="text-gray-600">
                Never miss important maintenance with automated reminders and 
                comprehensive service history tracking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Expense Management
              </h3>
              <p className="text-gray-600">
                Track all vehicle-related expenses including fuel, maintenance, 
                insurance, and more with detailed categorization.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Analytics & Reports
              </h3>
              <p className="text-gray-600">
                Generate comprehensive reports and insights to optimize your 
                fleet performance and reduce costs.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Team Management
              </h3>
              <p className="text-gray-600">
                Manage multiple users with role-based access control for 
                administrators and fleet users.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security and 
                backed up with 99.9% uptime guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Fleet Managers Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-primary-200">Vehicles Managed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-primary-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">99.9%</div>
              <div className="text-primary-200">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-primary-200">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Take Control of Your Fleet?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of fleet managers who have streamlined their operations with Car Manager.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="btn-primary px-8 py-3 text-lg"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/login"
              className="btn-outline px-8 py-3 text-lg"
            >
              Sign In
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Free 30-day trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Car Manager</span>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2024 Car Manager. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}