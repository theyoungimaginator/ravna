import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, Mail, Phone, Globe } from 'lucide-react';
import React from 'react';

const leads = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    company: 'TechCorp Inc',
    position: 'VP of Sales',
    score: 85,
    status: 'new',
  },
  {
    name: 'Mike Chen',
    email: 'mike.chen@startup.io',
    company: 'Startup.io',
    position: 'CEO',
    score: 92,
    status: 'contacted',
  },
];

const stats = [
  { label: 'Total Leads', value: 5, icon: <span className="text-2xl">👤</span> },
  { label: 'Enriched', value: 4, icon: <span className="text-2xl">✨</span> },
  { label: 'High Score', value: 3, icon: <Globe className="inline w-5 h-5 text-green-400" /> },
  { label: 'Qualified', value: 1, icon: <Mail className="inline w-5 h-5 text-orange-400" /> },
];

export default function LeadsPage() {
  return (
    <div className="p-8 space-y-8 bg-[#111] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Leads Database</h1>
        <p className="text-[#b3b3b3] mt-1">Manage your prospect list and lead generation tools</p>
      </div>

      {/* Lead Generation & Enrichment Tab */}
      <div className="rounded-2xl border-2 border-[#7c3aed] bg-gradient-to-r from-[#1a133a] to-[#141a2a] p-1">
        <div className="bg-[#18122b] rounded-xl flex flex-col gap-2">
          <div className="px-6 pt-4 pb-2">
            <span className="inline-flex items-center gap-2 text-[#b794f4] font-semibold text-base">
              <span className="text-purple-400 text-xl">⚡</span> Lead Generation & Enrichment
            </span>
          </div>
          <div className="flex flex-row gap-4 px-4 pb-4">
            <button className="flex-1 flex flex-col items-center justify-center bg-[#20194a] hover:bg-[#2d2466] transition rounded-lg py-6 border border-[#2d2466]">
              <Search className="mb-2 text-[#b794f4]" size={28} />
              <span className="text-white font-medium">Find Leads</span>
            </button>
            <button className="flex-1 flex flex-col items-center justify-center bg-[#20194a] hover:bg-[#2d2466] transition rounded-lg py-6 border border-[#2d2466]">
              <span className="mb-2 text-[#b794f4] text-2xl">✴️</span>
              <span className="text-white font-medium">Enrich Data</span>
            </button>
            <button className="flex-1 flex flex-col items-center justify-center bg-[#20194a] hover:bg-[#2d2466] transition rounded-lg py-6 border border-[#2d2466]">
              <Download className="mb-2 text-[#b794f4]" size={28} />
              <span className="text-white font-medium">Import CSV</span>
            </button>
            <button className="flex-1 flex flex-col items-center justify-center bg-[#20194a] hover:bg-[#2d2466] transition rounded-lg py-6 border border-[#2d2466]">
              <span className="mb-2 text-[#b794f4] text-2xl">＋</span>
              <span className="text-white font-medium">Add Manual</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search, Filters, Export Bar */}
      <div className="flex flex-row gap-2 items-center bg-[#18122b] rounded-xl px-4 py-3">
        <Input placeholder="Search leads by name, email, or company..." className="flex-1 min-w-[250px] bg-[#18122b] border-none text-white placeholder:text-[#b3b3b3]" />
        <Button variant="outline" className="border-[#28204d] text-[#b3b3b3] bg-[#18122b] hover:bg-[#23203a] flex items-center gap-2"><Filter size={16} /> Filters</Button>
        <Button variant="outline" className="border-[#28204d] text-[#b3b3b3] bg-[#18122b] hover:bg-[#23203a] flex items-center gap-2"><Download size={16} /> Export</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between bg-[#18122b] rounded-xl px-6 py-4 border border-[#28204d]">
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-[#b3b3b3] text-sm">{stat.label}</div>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-[#18122b] rounded-xl overflow-x-auto border border-[#28204d]">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-[#28204d] text-[#b3b3b3]">
              <th className="py-3 px-4 text-left font-semibold">Lead</th>
              <th className="py-3 px-4 text-left font-semibold">Company</th>
              <th className="py-3 px-4 text-left font-semibold">Position</th>
              <th className="py-3 px-4 text-left font-semibold">Score</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.email} className="border-b border-[#28204d] hover:bg-[#23203a]">
                <td className="py-3 px-4">
                  <div className="font-semibold text-white">{lead.name}</div>
                  <div className="text-xs text-[#b3b3b3]">{lead.email}</div>
                </td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <span className="text-[#b3b3b3] text-lg">🏢</span>
                  <span className="text-white">{lead.company}</span>
                </td>
                <td className="py-3 px-4 text-white">{lead.position}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-[#23203a] rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-red-500 to-green-400"
                        style={{ width: `${lead.score}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-semibold">{lead.score}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${lead.status === 'new' ? 'bg-[#23203a] text-white' : 'bg-blue-900 text-blue-300'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <Button size="icon" variant="ghost" className="text-[#b3b3b3] hover:text-white"><Mail size={16} /></Button>
                  <Button size="icon" variant="ghost" className="text-[#b3b3b3] hover:text-white"><Phone size={16} /></Button>
                  <Button size="icon" variant="ghost" className="text-[#b3b3b3] hover:text-white"><Globe size={16} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 