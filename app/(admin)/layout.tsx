'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import ProtectedRoute from '@/components/shared/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        <div className="lg:ml-64">
          <Navbar onMenuToggle={toggleSidebar} title="Admin Dashboard" />
          
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}