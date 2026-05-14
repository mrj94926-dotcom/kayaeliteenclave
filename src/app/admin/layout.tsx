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
  ExternalLink
} from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

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
    <div className="flex min-h-screen bg-[#020617] text-slate-200 selection:bg-primary/30">
      {/* Sidebar */}
      <aside className="w-72 bg-[#020617] border-r border-slate-800 flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-slate-800/50">
          <Link href="/admin" className="flex flex-col gap-2">
            <img 
              src="/images/logo.png" 
              alt="Kaya Elite" 
              className="h-12 w-auto brightness-0 invert" 
            />
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary">CRM Premium</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
          {menuItems.map((group) => (
            <div key={group.group} className="space-y-3">
              <h3 className="px-4 text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">
                {group.group}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group relative overflow-hidden"
                  >
                    <item.icon size={18} className="text-slate-400 group-hover:text-primary transition-colors relative z-10" />
                    <span className="text-sm font-medium group-hover:text-white transition-colors relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl">
          <Link 
            href="/"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary/50 transition-all group mb-4"
          >
            <div className="flex items-center gap-3">
              <Building2 size={18} className="text-slate-400" />
              <span className="text-sm font-medium">Live Website</span>
            </div>
            <ExternalLink size={14} className="text-slate-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          <SignOutButton className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all text-slate-400 hover:text-red-400 group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Logout Session</span>
          </SignOutButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Top Header */}
        <header className="h-24 border-b border-slate-800/50 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-10">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search leads, properties, logs..." 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-slate-900 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 bg-slate-900 rounded-full border border-slate-800 hover:border-primary/50 transition-all group">
              <Bell size={18} className="text-slate-400 group-hover:text-primary transition-colors" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#020617]" />
            </button>
            
            <div className="h-10 w-px bg-slate-800" />

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white tracking-tight">{session?.user?.name || "Admin User"}</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Executive Access</p>
              </div>
              <div className="relative group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/60 p-[1px]">
                  <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all cursor-pointer">
                    {session?.user?.name?.charAt(0) || "A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
