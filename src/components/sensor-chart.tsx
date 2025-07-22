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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
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
                if (data.length > 0 && (index % Math.floor(data.length / 6) === 0 || index === data.length -1)) {
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            {metrics.map((metric) => (
              <Line
                key={metric.key}
                dataKey={metric.key}
                type="monotone"
                stroke={metric.color}
                strokeWidth={2}
                dot={false}
                name={metric.name}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
