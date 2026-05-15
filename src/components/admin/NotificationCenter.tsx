"use client";

import { useState, useEffect } from "react";
import { Bell, X, Check, Trash2, Mail, Users, Calendar, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    fetch('/api/admin/notifications')
      .then(res => res.json())
      .then(data => {
        if (data.notifications) setNotifications(data.notifications);
      })
      .catch(console.error);
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/admin/notifications/${id}`, { method: 'PUT' });
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (e) { console.error(e); }
  };

  const removeNotification = async (id: string) => {
    try {
      await fetch(`/api/admin/notifications/${id}`, { method: 'DELETE' });
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (e) { console.error(e); }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'lead': return <Users size={16} className="text-[#D4AF37]" />;
      case 'appointment': return <Calendar size={16} className="text-blue-500" />;
      case 'newsletter': return <Mail size={16} className="text-emerald-500" />;
      default: return <AlertCircle size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-slate-50 rounded-full border border-slate-200 hover:border-[#D4AF37]/50 transition-all group hover:shadow-md active:scale-95"
      >
        <Bell size={18} className="text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
        {unreadCount > 0 && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full border-2 border-white shadow-sm animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl z-[70] overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#0F172A]">Intelligence Node</h3>
                <span className="px-2.5 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] font-black uppercase rounded-full border border-[#D4AF37]/20">
                  {unreadCount} New
                </span>
              </div>

              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-slate-50">
                    {notifications.map((n) => (
                      <div 
                        key={n.id} 
                        className={`p-5 hover:bg-slate-50 transition-all group relative ${!n.is_read ? 'bg-white' : 'opacity-60'}`}
                      >
                        <div className="flex gap-4">
                          <div className={`mt-1 p-2 rounded-xl bg-slate-50 border border-slate-100`}>
                            {getIcon(n.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs font-bold text-[#0F172A]">{n.title}</h4>
                              <span className="text-[9px] text-slate-400 font-bold uppercase">{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">{n.message}</p>
                            <div className="flex gap-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {!n.is_read && (
                                <button onClick={() => markAsRead(n.id)} className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest hover:underline flex items-center gap-1">
                                  <Check size={12} /> Mark Read
                                </button>
                              )}
                              <button onClick={() => removeNotification(n.id)} className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:underline flex items-center gap-1">
                                <Trash2 size={12} /> Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Bell size={32} className="mx-auto mb-4 text-slate-200" />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">No active notifications</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
                <button className="text-[10px] font-black text-[#0F172A] uppercase tracking-[0.2em] hover:underline">
                  View Intelligence Archive
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
