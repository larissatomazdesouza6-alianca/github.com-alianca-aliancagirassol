/**
 * ALIANÇA GIRASSOL — Dashboard da Empresa
 * Kanban de candidaturas, Analytics ESG, gestão de vagas
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Users, BarChart3, Briefcase, LogOut, Menu, Bell, ChevronRight, TrendingUp, Award, Heart, Plus, X, ArrowRight, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts";

const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/logo-girassol-kG7yECdYLxcArRyAk9VxS6.webp";

const navItems = [
  { icon: BarChart3, label: "Dashboard", id: "dashboard" },
  { icon: Briefcase, label: "Vagas", id: "vagas" },
  { icon: Users, label: "Candidaturas", id: "kanban" },
  { icon: TrendingUp, label: "Analytics ESG", id: "esg" },
];

const kanbanColumns = [
  {
    id: "triagem", label: "Triagem IA", color: "border-blue-500/30 bg-blue-500/5",
    cards: [
      { nome: "Ana Beatriz Silva", match: 97, profissao: "Assistente Administrativa", vaga: "Assistente Adm.", avatar: "A" },
      { nome: "Carla Mendes", match: 92, profissao: "Atendimento ao Cliente", vaga: "Atendimento", avatar: "C" },
      { nome: "Fernanda Lima", match: 88, profissao: "Redatora", vaga: "Redatora Jr.", avatar: "F" },
    ]
  },
  {
    id: "entrevista", label: "Entrevista", color: "border-yellow-500/30 bg-yellow-500/5",
    cards: [
      { nome: "Juliana Santos", match: 85, profissao: "Designer Gráfica", vaga: "Designer", avatar: "J" },
      { nome: "Patrícia Rocha", match: 90, profissao: "Professora", vaga: "Treinamento", avatar: "P" },
    ]
  },
  {
    id: "proposta", label: "Proposta", color: "border-purple-500/30 bg-purple-500/5",
    cards: [
      { nome: "Renata Oliveira", match: 94, profissao: "Analista Financeira", vaga: "Analista Fin.", avatar: "R" },
    ]
  },
  {
    id: "contratada", label: "Contratada ✓", color: "border-green-500/30 bg-green-500/5",
    cards: [
      { nome: "Simone Ferreira", match: 96, profissao: "Atendimento", vaga: "Atendimento", avatar: "S" },
      { nome: "Maria Costa", match: 91, profissao: "Administrativa", vaga: "Assistente Adm.", avatar: "M" },
    ]
  },
];

const chartData = [
  { mes: "Jan", candidaturas: 12, contratacoes: 2 },
  { mes: "Fev", candidaturas: 19, contratacoes: 3 },
  { mes: "Mar", candidaturas: 24, contratacoes: 4 },
  { mes: "Abr", candidaturas: 31, contratacoes: 5 },
  { mes: "Mai", candidaturas: 28, contratacoes: 4 },
  { mes: "Jun", candidaturas: 42, contratacoes: 7 },
];

const esgData = [
  { name: "Mães TEA", value: 68, color: "#FFB020" },
  { name: "Outras cuidadoras", value: 22, color: "#14b8a6" },
  { name: "Diversidade geral", value: 10, color: "#8b5cf6" },
];

export default function DashboardEmpresa() {
  const [, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<typeof kanbanColumns[0]["cards"][0] | null>(null);

  const handleLogout = () => {
    logout();
    toast.success("Até logo!");
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={LOGO_IMG} alt="Logo" className="w-9 h-9 sunflower-glow" />
          <div>
            <div className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="golden-text">Aliança</span> Girassol
            </div>
            <div className="text-xs text-white/30">Área Empresarial</div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-teal-500/10">
          <div className="w-8 h-8 rounded-full bg-teal-500/30 flex items-center justify-center">
            <Building2 size={14} className="text-teal-400" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate">TechVida Solutions</div>
            <div className="text-xs text-white/40 truncate">{user?.email}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = activeTab === item.id;
          return (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${active ? "bg-teal-500/15 text-teal-400 border border-teal-500/20" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
              {active && <ChevronRight size={14} className="ml-auto" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={16} />
          <span className="text-sm">Sair</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#111827] border-r border-white/5 fixed top-0 left-0 bottom-0 z-40">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-[#111827] border-r border-white/5 z-50 lg:hidden">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-[#0D1B2A]/95 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white"><Menu size={22} /></button>
            <h1 className="text-base font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white">
              <Bell size={16} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-400" />
            </button>
            <div className="w-9 h-9 rounded-full bg-teal-500/30 flex items-center justify-center">
              <Building2 size={14} className="text-teal-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Olá, <span className="golden-text">TechVida</span>! 🌻
                </h2>
                <p className="text-white/50 text-sm">Seu impacto social cresce a cada contratação.</p>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Users, value: "47", label: "Candidaturas ativas", color: "text-[#FFB020]", bg: "bg-[#FFB020]/10" },
                  { icon: Briefcase, value: "8", label: "Vagas publicadas", color: "text-teal-400", bg: "bg-teal-500/10" },
                  { icon: Award, value: "12", label: "Contratações ESG", color: "text-purple-400", bg: "bg-purple-500/10" },
                  { icon: Heart, value: "94%", label: "Taxa de retenção", color: "text-green-400", bg: "bg-green-500/10" },
                ].map((kpi, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="glass-card p-5">
                    <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-3`}>
                      <kpi.icon size={20} className={kpi.color} />
                    </div>
                    <div className={`text-2xl font-extrabold ${kpi.color}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{kpi.value}</div>
                    <div className="text-xs text-white/40 mt-1">{kpi.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <div className="glass-card p-6">
                <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Candidaturas vs Contratações</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFB020" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FFB020" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCont" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="mes" tick={{ fill: "#ffffff50", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#ffffff50", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white" }} />
                    <Area type="monotone" dataKey="candidaturas" stroke="#FFB020" fill="url(#colorCand)" strokeWidth={2} />
                    <Area type="monotone" dataKey="contratacoes" stroke="#14b8a6" fill="url(#colorCont)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Kanban Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pipeline de Candidaturas</h3>
                  <button onClick={() => setActiveTab("kanban")} className="text-[#FFB020] text-sm flex items-center gap-1 hover:underline">
                    Ver completo <ArrowRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {kanbanColumns.map(col => (
                    <div key={col.id} className={`glass-card p-3 border ${col.color}`}>
                      <div className="text-xs font-bold text-white/60 mb-2">{col.label}</div>
                      <div className="text-2xl font-extrabold golden-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{col.cards.length}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Kanban Tab */}
          {activeTab === "kanban" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pipeline de Candidaturas</h2>
                <span className="text-white/40 text-sm">47 candidatas no total</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-x-auto">
                {kanbanColumns.map(col => (
                  <div key={col.id} className={`glass-card p-4 border ${col.color} min-w-[240px]`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-sm text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{col.label}</h3>
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60">{col.cards.length}</span>
                    </div>
                    <div className="space-y-2">
                      {col.cards.map((card, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                          className="bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer hover:border-[#FFB020]/20 transition-all"
                          onClick={() => setSelectedCard(card)}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                              <span className="text-purple-300 text-xs font-bold">{card.avatar}</span>
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-white truncate">{card.nome}</div>
                              <div className="text-xs text-white/40 truncate">{card.profissao}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-white/40">{card.vaga}</span>
                            <span className="text-xs font-bold text-[#FFB020]">{card.match}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <button onClick={() => toast.info("Adicionar candidata manualmente — em breve!")}
                      className="w-full mt-3 py-2 rounded-xl border border-dashed border-white/10 text-white/30 text-xs flex items-center justify-center gap-1 hover:border-white/20 hover:text-white/50 transition-all">
                      <Plus size={12} />
                      Adicionar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ESG Tab */}
          {activeTab === "esg" && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Analytics <span className="golden-text">ESG</span>
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Horas de trabalho geradas", value: "2.840h", icon: TrendingUp, color: "text-[#FFB020]" },
                  { label: "Famílias impactadas", value: "12", icon: Heart, color: "text-red-400" },
                  { label: "Score ESG", value: "A+", icon: Award, color: "text-green-400" },
                ].map((s, i) => (
                  <div key={i} className="glass-card p-5 text-center">
                    <s.icon size={24} className={`${s.color} mx-auto mb-2`} />
                    <div className={`text-3xl font-extrabold ${s.color}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</div>
                    <div className="text-sm text-white/50 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Perfil de Diversidade</h3>
                  <div className="flex items-center gap-6">
                    <PieChart width={140} height={140}>
                      <Pie data={esgData} cx={65} cy={65} innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                        {esgData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                    <div className="space-y-2">
                      {esgData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                          <span className="text-xs text-white/60">{d.name}</span>
                          <span className="text-xs font-bold text-white ml-auto">{d.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Metas ESG 2025</h3>
                  <div className="space-y-4">
                    {[
                      { meta: "Contratar 20 mães cuidadoras", atual: 12, total: 20 },
                      { meta: "100% vagas com flexibilidade", atual: 8, total: 8 },
                      { meta: "Score ESG A+", atual: 1, total: 1 },
                    ].map((m, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs text-white/60 mb-1">
                          <span>{m.meta}</span>
                          <span className="text-[#FFB020]">{m.atual}/{m.total}</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#FFB020] rounded-full" style={{ width: `${(m.atual / m.total) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vagas Tab */}
          {activeTab === "vagas" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Vagas Publicadas</h2>
                <button onClick={() => toast.info("Criar nova vaga — em breve!")}
                  className="btn-pill px-4 py-2 text-sm font-bold flex items-center gap-2">
                  <Plus size={14} />
                  Nova Vaga
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { titulo: "Assistente Administrativa", candidatas: 18, match: 97, status: "Ativa" },
                  { titulo: "Atendimento ao Cliente", candidatas: 12, match: 92, status: "Ativa" },
                  { titulo: "Designer Gráfica", candidatas: 8, match: 88, status: "Ativa" },
                  { titulo: "Redatora de Conteúdo", candidatas: 9, match: 90, status: "Pausada" },
                ].map((v, i) => (
                  <div key={i} className="glass-card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v.titulo}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v.status === "Ativa" ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/40"}`}>{v.status}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1"><Users size={14} />{v.candidatas} candidatas</span>
                      <span className="flex items-center gap-1"><Star size={14} className="text-[#FFB020]" />{v.match}% match médio</span>
                    </div>
                    <button onClick={() => setActiveTab("kanban")} className="mt-3 w-full py-2 rounded-xl border border-white/10 text-white/50 text-sm hover:border-[#FFB020]/20 hover:text-[#FFB020] transition-all">
                      Ver candidatas
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Candidate Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCard(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                    <span className="text-purple-300 text-lg font-bold">{selectedCard.avatar}</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{selectedCard.nome}</h2>
                    <p className="text-white/50 text-sm">{selectedCard.profissao}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCard(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>

              <div className="px-3 py-2 rounded-xl bg-[#FFB020]/10 border border-[#FFB020]/20 mb-4">
                <span className="text-[#FFB020] font-bold">{selectedCard.match}% compatível</span>
                <span className="text-white/50 text-sm ml-2">com a vaga {selectedCard.vaga}</span>
              </div>

              <div className="flex gap-3">
                <button onClick={() => { toast.success(`Entrevista agendada com ${selectedCard.nome}! 🌻`); setSelectedCard(null); }}
                  className="flex-1 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#0D1B2A] font-bold text-sm transition-all">
                  Agendar Entrevista
                </button>
                <button onClick={() => { toast.info("Candidata movida para próxima etapa!"); setSelectedCard(null); }}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white text-sm transition-all">
                  Avançar Etapa
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
