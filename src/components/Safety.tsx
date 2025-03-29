import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, Users } from 'lucide-react';

const safetyMetrics = {
  incidentFree: 145,
  lastInspection: '2024-03-15',
  nextInspection: '2024-04-15',
  safetyScore: 98,
  activeAlerts: 2,
  certifiedOperators: 12
};

const safetyChecklist = [
  {
    id: 1,
    title: 'Pre-operation Inspection',
    status: 'completed',
    date: '2024-03-20',
    assignee: 'John Smith'
  },
  {
    id: 2,
    title: 'Load Test Certification',
    status: 'scheduled',
    date: '2024-03-25',
    assignee: 'Sarah Johnson'
  },
  {
    id: 3,
    title: 'Emergency Response Drill',
    status: 'in-progress',
    date: '2024-03-22',
    assignee: 'Team A'
  }
];

const safetyProtocols = [
  {
    id: 1,
    title: 'Load Capacity Management',
    description: 'Guidelines for safe load handling and weight distribution',
    lastUpdated: '2024-03-01',
    status: 'active'
  },
  {
    id: 2,
    title: 'Weather Safety Protocol',
    description: 'Operating procedures during adverse weather conditions',
    lastUpdated: '2024-02-15',
    status: 'under-review'
  },
  {
    id: 3,
    title: 'Emergency Response Plan',
    description: 'Steps to follow during emergency situations',
    lastUpdated: '2024-03-10',
    status: 'active'
  }
];

const SafetySection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Safety Overview</h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Incident Free Days</p>
                <p className="text-2xl font-bold text-green-700">{safetyMetrics.incidentFree}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Safety Score</p>
                <p className="text-2xl font-bold text-blue-700">{safetyMetrics.safetyScore}%</p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Active Alerts</p>
                <p className="text-2xl font-bold text-yellow-700">{safetyMetrics.activeAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;
