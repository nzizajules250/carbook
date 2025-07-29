// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile',
  },
  VEHICLES: '/api/vehicles',
  MAINTENANCE: '/api/maintenance',
  EXPENSES: '/api/expenses',
  USERS: '/api/users',
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
} as const;

// Vehicle statuses
export const VEHICLE_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'In Maintenance' },
  { value: 'retired', label: 'Retired' },
] as const;

// Fuel types
export const FUEL_TYPES = [
  { value: 'gasoline', label: 'Gasoline' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'other', label: 'Other' },
] as const;

// Maintenance types
export const MAINTENANCE_TYPES = [
  { value: 'oil_change', label: 'Oil Change' },
  { value: 'tire_rotation', label: 'Tire Rotation' },
  { value: 'brake_service', label: 'Brake Service' },
  { value: 'engine_repair', label: 'Engine Repair' },
  { value: 'other', label: 'Other' },
] as const;

// Expense types
export const EXPENSE_TYPES = [
  { value: 'fuel', label: 'Fuel' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'registration', label: 'Registration' },
  { value: 'parking', label: 'Parking' },
  { value: 'tolls', label: 'Tolls' },
  { value: 'other', label: 'Other' },
] as const;

// Dashboard navigation items for client
export const CLIENT_NAV_ITEMS = [
  {
    label: 'Overview',
    href: '/client/dashboard/overview',
    icon: 'LayoutDashboard',
  },
  {
    label: 'Vehicles',
    href: '/client/dashboard/vehicles',
    icon: 'Car',
    children: [
      { label: 'All Vehicles', href: '/client/dashboard/vehicles' },
      { label: 'Add Vehicle', href: '/client/dashboard/vehicles/add' },
    ],
  },
  {
    label: 'Maintenance',
    href: '/client/dashboard/maintenance',
    icon: 'Wrench',
    children: [
      { label: 'History', href: '/client/dashboard/maintenance' },
      { label: 'Schedule', href: '/client/dashboard/maintenance/schedule' },
    ],
  },
  {
    label: 'Expenses',
    href: '/client/dashboard/expenses',
    icon: 'DollarSign',
  },
  {
    label: 'Reports',
    href: '/client/dashboard/reports',
    icon: 'BarChart3',
  },
] as const;

// Dashboard navigation items for admin
export const ADMIN_NAV_ITEMS = [
  {
    label: 'Overview',
    href: '/admin/dashboard/overview',
    icon: 'LayoutDashboard',
  },
  {
    label: 'Users',
    href: '/admin/dashboard/users',
    icon: 'Users',
  },
  {
    label: 'Fleet',
    href: '/admin/dashboard/fleet',
    icon: 'Car',
  },
  {
    label: 'Analytics',
    href: '/admin/dashboard/analytics',
    icon: 'BarChart3',
  },
  {
    label: 'Settings',
    href: '/admin/dashboard/settings',
    icon: 'Settings',
  },
  {
    label: 'System',
    href: '/admin/system',
    icon: 'Server',
    children: [
      { label: 'Logs', href: '/admin/system/logs' },
      { label: 'Backup', href: '/admin/system/backup' },
    ],
  },
] as const;

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PASSWORD_MIN: 'Password must be at least 8 characters',
  PASSWORD_MATCH: 'Passwords do not match',
  PHONE: 'Please enter a valid phone number',
  NUMBER: 'Please enter a valid number',
  DATE: 'Please enter a valid date',
  URL: 'Please enter a valid URL',
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  TIMESTAMP: 'yyyy-MM-dd HH:mm:ss',
  SHORT: 'MM/dd/yyyy',
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  LIMITS: [10, 25, 50, 100],
} as const;

// Chart colors
export const CHART_COLORS = [
  '#3b82f6', // blue-500
  '#ef4444', // red-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#8b5cf6', // violet-500
  '#06b6d4', // cyan-500
  '#84cc16', // lime-500
  '#f97316', // orange-500
  '#ec4899', // pink-500
  '#6b7280', // gray-500
] as const;

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'car-manager-theme',
  USER_PREFERENCES: 'car-manager-user-prefs',
  RECENT_SEARCHES: 'car-manager-recent-searches',
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_ANALYTICS: true,
  ENABLE_EXPORT: true,
} as const;