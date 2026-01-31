'use client';

import { Pie, PieChart } from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A pie chart with no separator';

const chartConfig = {
  visitors: {
    label: 'unit',
  },
  chrome: {
    label: 'solid',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'total',
    color: '#265266',
  },
} satisfies ChartConfig;

export default function Pichart({
  orderedusers,
  nonorderedusers,
}: {
  orderedusers: number;
  nonorderedusers: number;
}) {
  const chartData = [
    { unit: 'Ordered Users', amount: orderedusers, fill: '#cee7f5' },
    { unit: 'Non-Ordered Users', amount: nonorderedusers, fill: '#265266' },
  ];
  return (
    <Card className="border-0 shadow-none drop-shadow-none h-full p-0 m-0">
      <CardContent className="p-0 border-0 m-0 h-full">
        <ChartContainer config={chartConfig} className="border-0 w-full h-full">
          <PieChart className="w-full h-full p-0 m-0">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="unit"
              stroke="0"
              accentHeight={240}
              className="w-full h-full"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
