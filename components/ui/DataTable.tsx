'use client';

import { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal 
} from 'lucide-react';
import { cn } from '@/lib/helpers';
import type { TableProps, TableColumn, PaginationState, SortState } from '@/lib/types';

export default function DataTable({
  data,
  columns,
  loading = false,
  pagination,
  onPageChange,
  onSort,
  className
}: TableProps) {
  const [sortState, setSortState] = useState<SortState>({
    field: '',
    direction: 'asc'
  });

  const handleSort = (field: string) => {
    const newDirection = 
      sortState.field === field && sortState.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    
    setSortState({ field, direction: newDirection });
    onSort?.(field, newDirection);
  };

  const getSortIcon = (field: string) => {
    if (sortState.field !== field) return null;
    
    return sortState.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  const renderCell = (column: TableColumn, row: any) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }
    
    return value;
  };

  const totalPages = pagination 
    ? Math.ceil(pagination.total / pagination.limit) 
    : 1;

  const startItem = pagination 
    ? (pagination.page - 1) * pagination.limit + 1 
    : 1;

  const endItem = pagination 
    ? Math.min(pagination.page * pagination.limit, pagination.total)
    : data.length;

  if (loading) {
    return (
      <div className={cn('bg-white rounded-lg border', className)}>
        <div className="animate-pulse">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="px-6 py-4 border-b border-gray-200">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-lg border overflow-hidden', className)}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:bg-gray-100'
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr 
                  key={row.id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td 
                      key={`${row.id || index}-${column.key}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {renderCell(column, row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startItem} to {endItem} of {pagination.total} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                const isCurrentPage = page === pagination.page;
                
                // Show first page, last page, current page, and pages around current page
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= pagination.page - 1 && page <= pagination.page + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => onPageChange?.(page)}
                      className={cn(
                        'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                        isCurrentPage
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      {page}
                    </button>
                  );
                }
                
                // Show ellipsis
                if (
                  page === pagination.page - 2 ||
                  page === pagination.page + 2
                ) {
                  return (
                    <span key={page} className="px-2 text-gray-500">
                      <MoreHorizontal className="w-4 h-4" />
                    </span>
                  );
                }
                
                return null;
              })}
            </div>
            
            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page >= totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}