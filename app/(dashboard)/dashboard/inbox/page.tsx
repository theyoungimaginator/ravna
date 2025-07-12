'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, MessageCircle, Archive, Download, Star, RefreshCw, Settings, Phone, Tag, ChevronDown, User } from 'lucide-react';

const filters = [
  'All',
  'Unread',
  'Needs Follow-up',
  'Warm Leads',
  'Starred',
  'Converted',
];

const threads = [
  {
    id: 1,
    avatar: '',
    initials: 'SJ',
    name: 'Sarah Johnson',
    subject: 'Demo Request',
    snippet: 'Can we schedule a call for next week?',
    timestamp: '2m ago',
    status: 'new',
    unread: true,
  },
  {
    id: 2,
    avatar: '',
    initials: 'MC',
    name: 'Mike Chen',
    subject: 'Follow-up: Startup.io',
    snippet: 'Thanks for the info, I will review.',
    timestamp: '10m ago',
    status: 'replied',
    unread: false,
  },
];

const conversation = [
  {
    from: 'lead',
    name: 'Sarah Johnson',
    text: 'Hi, I am interested in your product. Can we schedule a call for next week?',
    time: '09:15',
  },
  {
    from: 'user',
    name: 'You',
    text: 'Absolutely! What time works best for you?',
    time: '09:16',
  },
];

const leadInfo = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@techcorp.com',
  title: 'VP of Sales',
  company: 'TechCorp Inc',
  tags: ['Demo', 'Enterprise'],
  timeline: {
    lastContacted: '2024-06-01',
    lastOpened: '2024-06-01',
    lastReplied: '2024-06-01',
  },
  notes: 'Interested in enterprise plan.',
  score: 85,
};

export default function InboxPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedThread, setSelectedThread] = useState(threads[0]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#0E0E10]">
      {/* Thread Sidebar */}
      <aside className="w-80 bg-[#1A1A1C] border-r border-[#2C2C2E] flex flex-col">
        <div className="p-4 border-b border-[#2C2C2E] text-white font-bold text-lg">Inbox</div>
        <div className="flex-1 overflow-y-auto">
          {threads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#A1A1AA] p-8">
              <div className="text-6xl mb-4">📬</div>
              <div className="font-bold text-xl mb-2">You haven’t received any replies yet.</div>
              <div className="mb-4">Time to fire up a campaign!</div>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold">Launch a Campaign</Button>
            </div>
          ) : (
            threads.map((thread, idx) => (
              <div
                key={thread.id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-[#23232A] ${idx % 2 === 0 ? 'bg-[#23232A]' : 'bg-[#1A1A1C]'} hover:shadow-[0_0_0_2px_rgba(127,0,255,0.2)] transition-shadow ${selectedThread.id === thread.id ? 'ring-2 ring-[#7F00FF]' : ''}`}
                onClick={() => setSelectedThread(thread)}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2B2B2F] flex items-center justify-center text-white font-bold text-lg">
                  {thread.avatar ? <img src={thread.avatar} alt={thread.name} className="w-10 h-10 rounded-full" /> : thread.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold truncate ${thread.unread ? 'text-white' : 'text-[#A1A1AA]'}`}>{thread.name}</span>
                    <span className="text-xs text-[#A1A1AA] ml-auto">{thread.timestamp}</span>
                  </div>
                  <div className="truncate text-[#A1A1AA] text-sm">{thread.subject} — {thread.snippet}</div>
                </div>
                <span className={`ml-2 text-xs ${thread.status === 'new' ? 'text-green-400' : thread.status === 'replied' ? 'text-purple-400' : 'text-[#636366]'}`}>●</span>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center gap-4 px-8 py-4 border-b border-[#2C2C2E] bg-[#1A1A1C]">
          {/* Smart Filters */}
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f}
                className={`px-4 py-1 rounded-full font-semibold text-sm transition border ${activeFilter === f ? 'bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white border-transparent shadow-lg' : 'bg-transparent text-[#A1A1AA] border-[#2C2C2E] hover:bg-[#23232A]'}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Search Box */}
          <div className="flex-1 flex items-center ml-6">
            <Input
              className="bg-[#23232A] border-none text-white placeholder:text-[#A1A1AA] rounded-full px-4 py-2 w-full max-w-md"
              placeholder="Search name, email, campaign..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {/* Filter Icon */}
          <Button size="icon" variant="ghost" className="text-[#A1A1AA] hover:text-white">
            <Settings size={20} />
          </Button>
          {/* Refresh Icon */}
          <Button size="icon" variant="ghost" className="text-[#A1A1AA] hover:text-white animate-spin-on-hover">
            <RefreshCw size={20} />
          </Button>
        </div>

        {/* Conversation Viewer */}
        <div className="flex flex-1">
          {/* Center: Conversation */}
          <section className="flex-1 flex flex-col px-8 py-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">{selectedThread.subject}</span>
                <span className="text-[#A1A1AA] text-sm">{selectedThread.name}</span>
              </div>
              <span className="ml-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white text-xs font-semibold">Campaign: Demo</span>
              <span className="ml-2 px-3 py-1 rounded-full bg-[#23232A] text-[#FFD60A] text-xs font-semibold">Score: 85</span>
              <div className="flex gap-2 ml-auto">
                <Button size="icon" variant="ghost" className="text-[#A1A1AA] hover:text-white"><Mail size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-[#A1A1AA] hover:text-white"><Phone size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-[#A1A1AA] hover:text-white"><Star size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-[#A1A1AA] hover:text-white"><Tag size={16} /></Button>
                <Button size="icon" variant="ghost" className="text-[#A1A1AA] hover:text-white"><ChevronDown size={16} /></Button>
              </div>
            </div>
            {/* Timeline */}
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
              {conversation.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-lg px-4 py-3 rounded-2xl shadow-md ${msg.from === 'user' ? 'bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white' : 'bg-[#23232A] text-white'}`}>
                    <div className="text-sm">{msg.text}</div>
                    <div className="text-xs text-[#A1A1AA] mt-1 text-right">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Reply Box */}
            <div className="mt-6 flex items-center gap-2">
              <Input className="flex-1 bg-[#23232A] border-none text-white placeholder:text-[#A1A1AA] rounded-full px-4 py-2" placeholder="Type your reply..." />
              <Button className="bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white font-bold">Send</Button>
            </div>
          </section>

          {/* Right Panel: Lead Info */}
          <aside className="w-80 bg-[#1A1A1C] border-l border-[#2C2C2E] px-6 py-8 flex flex-col gap-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#2B2B2F] flex items-center justify-center text-white font-bold text-2xl mb-2">
                {leadInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-lg font-bold text-white">{leadInfo.name}</div>
              <div className="text-[#A1A1AA] text-sm mb-2">{leadInfo.title} @ {leadInfo.company}</div>
              <div className="flex gap-2 mb-2">
                {leadInfo.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-[#23232A] text-xs text-[#A1A1AA]">{tag}</span>
                ))}
              </div>
              <span className="px-3 py-1 rounded-full bg-[#23232A] text-[#FFD60A] text-xs font-semibold">Score: {leadInfo.score}</span>
            </div>
            <div className="text-[#A1A1AA] text-xs">
              <div>Last Contacted: {leadInfo.timeline.lastContacted}</div>
              <div>Last Opened: {leadInfo.timeline.lastOpened}</div>
              <div>Last Replied: {leadInfo.timeline.lastReplied}</div>
            </div>
            <div className="text-[#A1A1AA] text-xs">Notes: {leadInfo.notes}</div>
            <Button className="bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white font-bold mt-4">View full profile</Button>
          </aside>
        </div>
      </main>
    </div>
  );
} 