import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Users, Star, Download } from 'lucide-react';

const stats = [
  { label: 'Total Contacts', value: 120, icon: <Users className="w-6 h-6 text-[#5AC8FA]" /> },
  { label: 'VIPs', value: 8, icon: <Star className="w-6 h-6 text-[#FFD60A]" /> },
  { label: 'Recently Added', value: 12, icon: <User className="w-6 h-6 text-[#3AE374]" /> },
  { label: 'Exported', value: 30, icon: <Download className="w-6 h-6 text-[#EAEAEA]" /> },
];

const contacts = [
  { name: 'Jane Doe', company: 'Acme Corp', email: 'jane@acme.com', vip: true },
  { name: 'John Smith', company: 'Beta LLC', email: 'john@beta.com', vip: false },
];

export default function CRMPage() {
  return (
    <div className="p-8 space-y-8 bg-[#0E0E0F] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">CRM</h1>
        <p className="text-[#D1D1D6] mt-1">Manage your contacts and relationships in one place</p>
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

      {/* Contacts Table (Mock) */}
      <div className="bg-[#1C1C1E] rounded-2xl p-8 border border-[#2C2C2E] shadow-lg overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-white">Contacts</span>
          <Button variant="outline" className="border-[#2C2C2E] text-[#A1A1A6] bg-transparent hover:bg-[#23232A] flex items-center gap-2"><Download size={16} /> Export</Button>
        </div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-[#2C2C2E] text-[#A1A1A6]">
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Company</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">VIP</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, idx) => (
              <tr key={idx} className="border-b border-[#2C2C2E] hover:bg-[#23232A]">
                <td className="py-3 px-4 text-white font-semibold">{contact.name}</td>
                <td className="py-3 px-4 text-white">{contact.company}</td>
                <td className="py-3 px-4 text-[#A1A1A6]">{contact.email}</td>
                <td className="py-3 px-4">
                  {contact.vip ? <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFD60A] text-[#0E0E0F]">VIP</span> : <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2C2C2E] text-[#A1A1A6]">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 