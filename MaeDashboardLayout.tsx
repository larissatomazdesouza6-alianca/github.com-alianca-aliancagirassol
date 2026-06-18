/**
 * ALIANÇA GIRASSOL — Layout do Dashboard da Mãe
 * Sidebar fixa com navegação, header e área de conteúdo
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Briefcase, BookOpen, Users, MessageCircle, LogOut, Menu, X, Bell, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/logo-girassol-kG7yECdYLxcArRyAk9VxS6.webp";

const navItems = [
  { icon: Sun, label: "Início", path: "/mae/dashboard" },
  { icon: Briefcase, label: "Vagas", path: "/mae/vagas" },
  { icon: BookOpen, label: "Capacitação", path: "/mae/capacitacao" },
  { icon: Users, label: "Rede de Elos", path: "/mae/rede-elos" },
  { icon: MessageCircle, label: "Assistente IA", path: "/mae/assistente" },
];

interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function MaeDashboardLayout({ children, title }: Props) {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Até logo! 🌻");
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/mae/dashboard")}>
          <img src={LOGO_IMG} alt="Logo" className="w-9 h-9 sunflower-glow" />
          <div>
            <div className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="golden-text">Aliança</span> Girassol
            </div>
            <div className="text-xs text-white/30">Área da Mãe</div>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#FFB020]/10">
          <div className="w-8 h-8 rounded-full bg-[#FFB020]/30 flex items-center justify-center">
            <span className="text-[#FFB020] text-sm font-bold">{user?.name?.[0] || "A"}</span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">{user?.name || "Ana Beatriz"}</div>
            <div className="text-xs text-white/40 truncate">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = location === item.path;
          return (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                active
                  ? "bg-[#FFB020]/15 text-[#FFB020] border border-[#FFB020]/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
              {active && <ChevronRight size={14} className="ml-auto" />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={16} />
          <span className="text-sm">Sair</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#111827] border-r border-white/5 fixed top-0 left-0 bottom-0 z-40">
        <SidebarContent />
      </aside>

      {/* Sidebar — Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-[#111827] border-r border-white/5 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#0D1B2A]/95 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white">
              <Menu size={22} />
            </button>
            {title && (
              <h1 className="text-base font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h1>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors">
              <Bell size={16} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFB020]" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#FFB020]/30 flex items-center justify-center">
              <span className="text-[#FFB020] text-sm font-bold">{user?.name?.[0] || "A"}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
