'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { CHART_COLORS } from '@/lib/constants';
import { formatCurrency, formatNumber } from '@/lib/helpers';

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface BaseChartProps {
  data: ChartData[];
  width?: number;
  height?: number;
  className?: string;
}

interface BarChartProps extends BaseChartProps {
  dataKey?: string;
  xAxisKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
}

interface LineChartProps extends BaseChartProps {
  dataKey?: string;
  xAxisKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  strokeWidth?: number;
}

interface PieChartProps extends BaseChartProps {
  dataKey?: string;
  nameKey?: string;
  showLabels?: boolean;
  innerRadius?: number;
  outerRadius?: number;
}

interface AreaChartProps extends BaseChartProps {
  dataKey?: string;
  xAxisKey?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  fillOpacity?: number;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatter ? formatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Bar Chart Component
export function CustomBarChart({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  height = 300,
  showGrid = true,
  showLegend = false,
  className = ''
}: BarChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip 
            content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />}
          />
          {showLegend && <Legend />}
          <Bar 
            dataKey={dataKey} 
            fill={CHART_COLORS[0]}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Line Chart Component
export function CustomLineChart({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  height = 300,
  showGrid = true,
  showLegend = false,
  strokeWidth = 2,
  className = ''
}: LineChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis 
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip 
            content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />}
          />
          {showLegend && <Legend />}
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={CHART_COLORS[1]}
            strokeWidth={strokeWidth}
            dot={{ fill: CHART_COLORS[1], strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Pie Chart Component
export function CustomPieChart({
  data,
  dataKey = 'value',
  nameKey = 'name',
  height = 300,
  showLabels = true,
  innerRadius = 0,
  outerRadius = 80,
  className = ''
}: PieChartProps) {
  const renderLabel = (entry: any) => {
    const percent = ((entry.value / data.reduce((sum, item) => sum + item[dataKey], 0)) * 100).toFixed(1);
    return `${entry[nameKey]} (${percent}%)`;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={showLabels ? renderLabel : false}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey={dataKey}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={CHART_COLORS[index % CHART_COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Area Chart Component
export function CustomAreaChart({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  height = 300,
  showGrid = true,
  showLegend = false,
  fillOpacity = 0.6,
  className = ''
}: AreaChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS[2]} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={CHART_COLORS[2]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis 
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip 
            content={<CustomTooltip formatter={(value: number) => formatCurrency(value)} />}
          />
          {showLegend && <Legend />}
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={CHART_COLORS[2]}
            fillOpacity={fillOpacity}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Export all chart components
export {
  CustomBarChart as BarChart,
  CustomLineChart as LineChart,
  CustomPieChart as PieChart,
  CustomAreaChart as AreaChart
};