import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { SensorDataPoint } from "@/lib/data";
import { cn } from '@/lib/utils';

type KeyMetricCardProps = {
  title: string;
  metricKey: keyof SensorDataPoint;
  latestData?: SensorDataPoint;
  unit: string;
  icon: ReactNode;
  className?: string;
  isPrimary?: boolean;
};

export default function KeyMetricCard({
  title,
  metricKey,
  latestData,
  unit,
  icon,
  className,
  isPrimary = false,
}: KeyMetricCardProps) {
  const value = latestData && typeof latestData[metricKey] === 'number'
    ? (latestData[metricKey] as number).toFixed(metricKey === 'temperature' ? 1 : 0)
    : "N/A";

  return (
    <Card className={cn(
        "transition-all duration-300 hover:border-accent glow-shadow flex flex-col",
        isPrimary ? "bg-card-foreground/5 dark:bg-card-foreground/10 row-span-2 justify-center items-center text-center p-6" : "",
        className
      )}>
      <CardHeader className={cn(
        "flex flex-row items-center justify-between space-y-0 pb-2",
         isPrimary ? "flex-col items-center" : ""
      )}>
        <CardTitle className={cn(
          "text-sm font-medium",
          isPrimary ? "text-2xl mb-4 text-destructive" : ""
        )}>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className={cn(isPrimary ? "flex flex-col items-center justify-center" : "")}>
        <div className={cn("text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent",
          isPrimary ? "text-6xl text-destructive" : ""
        )}>
          {value} <span className={cn(
            "text-lg font-normal text-muted-foreground",
            isPrimary ? "text-2xl" : ""
          )}>{unit}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Current reading
        </p>
      </CardContent>
    </Card>
  );
}
