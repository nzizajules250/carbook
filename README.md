# Car Manager - Fleet Management System

A comprehensive Next.js application for managing vehicle fleets, maintenance schedules, expenses, and more. Built with modern technologies including Next.js 14, TypeScript, Tailwind CSS, and Appwrite for backend services.

## 🚗 Features

### For Clients
- **Vehicle Management**: Add, edit, and track vehicles with detailed information
- **Maintenance Scheduling**: Schedule and track maintenance activities
- **Expense Tracking**: Monitor all vehicle-related expenses
- **Dashboard Analytics**: Visual insights into fleet performance and costs
- **Maintenance Alerts**: Automated reminders for upcoming services

### For Administrators
- **User Management**: Manage client accounts and permissions
- **Fleet Overview**: System-wide vehicle and maintenance analytics
- **Revenue Tracking**: Monitor subscription and service revenue
- **System Monitoring**: Track platform health and performance
- **Advanced Analytics**: Comprehensive reporting and insights

### Technical Features
- **Role-Based Access Control**: Separate dashboards for admins and clients
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live data synchronization across the platform
- **Secure Authentication**: JWT-based authentication with Appwrite
- **File Upload**: Vehicle image upload and management
- **Data Export**: Export reports and data in various formats

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **Backend**: Appwrite (Database, Authentication, Storage)
- **Charts**: Recharts for data visualization
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
car-manager/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (client)/                 # Client dashboard
│   │   ├── dashboard/
│   │   │   ├── overview/
│   │   │   ├── vehicles/
│   │   │   ├── maintenance/
│   │   │   ├── expenses/
│   │   │   └── reports/
│   │   └── profile/
│   ├── (admin)/                  # Admin dashboard
│   │   ├── dashboard/
│   │   │   ├── overview/
│   │   │   ├── users/
│   │   │   ├── fleet/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   └── system/
│   ├── api/                      # API routes
│   │   ├── vehicles/
│   │   ├── maintenance/
│   │   └── expenses/
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── client/                   # Client-specific components
│   ├── admin/                    # Admin-specific components
│   ├── ui/                       # Shared UI components
│   └── shared/                   # Shared business components
├── lib/                          # Utility libraries
│   ├── appwrite/                 # Appwrite configuration
│   ├── constants.ts
│   ├── helpers.ts
│   └── types.ts
├── styles/
│   └── globals.css
└── public/
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Appwrite account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/car-manager.git
   cd car-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Copy `.env.local` and update with your Appwrite credentials:
   ```bash
   cp .env.local .env.local
   ```

   Update the following variables:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
   NEXT_PUBLIC_APPWRITE_VEHICLES_COLLECTION_ID=vehicles
   NEXT_PUBLIC_APPWRITE_MAINTENANCE_COLLECTION_ID=maintenance
   NEXT_PUBLIC_APPWRITE_EXPENSES_COLLECTION_ID=expenses
   NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=your-storage-bucket-id
   ```

4. **Set up Appwrite Collections**

   Create the following collections in your Appwrite database:

   **Vehicles Collection:**
   ```json
   {
     "make": "string",
     "model": "string", 
     "year": "integer",
     "licensePlate": "string",
     "vin": "string",
     "color": "string",
     "mileage": "integer",
     "fuelType": "string",
     "status": "string",
     "purchaseDate": "string",
     "purchasePrice": "float",
     "userId": "string",
     "imageUrl": "string"
   }
   ```

   **Maintenance Collection:**
   ```json
   {
     "vehicleId": "string",
     "type": "string",
     "description": "string",
     "cost": "float",
     "date": "string",
     "mileage": "integer",
     "serviceProvider": "string",
     "nextServiceDate": "string",
     "nextServiceMileage": "integer",
     "userId": "string"
   }
   ```

   **Expenses Collection:**
   ```json
   {
     "vehicleId": "string",
     "type": "string",
     "amount": "float",
     "date": "string",
     "description": "string",
     "category": "string",
     "mileage": "integer",
     "userId": "string"
   }
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication & Roles

The application supports two user roles:

### Client Users
- Default role for new registrations
- Access to personal vehicle management
- Can view only their own data
- Dashboard URL: `/client/dashboard/overview`

### Admin Users  
- Full system access
- User management capabilities
- System-wide analytics
- Dashboard URL: `/admin/dashboard/overview`

### Demo Accounts

For testing purposes, you can use these demo credentials:

**Admin Account:**
- Email: `admin@carmanager.com`
- Password: `admin123`

**Client Account:**
- Email: `client@carmanager.com`
- Password: `client123`

## 📱 Key Pages & Features

### Authentication Pages
- **Login** (`/login`): User authentication with demo account buttons
- **Register** (`/register`): New user registration with role assignment
- **Forgot Password** (`/forgot-password`): Password recovery

### Client Dashboard
- **Overview** (`/client/dashboard/overview`): Fleet summary and alerts
- **Vehicles** (`/client/dashboard/vehicles`): Vehicle management
- **Maintenance** (`/client/dashboard/maintenance`): Service tracking
- **Expenses** (`/client/dashboard/expenses`): Cost management
- **Reports** (`/client/dashboard/reports`): Analytics and insights

### Admin Dashboard
- **Overview** (`/admin/dashboard/overview`): System-wide statistics
- **Users** (`/admin/dashboard/users`): User management
- **Fleet** (`/admin/dashboard/fleet`): All vehicles overview
- **Analytics** (`/admin/dashboard/analytics`): Advanced reporting
- **Settings** (`/admin/dashboard/settings`): System configuration

## 🎨 UI Components

The project includes a comprehensive set of reusable UI components:

- **Navigation**: Responsive navbar and sidebar
- **Forms**: Validated forms with error handling
- **Tables**: Sortable data tables with pagination
- **Charts**: Various chart types using Recharts
- **Cards**: Information display cards
- **Modals**: Overlay dialogs and forms
- **Alerts**: Status and notification messages

## 🔧 API Routes

RESTful API endpoints for data operations:

- `GET/POST/PUT/DELETE /api/vehicles` - Vehicle operations
- `GET/POST/PUT /api/maintenance` - Maintenance record operations  
- `GET/POST/PUT/DELETE /api/expenses` - Expense operations

## 📊 Data Models

### Vehicle Model
```typescript
interface Vehicle {
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
```

### Maintenance Record Model
```typescript
interface MaintenanceRecord {
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
```

### Expense Model
```typescript
interface Expense {
  vehicleId: string;
  type: 'fuel' | 'maintenance' | 'insurance' | 'registration' | 'parking' | 'tolls' | 'other';
  amount: number;
  date: string;
  description: string;
  category: string;
  mileage?: number;
  userId: string;
}
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Configure Domain**
   - Set up custom domain in Vercel settings
   - Update Appwrite allowed origins

### Other Deployment Options

- **Netlify**: Configure build settings and environment variables
- **Digital Ocean**: Use App Platform with GitHub integration  
- **AWS**: Deploy using Amplify or Elastic Beanstalk
- **Self-hosted**: Use PM2 with nginx reverse proxy

## 🔒 Security Features

- **Authentication**: Secure JWT-based authentication with Appwrite
- **Authorization**: Role-based access control (RBAC)
- **Data Validation**: Server-side input validation and sanitization
- **HTTPS**: SSL/TLS encryption for all communications
- **CORS**: Configured cross-origin resource sharing
- **Environment Variables**: Sensitive data stored securely

## 🧪 Testing

### Demo Data

The application includes mock data for testing:
- Sample vehicles with different statuses
- Maintenance records and schedules  
- Expense categories and transactions
- User activity and analytics

### Testing Checklist

- [ ] User registration and login
- [ ] Role-based dashboard access
- [ ] Vehicle CRUD operations
- [ ] Maintenance scheduling
- [ ] Expense tracking
- [ ] Data visualization
- [ ] Mobile responsiveness
- [ ] File upload functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Demo accounts are for testing only
- Some features require Appwrite Pro plan
- Mobile charts may need optimization
- File upload size limited to 5MB

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@carmanager.com
- Documentation: [docs.carmanager.com](https://docs.carmanager.com)

---

**Car Manager** - Streamline your fleet management with modern technology 🚗✨