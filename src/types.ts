export interface CraneData {
  id: string;
  name: string;
  status: 'operational' | 'maintenance' | 'warning' | 'critical';
  lastInspection: string;
  nextInspection: string;
  vibrationLevel: number;
  fuelLevel: number;
  loadCapacity: number;
  currentLoad: number;
  temperature: number;
  location: string;
  operatorName?: string;
  workingHours: number;
  safetyAlerts: number;
  efficiency: number;
  powerConsumption: number;
  windSpeed: number;
  nextMaintenance: string;
  ropeStatus: {
    conductivity: number;
    wear: number;
    lastCheck: string;
    status: 'optimal' | 'warning' | 'critical';
    segments: RopeSegment[];
  };
}

export interface RopeSegment {
  id: string;
  position: number;
  conductivity: number;
  wear: number;
  status: 'optimal' | 'warning' | 'critical';
}

export interface MaintenanceLog {
  id: string;
  craneId: string;
  date: string;
  type: 'routine' | 'repair' | 'inspection';
  description: string;
  technician: string;
  status: 'completed' | 'pending' | 'in-progress';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'operator' | 'technician' | 'supervisor';
}