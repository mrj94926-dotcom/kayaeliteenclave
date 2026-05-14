"use client";

import { useState } from "react";
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar,
  Filter,
  Download,
  Trash2,
  Edit3,
  Users
} from "lucide-react";
import { format } from "date-fns";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  budget: string | null;
  message: string | null;
  created_at: string;
};

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(lead => 
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone?.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email, or phone..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lead</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-500">ID: {lead.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Mail size={12} className="text-slate-400" /> {lead.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Phone size={12} className="text-slate-400" /> {lead.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-700">
                    {lead.budget || "Not specified"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Calendar size={12} className="text-slate-400" />
                    {lead.created_at ? format(new Date(lead.created_at), "MMM dd, yyyy") : "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                      <Edit3 size={18} />
                    </button>
                    <button className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredLeads.length === 0 && (
          <div className="p-12 text-center">
            <Users className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-500 font-medium">No leads found matching your search.</p>
          </div>
        )}
      </div>

      {/* Pagination Placeholder */}
      <div className="p-6 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
        <p>Showing {filteredLeads.length} of {leads.length} leads</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
          <button className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
}
