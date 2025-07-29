'use client';

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

// Mock data - in a real app, this would come from API calls
const mockAdminStats = {
  totalUsers: 48,
  activeUsers: 42,
  totalVehicles: 156,
  totalRevenue: 45230.75,
  monthlyRevenue: 8450.25,
  systemUptime: 99.9
};

const mockUserGrowth = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 35 },
  { name: 'Mar', value: 40 },
  { name: 'Apr', value: 45 },
  { name: 'May', value: 48 },
  { name: 'Jun', value: 48 },
];

const mockRevenueData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 5300 },
  { name: 'Mar', value: 6800 },
  { name: 'Apr', value: 7200 },
  { name: 'May', value: 8100 },
  { name: 'Jun', value: 8450 },
];

const mockVehicleTypes = [
  { name: 'Sedan', value: 65 },
  { name: 'SUV', value: 45 },
  { name: 'Truck', value: 28 },
  { name: 'Other', value: 18 },
];

const mockRecentUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    joinDate: '2024-01-15',
    vehicles: 3
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    joinDate: '2024-01-14',
    vehicles: 1
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike@example.com',
    joinDate: '2024-01-12',
    vehicles: 2
  }
];

const mockSystemAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'Database backup completed with warnings',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'info',
    message: 'System maintenance scheduled for tonight',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'success',
    message: 'All services running normally',
    time: '6 hours ago'
  }
];

export default function AdminOverviewPage() {
  const { user } = useAuth();

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
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{mockAdminStats.totalUsers}</p>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-xs text-green-600">+3 this week</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{mockAdminStats.totalVehicles}</p>
              <p className="text-sm text-gray-600">Total Vehicles</p>
              <p className="text-xs text-green-600">+12 this month</p>
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
                ${mockAdminStats.monthlyRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-xs text-green-600">+8.5% vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Server className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{mockAdminStats.systemUptime}%</p>
              <p className="text-sm text-gray-600">System Uptime</p>
              <p className="text-xs text-green-600">Last 30 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <AreaChart 
            data={mockUserGrowth} 
            height={300} 
            className="w-full"
          />
        </div>

        {/* Revenue Trends */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <LineChart 
            data={mockRevenueData} 
            height={300} 
            className="w-full"
          />
        </div>
      </div>

      {/* Vehicle Types & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Distribution */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Distribution</h3>
          <PieChart 
            data={mockVehicleTypes} 
            height={300} 
            className="w-full"
          />
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
          <div className="space-y-4">
            {mockSystemAlerts.map((alert) => (
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
                  ) : alert.type === 'info' ? (
                    <Activity className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Activity className="w-4 h-4 text-green-600" />
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
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
          <button className="btn-primary text-sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRecentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.vehicles}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">
                      View
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}