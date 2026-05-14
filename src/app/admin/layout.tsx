import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  Building2
} from "lucide-react";

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
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Leads", icon: Users, href: "/admin/leads" },
    { name: "Appointments", icon: Calendar, href: "/admin/appointments" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="Kaya Elite" 
              className="h-10 w-auto brightness-0 invert" 
            />
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-300 hover:text-white group"
            >
              <item.icon size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link 
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
          >
            <Building2 size={20} />
            <span className="font-medium">View Site</span>
          </Link>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/20 transition-colors text-slate-400 hover:text-red-400"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-widest">
            Kaya Elite Management
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{session?.user?.name || "Admin User"}</p>
              <p className="text-xs text-slate-500">{session?.user?.email || "admin@kayaelite.com"}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {session?.user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
