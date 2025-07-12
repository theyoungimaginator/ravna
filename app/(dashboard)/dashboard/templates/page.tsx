"use client";
import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Filter, Star } from 'lucide-react';

const industries = ["All", "SaaS", "Agency", "Recruiting", "Coaching"];
const campaignTypes = ["All", "Outreach", "Follow-up", "Reminder"];
const sortOptions = ["Performance", "Open Rate", "Reply Rate", "Conversion"];

const templates = [
  { id: 1, subject: "Quick Intro for SaaS Founders", preview: "Hey {{name}}, saw your work at {{company}}...", tags: ["SaaS", "Outreach"], used: 12, open: 62, reply: 18 },
  { id: 2, subject: "Follow-up After Demo", preview: "Just wanted to check in after our call...", tags: ["Follow-up"], used: 8, open: 70, reply: 22 },
  { id: 3, subject: "Agency Cold Pitch", preview: "We help brands like {{company}} scale...", tags: ["Agency", "Outreach"], used: 15, open: 55, reply: 10 },
];

export default function TemplatesPage() {
  const [industry, setIndustry] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Performance");

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white">
      {/* Sidebar Filters */}
      <aside className="w-64 p-6 border-r border-[#1A1A1A] bg-[#111] rounded-tr-2xl rounded-br-2xl flex flex-col gap-8">
        <div>
          <label className="block text-xs font-bold mb-2 text-[#FFD700]">Industry</label>
          <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full bg-[#0D0D0D] text-white rounded-xl p-2 border border-[#222]">
            {industries.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-2 text-[#FFD700]">Campaign Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-[#0D0D0D] text-white rounded-xl p-2 border border-[#222]">
            {campaignTypes.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold mb-2 text-[#FFD700]">Sort by</label>
          <select value={sort} onChange={e => setSort(e.target.value)} className="w-full bg-[#0D0D0D] text-white rounded-xl p-2 border border-[#222]">
            {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <Button className="mt-8 w-full bg-[#FFD700] text-black rounded-2xl font-bold flex items-center gap-2"><Plus className="w-4 h-4" /> Add Template</Button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Templates</h1>
          <Button className="bg-[#FFD700] text-black rounded-2xl font-bold flex items-center gap-2"><Plus className="w-4 h-4" /> Add Template</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map(t => (
            <Card key={t.id} className="bg-[#111] rounded-2xl p-6 border border-[#1A1A1A] shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-white">{t.subject}</span>
                <Star className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div className="text-[#B3B3B3] text-sm mb-3">{t.preview}</div>
              <div className="flex flex-wrap gap-2 mb-3">
                {t.tags.map(tag => <span key={tag} className="bg-[#222] text-xs px-2 py-1 rounded-xl text-[#FFD700]">{tag}</span>)}
              </div>
              <div className="flex items-center gap-4 text-xs text-[#B3B3B3]">
                <span>Used: {t.used}</span>
                <span>Open: {t.open}%</span>
                <span>Reply: {t.reply}%</span>
              </div>
              <Button className="mt-4 w-full bg-[#FFD700] text-black rounded-2xl font-bold">Use this template</Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
} 