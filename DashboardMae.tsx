/**
 * ALIANÇA GIRASSOL — Dashboard da Mãe
 * Boas-vindas, animação de girassóis, vagas recomendadas por IA
 */
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Briefcase, BookOpen, Users, MessageCircle, TrendingUp, Star, ArrowRight, Sparkles } from "lucide-react";
import MaeDashboardLayout from "@/components/MaeDashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

const WELCOME_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/dashboard-welcome-i7PgG8tR7aNP3fBqhJM8uS.webp";

// Sunflower particle component
function SunflowerParticle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x, y }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        y: [y, y - 120, y - 200],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 3, delay, ease: "easeOut" }}
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div style={{ fontSize: size }} className="sunflower-glow">🌻</div>
    </motion.div>
  );
}

const quickActions = [
  { icon: Briefcase, label: "Ver Vagas", path: "/mae/vagas", color: "from-yellow-500/20 to-orange-500/10", iconColor: "text-[#FFB020]" },
  { icon: BookOpen, label: "Capacitação", path: "/mae/capacitacao", color: "from-teal-500/20 to-blue-500/10", iconColor: "text-teal-400" },
  { icon: Users, label: "Rede de Elos", path: "/mae/rede-elos", color: "from-purple-500/20 to-pink-500/10", iconColor: "text-purple-400" },
  { icon: MessageCircle, label: "Assistente IA", path: "/mae/assistente", color: "from-blue-500/20 to-indigo-500/10", iconColor: "text-blue-400" },
];

const vagasRecomendadas = [
  { titulo: "Assistente Administrativa", empresa: "TechVida Solutions", modalidade: "Remoto", salario: "R$ 2.200 - R$ 2.800", match: 97, motivo: "Suas habilidades em Excel e organização são perfeitas para esta vaga flexível." },
  { titulo: "Atendimento ao Cliente", empresa: "InovaHub", modalidade: "Híbrido", salario: "R$ 1.800 - R$ 2.200", match: 92, motivo: "Sua experiência em comunicação e seu horário tarde se encaixam perfeitamente." },
  { titulo: "Analista de Dados Jr.", empresa: "DataCare", modalidade: "Remoto", salario: "R$ 3.000 - R$ 3.800", match: 85, motivo: "Sua trilha de capacitação em análise de dados aumenta muito sua compatibilidade." },
];

export default function DashboardMae() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [showSunflowers, setShowSunflowers] = useState(true);
  const [particles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      delay: i * 0.2,
      size: Math.random() * 16 + 16,
    }))
  );

  useEffect(() => {
    const t = setTimeout(() => setShowSunflowers(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const firstName = user?.name?.split(" ")[0] || "Ana Beatriz";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <MaeDashboardLayout title="Início">
      {/* Sunflower animation overlay */}
      <AnimatePresence>
        {showSunflowers && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
          >
            {particles.map((p, i) => (
              <SunflowerParticle key={i} {...p} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8">
        {/* Welcome Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <img src={WELCOME_IMG} alt="Welcome" className="w-full h-64 lg:h-80 object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 via-[#0D1B2A]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFB020]/20 border border-[#FFB020]/30 mb-3 w-fit">
              <Sparkles size={12} className="text-[#FFB020]" />
              <span className="text-xs text-[#FFB020] font-medium">{greeting}!</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Bem-vinda, <span className="golden-text">{firstName}</span>! 🌻
            </h1>
            <p className="text-white/70 max-w-lg text-sm leading-relaxed">
              Cada passo que você dá hoje constrói o amanhã que seus filhos vão se orgulhar. Você é incrível!
            </p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>O que você encontra aqui</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                onClick={() => navigate(action.path)}
                className={`glass-card p-5 bg-gradient-to-br ${action.color} text-left hover:scale-105 transition-transform duration-200`}
              >
                <action.icon size={22} className={`${action.iconColor} mb-3`} />
                <div className="font-semibold text-white text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{action.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: TrendingUp, value: "78%", label: "Perfil completo", color: "text-[#FFB020]" },
            { icon: Briefcase, value: "3", label: "Candidaturas ativas", color: "text-teal-400" },
            { icon: Star, value: "97%", label: "Melhor match", color: "text-purple-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="glass-card p-4 text-center"
            >
              <stat.icon size={20} className={`${stat.color} mx-auto mb-2`} />
              <div className={`text-2xl font-extrabold ${stat.color}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</div>
              <div className="text-xs text-white/50 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Vagas Recomendadas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Vagas recomendadas pela IA
            </h2>
            <button onClick={() => navigate("/mae/vagas")} className="text-[#FFB020] text-sm flex items-center gap-1 hover:underline">
              Ver todas <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {vagasRecomendadas.map((vaga, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.6 }}
                className="glass-card p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFB020]/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={18} className="text-[#FFB020]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-white text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vaga.titulo}</h3>
                      <p className="text-white/50 text-xs">{vaga.empresa} · {vaga.modalidade} · {vaga.salario}</p>
                    </div>
                    <div className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#FFB020]/20 border border-[#FFB020]/30">
                      <span className="text-[#FFB020] text-xs font-bold">{vaga.match}%</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-xs mt-1.5 italic">"{vaga.motivo}"</p>
                </div>
                <button
                  onClick={() => navigate("/mae/vagas")}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#FFB020]/10 border border-[#FFB020]/20 text-[#FFB020] text-xs font-medium hover:bg-[#FFB020]/20 transition-colors"
                >
                  Ver vaga
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MaeDashboardLayout>
  );
}
