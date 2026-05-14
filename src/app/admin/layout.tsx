import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  Building2,
  TrendingUp,
  Mail,
  Image as ImageIcon,
  History,
  ShieldCheck,
  Bell,
  Search,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";
import NotificationCenter from "@/components/admin/NotificationCenter";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Robust server-side protection
  if (!session) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const menuItems = [
    { group: "Overview", items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
      { name: "Analytics", icon: TrendingUp, href: "/admin/analytics" },
    ]},
    { group: "Management", items: [
      { name: "Leads", icon: Users, href: "/admin/leads" },
      { name: "Appointments", icon: Calendar, href: "/admin/appointments" },
      { name: "Newsletter", icon: Mail, href: "/admin/newsletter" },
    ]},
    { group: "Content", items: [
      { name: "Property Manager", icon: Building2, href: "/admin/property" },
      { name: "Media Gallery", icon: ImageIcon, href: "/admin/media" },
    ]},
    { group: "System", items: [
      { name: "Activity Logs", icon: History, href: "/admin/logs" },
      { name: "Admin Users", icon: ShieldCheck, href: "/admin/users" },
      { name: "Settings", icon: Settings, href: "/admin/settings" },
    ]},
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-primary/20 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 border-b border-slate-100/80">
          <Link href="/admin" className="flex flex-col gap-2">
            <img 
              src="/images/logo.png" 
              alt="Kaya Elite" 
              className="h-10 w-auto" 
            />
            <div className="flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 rounded-full w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37]">CRM Production</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar scrollbar-hide">
          {menuItems.map((group) => (
            <div key={group.group} className="space-y-3">
              <h3 className="px-4 text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">
                {group.group}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all group relative overflow-hidden active:scale-[0.98]"
                  >
                    <item.icon size={18} className="text-slate-400 group-hover:text-[#D4AF37] transition-colors relative z-10" />
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-[#0F172A] transition-colors relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-white/80 backdrop-blur-xl">
          <Link 
            href="/"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#D4AF37]/50 transition-all group mb-4 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <Building2 size={18} className="text-slate-400" />
              <span className="text-sm font-semibold text-slate-700">Live Website</span>
            </div>
            <ExternalLink size={14} className="text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <SignOutButton className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all text-slate-500 hover:text-red-500 group border border-transparent hover:border-red-100">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold tracking-tight">Sign Out</span>
          </SignOutButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Top Header */}
        <header className="h-24 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-10 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search CRM intelligence..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white focus:shadow-lg focus:shadow-[#D4AF37]/5 transition-all text-[#0F172A] placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <NotificationCenter />
            
            <div className="h-8 w-px bg-slate-200" />

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#0F172A] tracking-tight group-hover:text-[#D4AF37] transition-colors">{session?.user?.name || "Admin User"}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black">Executive Partner</p>
              </div>
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8962D] p-[1.5px] shadow-lg shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center text-[#D4AF37] font-black text-lg">
                    {session?.user?.name?.charAt(0) || "A"}
                  </div>
                </div>
              </div>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-[#D4AF37] transition-colors" />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <div className="p-10 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
