/**
 * ALIANÇA GIRASSOL — Landing Page Principal
 * Design: "Tecnologia com Alma" — Deep Navy + Golden Sunflower
 * Sections: Hero, Quem Somos, Como Funciona, Pilares, Depoimentos, CTA
 */
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Briefcase, Brain, Users, BookOpen, Building2, ChevronDown, Menu, X, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/hero-mae-filho-FSpFzKf8BCCtyTYkNrhUoj.webp";
const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/logo-girassol-kG7yECdYLxcArRyAk9VxS6.webp";

const pillars = [
  { icon: Briefcase, title: "Trabalho Adaptável", desc: "Vagas flexíveis que respeitam a rotina imprevisível de mães cuidadoras.", color: "from-yellow-500/20 to-orange-500/20" },
  { icon: Brain, title: "IA como Ponte", desc: "Inteligência artificial que compreende sua realidade e encontra oportunidades compatíveis.", color: "from-teal-500/20 to-blue-500/20" },
  { icon: Users, title: "Rede de Acolhimento", desc: "Comunidade de mães que se apoiam, compartilham e crescem juntas.", color: "from-purple-500/20 to-pink-500/20" },
  { icon: BookOpen, title: "Capacitação", desc: "Trilhas de aprendizado personalizadas para o seu tempo e objetivo.", color: "from-green-500/20 to-teal-500/20" },
  { icon: Building2, title: "Empresas de Impacto", desc: "Organizações comprometidas com diversidade, ESG e flexibilidade real.", color: "from-blue-500/20 to-indigo-500/20" },
];

const testimonials = [
  { name: "Carla Mendes", role: "Mãe de Miguel, 7 anos (TEA)", text: "A Aliança Girassol mudou minha vida. Encontrei um trabalho remoto que me permite estar presente para o Miguel sem abrir mão da minha carreira.", stars: 5 },
  { name: "Fernanda Lima", role: "Mãe de Sofia, 5 anos (TEA)", text: "Pela primeira vez senti que uma plataforma realmente me entendia. A IA encontrou vagas que se encaixam perfeitamente na minha rotina.", stars: 5 },
  { name: "Patrícia Souza", role: "Mãe de Lucas, 9 anos (TEA)", text: "A rede de elos me conectou com outras mães incríveis. Não me sinto mais sozinha nessa jornada.", stars: 5 },
];

const metrics = [
  { value: "12.000+", label: "Mães cadastradas" },
  { value: "850+", label: "Empresas parceiras" },
  { value: "94%", label: "Taxa de satisfação" },
  { value: "3.200+", label: "Conexões realizadas" },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white overflow-x-hidden">
      {/* ===== HEADER ===== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0D1B2A]/95 backdrop-blur-xl border-b border-white/10 shadow-lg" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={LOGO_IMG} alt="Aliança Girassol" className="w-10 h-10 sunflower-glow" />
              <span className="font-bold text-lg hidden sm:block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="golden-text">Aliança</span> Girassol
              </span>
            </div>

            {/* Nav Links — Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => navigate("/nossa-historia")} className="text-white/70 hover:text-[#FFB020] transition-colors text-sm font-medium">Nossa História</button>
              <button onClick={() => navigate("/como-funciona")} className="text-white/70 hover:text-[#FFB020] transition-colors text-sm font-medium">Como Funciona</button>
              <button onClick={() => navigate("/login/mae")} className="text-white/70 hover:text-[#FFB020] transition-colors text-sm font-medium">Para Mães</button>
              <button onClick={() => navigate("/login/empresa")} className="text-white/70 hover:text-[#FFB020] transition-colors text-sm font-medium">Para Empresas</button>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button onClick={() => navigate("/login/mae")} className="text-white/80 hover:text-white text-sm font-medium transition-colors">Entrar</button>
              <button
                onClick={() => navigate("/cadastro/empresa")}
                className="btn-pill px-5 py-2.5 text-sm font-bold"
              >
                Teste Gratuito para Empresas
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-white/80" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0D1B2A]/98 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                <button onClick={() => { navigate("/nossa-historia"); setMenuOpen(false); }} className="text-left text-white/80 py-2 hover:text-[#FFB020]">Nossa História</button>
                <button onClick={() => { navigate("/como-funciona"); setMenuOpen(false); }} className="text-left text-white/80 py-2 hover:text-[#FFB020]">Como Funciona</button>
                <button onClick={() => { navigate("/login/mae"); setMenuOpen(false); }} className="text-left text-white/80 py-2 hover:text-[#FFB020]">Para Mães</button>
                <button onClick={() => { navigate("/login/empresa"); setMenuOpen(false); }} className="text-left text-white/80 py-2 hover:text-[#FFB020]">Para Empresas</button>
                <button onClick={() => { navigate("/cadastro/empresa"); setMenuOpen(false); }} className="btn-pill px-5 py-2.5 text-sm font-bold mt-2">Teste Gratuito para Empresas</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Mãe e filho" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 via-[#0D1B2A]/60 to-[#0D1B2A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <Sun size={14} className="text-[#FFB020]" />
                <span className="text-xs font-medium text-white/80">Plataforma de Impacto Social</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Conectamos mães cuidadoras a{" "}
                <span className="golden-text">oportunidades flexíveis</span>
                {", com empatia, apoio e propósito."}
              </h1>

              <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-xl">
                Porque inclusão não é apenas abrir portas. É compreender quem precisa atravessá-las.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/nossa-historia")}
                  className="btn-pill px-8 py-4 text-base font-bold flex items-center gap-2 justify-center"
                >
                  <Sun size={18} />
                  Conhecer Nossa História
                </button>
                <button
                  onClick={() => navigate("/como-funciona")}
                  className="px-8 py-4 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all font-semibold flex items-center gap-2 justify-center backdrop-blur-sm"
                >
                  Como Funciona
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown size={24} className="text-white/40" />
          </motion.div>
        </div>
      </section>

      {/* ===== METRICS ===== */}
      <section className="py-16 bg-[#0D1B2A] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-extrabold golden-text mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{m.value}</div>
                <div className="text-sm text-white/50">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUEM SOMOS ===== */}
      <section className="py-24 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <Sparkles size={14} className="text-[#FFB020]" />
                <span className="text-xs font-medium text-white/80">Nossa Missão</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Mais do que vagas.<br />
                <span className="golden-text">Um ecossistema de transformação.</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                A Aliança Girassol nasceu para enfrentar um problema estrutural: a exclusão profissional de milhares de mães cuidadoras que precisam conciliar a carreira com as demandas intensas do cuidado de seus filhos.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Nossa plataforma utiliza Inteligência Artificial para compreender a realidade de cada mãe — suas limitações de rotina, habilidades profissionais, disponibilidade e objetivos — criando conexões humanas e oportunidades compatíveis.
              </p>
              <button
                onClick={() => navigate("/nossa-historia")}
                className="btn-pill px-6 py-3 text-sm font-bold flex items-center gap-2"
              >
                Conhecer Nossa História
                <ArrowRight size={16} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/nossa-historia-QGFNuFno3bdr6VYn4WA5Wi.webp"
                alt="Nossa missão"
                className="rounded-2xl w-full object-cover shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PILARES ===== */}
      <section className="py-24 bg-[#111827] grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sun size={14} className="text-[#FFB020]" />
              <span className="text-xs font-medium text-white/80">Nossos Pilares</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Cinco pilares que sustentam<br />
              <span className="golden-text">cada conexão que fazemos</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`glass-card p-6 bg-gradient-to-br ${p.color} cursor-default`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <p.icon size={22} className="text-[#FFB020]" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
            {/* Último card — CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="glass-card p-6 bg-gradient-to-br from-[#FFB020]/20 to-yellow-600/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FFB020]/20 flex items-center justify-center mb-4">
                  <img src={LOGO_IMG} alt="Logo" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pronta para começar?</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">Cadastre-se gratuitamente e descubra oportunidades que respeitam a sua realidade.</p>
              </div>
              <button onClick={() => navigate("/cadastro/mae")} className="btn-pill px-5 py-2.5 text-sm font-bold w-full">
                Cadastrar-me Gratuitamente
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== COMO FUNCIONA PREVIEW ===== */}
      <section className="py-24 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/como-funciona-4fTP37LqzeeFRqBYckDywV.webp"
                alt="Como funciona"
                className="rounded-2xl w-full object-cover shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <Brain size={14} className="text-[#FFB020]" />
                <span className="text-xs font-medium text-white/80">Como Funciona</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                IA que <span className="golden-text">compreende</span><br />a sua realidade
              </h2>

              <div className="space-y-6">
                {[
                  { step: "01", title: "Crie seu perfil", desc: "Compartilhe sua realidade de cuidado, habilidades e disponibilidade." },
                  { step: "02", title: "IA analisa e conecta", desc: "Nossa inteligência artificial encontra vagas compatíveis com sua rotina." },
                  { step: "03", title: "Candidate-se com confiança", desc: "Empresas parceiras que realmente entendem e valorizam mães cuidadoras." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FFB020]/20 border border-[#FFB020]/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[#FFB020]">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/como-funciona")}
                className="mt-8 btn-pill px-6 py-3 text-sm font-bold flex items-center gap-2"
              >
                Ver Como Funciona
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section className="py-24 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Histórias que <span className="golden-text">inspiram</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} className="text-[#FFB020] fill-[#FFB020]" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24 bg-[#0D1B2A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFB020]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={LOGO_IMG} alt="Logo" className="w-16 h-16 mx-auto mb-6 sunflower-glow" />
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Sua jornada começa aqui.<br />
              <span className="golden-text">No seu tempo, no seu ritmo.</span>
            </h2>
            <p className="text-white/60 mb-10 text-lg">
              Junte-se a mais de 12.000 mães que já encontraram oportunidades que respeitam quem elas são.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/cadastro/mae")} className="btn-pill px-8 py-4 text-base font-bold flex items-center gap-2 justify-center">
                <Sun size={18} />
                Cadastrar-me Gratuitamente
              </button>
              <button onClick={() => navigate("/cadastro/empresa")} className="px-8 py-4 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all font-semibold">
                Sou uma Empresa
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#080F18] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={LOGO_IMG} alt="Logo" className="w-8 h-8" />
              <span className="font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="golden-text">Aliança</span> Girassol
              </span>
            </div>
            <div className="flex gap-6 text-sm text-white/40">
              <button onClick={() => navigate("/nossa-historia")} className="hover:text-white/70 transition-colors">Nossa História</button>
              <button onClick={() => navigate("/como-funciona")} className="hover:text-white/70 transition-colors">Como Funciona</button>
              <button onClick={() => navigate("/login/mae")} className="hover:text-white/70 transition-colors">Para Mães</button>
              <button onClick={() => navigate("/login/empresa")} className="hover:text-white/70 transition-colors">Para Empresas</button>
            </div>
            <div className="text-xs text-white/30">
              © 2025 Aliança Girassol. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
