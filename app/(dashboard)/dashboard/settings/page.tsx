import React from 'react';
import { Button } from '@/components/ui/button';

const settings = [
  { label: 'Enable Dark Mode', value: true },
  { label: 'Email Notifications', value: false },
  { label: 'Two-Factor Authentication', value: true },
];

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8 bg-[#0E0E0F] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="text-[#D1D1D6] mt-1">Customize your Ravna experience and preferences</p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map((setting, idx) => (
          <div key={idx} className="bg-[#1C1C1E] rounded-2xl p-6 border border-[#2C2C2E] shadow-lg flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-white">{setting.label}</div>
              <div className="text-[#A1A1A6] text-sm">{setting.value ? 'Enabled' : 'Disabled'}</div>
            </div>
            <Button className={`rounded-full px-6 py-2 font-bold ${setting.value ? 'bg-[#3AE374] text-[#0E0E0F]' : 'bg-[#2C2C2E] text-[#A1A1A6]'}`}>{setting.value ? 'On' : 'Off'}</Button>
          </div>
        ))}
      </div>
    </div>
  );
} 