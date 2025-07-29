'use client';

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

// Mock data - in a real app, this would come from API calls
const mockStats = {
  totalVehicles: 5,
  activeVehicles: 4,
  maintenanceVehicles: 1,
  totalExpenses: 15420.50,
  monthlyExpenses: 2340.75,
  upcomingMaintenance: 2
};

const mockChartData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
];

const mockExpenseData = [
  { name: 'Fuel', value: 8500 },
  { name: 'Maintenance', value: 4200 },
  { name: 'Insurance', value: 2100 },
  { name: 'Other', value: 620 },
];

const mockRecentActivity = [
  {
    id: 1,
    type: 'maintenance',
    vehicle: '2020 Honda Civic',
    description: 'Oil change completed',
    date: '2024-01-15',
    amount: 85.00
  },
  {
    id: 2,
    type: 'expense',
    vehicle: '2019 Toyota Camry',
    description: 'Fuel purchase',
    date: '2024-01-14',
    amount: 65.50
  },
  {
    id: 3,
    type: 'maintenance',
    vehicle: '2021 Ford F-150',
    description: 'Tire rotation',
    date: '2024-01-12',
    amount: 120.00
  }
];

export default function ClientOverviewPage() {
  const { user } = useAuth();

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
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalVehicles}</p>
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
              <p className="text-2xl font-bold text-gray-900">{mockStats.activeVehicles}</p>
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
              <p className="text-2xl font-bold text-gray-900">{mockStats.upcomingMaintenance}</p>
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
                ${mockStats.monthlyExpenses.toLocaleString()}
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
          <LineChart 
            data={mockChartData} 
            height={300} 
            className="w-full"
          />
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <PieChart 
            data={mockExpenseData} 
            height={300} 
            className="w-full"
          />
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'maintenance' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {activity.type === 'maintenance' ? (
                      <Wrench className={`w-5 h-5 ${
                        activity.type === 'maintenance' ? 'text-blue-600' : 'text-green-600'
                      }`} />
                    ) : (
                      <DollarSign className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.vehicle} • {activity.date}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${activity.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Alerts */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Oil change due soon
                </p>
                <p className="text-xs text-gray-600">
                  2020 Honda Civic • Due in 500 miles
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Inspection overdue
                </p>
                <p className="text-xs text-gray-600">
                  2019 Toyota Camry • Overdue by 15 days
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Scheduled maintenance
                </p>
                <p className="text-xs text-gray-600">
                  2021 Ford F-150 • Tomorrow at 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}