/**
 * ALIANÇA GIRASSOL — Cadastro para Empresas (Teste Gratuito)
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Building2, ArrowLeft, Check, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/logo-girassol-kG7yECdYLxcArRyAk9VxS6.webp";

const steps = ["Dados da Empresa", "Perfil ESG", "Configurar Vagas"];

const benefits = [
  "Acesso a +12.000 talentos qualificados",
  "IA de matching inteligente",
  "Pipeline Kanban visual",
  "Analytics ESG em tempo real",
  "14 dias grátis, sem cartão",
];

export default function CadastroEmpresa() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    razaoSocial: "", cnpj: "", setor: "", tamanho: "", site: "",
    responsavel: "", email: "", cargo: "",
    compromisoESG: "", politicaFlex: "", metas: "",
    tipoVaga: "", qtdVagas: "", descricao: "",
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleNext = () => {
    if (step < 2) setStep(s => s + 1);
    else {
      toast.success("Conta criada! Iniciando seu teste gratuito 🌻");
      setTimeout(() => navigate("/login/empresa"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex">
      {/* Left — Benefits */}
      <div className="hidden lg:flex w-80 xl:w-96 flex-col justify-center px-10 py-12 bg-[#111827] border-r border-white/5">
        <img src={LOGO_IMG} alt="Logo" className="w-12 h-12 sunflower-glow mb-6" />
        <h2 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Teste <span className="golden-text">gratuito</span><br />por 14 dias
        </h2>
        <p className="text-white/50 text-sm mb-8">Sem cartão de crédito. Cancele quando quiser.</p>
        <div className="space-y-3">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#FFB020]/20 flex items-center justify-center flex-shrink-0">
                <Check size={10} className="text-[#FFB020]" />
              </div>
              <span className="text-white/70 text-sm">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
        <div className="max-w-lg w-full mx-auto">
          <button onClick={() => navigate("/login/empresa")} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-8">
            <ArrowLeft size={16} />
            Já tenho conta
          </button>

          {/* Progress */}
          <div className="flex gap-2 mb-2">
            {steps.map((s, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-teal-400" : "bg-white/10"}`} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-white/40 mb-8">
            {steps.map((s, i) => (
              <span key={i} className={i === step ? "text-teal-400" : ""}>{s}</span>
            ))}
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="glass-card p-8">
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
                    <Building2 size={12} className="text-teal-400" />
                    <span className="text-xs text-teal-400 font-medium">Dados Empresariais</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sobre sua empresa</h2>
                </div>
                {[["razaoSocial", "Razão Social"], ["cnpj", "CNPJ"], ["setor", "Setor de atuação"], ["site", "Site da empresa (opcional)"]].map(([k, ph]) => (
                  <div key={k}>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">{ph}</label>
                    <input type="text" placeholder={ph} value={(form as any)[k]} onChange={e => update(k, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1.5">Tamanho da empresa</label>
                  <select value={form.tamanho} onChange={e => update("tamanho", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all">
                    <option value="">Selecione</option>
                    {["1-10 funcionários", "11-50 funcionários", "51-200 funcionários", "201-1000 funcionários", "1000+ funcionários"].map(o => (
                      <option key={o} value={o} className="bg-[#0D1B2A]">{o}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Compromisso ESG</h2>
                  <p className="text-white/50 text-sm mt-1">Como sua empresa apoia a diversidade e inclusão?</p>
                </div>
                {[["responsavel", "Nome do responsável de RH"], ["email", "E-mail corporativo"], ["cargo", "Cargo"]].map(([k, ph]) => (
                  <div key={k}>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">{ph}</label>
                    <input type="text" placeholder={ph} value={(form as any)[k]} onChange={e => update(k, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1.5">Política de flexibilidade</label>
                  <textarea placeholder="Descreva como sua empresa oferece flexibilidade para colaboradores cuidadores..." value={form.politicaFlex} onChange={e => update("politicaFlex", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 transition-all resize-none h-24" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Primeiras vagas</h2>
                  <p className="text-white/50 text-sm mt-1">Configure as vagas que deseja publicar.</p>
                </div>
                {[["tipoVaga", "Tipo de vaga (ex: Analista, Designer, Atendimento)"], ["qtdVagas", "Quantidade de vagas"]].map(([k, ph]) => (
                  <div key={k}>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">{ph}</label>
                    <input type="text" placeholder={ph} value={(form as any)[k]} onChange={e => update(k, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1.5">Descrição e requisitos</label>
                  <textarea placeholder="Descreva a vaga, requisitos e benefícios..." value={form.descricao} onChange={e => update("descricao", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 transition-all resize-none h-24" />
                </div>
              </div>
            )}

            <button onClick={handleNext} className="w-full py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 text-[#0D1B2A] font-bold text-base flex items-center justify-center gap-2 transition-all mt-6">
              {step < 2 ? "Continuar" : (
                <>
                  <BarChart3 size={18} />
                  Iniciar Teste Gratuito
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
