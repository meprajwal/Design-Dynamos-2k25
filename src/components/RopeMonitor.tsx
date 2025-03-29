import React, { useState } from 'react';
import { Cable, CheckCircle, AlertTriangle } from 'lucide-react';

const segments = [
  { id: 1, status: 'optimal' },
  { id: 2, status: 'optimal' },
  { id: 3, status: 'optimal' },
  { id: 4, status: 'warning' },
  { id: 5, status: 'optimal' },
  { id: 6, status: 'optimal' },
  { id: 7, status: 'optimal' },
  { id: 8, status: 'optimal' }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'optimal':
      return 'bg-green-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'critical':
      return 'bg-red-500';
    default:
      return 'bg-gray-300';
  }
};

const RopeMonitoringSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Cable className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Rope Status Monitoring</h2>
      </div>

      {/* Overall Status */}
      <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
        <div>
          <p className="text-gray-500 text-sm">Conductivity</p>
          <p className="text-2xl font-semibold">98%</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Wear Level</p>
          <p className="text-2xl font-semibold">12%</p>
        </div>
      </div>

      {/* Segment Status */}
      <div>
        <p className="text-gray-600 text-sm mb-2">Segment Status</p>
        <div className="flex space-x-1">
          {segments.map((segment) => (
            <div
              key={segment.id}
              className={`w-10 h-3 ${getStatusColor(segment.status)} rounded-full`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RopeMonitoringSection;