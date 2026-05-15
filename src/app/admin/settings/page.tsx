import { sql } from "@/lib/db";
import { Settings, Save } from "lucide-react";
import { saveSettings } from "@/app/actions/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settingsRes = await sql`SELECT * FROM settings`;
  const settings = settingsRes.reduce((acc: any, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  return (
    <form action={saveSettings} className="space-y-10 max-w-4xl">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/20">
              <Settings size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-[#0F172A]">System Settings</h1>
              <p className="text-slate-500 text-sm font-medium">Configure global platform parameters.</p>
            </div>
          </div>
        </div>
        <button type="submit" className="px-6 py-3 bg-[#0F172A] text-white rounded-2xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-slate-800 transition-all shadow-xl shadow-[#0F172A]/20 flex items-center gap-3">
          <Save size={18} /> Save Configuration
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm space-y-8">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 mb-6">General Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-[#0F172A]">Platform Name</label>
              <input type="text" name="platform_name" defaultValue={settings.platform_name || "Kaya Elite Enclave"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-[#0F172A]">Support Email</label>
              <input type="email" name="support_email" defaultValue={settings.support_email || "contact@kayaelite.com"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 mb-6">Contact & Social</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-[#0F172A]">WhatsApp Number</label>
              <input type="text" name="whatsapp_number" defaultValue={settings.whatsapp_number || "+91 9000000000"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-[#0F172A]">Instagram Link</label>
              <input type="text" name="instagram_url" defaultValue={settings.instagram_url || "https://instagram.com/kayaelite"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 mb-6">SEO & Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-[#0F172A]">Meta Title</label>
              <input type="text" name="meta_title" defaultValue={settings.meta_title || "Kaya Elite | Luxury Real Estate"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-[#0F172A]">Google Analytics ID</label>
              <input type="text" name="ga_id" defaultValue={settings.ga_id || "G-XXXXXXXX"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
