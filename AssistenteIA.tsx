/**
 * ALIANÇA GIRASSOL — Assistente IA Girassol
 * Chatbot completo com sugestões e respostas contextuais
 */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, RefreshCw, Briefcase, BookOpen, Users, Heart } from "lucide-react";
import MaeDashboardLayout from "@/components/MaeDashboardLayout";

const ASSISTENTE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/assistente-ia-QHhWjRJmFzRJMH8PoTvdBo.webp";

const suggestions = [
  { icon: Briefcase, text: "Quais vagas combinam com meu perfil?" },
  { icon: BookOpen, text: "Que cursos devo fazer para melhorar meu currículo?" },
  { icon: Users, text: "Como me conectar com outras mães?" },
  { icon: Heart, text: "Dicas para equilibrar trabalho e cuidado" },
];

const aiKnowledge: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["vaga", "emprego", "trabalho", "oportunidade"],
    response: "🌻 Com base no seu perfil, encontrei **3 vagas altamente compatíveis**:\n\n**1. Assistente Administrativa — TechVida (97% match)**\nRemoto, horário flexível, R$ 2.200-2.800. Perfeita para sua disponibilidade no período da tarde.\n\n**2. Atendimento ao Cliente — InovaHub (92% match)**\nHíbrido, turno tarde, R$ 1.800-2.200. Empresa com política de cuidador.\n\n**3. Redatora de Conteúdo — ContentHub (90% match)**\n100% remoto, horário livre, R$ 2.000-2.600.\n\nQuer que eu explique por que cada uma é ideal para você?"
  },
  {
    keywords: ["currículo", "cv", "perfil", "melhorar"],
    response: "📄 Para fortalecer seu currículo, recomendo:\n\n**1. Destaque habilidades transferíveis**\nOrganização, multitarefa, gestão de crise — habilidades que você desenvolveu como cuidadora são valiosíssimas!\n\n**2. Complete seu perfil na plataforma**\nVocê está em 78%. Adicione mais habilidades e experiências.\n\n**3. Faça os cursos recomendados**\nO Excel Avançado e o Google Workspace aumentarão muito sua empregabilidade.\n\n**4. Use palavras-chave**\nMencione: trabalho remoto, flexibilidade, gestão de tempo.\n\nPosso gerar um resumo profissional personalizado para você!"
  },
  {
    keywords: ["curso", "capacitação", "aprender", "estudo"],
    response: "📚 Baseado no seu perfil, recomendo esta trilha:\n\n**Prioridade Alta:**\n• Excel do Zero ao Avançado (8h) — aumenta 40% as chances de contratação\n• Google Workspace (4h) — essencial para trabalho remoto\n\n**Prioridade Média:**\n• Canva para Profissionais (3h) — abre portas para design e marketing\n• Comunicação Assertiva (3h) — fundamental para entrevistas\n\nTodos os cursos têm certificado reconhecido pelo mercado! Quer começar agora?"
  },
  {
    keywords: ["rede", "comunidade", "outras mães", "conectar"],
    response: "👥 A Rede de Elos tem **12.847 mães** como você!\n\nVocê pode:\n• Entrar no grupo **'Trabalho Remoto para Mães'** (891 membros)\n• Conectar-se com **Carla Mendes** de SP — perfil muito similar ao seu\n• Participar do grupo **'Mães de SP'** (342 membros)\n\nA Carla conseguiu emprego remoto há 2 meses e pode compartilhar sua experiência com você! Quer que eu faça a conexão?"
  },
  {
    keywords: ["equilíbrio", "equilibrar", "cuidado", "filho", "rotina"],
    response: "💛 Equilibrar trabalho e cuidado é um desafio real. Algumas estratégias que funcionam:\n\n**Organize sua semana:**\n• Mapeie os horários fixos de terapia e consultas\n• Identifique suas janelas de trabalho disponíveis\n• Comunique sua disponibilidade claramente às empresas\n\n**Busque empresas certas:**\nNossa IA filtra apenas empresas com política de flexibilidade para cuidadores.\n\n**Use a comunidade:**\nOutras mães podem indicar babás, terapeutas e recursos na sua região.\n\n**Lembre-se:** Cuidar de você também é cuidar do seu filho. 🌻"
  },
  {
    keywords: ["entrevista", "seleção", "processo seletivo"],
    response: "🎯 Dicas para arrasar na entrevista:\n\n**Antes:**\n• Pesquise a empresa e sua política ESG/diversidade\n• Prepare exemplos de sua resiliência e adaptabilidade\n• Teste sua conexão e câmera (para entrevistas online)\n\n**Durante:**\n• Seja honesta sobre sua disponibilidade — empresas parceiras valorizam isso!\n• Destaque suas habilidades de organização e gestão de múltiplas demandas\n• Pergunte sobre flexibilidade e suporte a cuidadores\n\n**Frase poderosa:** 'Minha experiência como cuidadora me tornou especialista em gestão de crise, priorização e resiliência.'\n\nQuer simular uma entrevista comigo?"
  },
];

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  for (const item of aiKnowledge) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.response;
    }
  }
  return "🌻 Olá! Estou aqui para te ajudar com vagas, currículo, capacitação, comunidade e muito mais. Pode me perguntar qualquer coisa sobre sua jornada profissional!\n\nAlgumas sugestões:\n• 'Quais vagas combinam comigo?'\n• 'Como melhorar meu currículo?'\n• 'Que cursos devo fazer?'\n• 'Dicas para a entrevista'";
}

interface Message {
  role: "user" | "ai";
  text: string;
  time: string;
}

export default function AssistenteIA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "🌻 Olá, Ana Beatriz! Sou a Assistente Girassol, sua parceira de carreira com inteligência artificial.\n\nEstou aqui para te ajudar a encontrar oportunidades que se encaixam na sua vida real — com a flexibilidade que você precisa para cuidar do seu filho.\n\nComo posso te ajudar hoje?",
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setInput("");

    const time = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { role: "user", text: msg, time }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        role: "ai",
        text: getResponse(msg),
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      }]);
    }, 1200 + Math.random() * 800);
  };

  const clearChat = () => {
    setMessages([{
      role: "ai",
      text: "🌻 Conversa reiniciada! Como posso te ajudar?",
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }]);
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-white mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('• ')) {
        return <p key={i} className="text-white/80 ml-2">• {line.slice(2)}</p>;
      }
      if (line.match(/^\*\*.*\*\*/)) {
        return <p key={i} className="text-white/80">{line.replace(/\*\*(.*?)\*\*/g, (_, m) => m).split('—').map((part, j) => j === 0 ? <strong key={j}>{part}</strong> : <span key={j}>— {part}</span>)}</p>;
      }
      if (line === '') return <br key={i} />;
      return <p key={i} className="text-white/80">{line}</p>;
    });
  };

  return (
    <MaeDashboardLayout title="Assistente Girassol">
      <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img src={ASSISTENTE_IMG} alt="Assistente" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0D1B2A]" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Assistente <span className="golden-text">Girassol</span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-green-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online — IA de Empregabilidade Inclusiva
            </div>
          </div>
          <button onClick={clearChat} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 text-white/40 hover:text-white text-xs transition-colors">
            <RefreshCw size={12} />
            Limpar
          </button>
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => sendMessage(s.text)}
                className="glass-card p-3 text-left flex items-center gap-2 hover:border-[#FFB020]/20 transition-all">
                <s.icon size={14} className="text-[#FFB020] flex-shrink-0" />
                <span className="text-xs text-white/70">{s.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-[#FFB020]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles size={14} className="text-[#FFB020]" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-[#FFB020]/20 border border-[#FFB020]/20 text-white rounded-tr-sm" : "glass-card rounded-tl-sm"}`}>
                  {msg.role === "ai" ? (
                    <div className="space-y-0.5">{formatMessage(msg.text)}</div>
                  ) : (
                    <p className="text-white">{msg.text}</p>
                  )}
                </div>
                <span className="text-xs text-white/30 px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#FFB020]/20 flex items-center justify-center">
                  <Sparkles size={14} className="text-[#FFB020]" />
                </div>
                <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full bg-[#FFB020]/60"
                        animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Pergunte sobre vagas, currículo, capacitação..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 transition-all text-sm"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || typing}
            className="btn-pill px-4 py-3 flex items-center justify-center disabled:opacity-40 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </MaeDashboardLayout>
  );
}
