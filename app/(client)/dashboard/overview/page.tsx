'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/shared/AppwriteProvider';
import { 
  Car, 
  Wrench, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { BarChart, LineChart, PieChart } from '@/components/ui/Chart';
import { databaseService } from '@/lib/appwrite/database';
import { formatCurrency } from '@/lib/helpers';

interface DashboardData {
  stats: any;
  monthlyExpenses: any[];
  expenseBreakdown: any[];
  recentActivity: any[];
  maintenanceAlerts: any[];
}

export default function ClientOverviewPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [stats, monthlyExpenses, expenseBreakdown, recentActivity, maintenanceAlerts] = await Promise.all([
        databaseService.getDashboardStats(user?.$id),
        databaseService.getMonthlyExpenses(user?.$id),
        databaseService.getExpenseBreakdown(user?.$id),
        databaseService.getRecentActivity(user?.$id),
        databaseService.getMaintenanceAlerts(user?.$id)
      ]);

      setData({
        stats,
        monthlyExpenses,
        expenseBreakdown,
        recentActivity,
        maintenanceAlerts
      });
    } catch (error: any) {
      setError(error.message || 'Failed to load dashboard data');
      console.error('Dashboard data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border p-6">
              <div className="animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="mt-2 btn-primary text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { stats, monthlyExpenses, expenseBreakdown, recentActivity, maintenanceAlerts } = data!;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your vehicle fleet and recent activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.totalVehicles}</p>
              <p className="text-sm text-gray-600">Total Vehicles</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.activeVehicles}</p>
              <p className="text-sm text-gray-600">Active Vehicles</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingMaintenance}</p>
              <p className="text-sm text-gray-600">Upcoming Maintenance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.monthlyExpenses)}
              </p>
              <p className="text-sm text-gray-600">Monthly Expenses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expenses Chart */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses</h3>
          {monthlyExpenses.length > 0 ? (
            <LineChart 
              data={monthlyExpenses} 
              height={300} 
              className="w-full"
            />
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No expense data available
            </div>
          )}
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          {expenseBreakdown.length > 0 ? (
            <PieChart 
              data={expenseBreakdown} 
              height={300} 
              className="w-full"
            />
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No expense data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === 'maintenance' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {activity.type === 'maintenance' ? (
                        <Wrench className="w-5 h-5 text-blue-600" />
                      ) : (
                        <DollarSign className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(activity.amount)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No recent activity
              </div>
            )}
          </div>
        </div>

        {/* Maintenance Alerts */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Alerts</h3>
          <div className="space-y-4">
            {maintenanceAlerts.length > 0 ? (
              maintenanceAlerts.map((alert) => (
                <div key={alert.id} className={`flex items-center p-3 rounded-lg border ${
                  alert.type === 'overdue' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.type === 'overdue' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {alert.message} • {
                        alert.type === 'overdue' 
                          ? `${alert.daysOverdue} days overdue`
                          : `Due in ${alert.daysUntil} days`
                      }
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No maintenance alerts</p>
                <p className="text-xs">All vehicles are up to date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}