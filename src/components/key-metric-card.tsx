import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { SensorDataPoint } from "@/lib/data";

type KeyMetricCardProps = {
  title: string;
  metricKey: keyof SensorDataPoint;
  latestData?: SensorDataPoint;
  unit: string;
  icon: ReactNode;
};

export default function KeyMetricCard({
  title,
  metricKey,
  latestData,
  unit,
  icon,
}: KeyMetricCardProps) {
  const value = latestData && typeof latestData[metricKey] === 'number'
    ? (latestData[metricKey] as number).toFixed(metricKey === 'temperature' ? 1 : 0)
    : "N/A";

  return (
    <Card className="transition-all duration-300 hover:border-accent glow-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          {value} <span className="text-lg font-normal text-muted-foreground">{unit}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Current reading
        </p>
      </CardContent>
    </Card>
  );
}