import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Calendar, TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';

const efficiencyData = [
  { date: '2024-03-14', efficiency: 92, loads: 45, hours: 8 },
  { date: '2024-03-15', efficiency: 88, loads: 42, hours: 7.5 },
  { date: '2024-03-16', efficiency: 95, loads: 48, hours: 8 },
  { date: '2024-03-17', efficiency: 90, loads: 44, hours: 7.8 },
  { date: '2024-03-18', efficiency: 87, loads: 40, hours: 7.2 },
  { date: '2024-03-19', efficiency: 93, loads: 46, hours: 8 },
  { date: '2024-03-20', efficiency: 91, loads: 43, hours: 7.6 }
];

const maintenanceData = [
  { name: 'Preventive', value: 45 },
  { name: 'Corrective', value: 25 },
  { name: 'Predictive', value: 30 }
];

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

const AnalyticsSection: React.FC = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Analytics Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="rounded-lg border border-gray-300 bg-white text-gray-700 px-3 py-2"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="rounded-lg border border-gray-300 bg-white text-gray-700 px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">Efficiency Trend</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Line type="monotone" dataKey="efficiency" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BarChartIcon className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">Daily Loads</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar dataKey="loads" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
