/**
 * ALIANÇA GIRASSOL — Vagas para Mães
 * Lista de vagas com IA, detalhes e candidatura
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Clock, DollarSign, Brain, X, Check, Send, MessageCircle, Filter, Search } from "lucide-react";
import MaeDashboardLayout from "@/components/MaeDashboardLayout";
import { toast } from "sonner";

const VAGAS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/vagas-ia-4k8yKUCiZyjZrLEfVHusHb.webp";

const vagas = [
  { id: 1, titulo: "Assistente Administrativa", empresa: "TechVida Solutions", modalidade: "Remoto", cidade: "São Paulo, SP", salario: "R$ 2.200 - R$ 2.800", horario: "Flexível (6h/dia)", match: 97, tags: ["Excel", "Organização", "Comunicação"], descricao: "Apoio administrativo geral, gestão de agenda, controle de documentos e atendimento interno. Trabalho 100% remoto com horários flexíveis.", requisitos: ["Ensino médio completo", "Excel intermediário", "Boa comunicação", "Organização"], beneficios: ["Home office", "Plano de saúde", "Vale alimentação", "Horário flexível"], candidatadas: false },
  { id: 2, titulo: "Atendimento ao Cliente", empresa: "InovaHub", modalidade: "Híbrido", cidade: "São Paulo, SP", salario: "R$ 1.800 - R$ 2.200", horario: "Tarde (13h-18h)", match: 92, tags: ["Comunicação", "Empatia", "CRM"], descricao: "Atendimento a clientes via chat, e-mail e telefone. Resolução de dúvidas e suporte pós-venda. Turno tarde com possibilidade de home office 3x/semana.", requisitos: ["Ensino médio completo", "Experiência em atendimento", "Pacote Office básico"], beneficios: ["Híbrido", "Vale transporte", "Comissão por metas", "Treinamento"], candidatadas: false },
  { id: 3, titulo: "Analista de Dados Jr.", empresa: "DataCare", modalidade: "Remoto", cidade: "Remoto", salario: "R$ 3.000 - R$ 3.800", horario: "Flexível", match: 85, tags: ["Excel", "Power BI", "Análise"], descricao: "Análise de dados de saúde e bem-estar. Criação de relatórios e dashboards. Empresa com forte cultura ESG e compromisso com diversidade.", requisitos: ["Excel avançado", "Noções de Power BI", "Raciocínio analítico"], beneficios: ["100% remoto", "Plano de saúde", "Gympass", "Stock options"], candidatadas: false },
  { id: 4, titulo: "Designer Gráfico", empresa: "CreativeFlow", modalidade: "Remoto", cidade: "Remoto", salario: "R$ 2.500 - R$ 3.200", horario: "Flexível", match: 88, tags: ["Canva", "Figma", "Criatividade"], descricao: "Criação de peças para redes sociais, materiais institucionais e apresentações. Ambiente criativo e inclusivo.", requisitos: ["Portfólio", "Canva ou Figma", "Criatividade"], beneficios: ["Remoto", "Horário livre", "Plano odontológico"], candidatadas: false },
  { id: 5, titulo: "Redatora de Conteúdo", empresa: "ContentHub", modalidade: "Remoto", cidade: "Remoto", salario: "R$ 2.000 - R$ 2.600", horario: "Flexível", match: 90, tags: ["Escrita", "SEO", "Pesquisa"], descricao: "Produção de conteúdo para blog, redes sociais e e-mail marketing. Temas: saúde, educação e inclusão.", requisitos: ["Boa escrita", "Pesquisa online", "Criatividade"], beneficios: ["100% remoto", "Horário flexível", "Bônus por produção"], candidatadas: false },
  { id: 6, titulo: "Coordenadora de Projetos", empresa: "ImpactBR", modalidade: "Remoto", cidade: "Remoto", salario: "R$ 4.000 - R$ 5.000", horario: "Flexível", match: 82, tags: ["Gestão", "Agile", "Liderança"], descricao: "Coordenação de projetos sociais e de impacto. Empresa B Corp com forte compromisso ESG.", requisitos: ["Experiência em gestão", "Metodologias ágeis", "Liderança"], beneficios: ["Remoto", "Plano saúde", "Participação nos lucros"], candidatadas: false },
];

const aiResponses: Record<string, string> = {
  "vagas": "Encontrei 6 vagas compatíveis com seu perfil! As mais recomendadas são: Assistente Administrativa (97% match), Redatora de Conteúdo (90%) e Atendimento ao Cliente (92%). Quer que eu explique por que cada uma é boa para você?",
  "currículo": "Para melhorar seu currículo, recomendo: 1) Destacar suas habilidades de organização e comunicação; 2) Incluir experiências de trabalho voluntário ou freelance; 3) Adicionar cursos online que você fez. Posso ajudá-la a criar um currículo personalizado!",
  "salário": "Para as vagas que combinam com seu perfil, os salários variam de R$ 1.800 a R$ 5.000. Para vagas remotas e flexíveis, a média está em R$ 2.500. Lembre-se que muitas empresas oferecem benefícios como plano de saúde que complementam o salário!",
  "entrevista": "Dicas para a entrevista: 1) Seja honesta sobre sua disponibilidade de horários; 2) Destaque sua resiliência e capacidade de organização; 3) Mencione suas habilidades de trabalho remoto; 4) Não tenha medo de falar sobre sua realidade como mãe cuidadora — empresas parceiras valorizam isso!",
  "default": "Olá! Sou a Assistente Girassol 🌻 Estou aqui para te ajudar com vagas, dicas de currículo, preparação para entrevistas e muito mais. Como posso te ajudar hoje?",
};

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("vaga") || lower.includes("emprego") || lower.includes("trabalho")) return aiResponses["vagas"];
  if (lower.includes("currículo") || lower.includes("curriculo") || lower.includes("cv")) return aiResponses["currículo"];
  if (lower.includes("salário") || lower.includes("salario") || lower.includes("dinheiro")) return aiResponses["salário"];
  if (lower.includes("entrevista") || lower.includes("seleção")) return aiResponses["entrevista"];
  return aiResponses["default"];
}

export default function VagasMae() {
  const [selectedVaga, setSelectedVaga] = useState<typeof vagas[0] | null>(null);
  const [candidatadas, setCandidatadas] = useState<Set<number>>(new Set());
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Olá! Sou a Assistente Girassol 🌻 Posso te ajudar a encontrar a vaga perfeita ou tirar dúvidas sobre o processo seletivo. Como posso te ajudar?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");

  const filteredVagas = vagas.filter(v => {
    const matchSearch = v.titulo.toLowerCase().includes(search.toLowerCase()) || v.empresa.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Todos" || v.modalidade === filter;
    return matchSearch && matchFilter;
  });

  const handleCandidatura = (vagaId: number) => {
    setCandidatadas(prev => { const next = new Set(Array.from(prev)); next.add(vagaId); return next; });
    toast.success("Candidatura enviada com sucesso! 🌻 A empresa receberá seu perfil em breve.");
    setSelectedVaga(null);
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: "ai", text: getAIResponse(userMsg) }]);
    }, 800);
  };

  return (
    <MaeDashboardLayout title="Vagas">
      <div className="space-y-6">
        {/* Header with image */}
        <div className="relative rounded-2xl overflow-hidden h-40">
          <img src={VAGAS_IMG} alt="Vagas" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 via-[#0D1B2A]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Vagas <span className="golden-text">para você</span>
            </h1>
            <p className="text-white/60 text-sm">IA encontrou {vagas.length} vagas compatíveis com seu perfil</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar vagas..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 text-sm"
            />
          </div>
          <div className="flex gap-2">
            {["Todos", "Remoto", "Híbrido"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${filter === f ? "bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/30" : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Vagas Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredVagas.map((vaga, i) => (
            <motion.div
              key={vaga.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 cursor-pointer hover:border-[#FFB020]/20 transition-all"
              onClick={() => setSelectedVaga(vaga)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB020]/20 flex items-center justify-center">
                    <Briefcase size={18} className="text-[#FFB020]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vaga.titulo}</h3>
                    <p className="text-white/50 text-xs">{vaga.empresa}</p>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${candidatadas.has(vaga.id) ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/30"}`}>
                  {candidatadas.has(vaga.id) ? "✓ Candidatada" : `${vaga.match}% match`}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="flex items-center gap-1 text-xs text-white/50"><MapPin size={10} />{vaga.cidade}</span>
                <span className="flex items-center gap-1 text-xs text-white/50"><Clock size={10} />{vaga.horario}</span>
                <span className="flex items-center gap-1 text-xs text-white/50"><DollarSign size={10} />{vaga.salario}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {vaga.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vaga Detail Modal */}
      <AnimatePresence>
        {selectedVaga && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setSelectedVaga(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{selectedVaga.titulo}</h2>
                  <p className="text-white/50 text-sm">{selectedVaga.empresa} · {selectedVaga.modalidade}</p>
                </div>
                <button onClick={() => setSelectedVaga(null)} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="px-3 py-1.5 rounded-full bg-[#FFB020]/20 border border-[#FFB020]/30">
                  <span className="text-[#FFB020] text-sm font-bold">{selectedVaga.match}% compatível</span>
                </div>
                <span className="text-white/50 text-sm">{selectedVaga.salario}</span>
              </div>

              <div className="flex items-start gap-2 mb-4 p-3 rounded-xl bg-[#FFB020]/5 border border-[#FFB020]/10">
                <Brain size={14} className="text-[#FFB020] mt-0.5 flex-shrink-0" />
                <p className="text-white/60 text-xs italic">IA: Esta vaga é compatível porque {selectedVaga.descricao.toLowerCase().slice(0, 80)}...</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Sobre a vaga</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{selectedVaga.descricao}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Requisitos</h4>
                  <ul className="space-y-1">
                    {selectedVaga.requisitos.map((r, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                        <Check size={12} className="text-[#FFB020]" />{r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Benefícios</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVaga.beneficios.map((b, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs">{b}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {candidatadas.has(selectedVaga.id) ? (
                  <div className="w-full py-3 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-bold text-center flex items-center justify-center gap-2">
                    <Check size={16} />
                    Candidatura Enviada!
                  </div>
                ) : (
                  <button
                    onClick={() => handleCandidatura(selectedVaga.id)}
                    className="btn-pill w-full py-3.5 font-bold flex items-center justify-center gap-2"
                  >
                    <Briefcase size={16} />
                    Candidatar-me a esta vaga
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#FFB020] text-[#0D1B2A] flex items-center justify-center shadow-lg hover:bg-[#FFD060] transition-all z-40 animate-golden-pulse"
      >
        <MessageCircle size={22} />
      </button>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-[#FFB020]/10">
              <div className="w-8 h-8 rounded-full bg-[#FFB020]/30 flex items-center justify-center">
                <span className="text-lg">🌻</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">Assistente Girassol</div>
                <div className="text-xs text-[#FFB020]">● Online</div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/40 hover:text-white"><X size={16} /></button>
            </div>

            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${msg.role === "user" ? "bg-[#FFB020]/20 text-white" : "bg-white/5 text-white/80"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/5 flex gap-2">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendChat()}
                placeholder="Pergunte sobre vagas..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50"
              />
              <button onClick={sendChat} className="w-8 h-8 rounded-full bg-[#FFB020] text-[#0D1B2A] flex items-center justify-center hover:bg-[#FFD060] transition-colors">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MaeDashboardLayout>
  );
}
