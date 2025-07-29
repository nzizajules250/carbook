'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/shared/AppwriteProvider';
import { 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp,
  Server,
  Activity,
  UserPlus,
  AlertCircle
} from 'lucide-react';
import { BarChart, LineChart, PieChart, AreaChart } from '@/components/ui/Chart';
import { databaseService } from '@/lib/appwrite/database';
import { formatCurrency } from '@/lib/helpers';

interface AdminDashboardData {
  stats: any;
  monthlyExpenses: any[];
  vehicleTypes: any[];
  recentActivity: any[];
  systemAlerts: any[];
}

export default function AdminOverviewPage() {
  const { user } = useAuth();
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Admin sees all data (no userId filter)
      const [stats, monthlyExpenses, expenseBreakdown, recentActivity] = await Promise.all([
        databaseService.getDashboardStats(), // No userId for admin
        databaseService.getMonthlyExpenses(),
        databaseService.getExpenseBreakdown(),
        databaseService.getRecentActivity(undefined, 10)
      ]);

      // Get all vehicles for type breakdown
      const vehicles = await databaseService.getVehicles();
      const vehicleTypes = getVehicleTypeBreakdown(vehicles.documents);

      // Mock system alerts for demo
      const systemAlerts = [
        {
          id: 1,
          type: 'info',
          message: 'System backup completed successfully',
          time: '2 hours ago'
        },
        {
          id: 2,
          type: 'warning',
          message: 'High server load detected',
          time: '4 hours ago'
        },
        {
          id: 3,
          type: 'success',
          message: 'All services running normally',
          time: '6 hours ago'
        }
      ];

      setData({
        stats,
        monthlyExpenses,
        vehicleTypes,
        recentActivity,
        systemAlerts
      });
    } catch (error: any) {
      setError(error.message || 'Failed to load admin dashboard data');
      console.error('Admin dashboard data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVehicleTypeBreakdown = (vehicles: any[]) => {
    const typeCount: Record<string, number> = {};
    
    vehicles.forEach(vehicle => {
      const type = getVehicleType(vehicle.make);
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    return Object.entries(typeCount).map(([name, value]) => ({
      name,
      value
    }));
  };

  const getVehicleType = (make: string) => {
    const sedanMakes = ['toyota', 'honda', 'nissan', 'hyundai', 'kia'];
    const suvMakes = ['ford', 'chevrolet', 'jeep', 'subaru'];
    const truckMakes = ['ram', 'gmc', 'dodge'];
    
    const lowerMake = make?.toLowerCase() || '';
    
    if (sedanMakes.includes(lowerMake)) return 'Sedan';
    if (suvMakes.includes(lowerMake)) return 'SUV';
    if (truckMakes.includes(lowerMake)) return 'Truck';
    return 'Other';
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
            Admin Dashboard
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchAdminData}
              className="mt-2 btn-primary text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { stats, monthlyExpenses, vehicleTypes, recentActivity, systemAlerts } = data!;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          System overview and management tools for Car Manager platform.
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
              <p className="text-xs text-green-600">
                {stats.activeVehicles} active
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalExpenses)}
              </p>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-xs text-green-600">
                {formatCurrency(stats.monthlyExpenses)} this month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.totalMaintenance}</p>
              <p className="text-sm text-gray-600">Maintenance Records</p>
              <p className="text-xs text-yellow-600">
                {stats.upcomingMaintenance} upcoming
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Server className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">99.9%</p>
              <p className="text-sm text-gray-600">System Uptime</p>
              <p className="text-xs text-green-600">Last 30 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expenses */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses Trend</h3>
          {monthlyExpenses.length > 0 ? (
            <AreaChart 
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

        {/* Vehicle Distribution */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Distribution</h3>
          {vehicleTypes.length > 0 ? (
            <PieChart 
              data={vehicleTypes} 
              height={300} 
              className="w-full"
            />
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No vehicle data available
            </div>
          )}
        </div>
      </div>

      {/* System Alerts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center p-3 rounded-lg border ${
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                alert.type === 'info' ? 'bg-blue-50 border-blue-200' :
                'bg-green-50 border-green-200'
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'info' ? 'bg-blue-100' :
                  'bg-green-100'
                }`}>
                  {alert.type === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <Activity className={`w-4 h-4 ${
                      alert.type === 'info' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                        <Activity className="w-5 h-5 text-blue-600" />
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
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Add Vehicle</div>
            <div className="text-xs text-gray-500">Add a new vehicle to the fleet</div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <UserPlus className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Add User</div>
            <div className="text-xs text-gray-500">Create a new user account</div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">View Reports</div>
            <div className="text-xs text-gray-500">Generate system reports</div>
          </button>
        </div>
      </div>
    </div>
  );
}