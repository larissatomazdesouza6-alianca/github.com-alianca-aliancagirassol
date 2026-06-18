/**
 * ALIANÇA GIRASSOL — Nossa História
 * Design: "Tecnologia com Alma" — Deep Navy + Golden Sunflower
 */
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Sun, Heart, Target, Sparkles, Users } from "lucide-react";

const LOGO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/logo-girassol-kG7yECdYLxcArRyAk9VxS6.webp";
const HISTORIA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/nossa-historia-QGFNuFno3bdr6VYn4WA5Wi.webp";

const timeline = [
  { year: "2022", title: "A Semente", desc: "A Aliança Girassol nasceu da dor real de mães que precisavam escolher entre cuidar e trabalhar. Percebemos que o mercado não estava preparado para acolher essa realidade." },
  { year: "2023", title: "A Tecnologia como Aliada", desc: "Desenvolvemos nossa IA proprietária capaz de compreender a rotina imprevisível das mães cuidadoras e encontrar vagas verdadeiramente compatíveis." },
  { year: "2024", title: "A Comunidade Floresce", desc: "A Rede de Elos conectou mais de 12.000 mães. Empresas comprometidas com ESG começaram a enxergar o valor único dessas profissionais." },
  { year: "2025", title: "O Ecossistema Completo", desc: "Hoje somos um ecossistema completo: empregabilidade, capacitação, comunidade e IA — tudo integrado para transformar vidas." },
];

const values = [
  { icon: Heart, title: "Acolhimento", desc: "Cada mãe é recebida com empatia, sem julgamentos, com respeito pela sua realidade única." },
  { icon: Target, title: "Propósito", desc: "Acreditamos que inclusão real exige compreensão profunda, não apenas boas intenções." },
  { icon: Sparkles, title: "Inovação", desc: "Usamos tecnologia de ponta a serviço do humano, nunca o contrário." },
  { icon: Users, title: "Comunidade", desc: "Nenhuma mãe deveria percorrer essa jornada sozinha. Juntas somos mais fortes." },
];

export default function NossaHistoria() {
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
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#FFB020]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <Sun size={14} className="text-[#FFB020]" />
                <span className="text-xs font-medium text-white/80">Nossa História</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Nascemos da<br />
                <span className="golden-text">força das mães</span>
              </h1>
              <p className="text-white/70 leading-relaxed text-lg mb-6">
                A Aliança Girassol não é apenas uma plataforma. É uma resposta a um problema estrutural que afeta milhares de mulheres no Brasil: a exclusão profissional de mães cuidadoras.
              </p>
              <p className="text-white/60 leading-relaxed">
                Como o girassol que sempre se volta para a luz, acreditamos que cada mãe carrega em si a força de florescer — mesmo nos dias mais difíceis. Nossa missão é criar o solo fértil para isso acontecer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={HISTORIA_IMG} alt="Nossa história" className="rounded-2xl w-full shadow-2xl ring-1 ring-white/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#111827]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Nossa <span className="golden-text">jornada</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#FFB020]/50 via-[#FFB020]/20 to-transparent" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-8 pl-20 relative"
                >
                  <div className="absolute left-4 top-1 w-8 h-8 rounded-full bg-[#FFB020]/20 border-2 border-[#FFB020]/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#FFB020]" />
                  </div>
                  <div className="glass-card p-6 flex-1">
                    <div className="text-[#FFB020] text-sm font-bold mb-1">{item.year}</div>
                    <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Os valores que nos <span className="golden-text">guiam</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFB020]/20 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-[#FFB020]" />
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{v.title}</h3>
                <p className="text-white/60 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#111827]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={LOGO_IMG} alt="Logo" className="w-14 h-14 mx-auto mb-6 sunflower-glow" />
            <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Faça parte dessa <span className="golden-text">história</span>
            </h2>
            <p className="text-white/60 mb-8">Junte-se a nós e ajude a construir um mercado de trabalho mais humano e inclusivo.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/cadastro/mae")} className="btn-pill px-8 py-4 font-bold">Sou Mãe — Quero Me Cadastrar</button>
              <button onClick={() => navigate("/cadastro/empresa")} className="px-8 py-4 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all font-semibold">Sou Empresa</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
