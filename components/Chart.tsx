'use client';

import { TrendingUp } from 'lucide-react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

const data = [
  { name: 'Week 1', value: 20 },
  { name: 'Week 2', value: 50 },
  { name: 'Week 3', value: 30 },
  { name: 'Week 4', value: 70 },
  { name: 'Week 5', value: 40 },
  { name: 'Week 6', value: 80 },
  { name: 'Week 7', value: 60 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border rounded-lg shadow-lg">
        <p className="font-semibold">{`${label}`}</p>
        <p className="text-sm text-muted-foreground">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export function Chart() {
  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg border">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">
          Performance Trend
        </h2>
        <div className="flex items-center text-sm text-green-500">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>Last 30 Days +15%</span>
        </div>
      </div>

      <div className="w-full h-60 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 