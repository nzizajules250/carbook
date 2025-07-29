import { ID, Query } from 'appwrite';
import { databases } from './client';
import type { Models } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const VEHICLES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_VEHICLES_COLLECTION_ID!;
const MAINTENANCE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_MAINTENANCE_COLLECTION_ID!;
const EXPENSES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_EXPENSES_COLLECTION_ID!;

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  color: string;
  mileage: number;
  fuelType: string;
  status: 'active' | 'maintenance' | 'retired';
  purchaseDate: string;
  purchasePrice: number;
  userId: string;
  imageUrl?: string;
}

export interface MaintenanceRecord {
  vehicleId: string;
  type: 'oil_change' | 'tire_rotation' | 'brake_service' | 'engine_repair' | 'other';
  description: string;
  cost: number;
  date: string;
  mileage: number;
  serviceProvider: string;
  nextServiceDate?: string;
  nextServiceMileage?: number;
  userId: string;
}

export interface Expense {
  vehicleId: string;
  type: 'fuel' | 'maintenance' | 'insurance' | 'registration' | 'parking' | 'tolls' | 'other';
  amount: number;
  date: string;
  description: string;
  category: string;
  mileage?: number;
  userId: string;
}

export const databaseService = {
  // Vehicle operations
  async createVehicle(vehicle: Vehicle): Promise<Models.Document> {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        VEHICLES_COLLECTION_ID,
        ID.unique(),
        vehicle
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create vehicle');
    }
  },

  async getVehicles(userId?: string): Promise<Models.DocumentList<Models.Document>> {
    try {
      const queries = userId ? [Query.equal('userId', userId)] : [];
      const response = await databases.listDocuments(
        DATABASE_ID,
        VEHICLES_COLLECTION_ID,
        queries
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch vehicles');
    }
  },

  async getVehicle(vehicleId: string): Promise<Models.Document> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        VEHICLES_COLLECTION_ID,
        vehicleId
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch vehicle');
    }
  },

  async updateVehicle(vehicleId: string, data: Partial<Vehicle>): Promise<Models.Document> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        VEHICLES_COLLECTION_ID,
        vehicleId,
        data
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update vehicle');
    }
  },

  async deleteVehicle(vehicleId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        VEHICLES_COLLECTION_ID,
        vehicleId
      );
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete vehicle');
    }
  },

  // Maintenance operations
  async createMaintenanceRecord(maintenance: MaintenanceRecord): Promise<Models.Document> {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        MAINTENANCE_COLLECTION_ID,
        ID.unique(),
        maintenance
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create maintenance record');
    }
  },

  async getMaintenanceRecords(vehicleId?: string, userId?: string): Promise<Models.DocumentList<Models.Document>> {
    try {
      const queries = [];
      if (vehicleId) queries.push(Query.equal('vehicleId', vehicleId));
      if (userId) queries.push(Query.equal('userId', userId));
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        MAINTENANCE_COLLECTION_ID,
        queries
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch maintenance records');
    }
  },

  async updateMaintenanceRecord(recordId: string, data: Partial<MaintenanceRecord>): Promise<Models.Document> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        MAINTENANCE_COLLECTION_ID,
        recordId,
        data
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update maintenance record');
    }
  },

  async deleteMaintenanceRecord(recordId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        MAINTENANCE_COLLECTION_ID,
        recordId
      );
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete maintenance record');
    }
  },

  // Expense operations
  async createExpense(expense: Expense): Promise<Models.Document> {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        ID.unique(),
        expense
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create expense');
    }
  },

  async getExpenses(vehicleId?: string, userId?: string): Promise<Models.DocumentList<Models.Document>> {
    try {
      const queries = [];
      if (vehicleId) queries.push(Query.equal('vehicleId', vehicleId));
      if (userId) queries.push(Query.equal('userId', userId));
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        queries
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch expenses');
    }
  },

  async updateExpense(expenseId: string, data: Partial<Expense>): Promise<Models.Document> {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        expenseId,
        data
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update expense');
    }
  },

  async deleteExpense(expenseId: string): Promise<void> {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID,
        expenseId
      );
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete expense');
    }
  },

  // Analytics and statistics
  async getDashboardStats(userId?: string): Promise<any> {
    try {
      const vehiclesQuery = userId ? [Query.equal('userId', userId)] : [];
      const maintenanceQuery = userId ? [Query.equal('userId', userId)] : [];
      const expensesQuery = userId ? [Query.equal('userId', userId)] : [];

      const [vehicles, maintenance, expenses] = await Promise.all([
        databases.listDocuments(DATABASE_ID, VEHICLES_COLLECTION_ID, vehiclesQuery),
        databases.listDocuments(DATABASE_ID, MAINTENANCE_COLLECTION_ID, maintenanceQuery),
        databases.listDocuments(DATABASE_ID, EXPENSES_COLLECTION_ID, expensesQuery)
      ]);

      const totalVehicles = vehicles.total;
      const activeVehicles = vehicles.documents.filter(v => v.status === 'active').length;
      const maintenanceVehicles = vehicles.documents.filter(v => v.status === 'maintenance').length;
      
      const totalExpenses = expenses.documents.reduce((sum, exp) => sum + exp.amount, 0);
      const currentMonth = new Date().getMonth();
      const monthlyExpenses = expenses.documents
        .filter(exp => new Date(exp.date).getMonth() === currentMonth)
        .reduce((sum, exp) => sum + exp.amount, 0);

      // Calculate upcoming maintenance (next 30 days)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      const upcomingMaintenance = maintenance.documents.filter(m => 
        m.nextServiceDate && new Date(m.nextServiceDate) <= thirtyDaysFromNow
      ).length;

      return {
        totalVehicles,
        activeVehicles,
        maintenanceVehicles,
        totalExpenses,
        monthlyExpenses,
        upcomingMaintenance,
        totalMaintenance: maintenance.total
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }
  },

  // Get recent activity
  async getRecentActivity(userId?: string, limit: number = 10): Promise<any[]> {
    try {
      const queries = userId ? [Query.equal('userId', userId)] : [];
      queries.push(Query.orderDesc('$createdAt'));
      queries.push(Query.limit(limit));

      const [maintenance, expenses] = await Promise.all([
        databases.listDocuments(DATABASE_ID, MAINTENANCE_COLLECTION_ID, queries),
        databases.listDocuments(DATABASE_ID, EXPENSES_COLLECTION_ID, queries)
      ]);

      const activities = [
        ...maintenance.documents.map(m => ({
          id: m.$id,
          type: 'maintenance',
          description: m.description,
          amount: m.cost,
          date: m.date,
          vehicleId: m.vehicleId,
          createdAt: m.$createdAt
        })),
        ...expenses.documents.map(e => ({
          id: e.$id,
          type: 'expense',
          description: e.description,
          amount: e.amount,
          date: e.date,
          vehicleId: e.vehicleId,
          createdAt: e.$createdAt
        }))
      ];

      // Sort by creation date and return top activities
      return activities
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch recent activity');
    }
  },

  // Get expense breakdown for charts
  async getExpenseBreakdown(userId?: string): Promise<any[]> {
    try {
      const queries = userId ? [Query.equal('userId', userId)] : [];
      const expenses = await databases.listDocuments(DATABASE_ID, EXPENSES_COLLECTION_ID, queries);

      const breakdown = expenses.documents.reduce((acc, expense) => {
        const type = expense.type;
        acc[type] = (acc[type] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(breakdown).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
        value
      }));
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch expense breakdown');
    }
  },

  // Get monthly expense trends
  async getMonthlyExpenses(userId?: string, months: number = 6): Promise<any[]> {
    try {
      const queries = userId ? [Query.equal('userId', userId)] : [];
      const expenses = await databases.listDocuments(DATABASE_ID, EXPENSES_COLLECTION_ID, queries);

      const monthlyData: Record<string, number> = {};
      const currentDate = new Date();

      // Initialize last 6 months
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthKey = date.toLocaleString('default', { month: 'short' });
        monthlyData[monthKey] = 0;
      }

      // Aggregate expenses by month
      expenses.documents.forEach(expense => {
        const expenseDate = new Date(expense.date);
        const monthKey = expenseDate.toLocaleString('default', { month: 'short' });
        if (monthlyData.hasOwnProperty(monthKey)) {
          monthlyData[monthKey] += expense.amount;
        }
      });

      return Object.entries(monthlyData).map(([name, value]) => ({
        name,
        value: Math.round(value * 100) / 100
      }));
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch monthly expenses');
    }
  },

  // Get maintenance alerts
  async getMaintenanceAlerts(userId?: string): Promise<any[]> {
    try {
      const queries = userId ? [Query.equal('userId', userId)] : [];
      const maintenance = await databases.listDocuments(DATABASE_ID, MAINTENANCE_COLLECTION_ID, queries);
      const vehicles = await databases.listDocuments(DATABASE_ID, VEHICLES_COLLECTION_ID, 
        userId ? [Query.equal('userId', userId)] : []
      );

      const alerts = [];
      const today = new Date();

      maintenance.documents.forEach(record => {
        if (record.nextServiceDate) {
          const nextService = new Date(record.nextServiceDate);
          const vehicle = vehicles.documents.find(v => v.$id === record.vehicleId);
          
          if (vehicle) {
            const daysDiff = Math.ceil((nextService.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            
            if (daysDiff < 0) {
              alerts.push({
                id: record.$id,
                type: 'overdue',
                title: `${record.type.replace('_', ' ')} overdue`,
                message: `${vehicle.make} ${vehicle.model}`,
                daysOverdue: Math.abs(daysDiff),
                vehicle: vehicle
              });
            } else if (daysDiff <= 7) {
              alerts.push({
                id: record.$id,
                type: 'upcoming',
                title: `${record.type.replace('_', ' ')} due soon`,
                message: `${vehicle.make} ${vehicle.model}`,
                daysUntil: daysDiff,
                vehicle: vehicle
              });
            }
          }
        }
      });

      return alerts;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch maintenance alerts');
    }
  }
};