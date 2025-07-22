"use client";

import { useState, useEffect } from "react";
import type { SensorDataPoint } from "@/lib/data";
import { generateSensorData } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";
import KeyMetricCard from "@/components/key-metric-card";
import SensorChart from "@/components/sensor-chart";
import BacteriaChart from "@/components/bacteria-chart";
import { Thermometer, Droplets, CloudCog, Wind } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<SensorDataPoint[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generatedData = generateSensorData();
    setData(generatedData);
    setLastUpdated(new Date());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const latestData = data[data.length - 1];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight font-headline">
              Environmental Sensor Data Dashboard
            </h1>
            <p className="text-muted-foreground">
              2nd Floor Chamber - Air Inlet
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Last Updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "Loading..."}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KeyMetricCard
            title="CO2 Levels"
            metricKey="co2"
            latestData={latestData}
            unit="ppm"
            icon={<CloudCog className="h-6 w-6 text-muted-foreground" />}
          />
          <KeyMetricCard
            title="Temperature"
            metricKey="temperature"
            latestData={latestData}
            unit="°C"
            icon={<Thermometer className="h-6 w-6 text-muted-foreground" />}
          />
          <KeyMetricCard
            title="Humidity"
            metricKey="humidity"
            latestData={latestData}
            unit="%"
            icon={<Droplets className="h-6 w-6 text-muted-foreground" />}
          />
          <KeyMetricCard
            title="PM 2.5"
            metricKey="pm25"
            latestData={latestData}
            unit="µg/m³"
            icon={<Wind className="h-6 w-6 text-muted-foreground" />}
          />
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <SensorChart
            data={data}
            title="Temperature Over Time"
            description="Last 24 hours"
            metrics={[{ key: "temperature", name: "Temp", color: "hsl(var(--chart-2))" }]}
          />
          <SensorChart
            data={data}
            title="Humidity Over Time"
            description="Last 24 hours"
            metrics={[{ key: "humidity", name: "Humidity", color: "hsl(var(--chart-1))" }]}
          />
          <SensorChart
            data={data}
            title="CO2 Levels"
            description="Last 24 hours"
            metrics={[{ key: "co2", name: "CO2", color: "hsl(var(--chart-3))" }]}
          />
          <SensorChart
            data={data}
            title="Particle Matter Levels"
            description="PM1.0, PM2.5, PM10"
            metrics={[
              { key: "pm1", name: "PM1.0", color: "hsl(var(--chart-1))" },
              { key: "pm25", name: "PM2.5", color: "hsl(var(--chart-2))" },
              { key: "pm10", name: "PM10", color: "hsl(var(--chart-4))" },
            ]}
          />
          <SensorChart
            data={data}
            title="VOC & NOx Levels"
            description="Volatile Organic Compounds & Nitrogen Oxides"
            metrics={[
              { key: "voc", name: "VOC", color: "hsl(var(--chart-5))" },
              { key: "nox", name: "NOx", color: "hsl(var(--chart-2))" },
            ]}
          />
          <BacteriaChart data={data} />
        </div>
      </main>
    </div>
  );
}

const DashboardSkeleton = () => (
  <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        <Skeleton className="h-8 w-96" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>
      <Skeleton className="h-4 w-40" />
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
      <Skeleton className="h-80" />
      <Skeleton className="h-80" />
      <Skeleton className="h-80" />
      <Skeleton className="h-80" />
      <Skeleton className="h-80" />
      <Skeleton className="h-80" />
    </div>
  </div>
);
