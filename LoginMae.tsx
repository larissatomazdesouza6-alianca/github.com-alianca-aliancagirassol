/**
 * ALIANÇA GIRASSOL — Login para Mães
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sun, Eye, EyeOff, ArrowLeft, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/logo-girassol-kG7yECdYLxcArRyAk9VxS6.webp";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/hero-mae-filho-FSpFzKf8BCCtyTYkNrhUoj.webp";

export default function LoginMae() {
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
    const ok = await login(email, password, "mae");
    setLoading(false);
    if (ok) {
      toast.success("Bem-vinda de volta, Ana Beatriz! 🌻");
      navigate("/mae/dashboard");
    } else {
      setError("E-mail ou senha incorretos. Tente: Girassol@gmail.com / 12345");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] flex">
      {/* Left — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Back */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 text-sm">
            <ArrowLeft size={16} />
            Voltar ao início
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src={LOGO_IMG} alt="Logo" className="w-10 h-10 sunflower-glow" />
            <span className="font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span className="golden-text">Aliança</span> Girassol
            </span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFB020]/10 border border-[#FFB020]/20 mb-4">
              <Heart size={12} className="text-[#FFB020]" />
              <span className="text-xs text-[#FFB020] font-medium">Área das Mães</span>
            </div>

            <h1 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Bem-vinda de volta
            </h1>
            <p className="text-white/50 mb-8">Sua jornada continua aqui. 🌻</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Girassol@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 focus:bg-white/8 transition-all"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 transition-all"
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
                className="btn-pill w-full py-3.5 font-bold text-base flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#0D1B2A]/30 border-t-[#0D1B2A] rounded-full animate-spin" />
                ) : (
                  <>
                    <Sun size={18} />
                    Entrar
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-white/40 text-sm">Ainda não tem conta? </span>
              <button onClick={() => navigate("/cadastro/mae")} className="text-[#FFB020] text-sm font-medium hover:underline">
                Cadastre-se gratuitamente
              </button>
            </div>

            <div className="mt-4 text-center">
              <button onClick={() => navigate("/login/empresa")} className="text-white/30 text-xs hover:text-white/50 transition-colors">
                Sou uma empresa →
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right — Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src={HERO_IMG} alt="Mãe e filho" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="glass-card p-6">
            <p className="text-white/80 italic text-sm leading-relaxed mb-3">
              "A Aliança Girassol me deu de volta algo que eu achei que tinha perdido: a possibilidade de ser profissional e mãe ao mesmo tempo."
            </p>
            <div className="text-[#FFB020] text-sm font-semibold">Ana Beatriz, mãe do Miguel</div>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
