"use client";

import type { SensorDataPoint } from "@/lib/data";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Biohazard } from "lucide-react";

type BacteriaChartProps = {
  data: SensorDataPoint[];
};

const chartConfig = {
  bacteria: {
    label: "Bacteria",
    color: "hsl(var(--chart-4))",
    icon: Biohazard,
  },
};

export default function BacteriaChart({ data }: BacteriaChartProps) {
  return (
    <Card className="transition-all duration-300 hover:border-accent glow-shadow">
      <CardHeader>
        <CardTitle>Bacteria Levels</CardTitle>
        <CardDescription>
          Monitors colony-forming units, with alerts on critical spikes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
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
            <defs>
              <linearGradient id="fillBacteria" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-bacteria)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-bacteria)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="bacteria"
              type="monotone"
              fill="url(#fillBacteria)"
              stroke="var(--color-bacteria)"
              stackId="a"
            />
            <ReferenceLine y={120} label="Critical" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
            <Legend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}