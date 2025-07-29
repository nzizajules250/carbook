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

  async getVehicles(userId: string): Promise<Models.DocumentList<Models.Document>> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        VEHICLES_COLLECTION_ID,
        [Query.equal('userId', userId)]
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

  // Admin operations
  async getAllVehicles(): Promise<Models.DocumentList<Models.Document>> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        VEHICLES_COLLECTION_ID
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch all vehicles');
    }
  },

  async getAllMaintenanceRecords(): Promise<Models.DocumentList<Models.Document>> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        MAINTENANCE_COLLECTION_ID
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch all maintenance records');
    }
  },

  async getAllExpenses(): Promise<Models.DocumentList<Models.Document>> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EXPENSES_COLLECTION_ID
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch all expenses');
    }
  }
};