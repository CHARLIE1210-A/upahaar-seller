"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", sales: 18600 },
  { month: "February", sales: 30500 },
  { month: "March", sales: 23700 },
  { month: "April", sales: 73000 },
  { month: "May", sales: 20900 },
  { month: "June", sales: 21400 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function PerformanceChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${Number(value) / 1000}k`}
            />
            <Tooltip
                content={<ChartTooltipContent
                formatter={(value) => `₹${Number(value).toLocaleString()}`}
                />}
            />
            <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
