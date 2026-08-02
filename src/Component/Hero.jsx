import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   RESUME CONTEXT — for ChatPanel system prompt
   ───────────────────────────────────────────── */

const RESUME_CONTEXT = `
Zhilaan Abdurrasyid Rusmawan — AI Software Engineer based in Jakarta, Indonesia.
Email: zhilaanabdrsyd@gmail.com | Portfolio: zhilaan-rusmawan-portfolio.vercel.app

CURRENT ROLE: AI Software Engineer at Videfly (Jan 2025–Present)
- Architected Kafka-based AI generation platform processing ~1,000 jobs/day (peak 1,400+) for 2,500 MAU.
- Built customer-facing AI assistant with RAG, MCP, LLM function-calling — 500+ daily users.
- Reduced generation time from 5–7 min to 1–2 min (3–4x throughput improvement).
- Cut monthly AI infrastructure costs by 25% via token audits and model selection optimization.
- Eliminated job-loss failures using Redis-based sync (from ~10 lost jobs/day to near-zero).
- Engineered multimodal evaluation pipelines ingesting TikTok, IG, FB, Reels content.
- Built prompt-governance frameworks and AI Try-On workflows (reduced 5 steps to 2).
- Contributed to closing 15+ enterprise contracts across FMCG, Pharmacy, Tourism verticals.
- Mentored AI Engineer intern over 6 months.
- Key products: AI Advertisement, AI UGC, AI Canvas — multimodal media generation platform.
- Tech: Python, FastAPI, Kafka, Redis, AWS, GCP, LangGraph, LangChain, Amazon Bedrock, Gemini, Docker.

PREVIOUS: AI Solutions Engineer, Contract (Jun 2024–Jan 2025)
- Quantized ResNet on ESP32 (520KB SRAM) for real-time edge inference, 87% accuracy.
- Delivered IoT CV monitoring + retail surveillance platform for MSME clients.

PREVIOUS: ML Engineer Intern at Festo Indonesia (Feb–Aug 2023)
- CNN-based CV models for industrial visual analysis and automated sorting.

PREVIOUS: Robotics Engineer Intern at PT. AWG (Jun 2022–Aug 2023)
- AGV control systems (C++/C#), MODBUS integration, sensor fusion.

EDUCATION: B.Eng Robotics & AI, Universitas Airlangga (2020–2024), GPA 3.61/4.00, Honors.
Thesis: Automated Defect Inspection System using computer vision.

SKILLS: LLM orchestration, RAG, MCP, LangGraph, LangChain, Prompt Engineering, Agentic Workflows,
PyTorch, TensorFlow, Computer Vision, Edge AI, TinyML, Kafka, Redis, PostgreSQL, Docker, AWS, FastAPI.
`;

/* ─────────────────────────────────────────────
   WAVE CANVAS
   ───────────────────────────────────────────── */

function WaveCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const target = useRef({ x: 0.5, y: 0.5 });
  const scroll = useRef(0);
  const raf = useRef(null);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      target.current.x = (e.clientX - rect.left) / rect.width;
      target.current.y = (e.clientY - rect.top) / rect.height;
    };
    const onScroll = () => {
      scroll.current = window.scrollY;
    };
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        target.current.x = (e.touches[0].clientX - rect.left) / rect.width;
        target.current.y = (e.touches[0].clientY - rect.top) / rect.height;
      }
    };

    window.addEventListener("resize", resize);
    container.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("touchmove", onTouch, { passive: true });

    const isMobile = window.innerWidth < 768;
    const waves = isMobile
      ? [
          { amp: 30, freq: 0.007, speed: 0.012, phase: 0, yOff: 0.58, opacity: 0.07 },
          { amp: 22, freq: 0.01, speed: 0.018, phase: 2.2, yOff: 0.65, opacity: 0.05 },
          { amp: 35, freq: 0.005, speed: 0.009, phase: 4.1, yOff: 0.72, opacity: 0.04 },
        ]
      : [
          { amp: 40, freq: 0.007, speed: 0.012, phase: 0, yOff: 0.50, opacity: 0.07 },
          { amp: 28, freq: 0.011, speed: 0.019, phase: 1.8, yOff: 0.56, opacity: 0.055 },
          { amp: 50, freq: 0.005, speed: 0.008, phase: 3.6, yOff: 0.62, opacity: 0.045 },
          { amp: 22, freq: 0.014, speed: 0.024, phase: 0.9, yOff: 0.68, opacity: 0.035 },
          { amp: 34, freq: 0.009, speed: 0.015, phase: 5.0, yOff: 0.46, opacity: 0.06 },
        ];

    const step = isMobile ? 4 : 2;
    const lerp = (a, b, t) => a + (b - a) * t;

    const draw = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      mouse.current.x = lerp(mouse.current.x, target.current.x, 0.04);
      mouse.current.y = lerp(mouse.current.y, target.current.y, 0.04);
      ctx.clearRect(0, 0, w, h);

      for (const wave of waves) {
        const mxInf = (mouse.current.x - 0.5) * 18;
        const myInf = (mouse.current.y - 0.5) * 12;
        const scrollShift = scroll.current * 0.0008;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += step) {
          const nx = x / w;
          const dist = Math.abs(nx - mouse.current.x);
          const proximity = 1 + (1 - Math.min(dist * 2, 1)) * 0.4;
          const y =
            h * wave.yOff +
            Math.sin(
              x * wave.freq +
                time.current * wave.speed +
                wave.phase +
                scrollShift
            ) *
              wave.amp *
              proximity +
            Math.sin(
              x * wave.freq * 0.5 +
                time.current * wave.speed * 1.4 +
                wave.phase * 0.7
            ) *
              wave.amp *
              0.25 +
            mxInf * Math.sin(x * 0.008 + time.current * 0.015) +
            myInf;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        const grad = ctx.createLinearGradient(
          0,
          h * wave.yOff - wave.amp * 1.5,
          0,
          h
        );
        grad.addColorStop(0, `rgba(59,130,246,${wave.opacity})`);
        grad.addColorStop(0.6, `rgba(59,130,246,${wave.opacity * 0.35})`);
        grad.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = grad;
        ctx.fill();
      }
      time.current += 1;
      raf.current = requestAnimationFrame(draw);
    };

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf.current = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      container.removeEventListener("touchmove", onTouch);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

/* ─────────────────────────────────────────────
   CHAT PANEL
   ───────────────────────────────────────────── */

function ChatPanel({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const history = [...messages, { role: "user", content: userMsg }];
    setMessages(history);
    setLoading(true);

    try {
      /* PRODUCTION: replace with /api/chat → Groq proxy */
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are a concise AI assistant on Zhilaan Rusmawan's portfolio. Answer using ONLY the context below. Keep responses under 3 sentences unless more detail is asked for. Be professional and approachable.\n\nContext:\n${RESUME_CONTEXT}`,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const text =
        data.content
          ?.filter((c) => c.type === "text")
          .map((c) => c.text)
          .join("") || "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again." },
      ]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    "What does Zhilaan build?",
    "Tell me about the Videfly platform",
    "What's his edge AI experience?",
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "min(400px, 92vw)",
        zIndex: 99,
        backdropFilter: "blur(24px) saturate(1.3)",
        WebkitBackdropFilter: "blur(24px) saturate(1.3)",
        background: "rgba(11,15,23,0.88)",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(59,130,246,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui", fontWeight: 600, fontSize: 14, color: "#E2E8F0" }}>
              Ask about me
            </div>
            <div style={{ fontFamily: "'Inter',system-ui", fontSize: 11, color: "#64748B", marginTop: 1 }}>
              AI-powered · based on my resume
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          style={{
            width: 32, height: 32, borderRadius: 8, border: "none",
            background: "rgba(255,255,255,0.04)", color: "#64748B",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", padding: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1, overflowY: "auto", padding: "16px 20px",
          display: "flex", flexDirection: "column", gap: 12,
        }}
      >
        {messages.length === 0 && !loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            <p style={{ fontFamily: "'Inter',system-ui", fontSize: 13, color: "#64748B", margin: "0 0 8px" }}>
              Try asking:
            </p>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(s);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
                style={{
                  textAlign: "left", padding: "10px 14px", borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)", color: "#94A3B8",
                  fontFamily: "'Inter',system-ui", fontSize: 13, cursor: "pointer",
                  transition: "all 0.2s", lineHeight: 1.4,
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.12)";
                  e.target.style.color = "#E2E8F0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.06)";
                  e.target.style.color = "#94A3B8";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%", padding: "10px 14px",
              borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: msg.role === "user" ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${msg.role === "user" ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)"}`,
              fontFamily: "'Inter',system-ui", fontSize: 13, lineHeight: 1.55,
              color: msg.role === "user" ? "#CBD5E1" : "#94A3B8",
              wordBreak: "break-word",
            }}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div
            style={{
              alignSelf: "flex-start", padding: "12px 16px",
              borderRadius: "14px 14px 14px 4px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#64748B",
                  animation: `dotPulse 1.2s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 16px 16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12, padding: "4px 4px 4px 14px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about me..."
            style={{
              flex: 1, border: "none", outline: "none",
              background: "transparent", color: "#E2E8F0",
              fontFamily: "'Inter',system-ui", fontSize: 13, padding: "8px 0",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            aria-label="Send"
            style={{
              width: 34, height: 34, borderRadius: 8, border: "none",
              background: input.trim() && !loading ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.03)",
              color: input.trim() && !loading ? "#60A5FA" : "#475569",
              cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 0, transition: "all 0.2s", flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STATS STRIP — Refactored Glassmorphism
   ───────────────────────────────────────────── */

const stats = [
  { value: "2+", label: "Years building AI systems" },
  { value: "10+", label: "Products & features shipped" },
  { value: "2,500", label: "MAU on production platform" },
];

function StatsStrip() {
  return (
    <div
      className="hero-enter-5"
      style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 clamp(20px, 5vw, 48px) 40px",
        boxSizing: "border-box",
      }}
    >
      {/* Floating Glassmorphic Container */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 24,
          padding: "24px 32px",
          borderRadius: 24,
          /* Deep Frosted Glass Effect */
          background: "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          /* Subtle Border & Highlight */
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: `
            0 20px 40px -15px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
          `,
          boxSizing: "border-box",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              position: "relative",
            }}
          >
            {/* Subtle Divider between items on wider screens */}
            {i > 0 && (
              <div
                className="stat-divider"
                style={{
                  position: "absolute",
                  left: -12,
                  top: "15%",
                  bottom: "15%",
                  width: 1,
                  background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)",
                }}
              />
            )}

            <div
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 38px)",
                color: "#F8FAFC",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                /* Subtle glow on text */
                textShadow: "0 0 20px rgba(59, 130, 246, 0.2)",
              }}
            >
              {stat.value}
            </div>

            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#94A3B8",
                letterSpacing: "0.01em",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION — Main export
   ───────────────────────────────────────────── */

export default function Hero({ chatOpen, setChatOpen }) {
  return (
    <section id="profile">
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "#0B0F17",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes dotPulse {
            0%, 100% { opacity: 0.3; transform: scale(0.85); }
            50% { opacity: 1; transform: scale(1); }
          }
          @keyframes statusPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.85); }
          }

          .hero-enter-1 { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
          .hero-enter-2 { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
          .hero-enter-3 { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
          .hero-enter-4 { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both; }
          .hero-enter-5 { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.75s both; }

          .hero-headline { font-size: clamp(3rem, 7.5vw, 5.5rem); }

          .hero-cta-primary { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
          .hero-cta-primary:hover {
            background: rgba(59,130,246,0.25) !important;
            border-color: rgba(59,130,246,0.35) !important;
            transform: translateY(-2px);
          }
          .hero-cta-secondary { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
          .hero-cta-secondary:hover {
            background: rgba(255,255,255,0.08) !important;
            border-color: rgba(255,255,255,0.18) !important;
            transform: translateY(-2px);
          }
        `}</style>

        <WaveCanvas />

        {/* Radial vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            background:
              "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 0%, #0B0F17 100%)",
          }}
        />

        {/* ── Hero content — left-aligned, responsive padding ── */}
        <main
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            /* FIX: responsive padding — 20px on mobile, 48px on desktop */
            padding: "clamp(100px, 18vh, 160px) clamp(20px, 5vw, 48px) 60px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: 720 }}>
            {/* Badge */}
            <div
              className="hero-enter-1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 16px 7px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22C55E",
                  boxShadow: "0 0 8px rgba(34,197,94,0.5)",
                  animation: "statusPulse 2.4s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#94A3B8",
                }}
              >
                Open for hire
              </span>
            </div>

            {/* Headline */}
            <h1
              className="hero-enter-2"
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700,
                color: "#E2E8F0",
                lineHeight: 0.95,
                margin: "0 0 24px",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Engineering
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(4.2rem, 8vw, 6.8rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Intelligent Systems
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              className="hero-enter-3"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                lineHeight: 1.65,
                color: "#64748B",
                maxWidth: 520,
                margin: "0 0 40px",
                textWrap: "balance",
              }}
            >
              Turning foundation models into reliable products through
              multimodal pipelines, backend infrastructure, computer vision,
              and edge AI.
            </p>

            {/* CTAs */}
            <div
              className="hero-enter-4"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <a
                href="#work"
                className="hero-cta-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 30px",
                  borderRadius: 999,
                  background: "rgba(59,130,246,0.15)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  color: "#93C5FD",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Explore work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M19 12l-7 7-7-7" />
                </svg>
              </a>
              <a
                href="https://github.com/UrFavouriteB0i"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 28px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#CBD5E1",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </main>

        {/* Stats strip — anchored to bottom of hero */}
        <StatsStrip />

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 60, // Reduced from 120
            zIndex: 2,
            background: "linear-gradient(to bottom, transparent, #0B0F17)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Chat panel — now position:fixed so it persists across scroll */}
      <ChatPanel
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </section>
  );
}