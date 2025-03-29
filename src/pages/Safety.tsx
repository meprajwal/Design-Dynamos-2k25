import React from 'react';
import SafetySection from '../components/Safety';

function Safety() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Safety</h1>
        <SafetySection />
      </div>
    </div>
  );
}

export default Safety;
