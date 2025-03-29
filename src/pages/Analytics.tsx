import React from 'react';
import AnalyticsSection from '../components/Analytics';

function Analytics() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>
        <AnalyticsSection />
      </div>
    </div>
  );
}

export default Analytics;
