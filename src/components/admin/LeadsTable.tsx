"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
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
  Wallet,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { updateLeadStatus, deleteLead } from "@/lib/actions/crm";

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

const statusOptions = ["New", "Contacted", "Interested", "Hot Lead", "Site Visit", "Closed"];

export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredLeads = leads.filter(lead => 
    (lead.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (lead.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string | undefined | null) => {
    const s = (status || "New").toLowerCase();
    switch (s) {
      case 'hot lead': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'closed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'contacted': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'site visit': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const res = await updateLeadStatus(id, newStatus);
    if (res.success) {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently remove this prospect from the CRM?")) return;
    setIsDeleting(true);
    const res = await deleteLead(id);
    if (res.success) {
      setLeads(leads.filter(l => l.id !== id));
      setSelectedLead(null);
    }
    setIsDeleting(false);
  };

  return (
    <div className="space-y-6">
      {/* Table Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:shadow-lg focus:shadow-[#D4AF37]/5 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#0F172A] transition-all flex items-center gap-2 shadow-sm">
            <Filter size={16} /> Filter Intelligence
          </button>
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#0F172A] transition-all flex items-center gap-2 shadow-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Prospect Profile</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Requirements</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Lifecycle Status</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Registration</th>
                <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLeads.map((lead) => (
                <motion.tr 
                  layout
                  key={lead.id} 
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center font-black text-[#D4AF37] text-lg group-hover:scale-105 transition-all duration-500">
                        {lead.name?.charAt(0) || "L"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#D4AF37] transition-colors">{lead.name}</p>
                        <p className="text-xs text-slate-400 font-medium mt-1 tracking-tight">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="space-y-1.5">
                      <p className="text-sm text-[#0F172A] font-semibold flex items-center gap-2">
                        <Briefcase size={14} className="text-slate-300" />
                        {lead.interested_property || "Elite Portfolio"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                        <Wallet size={14} className="text-slate-300" />
                        {lead.budget || "TBD"}
                      </p>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black border ${getStatusColor(lead.status)} shadow-sm`}>
                        {lead.status || "New"}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      <Clock size={14} className="text-[#D4AF37]" />
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString('en-GB') : "Pending"}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                        className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all shadow-sm"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                        className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Container */}
        <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Showing {filteredLeads.length} of {leads.length} identified records</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-400 hover:text-[#0F172A] hover:shadow-md transition-all active:scale-95"><ChevronLeft size={16} /></button>
            <button className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-slate-400 hover:text-[#0F172A] hover:shadow-md transition-all active:scale-95"><ChevronRight size={16} /></button>
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
              className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-[2px] z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white border-l border-slate-200 z-[110] shadow-2xl p-0 flex flex-col"
            >
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-2xl font-serif text-[#0F172A] tracking-tight">Lead Intelligence</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Deep analysis for strategic acquisition</p>
                </div>
                <button onClick={() => setSelectedLead(null)} className="p-3 hover:bg-white rounded-full text-slate-400 hover:text-[#0F172A] transition-all shadow-sm border border-transparent hover:border-slate-200 active:scale-90">
                  <X size={22} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                {/* Header Profile */}
                <div className="flex items-center gap-8 pb-12 border-b border-slate-100">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#B8962D] p-[2px] shadow-xl shadow-[#D4AF37]/10">
                    <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center text-[#D4AF37] font-black text-4xl">
                      {selectedLead.name?.charAt(0) || "L"}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-3xl font-serif text-[#0F172A] leading-none">{selectedLead.name || "Anonymous Prospect"}</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-sm" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#D4AF37]">Active Asset Interest</span>
                    </div>
                    <div className="pt-2">
                      <select 
                        value={selectedLead.status || "New"}
                        onChange={(e) => handleStatusUpdate(selectedLead.id, e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-[#0F172A] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer shadow-sm"
                      >
                        {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Quick Engagement Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <a href={`https://wa.me/${selectedLead.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 py-5 bg-[#0F172A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1e293b] transition-all shadow-xl shadow-[#0F172A]/10 active:scale-[0.98]">
                    <Phone size={18} /> Initiate Protocol
                  </a>
                  <a href={`mailto:${selectedLead.email}`} className="flex items-center justify-center gap-3 py-5 bg-white border border-slate-200 text-[#0F172A] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]">
                    <Mail size={18} /> Secure Message
                  </a>
                </div>

                {/* Information Modules */}
                <div className="grid grid-cols-1 gap-10">
                  <div className="space-y-6">
                    <h5 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Communication Node</h5>
                    <div className="grid grid-cols-1 gap-6 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                      <div className="flex justify-between items-center group">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Email</span>
                        <span className="text-sm text-[#0F172A] font-bold tracking-tight">{selectedLead.email || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Line</span>
                        <span className="text-sm text-[#0F172A] font-bold tracking-tight">{selectedLead.phone || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h5 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Asset Requirements</h5>
                    <div className="grid grid-cols-1 gap-6 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Desired Typology</span>
                        <span className="text-sm text-[#0F172A] font-bold tracking-tight">{selectedLead.interested_property || "Elite Portfolio"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Capital Commitment</span>
                        <span className="text-sm text-[#D4AF37] font-black tracking-tight">{selectedLead.budget || "TBD"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engagement Timeline */}
                <div className="space-y-10">
                  <h5 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Strategic Timeline</h5>
                  <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-100">
                    <div className="relative pl-12 group">
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform">
                        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#0F172A]">Acquisition Inception</h4>
                          <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{selectedLead.created_at ? new Date(selectedLead.created_at).toLocaleDateString('en-GB') : "Pending"}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Strategic interest successfully captured via digital gateway protocol.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 border-t border-slate-100 bg-slate-50/50">
                <button 
                  onClick={() => handleDelete(selectedLead.id)}
                  className="w-full py-5 bg-white border border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-50 hover:border-red-200 transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  <Trash2 size={18} />
                  Terminate Lead Portfolio
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
