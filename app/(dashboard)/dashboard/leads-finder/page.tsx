import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, UserPlus, Sparkles } from 'lucide-react';

const stats = [
  { label: 'Leads Found', value: 32, icon: <UserPlus className="w-6 h-6 text-[#3AE374]" /> },
  { label: 'Enriched', value: 28, icon: <Sparkles className="w-6 h-6 text-[#FFD60A]" /> },
  { label: 'Duplicates', value: 2, icon: <span className="text-2xl text-[#FF4D4F]">⛔</span> },
  { label: 'Exported', value: 15, icon: <Download className="w-6 h-6 text-[#5AC8FA]" /> },
];

const results = [
  { name: 'Alice Smith', company: 'Acme Corp', email: 'alice@acme.com', enriched: true },
  { name: 'Bob Lee', company: 'Beta LLC', email: 'bob@beta.com', enriched: false },
];

export default function LeadsFinderPage() {
  return (
    <div className="p-8 space-y-8 bg-[#0E0E0F] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Leads Finder</h1>
        <p className="text-[#D1D1D6] mt-1">Discover and enrich new leads for your campaigns</p>
      </div>

      {/* Enrichment Tools */}
      <div className="flex gap-4 mb-4">
        <Button className="bg-[#3AE374] text-[#0E0E0F] font-bold">Find New Leads</Button>
        <Button className="bg-[#FFD60A] text-[#0E0E0F] font-bold">Enrich Data</Button>
        <Button className="bg-[#5AC8FA] text-[#0E0E0F] font-bold">Export All</Button>
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

      {/* Results Table (Mock) */}
      <div className="bg-[#1C1C1E] rounded-2xl p-8 border border-[#2C2C2E] shadow-lg overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <Input placeholder="Search results..." className="w-1/3 bg-[#18122b] border-none text-white placeholder:text-[#b3b3b3]" />
          <Button variant="outline" className="border-[#2C2C2E] text-[#A1A1A6] bg-transparent hover:bg-[#23232A] flex items-center gap-2"><Download size={16} /> Export Selected</Button>
        </div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-[#2C2C2E] text-[#A1A1A6]">
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Company</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Enriched</th>
            </tr>
          </thead>
          <tbody>
            {results.map((lead, idx) => (
              <tr key={idx} className="border-b border-[#2C2C2E] hover:bg-[#23232A]">
                <td className="py-3 px-4 text-white font-semibold">{lead.name}</td>
                <td className="py-3 px-4 text-white">{lead.company}</td>
                <td className="py-3 px-4 text-[#A1A1A6]">{lead.email}</td>
                <td className="py-3 px-4">
                  {lead.enriched ? <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#3AE374] text-[#0E0E0F]">Yes</span> : <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2C2C2E] text-[#A1A1A6]">No</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 