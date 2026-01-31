'use client'

import { TrendingDown, TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { arechartdata } from '@/assets/datas/data'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

export const description = 'An area chart with icons'

const chartConfig = {
  expense: {
    label: 'expense',
    color: 'rgba(206,145,120,0.5)',
    icon: TrendingDown
  },
  profit: {
    label: 'profit',
    color: '#7bf1a8',
    icon: TrendingUp
  }
} satisfies ChartConfig

export function ChartAreaIcons() {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={arechartdata}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={(props) => {
                const { x, y, payload } = props
                return (
                  <text
                    x={x}
                    y={y + 5}
                    textAnchor="middle"
                    fill="#16a34a"
                    fontSize={12}
                    fontWeight={700}
                    color="red"
                    className="text-green-700"
                    style={{
                      color: 'red'
                    }}
                  >
                    {payload.value.slice(0, 3)}
                  </text>
                )
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={(props) => {
                const { x, y, payload } = props
                return (
                  <text
                    x={x - 5}
                    y={y + 5}
                    fill="#f00"
                    textAnchor="end"
                    fontSize={18}
                    fontWeight={700}
                    className="text-xs font-medium text-green-900"
                  >
                    {payload.value > 1000
                      ? (payload.value / 1000).toFixed(1).concat('K')
                      : payload.value}
                  </text>
                )
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="expense"
              type="natural"
              fill="rgba(206,145,120,0.5)"
              fillOpacity={0.4}
              stroke="rgba(206,145,120,0.9)"
            />
            <Area
              dataKey="profit"
              type="natural"
              fill="#7bf1a8"
              fillOpacity={0.4}
              stroke="#00ff00"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
