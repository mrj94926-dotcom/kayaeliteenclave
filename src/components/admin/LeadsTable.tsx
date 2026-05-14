"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  User,
  Clock,
  Briefcase,
  Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  interested_property: string;
  status: string;
  created_at: string;
}

export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'hot': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'closed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'contacted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Table Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-slate-900/60 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/20">
                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Lead Identity</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Requirements</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Status</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Submission</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredLeads.map((lead) => (
                <motion.tr 
                  layout
                  key={lead.id} 
                  className="hover:bg-white/5 transition-colors group cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center font-bold text-primary">
                        {lead.name?.charAt(0) || "L"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{lead.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm text-slate-200 flex items-center gap-2">
                        <Briefcase size={14} className="text-slate-600" />
                        {lead.interested_property || "Elite Villa"}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <Wallet size={14} className="text-slate-600" />
                        {lead.budget || "TBD"}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-black border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock size={14} />
                      {new Date(lead.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="px-8 py-5 border-t border-slate-800 bg-slate-900/20 flex justify-between items-center">
          <p className="text-xs text-slate-500">Showing {filteredLeads.length} of {leads.length} records</p>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-800 rounded-lg text-slate-600 hover:border-slate-700 transition-all"><ChevronLeft size={16} /></button>
            <button className="p-2 border border-slate-800 rounded-lg text-slate-600 hover:border-slate-700 transition-all"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#020617] border-l border-slate-800 z-[110] shadow-2xl p-0 flex flex-col"
            >
              <div className="p-8 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-serif text-white">Lead Intelligence</h3>
                <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                {/* Header Profile */}
                <div className="flex items-center gap-6 pb-10 border-b border-slate-800/50">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 p-[1px]">
                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-primary font-black text-3xl">
                      {selectedLead.name?.charAt(0) || "L"}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-serif text-white mb-2">{selectedLead.name}</h4>
                    <div className="flex items-center gap-2 text-primary">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest font-black">{selectedLead.status} LEAD</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 py-4 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/10">
                    <Phone size={16} /> Call Lead
                  </button>
                  <button className="flex items-center justify-center gap-3 py-4 bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
                    <Mail size={16} /> Send Email
                  </button>
                </div>

                {/* Information Grid */}
                <div className="space-y-6">
                  <h5 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">Contact Details</h5>
                  <div className="grid grid-cols-1 gap-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Email Address</span>
                      <span className="text-sm text-white font-medium">{selectedLead.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Phone Number</span>
                      <span className="text-sm text-white font-medium">{selectedLead.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h5 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">Property Requirements</h5>
                  <div className="grid grid-cols-1 gap-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Interested In</span>
                      <span className="text-sm text-white font-medium">{selectedLead.interested_property}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Estimated Budget</span>
                      <span className="text-sm text-white font-medium">{selectedLead.budget}</span>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="space-y-8">
                  <h5 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500">Engagement History</h5>
                  <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white">Lead Created</h4>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(selectedLead.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-light">Lead successfully captured via Kaya Elite Website form.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-800 bg-slate-900/40">
                <button className="w-full py-4 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-all">
                  Add Internal Note
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
