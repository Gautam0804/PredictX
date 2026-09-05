export const dashboardStats = [
  {
    id: "total-machines",
    title: "Total Machines",
    value: "24",
    change: "+8.2%",
    changeText: "vs last month",
    icon: "cpu",
  },
  {
    id: "healthy-machines",
    title: "Healthy Machines",
    value: "18",
    change: "+5.4%",
    changeText: "vs last month",
    icon: "healthy",
  },
  {
    id: "at-risk",
    title: "At Risk",
    value: "4",
    change: "-2.1%",
    changeText: "vs last month",
    icon: "risk",
  },
  {
    id: "critical",
    title: "Critical",
    value: "2",
    change: "-1.3%",
    changeText: "vs last month",
    icon: "critical",
  },
];

export const machines = [
  {
    id: "MX-001",
    name: "CNC Milling Machine",
    health: 92,
    temperature: 68,
    vibration: 2.1,
    status: "Healthy",
    risk: "Low",
  },
  {
    id: "MX-002",
    name: "Hydraulic Press",
    health: 76,
    temperature: 81,
    vibration: 3.8,
    status: "At Risk",
    risk: "Medium",
  },
  {
    id: "MX-003",
    name: "Industrial Pump",
    health: 61,
    temperature: 89,
    vibration: 5.2,
    status: "Critical",
    risk: "High",
  },
  {
    id: "MX-004",
    name: "Air Compressor",
    health: 87,
    temperature: 72,
    vibration: 2.8,
    status: "Healthy",
    risk: "Low",
  },
  {
    id: "MX-005",
    name: "Conveyor Motor",
    health: 69,
    temperature: 84,
    vibration: 4.4,
    status: "At Risk",
    risk: "Medium",
  },
];

export const sensorData = [
  {
    time: "08:00",
    temperature: 64,
    vibration: 2.1,
  },
  {
    time: "10:00",
    temperature: 67,
    vibration: 2.4,
  },
  {
    time: "12:00",
    temperature: 72,
    vibration: 2.8,
  },
  {
    time: "14:00",
    temperature: 76,
    vibration: 3.2,
  },
  {
    time: "16:00",
    temperature: 81,
    vibration: 3.8,
  },
  {
    time: "18:00",
    temperature: 79,
    vibration: 3.5,
  },
  {
    time: "20:00",
    temperature: 74,
    vibration: 3.1,
  },
];

export const alerts = [
  {
    id: 1,
    title: "High vibration detected",
    machine: "Industrial Pump MX-003",
    time: "8 minutes ago",
    severity: "Critical",
  },
  {
    id: 2,
    title: "Temperature rising",
    machine: "Hydraulic Press MX-002",
    time: "24 minutes ago",
    severity: "High",
  },
  {
    id: 3,
    title: "Maintenance due",
    machine: "Conveyor Motor MX-005",
    time: "1 hour ago",
    severity: "Medium",
  },
];