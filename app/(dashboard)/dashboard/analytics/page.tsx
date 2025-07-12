import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, BarChart2, TrendingUp, Users, PieChart } from 'lucide-react';

const stats = [
  { label: 'Total Outreach', value: 1200, icon: <TrendingUp className="w-6 h-6 text-[#3AE374]" /> },
  { label: 'Unique Leads', value: 455, icon: <Users className="w-6 h-6 text-[#5AC8FA]" /> },
  { label: 'Reply Rate', value: '12.4%', icon: <BarChart2 className="w-6 h-6 text-[#FFD60A]" /> },
  { label: 'Conversions', value: '8.2%', icon: <PieChart className="w-6 h-6 text-[#FF6B81]" /> },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8 bg-[#0E0E0F] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Analytics</h1>
        <p className="text-[#D1D1D6] mt-1">Track your outreach performance and engagement metrics</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between bg-[#1C1C1E] rounded-xl px-6 py-4 border border-[#2C2C2E] shadow-md">
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-[#A1A1A6] text-sm">{stat.label}</div>
            </div>
            <div>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Chart Area (Mock) */}
      <div className="bg-[#1C1C1E] rounded-2xl p-8 border border-[#2C2C2E] shadow-lg flex flex-col items-center justify-center min-h-[320px]">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Outreach Activity (Last 30 Days)</h2>
          <Button variant="outline" className="border-[#2C2C2E] text-[#A1A1A6] bg-transparent hover:bg-[#23232A] flex items-center gap-2"><Download size={16} /> Export Data</Button>
        </div>
        {/* Replace this with a real chart component if available */}
        <div className="w-full h-48 flex items-center justify-center">
          <span className="text-[#636366]">[Mock Chart Placeholder]</span>
        </div>
      </div>
    </div>
  );
} 