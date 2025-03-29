import React from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

const maintenanceTasks = [
  {
    id: '1',
    crane: 'Tower Crane 01',
    task: 'Monthly Inspection',
    date: '2024-03-25',
    assignee: 'Suresh Verma',
    status: 'scheduled',
    priority: 'high'
  },
  {
    id: '2',
    crane: 'Tower Crane 02',
    task: 'Cable Replacement',
    date: '2024-03-28',
    assignee: 'Amit Patel',
    status: 'in-progress',
    priority: 'critical'
  },
  {
    id: '3',
    crane: 'Mobile Crane 01',
    task: 'Hydraulic System Check',
    date: '2024-03-30',
    assignee: 'Priya Singh',
    status: 'scheduled',
    priority: 'medium'
  }
];

const MaintenanceTable: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Maintenance Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crane</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {maintenanceTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.crane}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.task}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.assignee}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'}`}>
                      {task.status === 'completed' ? <CheckCircle className="w-4 h-4 mr-1" /> :
                       task.status === 'in-progress' ? <Clock className="w-4 h-4 mr-1" /> :
                       <Calendar className="w-4 h-4 mr-1" />}
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'}`}>
                      {task.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTable;
