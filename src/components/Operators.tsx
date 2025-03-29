import React from 'react';
import { User, Phone, Mail, Clock } from 'lucide-react';

const operators = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Senior Operator',
    status: 'on-duty',
    contact: '+91 98765 43210',
    email: 'rajesh.k@cranesafe.com',
    assignedCrane: 'Tower Crane 01',
    shiftHours: '08:00 - 16:00',
    experience: '8 years'
  },
  {
    id: '2',
    name: 'Priya Singh',
    role: 'Operator',
    status: 'off-duty',
    contact: '+91 98765 43211',
    email: 'priya.s@cranesafe.com',
    assignedCrane: 'Tower Crane 02',
    shiftHours: '16:00 - 00:00',
    experience: '5 years'
  },
  {
    id: '3',
    name: 'Amit Patel',
    role: 'Senior Operator',
    status: 'on-break',
    contact: '+91 98765 43212',
    email: 'amit.p@cranesafe.com',
    assignedCrane: 'Mobile Crane 01',
    shiftHours: '00:00 - 08:00',
    experience: '7 years'
  }
];

const OperatorsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {operators.map((operator) => (
          <div key={operator.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{operator.name}</h3>
                <p className="text-sm text-gray-600">{operator.role}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2
                  ${operator.status === 'on-duty' ? 'bg-green-100 text-green-800' :
                  operator.status === 'off-duty' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'}`}>
                  {operator.status}
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {operator.contact}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {operator.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {operator.shiftHours}
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Assigned to:</span> {operator.assignedCrane}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span> {operator.experience}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperatorsSection;
