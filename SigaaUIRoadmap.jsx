import { useState } from "react";

const phases = [
  {
    id: 1,
    title: "Fundação",
    subtitle: "Core C++ + WASM + Extensão Base",
    period: "Mês 1 – 2",
    color: "#0891b2",
    glow: "rgba(8,145,178,0.35)",
    icon: "⚙️",
    features: [
      { name: "Parser do HTML do SIGAA", layer: "C++", priority: "crítico" },
      { name: "Motor de preferências do usuário", layer: "C++", priority: "crítico" },
      { name: "wasm_loader.js — bridge WASM/JS", layer: "JS", priority: "crítico" },
      { name: "Estrutura modular do repositório", layer: "Arq.", priority: "crítico" },
      { name: "Manifest V3 + bootstrap.js", layer: "JS", priority: "crítico" },
    ],
  },
  {
    id: 2,
    title: "Personalização Visual",
    subtitle: "Identidade e Customização do Usuário",
    period: "Mês 2 – 3",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.35)",
    icon: "🎨",
    features: [
      { name: "Seleção de cores e tema", layer: "JS", priority: "alto" },
      { name: "Foto de perfil com redimensionamento", layer: "JS", priority: "alto" },
      { name: "Tipografia personalizável", layer: "JS", priority: "médio" },
      { name: "Layout e densidade ajustáveis", layer: "JS", priority: "médio" },
      { name: "Editor de CSS personalizado", layer: "JS", priority: "baixo" },
      { name: "Nome de exibição personalizado", layer: "C++", priority: "médio" },
    ],
  },
  {
    id: 3,
    title: "Notificações & Navegação",
    subtitle: "Alertas Inteligentes e Usabilidade",
    period: "Mês 3 – 4",
    color: "#059669",
    glow: "rgba(5,150,105,0.35)",
    icon: "🔔",
    features: [
      { name: "Notificações em tempo real", layer: "JS", priority: "alto" },
      { name: "Lembretes programados de prazos", layer: "JS", priority: "alto" },
      { name: "Badge dinâmico no ícone", layer: "JS", priority: "médio" },
      { name: "Reordenação de blocos drag-and-drop", layer: "JS", priority: "médio" },
      { name: "Sidebar lateral persistente", layer: "JS", priority: "médio" },
      { name: "Menus de contexto personalizados", layer: "JS", priority: "baixo" },
      { name: "Atalhos de teclado customizáveis", layer: "JS", priority: "baixo" },
    ],
  },
  {
    id: 4,
    title: "Dados & Exportações",
    subtitle: "Histórico Acadêmico e Geração de Arquivos",
    period: "Mês 4 – 5",
    color: "#d97706",
    glow: "rgba(217,119,6,0.35)",
    icon: "📊",
    features: [
      { name: "Histórico e comparação de desempenho", layer: "C++", priority: "alto" },
      { name: "Exportação de notas em CSV", layer: "C++", priority: "alto" },
      { name: "Captura formatada do boletim", layer: "JS", priority: "médio" },
      { name: "Geração de QR Code do horário", layer: "C++", priority: "médio" },
      { name: "Interceptação de rede (webRequest)", layer: "JS", priority: "alto" },
    ],
  },
  {
    id: 5,
    title: "Acessibilidade & Experiência",
    subtitle: "Inclusão e Produtividade do Estudante",
    period: "Mês 5 – 6",
    color: "#db2777",
    glow: "rgba(219,39,119,0.35)",
    icon: "♿",
    features: [
      { name: "Alto contraste", layer: "JS", priority: "alto" },
      { name: "Tamanho de fonte ajustável", layer: "JS", priority: "alto" },
      { name: "Espaçamento entre linhas", layer: "JS", priority: "médio" },
      { name: "Text-to-speech (Web Speech API)", layer: "JS", priority: "médio" },
      { name: "Temporizador Pomodoro", layer: "C++", priority: "médio" },
      { name: "Widget de clima (API pública)", layer: "JS", priority: "baixo" },
      { name: "Frase motivacional do dia", layer: "JS", priority: "baixo" },
      { name: "Agrupamento de abas do SIGAA", layer: "JS", priority: "baixo" },
    ],
  },
  {
    id: 6,
    title: "Integrações & Cross-platform",
    subtitle: "Mobile, IA e Sincronização Total",
    period: "Mês 6 – 9",
    color: "#0891b2",
    glow: "rgba(8,145,178,0.35)",
    icon: "🌐",
    features: [
      { name: "Múltiplos perfis de usuário", layer: "C++", priority: "alto" },
      { name: "Integração com Google Calendar", layer: "JS", priority: "alto" },
      { name: "Análise acadêmica com IA", layer: "C++", priority: "alto" },
      { name: "Modo offline via Service Worker", layer: "JS", priority: "alto" },
      { name: "Sincronização Firebase/Supabase", layer: "JS", priority: "médio" },
      { name: "PWA para Android e iOS", layer: "JS", priority: "médio" },
      { name: "Suporte ao Firefox Android", layer: "JS", priority: "médio" },
    ],
  },
];

const priorityColors = {
  crítico: { bg: "rgba(239,68,68,0.15)", text: "#f87171", border: "rgba(239,68,68,0.3)" },
  alto:    { bg: "rgba(251,146,60,0.15)", text: "#fb923c", border: "rgba(251,146,60,0.3)" },
  médio:   { bg: "rgba(250,204,21,0.15)", text: "#fbbf24", border: "rgba(250,204,21,0.3)" },
  baixo:   { bg: "rgba(74,222,128,0.15)", text: "#4ade80", border: "rgba(74,222,128,0.3)" },
};

const layerColors = {
  "C++":  { bg: "rgba(139,92,246,0.2)", text: "#a78bfa" },
  "JS":   { bg: "rgba(251,191,36,0.2)", text: "#fbbf24" },
  "Arq.": { bg: "rgba(96,165,250,0.2)", text: "#60a5fa" },
};

export default function SigaaUIRoadmap() {
  const [expanded, setExpanded] = useState(null);
  const total = phases.reduce((acc, p) => acc + p.features.length, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#090e1a",
      fontFamily: "'DM Mono', 'Fira Code', monospace",
      color: "#e2e8f0",
      padding: "48px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(8,145,178,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(8,145,178,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(8,145,178,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(8,145,178,0.1)",
            border: "1px solid rgba(8,145,178,0.3)",
            borderRadius: "6px",
            padding: "6px 16px",
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#0891b2",
            marginBottom: "24px",
          }}>
            Roadmap de Implementação
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: "800",
            letterSpacing: "-2px",
            margin: "0 0 12px",
            background: "linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'DM Mono', monospace",
          }}>
            SigaaUI
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 32px", letterSpacing: "1px" }}>
            JS + Núcleo C++ via Emscripten · {total} funcionalidades · 6 fases · ~9 meses
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
            {[
              { label: "Fases", value: phases.length },
              { label: "Funcionalidades", value: total },
              { label: "Em C++", value: phases.reduce((a, p) => a + p.features.filter(f => f.layer === "C++").length, 0) },
              { label: "Em JS", value: phases.reduce((a, p) => a + p.features.filter(f => f.layer === "JS").length, 0) },
            ].map((s) => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "16px 24px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#0891b2", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: "#475569", marginTop: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            left: "27px",
            top: "0",
            bottom: "0",
            width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(8,145,178,0.4) 10%, rgba(8,145,178,0.4) 90%, transparent)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {phases.map((phase) => {
              const isOpen = expanded === phase.id;
              return (
                <div key={phase.id} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                  <div style={{
                    flexShrink: 0,
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${phase.glow} 0%, rgba(9,14,26,0.9) 70%)`,
                    border: `2px solid ${phase.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    boxShadow: `0 0 20px ${phase.glow}`,
                    position: "relative",
                    zIndex: 1,
                    cursor: "pointer",
                    transition: "box-shadow 0.3s",
                  }}
                    onClick={() => setExpanded(isOpen ? null : phase.id)}
                  >
                    {phase.icon}
                  </div>

                  <div style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${isOpen ? phase.color : "rgba(255,255,255,0.06)"}`,
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "border-color 0.3s",
                    boxShadow: isOpen ? `0 0 30px ${phase.glow}` : "none",
                  }}>
                    <div
                      onClick={() => setExpanded(isOpen ? null : phase.id)}
                      style={{
                        padding: "20px 24px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                          <span style={{
                            fontSize: "11px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            color: phase.color,
                            fontWeight: "700",
                          }}>
                            Fase {phase.id}
                          </span>
                          <span style={{
                            fontSize: "10px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "4px",
                            padding: "2px 8px",
                            color: "#64748b",
                            letterSpacing: "1px",
                          }}>
                            {phase.period}
                          </span>
                        </div>
                        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", letterSpacing: "-0.5px", color: "#f1f5f9" }}>
                          {phase.title}
                        </h2>
                        <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#475569" }}>
                          {phase.subtitle}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                        <div style={{
                          fontSize: "11px",
                          color: phase.color,
                          background: phase.glow,
                          border: `1px solid ${phase.color}40`,
                          borderRadius: "20px",
                          padding: "4px 12px",
                        }}>
                          {phase.features.length} funções
                        </div>
                        <div style={{
                          fontSize: "16px",
                          color: "#475569",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s",
                        }}>▼</div>
                      </div>
                    </div>

                    {isOpen && (
                      <div style={{
                        borderTop: `1px solid rgba(255,255,255,0.05)`,
                        padding: "16px 24px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}>
                        {phase.features.map((feat) => (
                          <div key={feat.name} style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 14px",
                            background: "rgba(255,255,255,0.02)",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.04)",
                            gap: "12px",
                            flexWrap: "wrap",
                          }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "180px" }}>
                              <div style={{
                                width: "6px", height: "6px", borderRadius: "50%",
                                background: phase.color, flexShrink: 0,
                                boxShadow: `0 0 6px ${phase.color}`,
                              }} />
                              <span style={{ fontSize: "13px", color: "#cbd5e1" }}>{feat.name}</span>
                            </div>
                            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                              <span style={{
                                fontSize: "10px",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                fontWeight: "700",
                                letterSpacing: "0.5px",
                                background: layerColors[feat.layer]?.bg,
                                color: layerColors[feat.layer]?.text,
                              }}>
                                {feat.layer}
                              </span>
                              <span style={{
                                fontSize: "10px",
                                padding: "2px 8px",
                                borderRadius: "4px",
                                letterSpacing: "0.5px",
                                background: priorityColors[feat.priority]?.bg,
                                color: priorityColors[feat.priority]?.text,
                                border: `1px solid ${priorityColors[feat.priority]?.border}`,
                              }}>
                                {feat.priority}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          marginTop: "64px",
          padding: "24px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center",
        }}>
          <div>
            <div style={{ fontSize: "10px", color: "#475569", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>Camada</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {Object.entries(layerColors).map(([k, v]) => (
                <span key={k} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "4px", fontWeight: "700", background: v.bg, color: v.text }}>{k}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "10px", color: "#475569", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>Prioridade</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {Object.entries(priorityColors).map(([k, v]) => (
                <span key={k} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "4px", background: v.bg, color: v.text, border: `1px solid ${v.border}` }}>{k}</span>
              ))}
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: "40px", fontSize: "11px", color: "#334155", letterSpacing: "1px" }}>
          SigaaUI · Feito de aluno para aluno
        </p>
      </div>
    </div>
  );
}
