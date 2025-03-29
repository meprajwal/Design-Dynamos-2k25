import React from 'react';
import MaintenanceTable from '../components/MaintenanceTable';

function Maintenance() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Maintenance</h1>
        <MaintenanceTable />
      </div>
    </div>
  );
}

export default Maintenance;
