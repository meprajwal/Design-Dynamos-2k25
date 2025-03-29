import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CranesPage from './pages/CranesPage';
import Alerts from './pages/Alerts';
import Maintenance from './pages/Maintenance';
import Operators from './pages/Operators';
import Safety from './pages/Safety';
import Analytics from './pages/Analytics';
import RopeMonitor from './pages/Rope';


function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cranes" element={<CranesPage />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/operators" element={<Operators />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/rope-monitoring" element={<RopeMonitor />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;