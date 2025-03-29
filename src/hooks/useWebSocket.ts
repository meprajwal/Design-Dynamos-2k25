import { useState, useEffect } from 'react';

interface SensorData {
  vibration: number;
  maxVibration: number;
  distance: number;
  motionDetected: boolean;
  fuelLevel: number; // Add fuelLevel
  fuelPercentage: number; // Add fuelPercentage
  timestamp: number;
}

interface WebSocketHook {
  sensorData: SensorData;
  history: SensorData[];
  isConnected: boolean;
  error: string | null;
}

const INITIAL_SENSOR_DATA: SensorData = {
  vibration: 0,
  maxVibration: 0,
  distance: 0,
  motionDetected: false,
  fuelLevel: 0, // Add fuelLevel
  fuelPercentage: 0, // Add fuelPercentage
  timestamp: Date.now()
};

export function useWebSocket(wsUrl: string): WebSocketHook {
  const [sensorData, setSensorData] = useState<SensorData>(INITIAL_SENSOR_DATA);
  const [history, setHistory] = useState<SensorData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      try {
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log('WebSocket Connected');
          setIsConnected(true);
          setError(null);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            const newData = {
              ...data,
              fuelLevel: data.fuelLevel || 0, // Parse fuelLevel
              fuelPercentage: data.fuelPercentage || 0, // Parse fuelPercentage
              timestamp: Date.now()
            };
            setSensorData(newData);
            setHistory(prev => [...prev.slice(-30), newData]); // Keep last 30 readings
          } catch (e) {
            console.error('Error parsing WebSocket data:', e);
            setError('Error parsing sensor data');
          }
        };

        ws.onerror = (event) => {
          console.error('WebSocket error:', event);
          setError('WebSocket connection error');
          setIsConnected(false);
        };

        ws.onclose = () => {
          console.log('WebSocket Disconnected');
          setIsConnected(false);
          // Try to reconnect after 5 seconds
          reconnectTimeout = setTimeout(connect, 5000);
        };
      } catch (error) {
        console.error('WebSocket connection error:', error);
        setError('Failed to connect to sensor');
        setIsConnected(false);
        // Try to reconnect after 5 seconds
        reconnectTimeout = setTimeout(connect, 5000);
      }
    };

    connect();

    // Cleanup function
    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [wsUrl]);

  return {
    sensorData,
    history,
    isConnected,
    error
  };
}