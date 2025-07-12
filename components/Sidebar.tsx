'use client';

import { Home, Send, Users, Inbox, Brain, BarChart2, Mic, Search, ClipboardList, Zap, Settings, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const tabs = [
  { label: 'Home', icon: Home, href: '/dashboard' },
  { label: 'Campaigns', icon: Send, href: '/dashboard/campaigns' },
  { label: 'Leads', icon: Users, href: '/dashboard/leads' },
  { label: 'Inbox', icon: Inbox, href: '/dashboard/inbox' },
  { label: 'Templates', icon: Brain, href: '/dashboard/templates' },
  { label: 'Analytics', icon: BarChart2, href: '/dashboard/analytics' },
  { label: 'Voice Bot', icon: Mic, href: '/dashboard/voice-bot' },
  { label: 'Lead Finder', icon: Search, href: '/dashboard/lead-finder' },
  { label: 'CRM', icon: ClipboardList, href: '/dashboard/crm' },
  { label: 'Power Hub', icon: Zap, href: '/dashboard/power-hub' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  { label: 'Support / Resources', icon: HelpCircle, href: '/dashboard/support' },
];

export default function Sidebar({ active }: { active?: string }) {
  // TODO: Replace with real user data
  const user = { name: 'Olivia', avatar: '/avatar.png', power: 'Strategist' };
  return (
    <aside className="h-full w-64 bg-[#0D0D0D] flex flex-col py-6 px-4 border-r border-[#1A1A1A]">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFD700] to-[#222] flex items-center justify-center mb-2 border-4 border-[#111]">
          {/* Avatar image or fallback */}
          <span className="text-2xl font-bold text-white">{user.name[0]}</span>
        </div>
        <div className="text-white font-semibold text-lg">{user.name}</div>
        <div className="text-[#FFD700] text-xs font-bold mt-1">Power Level: {user.power} <span className="ml-1">🔥</span></div>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {tabs.map(tab => {
          const isActive = active === tab.label;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-150 ${isActive ? 'bg-[#111] text-[#FFD700] shadow-lg' : 'text-white hover:bg-[#1A1A1A] hover:text-[#FFD700]'}`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 text-center text-xs text-[#B3B3B3]">Ravna &copy; {new Date().getFullYear()}</div>
    </aside>
  );
} 