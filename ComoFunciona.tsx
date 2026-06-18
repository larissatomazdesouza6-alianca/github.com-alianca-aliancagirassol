/**
 * ALIANÇA GIRASSOL — Como Funciona
 * Explica o funcionamento para mães e empresas
 */
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Sun, Brain, Briefcase, Users, BookOpen, Building2, ChevronRight, ArrowRight } from "lucide-react";

const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/logo-girassol-kG7yECdYLxcArRyAk9VxS6.webp";
const COMO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/como-funciona-4fTP37LqzeeFRqBYckDywV.webp";

const stepsMae = [
  { step: "01", icon: Users, title: "Crie seu perfil completo", desc: "Compartilhe sua história, habilidades profissionais, disponibilidade de horários e a realidade de cuidado do seu filho. Tudo com privacidade e segurança." },
  { step: "02", icon: Brain, title: "A IA analisa sua realidade", desc: "Nossa inteligência artificial compreende sua rotina imprevisível, necessidades de flexibilidade e objetivos profissionais para encontrar as melhores oportunidades." },
  { step: "03", icon: Briefcase, title: "Receba vagas compatíveis", desc: "Veja vagas com % de compatibilidade, explicação do motivo do match e informações sobre a flexibilidade oferecida pela empresa." },
  { step: "04", icon: BookOpen, title: "Capacite-se no seu tempo", desc: "Acesse trilhas de aprendizado personalizadas, cursos e mentorias que se encaixam na sua disponibilidade." },
  { step: "05", icon: Users, title: "Conecte-se com outras mães", desc: "A Rede de Elos conecta você com mães em situações semelhantes para apoio mútuo, troca de experiências e crescimento conjunto." },
];

const stepsEmpresa = [
  { step: "01", icon: Building2, title: "Cadastre sua empresa", desc: "Crie o perfil da sua organização, defina suas vagas e o nível de flexibilidade que você oferece. Demonstre seu compromisso com ESG." },
  { step: "02", icon: Brain, title: "IA faz o match inteligente", desc: "Nossa IA analisa as candidatas e apresenta os melhores matches com justificativa de habilidades e fit de flexibilidade." },
  { step: "03", icon: Users, title: "Pipeline visual Kanban", desc: "Gerencie todo o processo seletivo em um pipeline visual intuitivo, do primeiro contato à contratação." },
  { step: "04", icon: Sun, title: "Meça seu impacto ESG", desc: "Acompanhe analytics em tempo real: horas geradas, impacto social, diversidade e indicadores ESG para seus relatórios." },
];

export default function ComoFunciona() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm">Voltar</span>
          </button>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={LOGO_IMG} alt="Logo" className="w-8 h-8 sunflower-glow" />
            <span className="font-bold hidden sm:block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="golden-text">Aliança</span> Girassol
            </span>
          </div>
          <button onClick={() => navigate("/cadastro/mae")} className="btn-pill px-4 py-2 text-sm font-bold">
            Começar
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <Brain size={14} className="text-[#FFB020]" />
                <span className="text-xs font-medium text-white/80">Como Funciona</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Tecnologia que<br />
                <span className="golden-text">abraça quem precisa</span>
              </h1>
              <p className="text-white/70 leading-relaxed text-lg">
                A Aliança Girassol combina inteligência artificial com empatia humana para criar conexões reais entre mães cuidadoras e empresas que realmente entendem a importância da flexibilidade.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <img src={COMO_IMG} alt="Como funciona" className="rounded-2xl w-full shadow-2xl ring-1 ring-white/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Para Mães */}
      <section className="py-20 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFB020]/10 border border-[#FFB020]/20 mb-4">
              <Sun size={14} className="text-[#FFB020]" />
              <span className="text-sm font-semibold text-[#FFB020]">Para Mães Cuidadoras</span>
            </div>
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Sua jornada em <span className="golden-text">5 passos</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stepsMae.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFB020]/20 border border-[#FFB020]/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#FFB020]">{s.step}</span>
                  </div>
                  <s.icon size={18} className="text-white/40" />
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6 bg-gradient-to-br from-[#FFB020]/15 to-yellow-600/5 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pronta para começar?</h3>
                <p className="text-white/60 text-sm mb-4">Cadastro 100% gratuito para mães cuidadoras.</p>
              </div>
              <button onClick={() => navigate("/cadastro/mae")} className="btn-pill px-5 py-2.5 text-sm font-bold flex items-center gap-2 justify-center">
                Cadastrar Gratuitamente
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Para Empresas */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
              <Building2 size={14} className="text-teal-400" />
              <span className="text-sm font-semibold text-teal-400">Para Empresas</span>
            </div>
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Contrate com <span className="golden-text">impacto real</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsEmpresa.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-4">
                  <span className="text-xs font-bold text-teal-400">{s.step}</span>
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <button onClick={() => navigate("/cadastro/empresa")} className="btn-pill px-8 py-4 font-bold text-base inline-flex items-center gap-2">
              Iniciar Teste Gratuito para Empresas
              <ChevronRight size={18} />
            </button>
            <p className="text-white/40 text-sm mt-3">14 dias grátis. Sem cartão de crédito.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
