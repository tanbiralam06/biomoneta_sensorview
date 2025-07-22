import { subMinutes, format } from 'date-fns';

export type SensorDataPoint = {
  time: string;
  temperature: number;
  humidity: number;
  co2: number;
  pm1: number;
  pm25: number;
  pm10: number;
  voc: number;
  nox: number;
  bacteria: number;
};

// Helper to generate a value with some randomness around a base
const fluctuate = (base: number, variance: number) => {
  return base + (Math.random() - 0.5) * variance;
};

export const generateSensorData = (): SensorDataPoint[] => {
  const data: SensorDataPoint[] = [];
  const now = new Date();
  const totalPoints = 24 * 12; // 24 hours, 5-minute intervals

  for (let i = 0; i < totalPoints; i++) {
    const timestamp = subMinutes(now, i * 5);
    const hour = timestamp.getHours();
    
    // Simulate daily cycles
    const dayCycle = Math.sin((hour / 24) * 2 * Math.PI - Math.PI / 2);

    const point: SensorDataPoint = {
      time: format(timestamp, 'HH:mm'),
      temperature: parseFloat(fluctuate(22 + dayCycle * 2, 0.5).toFixed(2)),
      humidity: parseFloat(fluctuate(45 - dayCycle * 5, 2).toFixed(2)),
      co2: Math.floor(fluctuate(400 + dayCycle * 100, 50)),
      pm1: parseFloat(fluctuate(5, 2).toFixed(2)),
      pm25: parseFloat(fluctuate(10 + Math.random() * 5, 3).toFixed(2)),
      pm10: parseFloat(fluctuate(15 + Math.random() * 8, 5).toFixed(2)),
      voc: parseFloat(fluctuate(100 + dayCycle * 20, 15).toFixed(2)),
      nox: parseFloat(fluctuate(50, 10).toFixed(2)),
      bacteria: Math.floor(fluctuate(50, 20) + (Math.random() > 0.95 ? 100 : 0)), // Occasional spikes
    };
    data.push(point);
  }

  return data.reverse();
};
