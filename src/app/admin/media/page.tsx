import { sql } from "@/lib/db";
import { Image as ImageIcon, UploadCloud, Trash2 } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const media = await sql`SELECT * FROM media ORDER BY created_at DESC`;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/20">
              <ImageIcon size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-serif text-[#0F172A]">Media Gallery</h1>
              <p className="text-slate-500 text-sm font-medium">Manage {media.length} digital assets.</p>
            </div>
          </div>
        </div>
        <button className="px-6 py-3 bg-[#D4AF37] text-white rounded-2xl text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#B8962D] transition-all shadow-xl shadow-[#D4AF37]/20 flex items-center gap-3">
          <UploadCloud size={18} /> Upload Assets
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {media.map((item: any) => (
          <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-square flex items-center justify-center">
            {/* Displaying an image if valid url, else placeholder */}
            {item.url ? (
              <img src={item.url} alt="Media" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="text-slate-300" size={40} />
            )}
            <div className="absolute inset-0 bg-[#0F172A]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 active:scale-95">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {media.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-slate-300 rounded-3xl bg-slate-50 flex flex-col items-center justify-center text-slate-400">
            <ImageIcon size={48} className="mb-4 opacity-50" />
            <p className="text-sm font-black uppercase tracking-widest">No assets found</p>
          </div>
        )}
      </div>
    </div>
  );
}
