"use client";

import type { SensorDataPoint } from "@/lib/data";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

type SensorChartProps = {
  data: SensorDataPoint[];
  title: string;
  description: string;
  metrics: {
    key: keyof SensorDataPoint;
    name: string;
    color: string;
  }[];
};

export default function SensorChart({
  data,
  title,
  description,
  metrics,
}: SensorChartProps) {
  const chartConfig = metrics.reduce((acc, metric) => {
    acc[metric.key] = {
      label: metric.name,
      color: metric.color,
    };
    return acc;
  }, {} as any);

  return (
    <Card className="transition-all duration-300 hover:border-accent glow-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[600px]">
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value, index) => {
                  if (data.length > 0 && (index % Math.floor(data.length / 12) === 0 || index === data.length -1)) {
                    return value;
                  }
                  return "";
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={30}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Legend content={<ChartLegendContent />} />
              {metrics.map((metric) => (
                 <defs key={metric.key}>
                  <linearGradient
                    id={`color${metric.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={metric.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={metric.color} stopOpacity={0.2} />
                  </linearGradient>
                </defs>
              ))}
              {metrics.map((metric) => (
                <Line
                  key={metric.key}
                  dataKey={metric.key}
                  type="monotone"
                  stroke={`url(#color${metric.key})`}
                  strokeWidth={3}
                  dot={false}
                  name={metric.name}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
