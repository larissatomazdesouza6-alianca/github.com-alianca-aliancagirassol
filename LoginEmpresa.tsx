/**
 * ALIANÇA GIRASSOL — Login para Empresas
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Building2, Eye, EyeOff, ArrowLeft, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/logo-girassol-kG7yECdYLxcArRyAk9VxS6.webp";
const COMO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/como-funciona-4fTP37LqzeeFRqBYckDywV.webp";

export default function LoginEmpresa() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const ok = await login(email, password, "empresa");
    setLoading(false);
    if (ok) {
      toast.success("Bem-vindo, TechVida Solutions! 🌻");
      navigate("/empresa/dashboard");
    } else {
      setError("E-mail ou senha incorretos. Tente: Alianca@gmail.com / 12345");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex">
      {/* Left — Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src={COMO_IMG} alt="Empresa" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <div className="glass-card p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[["850+", "Empresas parceiras"], ["12k+", "Talentos disponíveis"], ["94%", "Taxa de retenção"]].map(([v, l], i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold golden-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v}</div>
                  <div className="text-white/50 text-xs mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="max-w-md w-full mx-auto">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 text-sm">
            <ArrowLeft size={16} />
            Voltar ao início
          </button>

          <div className="flex items-center gap-3 mb-8">
            <img src={LOGO_IMG} alt="Logo" className="w-10 h-10 sunflower-glow" />
            <span className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="golden-text">Aliança</span> Girassol
            </span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
              <Building2 size={12} className="text-teal-400" />
              <span className="text-xs text-teal-400 font-medium">Área Empresarial</span>
            </div>

            <h1 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Acesso Empresarial
            </h1>
            <p className="text-white/50 mb-8">Gerencie vagas, candidaturas e impacto ESG.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">E-mail corporativo</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Alianca@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Senha</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-teal-500/50 transition-all"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 text-[#0D1B2A] font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#0D1B2A]/30 border-t-[#0D1B2A] rounded-full animate-spin" />
                ) : (
                  <>
                    <BarChart3 size={18} />
                    Entrar no Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-white/40 text-sm">Ainda não tem conta? </span>
              <button onClick={() => navigate("/cadastro/empresa")} className="text-teal-400 text-sm font-medium hover:underline">
                Iniciar teste gratuito
              </button>
            </div>

            <div className="mt-4 text-center">
              <button onClick={() => navigate("/login/mae")} className="text-white/30 text-xs hover:text-white/50 transition-colors">
                ← Sou uma mãe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
