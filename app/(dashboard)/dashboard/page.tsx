'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, Flame, Mail, MessageCircle, Mic, Percent } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { Chart } from '@/components/Chart';
import { CampaignTable } from '@/components/CampaignTable';

const metrics = [
  { label: 'Total Messages', value: '2,340', icon: Mail },
  { label: 'Replies', value: '187', icon: MessageCircle },
  { label: 'Open Rate', value: '42%', icon: Percent },
  { label: 'Voice Messages', value: '31', icon: Mic },
];

function QuickActions() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="flex space-x-2">
        <Button className="bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
          New Campaign
        </Button>
        <Button variant="outline">Templates</Button>
      </div>
    </div>
  );
}

function TipsAndInsights() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tips & Insights</h2>
      <p className="text-sm text-muted-foreground">
        Optimize your subject lines for higher open rates. Personalize your
        messages to increase reply rates. Analyze your top-performing campaigns
        to replicate success.
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const [chartType, setChartType] = useState<'weekly' | 'heatmap'>('weekly');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
        {/* Gamified XP Bar */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-accent">XP</span>
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-[#E5E4E2] via-[#6C2EBE] to-[#FF8800] rounded-full" style={{ width: '62%' }} />
          </div>
          <span className="text-xs text-accent ml-2">1,240 / 2,000</span>
          <Flame className="h-4 w-4 text-orange-500 ml-2" />
        </div>
      </div>

      {/* Metrics Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} className="rounded-[12px] p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-glass flex flex-col items-start">
            <m.icon className="h-6 w-6 mb-2 text-platinum" />
            <div className="text-2xl font-bold text-white">{m.value}</div>
            <div className="text-sm text-accent mt-1">{m.label}</div>
          </Card>
        ))}
      </div>

      {/* Chart Toggle */}
      <Card className="rounded-[12px] p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-glass">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-platinum" />
            {chartType === 'weekly' ? 'Weekly Send/Reply' : 'Engagement Heatmap'}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={chartType === 'weekly' ? 'default' : 'outline'}
              className="h-10 rounded-[8px] px-4 font-semibold"
              onClick={() => setChartType('weekly')}
            >
              Weekly
            </Button>
            <Button
              variant={chartType === 'heatmap' ? 'default' : 'outline'}
              className="h-10 rounded-[8px] px-4 font-semibold"
              onClick={() => setChartType('heatmap')}
            >
              Heatmap
            </Button>
          </div>
        </div>
        {/* Placeholder for chart */}
        <div className="h-64 bg-[#222] rounded-[12px] flex items-center justify-center text-accent">
          {chartType === 'weekly' ? 'Weekly Chart Placeholder' : 'Heatmap Placeholder'}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Messages Sent This Week" value="170" />
        <StatCard title="Open Rate" value="25%" />
        <StatCard title="Reply Rate" value="10%" />
        <StatCard title="Conversion Rate" value="5%" />
      </div>

      <Chart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            Top Performing Campaigns
          </h2>
          <CampaignTable />
        </div>
        <div className="space-y-8">
          <QuickActions />
          <TipsAndInsights />
        </div>
      </div>
    </div>
  );
} 