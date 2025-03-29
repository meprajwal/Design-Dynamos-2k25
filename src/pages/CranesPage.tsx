import React from 'react';
import CraneCard from '../components/CraneCard';

const CranesPage = () => {
  const cranes = [
    {
      name: 'Tower Crane 01',
      status: 'operational',
      location: 'Site A - Andheri East',
      operator: 'Rajesh Kumar',
      lastMaintenance: '2024-03-10'
    },
    {
      name: 'Tower Crane 02',
      status: 'maintenance',
      location: 'Site B - Bandra West',
      operator: 'Priya Singh',
      lastMaintenance: '2024-03-15'
    },
    {
      name: 'Mobile Crane 01',
      status: 'warning',
      location: 'Site C - Powai',
      operator: 'Amit Patel',
      lastMaintenance: '2024-03-08'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cranes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cranes.map((crane) => (
          <CraneCard
            key={crane.name}
            name={crane.name}
            status={crane.status as 'operational' | 'maintenance' | 'warning'}
            location={crane.location}
            operator={crane.operator}
            lastMaintenance={crane.lastMaintenance}
          />
        ))}
      </div>
    </div>
  );
};

export default CranesPage;