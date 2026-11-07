import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Inbox, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "./AuthContext";
import useNoIndex from "../hooks/useNoIndex";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
];

export default function AdminLayout() {
  useNoIndex();
  const { signOut, session } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-mist flex">
      <aside className="w-60 shrink-0 bg-ink text-paper hidden md:flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <span className="font-display text-[18px]">Hussaini Glass</span>
          <span className="block text-[12px] text-paper/50 mt-0.5">Admin</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 text-[14px] transition-colors ${
                  isActive ? "bg-white/10 text-white" : "text-paper/70 hover:bg-white/5 hover:text-paper"
                }`
              }
            >
              <Icon size={17} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 text-[13.5px] text-paper/60 hover:text-paper"
          >
            <ExternalLink size={16} strokeWidth={1.5} />
            View website
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-[13.5px] text-paper/60 hover:text-paper"
          >
            <LogOut size={16} strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden bg-ink text-paper px-4 py-3 flex items-center justify-between">
          <span className="font-display text-[16px]">Hussaini Glass Admin</span>
          <button onClick={handleSignOut} className="text-[13px] text-paper/70">Sign out</button>
        </div>
        <div className="md:hidden bg-ink border-t border-white/10 flex overflow-x-auto">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-4 py-2.5 text-[12.5px] whitespace-nowrap ${
                  isActive ? "text-white border-b-2 border-white" : "text-paper/60"
                }`
              }
            >
              <Icon size={14} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="border-b border-line bg-white px-6 py-3 flex items-center justify-between">
          <span className="text-[13px] text-ink/50">Signed in as {session?.user?.email}</span>
        </div>

        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
