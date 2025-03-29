import React from 'react';
import { Plane as Crane, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface CraneCardProps {
  name: string;
  status: 'operational' | 'maintenance' | 'warning';
  location: string;
  operator: string;
  lastMaintenance: string;
}

const statusConfig = {
  operational: {
    color: 'bg-green-100',
    textColor: 'text-green-800',
    icon: CheckCircle,
    label: 'operational'
  },
  maintenance: {
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    icon: Info,
    label: 'maintenance'
  },
  warning: {
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: AlertTriangle,
    label: 'warning'
  }
};

const CraneCard = ({ name, status, location, operator, lastMaintenance }: CraneCardProps) => {
  const config = statusConfig[status];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Crane className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        </div>
        <div className={`flex items-center space-x-2 ${config.color} ${config.textColor} px-3 py-1 rounded-full`}>
          <config.icon className="h-4 w-4" />
          <span className="text-sm font-medium">{config.label}</span>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-gray-700">{location}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Operator</p>
          <p className="text-gray-700">{operator}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Maintenance</p>
          <p className="text-gray-700">{lastMaintenance}</p>
        </div>
      </div>
    </div>
  );
};

export default CraneCard;