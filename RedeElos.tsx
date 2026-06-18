/**
 * ALIANÇA GIRASSOL — Rede de Elos
 * Comunidade de mães, grupos de apoio, fórum
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, Heart, Search, MapPin, Plus, Send } from "lucide-react";
import MaeDashboardLayout from "@/components/MaeDashboardLayout";
import { toast } from "sonner";

const REDE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663771866950/eXzubQpfyPxu3kCRbtKPX4/rede-elos-2CfJEFQVNHqGRxeaKxLKqS.webp";

const maes = [
  { nome: "Carla Mendes", cidade: "São Paulo, SP", filho: "Pedro, 8 anos (TEA)", profissao: "Analista Administrativa", online: true, avatar: "C" },
  { nome: "Fernanda Lima", cidade: "Rio de Janeiro, RJ", filho: "Sofia, 5 anos (TEA)", profissao: "Redatora Freelance", online: true, avatar: "F" },
  { nome: "Juliana Santos", cidade: "Belo Horizonte, MG", filho: "Lucas, 10 anos (TEA)", profissao: "Designer Gráfica", online: false, avatar: "J" },
  { nome: "Patrícia Rocha", cidade: "Curitiba, PR", filho: "Gabriel, 7 anos (TEA)", profissao: "Professora", online: true, avatar: "P" },
  { nome: "Renata Oliveira", cidade: "Porto Alegre, RS", filho: "Mateus, 6 anos (TEA)", profissao: "Assistente Financeira", online: false, avatar: "R" },
  { nome: "Simone Ferreira", cidade: "Salvador, BA", filho: "Ana, 9 anos (TEA)", profissao: "Atendimento ao Cliente", online: true, avatar: "S" },
];

const grupos = [
  { nome: "Mães de SP", membros: 342, mensagens: 1204, tag: "São Paulo" },
  { nome: "Trabalho Remoto para Mães", membros: 891, mensagens: 3421, tag: "Emprego" },
  { nome: "Terapias e Recursos", membros: 567, mensagens: 2103, tag: "Saúde" },
  { nome: "Empreendedoras Cuidadoras", membros: 234, mensagens: 876, tag: "Negócios" },
];

const posts = [
  { autora: "Carla Mendes", avatar: "C", tempo: "2h", texto: "Consegui meu primeiro emprego remoto depois de 3 anos afastada! A IA da Aliança Girassol encontrou uma vaga perfeita para minha rotina com o Pedro. Obrigada a todas que me apoiaram! 🌻", likes: 47, comentarios: 12 },
  { autora: "Fernanda Lima", avatar: "F", tempo: "5h", texto: "Dica para quem está começando: façam o curso de Excel do Zero! Mudou completamente minha empregabilidade. Em 2 semanas já recebi 3 propostas de entrevista.", likes: 38, comentarios: 8 },
  { autora: "Juliana Santos", avatar: "J", tempo: "1d", texto: "Alguém tem experiência com empresas que aceitam horário partido? Meu Lucas tem terapia de manhã e de tarde às terças e quintas...", likes: 15, comentarios: 23 },
];

export default function RedeElos() {
  const [tab, setTab] = useState<"feed" | "membros" | "grupos">("feed");
  const [search, setSearch] = useState("");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [newPost, setNewPost] = useState("");

  const toggleLike = (i: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    toast.success("Publicação compartilhada com a comunidade! 🌻");
    setNewPost("");
  };

  return (
    <MaeDashboardLayout title="Rede de Elos">
      <div className="space-y-6">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden h-40">
          <img src={REDE_IMG} alt="Rede de Elos" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 via-[#0D1B2A]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <h1 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Rede de <span className="golden-text">Elos</span>
            </h1>
            <p className="text-white/60 text-sm mt-1">12.847 mães conectadas. Você não está sozinha.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(["feed", "membros", "grupos"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${tab === t ? "bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/30" : "bg-white/5 text-white/50 border border-white/10"}`}>
              {t === "feed" ? "Feed" : t === "membros" ? "Membros" : "Grupos"}
            </button>
          ))}
        </div>

        {tab === "feed" && (
          <div className="space-y-4">
            {/* New Post */}
            <div className="glass-card p-4">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFB020]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FFB020] text-sm font-bold">A</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={e => setNewPost(e.target.value)}
                    placeholder="Compartilhe sua experiência, dúvida ou conquista com a comunidade..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 resize-none h-20 text-sm"
                  />
                  <div className="flex justify-end mt-2">
                    <button onClick={handlePost} className="btn-pill px-4 py-2 text-sm font-bold flex items-center gap-2">
                      <Send size={14} />
                      Publicar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {posts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-purple-500/30 flex items-center justify-center">
                    <span className="text-purple-300 text-sm font-bold">{post.avatar}</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{post.autora}</div>
                    <div className="text-xs text-white/40">{post.tempo} atrás</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">{post.texto}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(i)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${likedPosts.has(i) ? "text-red-400" : "text-white/40 hover:text-red-400"}`}
                  >
                    <Heart size={16} fill={likedPosts.has(i) ? "currentColor" : "none"} />
                    {post.likes + (likedPosts.has(i) ? 1 : 0)}
                  </button>
                  <button
                    onClick={() => toast.info("Comentários em breve! 💬")}
                    className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
                  >
                    <MessageCircle size={16} />
                    {post.comentarios}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "membros" && (
          <div className="space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar membros..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#FFB020]/50 text-sm" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {maes.filter(m => m.nome.toLowerCase().includes(search.toLowerCase())).map((mae, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass-card p-4 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
                      <span className="text-purple-300 font-bold">{mae.avatar}</span>
                    </div>
                    {mae.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0D1B2A]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-white truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{mae.nome}</div>
                    <div className="text-xs text-white/40 truncate">{mae.profissao}</div>
                    <div className="flex items-center gap-1 text-xs text-white/30 mt-0.5"><MapPin size={10} />{mae.cidade}</div>
                  </div>
                  <button onClick={() => toast.info("Chat em breve! 💬")}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFB020]/10 border border-[#FFB020]/20 flex items-center justify-center text-[#FFB020] hover:bg-[#FFB020]/20 transition-colors">
                    <MessageCircle size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {tab === "grupos" && (
          <div className="space-y-3">
            {grupos.map((grupo, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{grupo.nome}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/40">{grupo.membros} membros</span>
                    <span className="text-xs text-white/40">{grupo.mensagens} mensagens</span>
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs">{grupo.tag}</span>
                </div>
                <button onClick={() => toast.success(`Você entrou no grupo "${grupo.nome}"! 🌻`)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#FFB020]/10 border border-[#FFB020]/20 text-[#FFB020] text-xs font-medium hover:bg-[#FFB020]/20 transition-colors flex items-center gap-1">
                  <Plus size={12} />
                  Entrar
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MaeDashboardLayout>
  );
}
