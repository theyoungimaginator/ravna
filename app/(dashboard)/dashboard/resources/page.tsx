import React from 'react';
import { BookOpen, HelpCircle, FileText } from 'lucide-react';

const resources = [
  { title: 'Getting Started Guide', desc: 'Learn how to set up and use Ravna', icon: <BookOpen className="w-8 h-8 text-[#5AC8FA]" /> },
  { title: 'FAQs', desc: 'Frequently asked questions and answers', icon: <HelpCircle className="w-8 h-8 text-[#FFD60A]" /> },
  { title: 'API Documentation', desc: 'Integrate Ravna with your stack', icon: <FileText className="w-8 h-8 text-[#3AE374]" /> },
];

export default function ResourcesPage() {
  return (
    <div className="p-8 space-y-8 bg-[#0E0E0F] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Resources</h1>
        <p className="text-[#D1D1D6] mt-1">Guides, documentation, and support for Ravna</p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((res, idx) => (
          <div key={idx} className="bg-[#1C1C1E] rounded-2xl p-8 border border-[#2C2C2E] shadow-lg flex flex-col items-center text-center">
            <div className="mb-4">{res.icon}</div>
            <div className="text-xl font-bold text-white mb-2">{res.title}</div>
            <div className="text-[#A1A1A6] text-sm">{res.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 