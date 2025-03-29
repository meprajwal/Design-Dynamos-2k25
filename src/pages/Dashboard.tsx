import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Activity, 
  Vibrate,
  Ruler,
  AlertTriangle,
  BarChart3,
  Bell,
  Moon,
  Wifi,
  WifiOff
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWebSocket } from '../hooks/useWebSocket';

interface SensorCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  unit?: string;
  className?: string;
}

function SensorCard({ title, value, icon: Icon, unit = '', className = '' }: SensorCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {unit && <span className="ml-2 text-gray-600">{unit}</span>}
      </div>
    </div>
  );
}

function Dashboard() {
  const [notifications, setNotifications] = useState<number>(0);
  const [notificationMessages, setNotificationMessages] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Get ESP32 IP address from environment variable or use a default
  const wsUrl = `ws://${import.meta.env.VITE_ESP32_IP || 'localhost'}:81`;
  const { sensorData, history, isConnected, error } = useWebSocket(wsUrl);

  const sendAlertEmail = React.useCallback(() => {
    emailjs.send(
      'service_uduhjfq', // Replace with your EmailJS service ID
      'template_p07uljr', // Replace with your EmailJS template ID
      {
        message: 'Alert: Something suspecious has been detected on crain. Please check the dashboard.',
        subject: 'Crane Operation Alert',
      },
      'YQnrmwP2hBdURenhA' // Replace with your EmailJS user ID
    ).then(
      (result) => {
        console.log('Email sent successfully:', result.text);
      },
      (error) => {
        console.error('Error sending email:', error.text);
      }
    );
  }, []);

  // Update notifications and send email when dangerous values are detected
  React.useEffect(() => {
    if (sensorData.vibration > 1.5 || sensorData.distance < 20) {
      setNotifications((prev) => prev + 1);
      setNotificationMessages((prev) => [
        ...prev,
        `Alert: ${sensorData.vibration > 1.5 ? 'High Vibration' : 'Obstacle Detected'} detected at ${new Date().toLocaleTimeString()}`,
      ]);
    }

    // Send email only if distance is less than 44 and greater than 0
    if (sensorData.distance < 44 && sensorData.distance > 0) {
      sendAlertEmail();
    }

    // Send fuel level and percentage data through webhook
    fetch('https://your-webhook-url.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vibration: sensorData.vibration,
        maxVibration: sensorData.maxVibration,
        distance: sensorData.distance,
        motionDetected: sensorData.motionDetected,
        fuelLevel: sensorData.fuelLevel, // Include fuel level
        fuelPercentage: sensorData.fuelPercentage, // Include fuel percentage
      }),
    }).catch((err) => console.error('Webhook error:', err));
  }, [sensorData, sendAlertEmail]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {isConnected ? (
                <div className="flex items-center text-green-600">
                  <Wifi className="h-5 w-5 mr-2" />
                  <span className="text-sm">Connected to ESP32</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <WifiOff className="h-5 w-5 mr-2" />
                  <span className="text-sm">
                    {error || 'Disconnected from ESP32'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                  onClick={() => setShowNotifications(!showNotifications)}
                />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                    <ul className="divide-y divide-gray-200">
                      {notificationMessages.map((message, index) => (
                        <li key={index} className="p-4 text-sm text-gray-700">
                          {message}
                        </li>
                      ))}
                      {notificationMessages.length === 0 && (
                        <li className="p-4 text-sm text-gray-500">No notifications</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <Moon
                className={`h-6 w-6 cursor-pointer ${isDarkMode ? 'text-yellow-500' : 'text-gray-500'}`}
                onClick={() => setIsDarkMode(!isDarkMode)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SensorCard
            title="Current Vibration"
            value={sensorData.vibration.toFixed(4)}
            icon={Vibrate}
            unit="g"
            className="border-l-4 border-blue-500"
          />
          <SensorCard
            title="Max Vibration"
            value={sensorData.maxVibration.toFixed(4)}
            icon={Activity}
            unit="g"
            className="border-l-4 border-red-500"
          />
          <SensorCard
            title="Distance"
            value={sensorData.distance.toFixed(1)}
            icon={Ruler}
            unit="cm"
            className="border-l-4 border-green-500"
          />
          <SensorCard
            title="Fuel Level"
            value={sensorData.fuelLevel.toFixed(1)} // Display fuel level
            icon={BarChart3}
            unit="%"
            className="border-l-4 border-purple-500"
          />
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Motion Status</h3>
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              sensorData.motionDetected 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {sensorData.motionDetected ? 'Motion Detected' : 'No Motion'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Vibration History</h3>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                    formatter={(value) => [Number(value).toFixed(4), "Vibration (g)"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="vibration" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Distance History</h3>
              <Ruler className="w-6 h-6 text-green-500" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                    formatter={(value) => [Number(value).toFixed(1), "Distance (cm)"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="distance" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;