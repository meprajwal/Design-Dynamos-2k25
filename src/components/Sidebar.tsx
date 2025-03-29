import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Plane as Crane, Camera, WrenchIcon, Bell, Users, FileText, BarChart2, Cable, ShieldAlert, Wrench } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
  { icon: Crane, label: 'Cranes', to: '/cranes' },
  { icon: Camera, label: 'Camera Detection', to: '/camera' },
  { icon: Wrench, label: 'Maintenance', to: '/maintenance' },
  { icon: Bell, label: 'Alerts', to: '/alerts' },
  { icon: Users, label: 'Operators', to: '/operators' },
  { icon: FileText, label: 'Reports', to: '/reports' },
  { icon: BarChart2, label: 'Analytics', to: '/analytics' },
  { icon: Cable, label: 'Rope Monitoring', to: '/rope-monitoring' },
  { icon: ShieldAlert, label: 'Safety', to: '/safety' }
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Crane className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold">CraneSafe</span>
        </div>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;