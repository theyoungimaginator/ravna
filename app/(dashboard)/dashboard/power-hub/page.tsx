import React from 'react';
import { Zap, Plug, Download, CheckCircle, AlertTriangle } from 'lucide-react';

const stats = [
  { label: 'Active Integrations', value: 6, icon: <Plug className="w-6 h-6 text-[#3AE374]" /> },
  { label: 'Automations', value: 12, icon: <Zap className="w-6 h-6 text-[#FFD60A]" /> },
  { label: 'Success Rate', value: '98%', icon: <CheckCircle className="w-6 h-6 text-[#5AC8FA]" /> },
  { label: 'Errors', value: 1, icon: <AlertTriangle className="w-6 h-6 text-[#FF4D4F]" /> },
];

const integrations = [
  { name: 'Slack', status: 'active' },
  { name: 'Salesforce', status: 'active' },
  { name: 'Zapier', status: 'error' },
];

export default function PowerHubPage() {
  return (
    <div className="p-8 space-y-8 bg-[#0E0E0F] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Power Hub</h1>
        <p className="text-[#D1D1D6] mt-1">Manage integrations and automations for your workflow</p>
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

      {/* Integrations Panel (Mock) */}
      <div className="bg-[#1C1C1E] rounded-2xl p-8 border border-[#2C2C2E] shadow-lg">
        <div className="text-xl font-semibold text-white mb-6">Integrations</div>
        <div className="space-y-4">
          {integrations.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#18181A] border border-[#23232A]">
              <span className="text-white font-medium">{item.name}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.status === 'active' ? 'bg-[#3AE374] text-[#0E0E0F]' : 'bg-[#FF4D4F] text-white'}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 