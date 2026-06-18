/**
 * ALIANÇA GIRASSOL — Cadastro para Mães
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sun, ArrowLeft, Heart, Check } from "lucide-react";
import { toast } from "sonner";

const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/logo-girassol-kG7yECdYLxcArRyAk9VxS6.webp";

const steps = ["Dados Pessoais", "Perfil Profissional", "Realidade de Cuidado"];

export default function CadastroMae() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", cidade: "",
    profissao: "", experiencia: "", habilidades: "",
    nomeFilho: "", idadeFilho: "", diagnostico: "",
    horarios: [] as string[], flexibilidade: "", objetivo: "",
  });

  const horarioOpts = ["Manhã (8h-12h)", "Tarde (13h-17h)", "Noite (18h-22h)", "Fins de semana", "Horário flexível"];

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const toggleHorario = (h: string) => {
    setForm(f => ({
      ...f,
      horarios: f.horarios.includes(h) ? f.horarios.filter(x => x !== h) : [...f.horarios, h]
    }));
  };

  const handleNext = () => {
    if (step < 2) setStep(s => s + 1);
    else {
      toast.success("Cadastro realizado! Bem-vinda à Aliança Girassol 🌻");
      setTimeout(() => navigate("/login/mae"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="w-full max-w-lg mb-8">
        <button onClick={() => navigate("/login/mae")} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-6">
          <ArrowLeft size={16} />
          Já tenho conta
        </button>
        <div className="flex items-center gap-3 mb-6">
          <img src={LOGO_IMG} alt="Logo" className="w-10 h-10 sunflower-glow" />
          <span className="font-bold text-lg text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="golden-text">Aliança</span> Girassol
          </span>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-2">
          {steps.map((s, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-[#FFB020]" : "bg-white/10"}`} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-white/40">
          {steps.map((s, i) => (
            <span key={i} className={i === step ? "text-[#FFB020]" : ""}>{s}</span>
          ))}
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 w-full max-w-lg"
      >
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFB020]/10 border border-[#FFB020]/20 mb-4">
                <Heart size={12} className="text-[#FFB020]" />
                <span className="text-xs text-[#FFB020] font-medium">Cadastro Gratuito</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quem é você?</h2>
              <p className="text-white/50 text-sm mt-1">Vamos começar com seus dados básicos.</p>
            </div>
            {[["nome", "Seu nome completo", "text"], ["email", "Seu e-mail", "email"], ["telefone", "Telefone / WhatsApp", "tel"], ["cidade", "Cidade e Estado", "text"]].map(([k, ph, t]) => (
              <div key={k}>
                <label className="block text-sm font-medium text-white/60 mb-1.5 capitalize">{ph}</label>
                <input type={t} placeholder={ph} value={(form as any)[k]} onChange={e => update(k, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 transition-all" />
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Seu perfil profissional</h2>
              <p className="text-white/50 text-sm mt-1">Conte-nos sobre sua experiência e habilidades.</p>
            </div>
            {[["profissao", "Sua profissão / área de atuação"], ["experiencia", "Anos de experiência"]].map(([k, ph]) => (
              <div key={k}>
                <label className="block text-sm font-medium text-white/60 mb-1.5">{ph}</label>
                <input type="text" placeholder={ph} value={(form as any)[k]} onChange={e => update(k, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 transition-all" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Habilidades principais</label>
              <textarea placeholder="Ex: Excel, atendimento ao cliente, design gráfico..." value={form.habilidades} onChange={e => update("habilidades", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 transition-all resize-none h-24" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sua realidade de cuidado</h2>
              <p className="text-white/50 text-sm mt-1">Isso nos ajuda a encontrar oportunidades que realmente se encaixam na sua vida.</p>
            </div>
            {[["nomeFilho", "Nome do seu filho(a)"], ["idadeFilho", "Idade"], ["diagnostico", "Diagnóstico / condição (opcional)"]].map(([k, ph]) => (
              <div key={k}>
                <label className="block text-sm font-medium text-white/60 mb-1.5">{ph}</label>
                <input type="text" placeholder={ph} value={(form as any)[k]} onChange={e => update(k, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 transition-all" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Horários disponíveis para trabalhar</label>
              <div className="flex flex-wrap gap-2">
                {horarioOpts.map(h => (
                  <button key={h} type="button" onClick={() => toggleHorario(h)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${form.horarios.includes(h) ? "bg-[#FFB020]/20 border-[#FFB020]/50 text-[#FFB020]" : "border-white/10 text-white/50 hover:border-white/20"}`}>
                    {form.horarios.includes(h) && <Check size={10} className="inline mr-1" />}
                    {h}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Seu objetivo profissional</label>
              <textarea placeholder="O que você busca neste momento da sua vida profissional?" value={form.objetivo} onChange={e => update("objetivo", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 transition-all resize-none h-20" />
            </div>
          </div>
        )}

        <button onClick={handleNext} className="btn-pill w-full py-3.5 font-bold text-base mt-6 flex items-center justify-center gap-2">
          {step < 2 ? "Continuar" : (
            <>
              <Sun size={18} />
              Criar minha conta gratuita
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
