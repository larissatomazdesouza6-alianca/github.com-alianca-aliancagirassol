/**
 * ALIANÇA GIRASSOL — Capacitação (estilo universidade Santander)
 * Trilhas de aprendizado, mini cursos, certificados
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, Clock, Star, Award, ChevronRight, X, Check, Lock } from "lucide-react";
import MaeDashboardLayout from "@/components/MaeDashboardLayout";
import { toast } from "sonner";

const CAPACITACAO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/capacitacao-Vtm7snrwD4m8ZpCQXeptiE.webp";

const trilhas = [
  {
    id: 1, nome: "Habilidades Digitais", nivel: "Iniciante", progresso: 65, cor: "from-blue-500/20 to-teal-500/20",
    cursos: [
      { id: 1, titulo: "Excel do Zero ao Avançado", duracao: "8h", aulas: 24, concluido: true, rating: 4.9 },
      { id: 2, titulo: "Google Workspace Essencial", duracao: "4h", aulas: 12, concluido: true, rating: 4.8 },
      { id: 3, titulo: "Canva para Profissionais", duracao: "3h", aulas: 9, concluido: false, rating: 4.7 },
      { id: 4, titulo: "Introdução ao Power BI", duracao: "6h", aulas: 18, concluido: false, rating: 4.9, bloqueado: true },
    ]
  },
  {
    id: 2, nome: "Empreendedorismo Social", nivel: "Intermediário", progresso: 30, cor: "from-purple-500/20 to-pink-500/20",
    cursos: [
      { id: 5, titulo: "Negócios com Propósito", duracao: "5h", aulas: 15, concluido: true, rating: 4.8 },
      { id: 6, titulo: "Marketing Digital Básico", duracao: "6h", aulas: 18, concluido: false, rating: 4.7 },
      { id: 7, titulo: "Finanças Pessoais", duracao: "4h", aulas: 12, concluido: false, rating: 4.9 },
    ]
  },
  {
    id: 3, nome: "Comunicação e Liderança", nivel: "Avançado", progresso: 10, cor: "from-orange-500/20 to-red-500/20",
    cursos: [
      { id: 8, titulo: "Comunicação Assertiva", duracao: "3h", aulas: 9, concluido: false, rating: 4.8 },
      { id: 9, titulo: "Liderança Feminina", duracao: "5h", aulas: 15, concluido: false, rating: 5.0 },
      { id: 10, titulo: "Gestão de Conflitos", duracao: "4h", aulas: 12, concluido: false, rating: 4.7, bloqueado: true },
    ]
  },
];

const certificados = [
  { titulo: "Excel do Zero ao Avançado", data: "15/03/2025", empresa: "Aliança Girassol" },
  { titulo: "Google Workspace Essencial", data: "02/04/2025", empresa: "Aliança Girassol" },
];

export default function CapacitacaoMae() {
  const [selectedTrilha, setSelectedTrilha] = useState(trilhas[0]);
  const [selectedCurso, setSelectedCurso] = useState<typeof trilhas[0]["cursos"][0] | null>(null);
  const [tab, setTab] = useState<"trilhas" | "certificados">("trilhas");

  const handleAcessarCurso = (curso: typeof trilhas[0]["cursos"][0]) => {
    if ((curso as any).bloqueado) {
      toast.info("Complete os cursos anteriores para desbloquear este! 🔒");
      return;
    }
    setSelectedCurso(curso);
  };

  const handleIniciarAula = () => {
    toast.success("Aula iniciada! Bom estudo! 📚🌻");
    setSelectedCurso(null);
  };

  return (
    <MaeDashboardLayout title="Capacitação">
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden h-48">
          <img src={CAPACITACAO_IMG} alt="Capacitação" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 via-[#0D1B2A]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Universidade <span className="golden-text">Girassol</span>
            </h1>
            <p className="text-white/60 text-sm mt-1">Aprenda no seu ritmo. Cresça no seu tempo.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "2", label: "Certificados", icon: Award, color: "text-[#FFB020]" },
            { value: "65%", label: "Progresso médio", icon: BookOpen, color: "text-teal-400" },
            { value: "10", label: "Cursos disponíveis", icon: Play, color: "text-purple-400" },
          ].map((s, i) => (
            <div key={i} className="glass-card p-4 text-center">
              <s.icon size={18} className={`${s.color} mx-auto mb-1`} />
              <div className={`text-xl font-extrabold ${s.color}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</div>
              <div className="text-xs text-white/40">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["trilhas", "certificados"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${tab === t ? "bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/30" : "bg-white/5 text-white/50 border border-white/10"}`}>
              {t === "trilhas" ? "Trilhas de Aprendizado" : "Meus Certificados"}
            </button>
          ))}
        </div>

        {tab === "trilhas" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Trilhas List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">Trilhas</h3>
              {trilhas.map(trilha => (
                <button
                  key={trilha.id}
                  onClick={() => setSelectedTrilha(trilha)}
                  className={`w-full glass-card p-4 text-left transition-all ${selectedTrilha.id === trilha.id ? "border-[#FFB020]/30 bg-[#FFB020]/5" : "hover:border-white/20"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{trilha.nome}</span>
                    <span className="text-xs text-white/40">{trilha.nivel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFB020] rounded-full" style={{ width: `${trilha.progresso}%` }} />
                    </div>
                    <span className="text-xs text-[#FFB020] font-bold">{trilha.progresso}%</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Cursos da Trilha */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">
                Cursos — {selectedTrilha.nome}
              </h3>
              {selectedTrilha.cursos.map((curso, i) => (
                <motion.div
                  key={curso.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass-card p-4 flex items-center gap-4 ${(curso as any).bloqueado ? "opacity-50" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${curso.concluido ? "bg-green-500/20" : (curso as any).bloqueado ? "bg-white/5" : "bg-[#FFB020]/20"}`}>
                    {curso.concluido ? <Check size={18} className="text-green-400" /> : (curso as any).bloqueado ? <Lock size={16} className="text-white/30" /> : <Play size={18} className="text-[#FFB020]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{curso.titulo}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-white/40"><Clock size={10} />{curso.duracao}</span>
                      <span className="text-xs text-white/40">{curso.aulas} aulas</span>
                      <span className="flex items-center gap-1 text-xs text-[#FFB020]"><Star size={10} fill="currentColor" />{curso.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAcessarCurso(curso)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${curso.concluido ? "bg-green-500/10 text-green-400 border border-green-500/20" : (curso as any).bloqueado ? "bg-white/5 text-white/20" : "bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/20 hover:bg-[#FFB020]/20"}`}
                  >
                    {curso.concluido ? "Revisar" : (curso as any).bloqueado ? "Bloqueado" : "Acessar"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {tab === "certificados" && (
          <div className="grid md:grid-cols-2 gap-4">
            {certificados.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 border border-[#FFB020]/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFB020]/20 flex items-center justify-center">
                    <Award size={22} className="text-[#FFB020]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#FFB020] font-medium">Certificado de Conclusão</div>
                    <div className="text-white/40 text-xs">{cert.empresa}</div>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{cert.titulo}</h3>
                <p className="text-white/40 text-xs">Concluído em {cert.data}</p>
                <button
                  onClick={() => toast.success("Certificado baixado! 🎓")}
                  className="mt-4 w-full py-2 rounded-xl border border-[#FFB020]/20 text-[#FFB020] text-sm font-medium hover:bg-[#FFB020]/10 transition-colors"
                >
                  Baixar Certificado
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Course Modal */}
      <AnimatePresence>
        {selectedCurso && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCurso(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{selectedCurso.titulo}</h2>
                <button onClick={() => setSelectedCurso(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>
              <div className="flex gap-4 mb-6">
                <span className="flex items-center gap-1 text-sm text-white/60"><Clock size={14} />{selectedCurso.duracao}</span>
                <span className="text-sm text-white/60">{selectedCurso.aulas} aulas</span>
                <span className="flex items-center gap-1 text-sm text-[#FFB020]"><Star size={14} fill="currentColor" />{selectedCurso.rating}</span>
              </div>
              <p className="text-white/60 text-sm mb-6">Este curso foi recomendado pela IA com base no seu perfil e objetivos profissionais. Aprenda no seu ritmo!</p>
              <button onClick={handleIniciarAula} className="btn-pill w-full py-3.5 font-bold flex items-center justify-center gap-2">
                <Play size={16} />
                Iniciar Curso
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MaeDashboardLayout>
  );
}
