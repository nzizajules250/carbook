'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/shared/AppwriteProvider';
import { 
  LayoutDashboard,
  Car,
  Wrench,
  DollarSign,
  BarChart3,
  Users,
  Settings,
  Server,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/helpers';
import { CLIENT_NAV_ITEMS, ADMIN_NAV_ITEMS } from '@/lib/constants';

const iconMap = {
  LayoutDashboard,
  Car,
  Wrench,
  DollarSign,
  BarChart3,
  Users,
  Settings,
  Server,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navigationItems = user?.role === 'admin' ? ADMIN_NAV_ITEMS : CLIENT_NAV_ITEMS;

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const renderNavItem = (item: any, level = 0) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.href);
    const itemIsActive = isActive(item.href);

    return (
      <div key={item.href}>
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.href)}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              level > 0 && 'ml-4',
              itemIsActive
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <div className="flex items-center space-x-3">
              {IconComponent && (
                <IconComponent className={cn(
                  'w-5 h-5',
                  itemIsActive ? 'text-primary-700' : 'text-gray-500'
                )} />
              )}
              <span>{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={onClose}
            className={cn(
              'flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              level > 0 && 'ml-4',
              itemIsActive
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            {IconComponent && (
              <IconComponent className={cn(
                'w-5 h-5',
                itemIsActive ? 'text-primary-700' : 'text-gray-500'
              )} />
            )}
            <span>{item.label}</span>
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children.map((child: any) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              Car Manager
            </h1>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => renderNavItem(item))}
        </nav>

        {/* User info */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'User'}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {user?.role || 'Client'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}