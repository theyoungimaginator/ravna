import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, PhoneCall, MessageCircle, Zap, Download } from 'lucide-react';

const stats = [
  { label: 'Calls Made', value: 320, icon: <PhoneCall className="w-6 h-6 text-[#5AC8FA]" /> },
  { label: 'Active Bots', value: 4, icon: <Mic className="w-6 h-6 text-[#FFD60A]" /> },
  { label: 'Avg. Call Duration', value: '2m 15s', icon: <MessageCircle className="w-6 h-6 text-[#3AE374]" /> },
  { label: 'Success Rate', value: '91%', icon: <Zap className="w-6 h-6 text-[#FF6B81]" /> },
];

const activity = [
  { time: '09:15', action: 'Call completed', bot: 'SalesBot', status: 'success' },
  { time: '09:10', action: 'Voicemail left', bot: 'SupportBot', status: 'info' },
  { time: '09:05', action: 'Call failed', bot: 'SalesBot', status: 'error' },
  { time: '09:00', action: 'Call completed', bot: 'DemoBot', status: 'success' },
];

export default function VoiceBotPage() {
  return (
    <div className="p-8 space-y-8 bg-[#0E0E0F] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Voice Bot</h1>
        <p className="text-[#D1D1D6] mt-1">Automate outreach and support with AI-powered voice bots</p>
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

      {/* Activity Panel (Mock) */}
      <div className="bg-[#1C1C1E] rounded-2xl p-8 border border-[#2C2C2E] shadow-lg">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Voice Bot Activity</h2>
          <Button variant="outline" className="border-[#2C2C2E] text-[#A1A1A6] bg-transparent hover:bg-[#23232A] flex items-center gap-2"><Download size={16} /> Export Log</Button>
        </div>
        <div className="space-y-4">
          {activity.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#18181A] border border-[#23232A]">
              <div className="flex items-center gap-4">
                <span className="text-[#A1A1A6] text-sm w-14">{item.time}</span>
                <span className="text-white font-medium">{item.action}</span>
                <span className="text-[#FFD60A] text-xs bg-[#23232A] rounded-full px-3 py-1 ml-2">{item.bot}</span>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.status === 'success' ? 'bg-[#3AE374] text-[#0E0E0F]' : item.status === 'info' ? 'bg-[#5AC8FA] text-[#0E0E0F]' : 'bg-[#FF4D4F] text-white'}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 