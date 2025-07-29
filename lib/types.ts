import type { Models } from 'appwrite';

// User role types
export type UserRole = 'admin' | 'client';

// User type with role
export interface User extends Models.User<Models.Preferences> {
  role?: UserRole;
}

// Dashboard stats types
export interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  maintenanceVehicles: number;
  totalExpenses: number;
  monthlyExpenses: number;
  upcomingMaintenance: number;
}

export interface AdminStats extends DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

// Chart data types
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  amount: number;
  category?: string;
}

// Form types
export interface VehicleFormData {
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
  image?: File;
}

export interface MaintenanceFormData {
  vehicleId: string;
  type: 'oil_change' | 'tire_rotation' | 'brake_service' | 'engine_repair' | 'other';
  description: string;
  cost: number;
  date: string;
  mileage: number;
  serviceProvider: string;
  nextServiceDate?: string;
  nextServiceMileage?: number;
}

export interface ExpenseFormData {
  vehicleId: string;
  type: 'fuel' | 'maintenance' | 'insurance' | 'registration' | 'parking' | 'tolls' | 'other';
  amount: number;
  date: string;
  description: string;
  category: string;
  mileage?: number;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Table column types
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  children?: NavItem[];
}

// Filter types
export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterState {
  [key: string]: string | string[] | undefined;
}

// Pagination types
export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

// Sort types
export interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

// Search types
export interface SearchState {
  query: string;
  filters: FilterState;
  sort: SortState;
  pagination: PaginationState;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Vehicle status types
export type VehicleStatus = 'active' | 'maintenance' | 'retired';

// Maintenance types
export type MaintenanceType = 'oil_change' | 'tire_rotation' | 'brake_service' | 'engine_repair' | 'other';

// Expense types
export type ExpenseType = 'fuel' | 'maintenance' | 'insurance' | 'registration' | 'parking' | 'tolls' | 'other';

// Fuel types
export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'other';

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormProps extends BaseComponentProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
  initialData?: any;
}

export interface TableProps extends BaseComponentProps {
  data: any[];
  columns: TableColumn[];
  loading?: boolean;
  pagination?: PaginationState;
  onPageChange?: (page: number) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
}

// Context types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
}

// Route protection types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
}