import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experienceData = [
  {
    id: "videfly",
    company: "Videfly",
    role: "AI Software Engineer",
    date: "Jan 2025 — Present",
    summary:
      "Own a Kafka-based multimodal generation platform serving 2,500 MAU at ~1,000 jobs/day (peak 1,400+). Cut generation time from 5-7 min to 1-2 min (3-4x throughput), reduced infra costs 25% via token audits and model optimization, and near-zero'd job loss with Redis state sync. Built a customer-facing AI assistant with RAG and MCP used by 500+ daily users, and contributed to 15+ enterprise deals across FMCG, pharma, and tourism verticals.",
    skills: ["Python", "FastAPI", "Kafka", "Redis", "LangGraph", "AWS", "Kubernetes", "GCP"],
    image:
      "https://ipis.ui.ac.id/storage/product_images/xFN612if8ZoXm8Zyuad8WyI5oGZ4sfDYIQuKvEQJ.png",
  },
  {
    id: "freelance",
    company: "Edge AI Freelance",
    role: "AI Solutions Engineer",
    date: "Jun 2024 — Jan 2025",
    summary:
      "Delivered two end-to-end engagements ($2K total): an IoT computer vision system with real-time Telegram alerting, and a retail surveillance platform with motion detection, automated event capture, and a web dashboard. Separately, quantized ResNet to run on ESP32 microcontrollers (520KB SRAM) with custom-annotated datasets for cloud-free edge inference.",
    skills: ["PyTorch", "Edge AI", "TinyML", "Computer Vision", "Python"],
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "festo",
    company: "Festo Indonesia",
    role: "ML Engineer Intern",
    date: "Feb 2023 — Aug 2023",
    summary:
      "Built CNN-based computer vision models for industrial visual analysis — classifying geometric features, color variations, and dimensional characteristics for automated sorting. Documented feasibility assessments to guide deployment decisions for factory automation pipelines.",
    skills: ["TensorFlow", "OpenCV", "Python", "Industrial IoT"],
    image:
      "https://images.seeklogo.com/logo-png/21/1/festo-logo-png_seeklogo-219284.png",
  },
  {
    id: "awg",
    company: "PT. AWG",
    role: "Robotics Engineer Intern",
    date: "Jun 2022 — Aug 2023",
    summary:
      "Programmed AGV control systems in C++/C# with deterministic path-following and localized navigation. Integrated MODBUS protocol for low-level hardware-to-server communication, and contributed to PyTorch/TensorFlow vision pipelines for warehouse sorting and localization.",
    skills: ["C++", "C#", "MODBUS", "PyTorch", "TensorFlow"],
    image: "https://i.imgur.com/0Pwxgif.jpeg",
  },
];

/* Tech icon lookup via Simple Icons CDN */
const skillMeta = {
  Python:          { slug: "python",             bg: "rgba(55,118,171,0.12)", color: "#60A5FA" },
  FastAPI:         { slug: "fastapi",            bg: "rgba(0,150,136,0.12)",  color: "#2DD4BF" },
  Kafka:           { slug: "apachekafka",        bg: "rgba(35,31,32,0.15)",   color: "#94A3B8" },
  LangGraph:       { slug: "langchain",          bg: "rgba(28,60,60,0.15)",   color: "#86EFAC" },
  AWS:             { slug: "amazonwebservices",  bg: "rgba(255,153,0,0.12)",  color: "#FBBF24" },
  GCP:             { slug: "googlecloud",        bg: "rgba(66,133,244,0.12)", color: "#60A5FA" },
  Kubernetes:      { slug: "kubernetes",         bg: "rgba(50,108,229,0.12)", color: "#818CF8" },
  Redis:           { slug: "redis",              bg: "rgba(220,56,45,0.12)",  color: "#F87171" },
  Docker:          { slug: "docker",             bg: "rgba(36,150,237,0.12)", color: "#60A5FA" },
  "C++":           { slug: "cplusplus",          bg: "rgba(0,89,156,0.12)",   color: "#818CF8" },
  PyTorch:         { slug: "pytorch",            bg: "rgba(238,76,44,0.12)",  color: "#FB923C" },
  TinyML:          { slug: "arduino",            bg: "rgba(0,161,200,0.12)",  color: "#22D3EE" },
  "Computer Vision":{ slug: "opencv",            bg: "rgba(92,62,232,0.12)",  color: "#A78BFA" },
  TensorFlow:      { slug: "tensorflow",         bg: "rgba(255,111,0,0.12)",  color: "#FB923C" },
  OpenCV:          { slug: "opencv",             bg: "rgba(92,62,232,0.12)",  color: "#A78BFA" },
  "Industrial IoT":{ slug: "mqtt",               bg: "rgba(128,0,128,0.12)",  color: "#C084FC" },
  ROS:             { slug: "ros",                bg: "rgba(34,49,78,0.15)",   color: "#94A3B8" },
  "Sensor Fusion": { slug: "nvidia",             bg: "rgba(118,185,0,0.12)",  color: "#A3E635" },
  MODBUS:          { slug: "siemens",            bg: "rgba(0,155,116,0.12)",  color: "#34D399" },
  "C#":            { slug: "csharp",             bg: "rgba(35,145,32,0.12)",  color: "#4ADE80" },
  "Edge AI":       { slug: "microchip",          bg: "rgba(0,150,136,0.12)",  color: "#2DD4BF" },
};

/* Skill pill with logo icon */
function SkillPill({ skill }) {
  const meta = skillMeta[skill];
  if (!meta) {
    return (
      <span style={pillStyle}>
        <span style={fallbackLetterStyle}>{skill.charAt(0)}</span>
        {skill}
      </span>
    );
  }
  return (
    <span style={{ ...pillStyle, background: meta.bg, borderColor: meta.bg.replace(/[\d.]+\)$/, "0.25)") }}>
      <img
        src={`https://cdn.simpleicons.org/${meta.slug}/${meta.color.replace("#", "")}`}
        alt={skill}
        width={16}
        height={16}
        style={{ flexShrink: 0 }}
        onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "inline"; }}
      />
      <span style={{ display: "none", ...fallbackLetterStyle }}>{skill.charAt(0)}</span>
      {skill}
    </span>
  );
}

const pillStyle = {
  fontFamily: "'Inter', system-ui",
  fontWeight: 500,
  fontSize: "0.75rem",
  color: "#CBD5E1",
  padding: "6px 12px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  lineHeight: 1,
};

const fallbackLetterStyle = {
  width: 16,
  height: 16,
  borderRadius: 4,
  background: "rgba(255,255,255,0.06)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.65rem",
  fontWeight: 700,
  color: "#94A3B8",
  flexShrink: 0,
};

/* ── Reactive Wave Canvas (unchanged) ── */
function ReactiveWaveCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0 });
  const target = useRef({ x: 0.5, y: 0.5 });
  const lastMouse = useRef({ x: 0.5, y: 0.5, time: Date.now() });
  const raf = useRef(null);
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
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      const now = Date.now();
      const dt = Math.max(now - lastMouse.current.time, 1);
      mouse.current.vx = ((nx - lastMouse.current.x) / dt) * 120;
      mouse.current.vy = ((ny - lastMouse.current.y) / dt) * 120;
      lastMouse.current = { x: nx, y: ny, time: now };
      target.current.x = nx;
      target.current.y = ny;
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    const waves = [
      { amp: 40, freq: 0.007, phase: 0, yOff: 0.5, opacity: 0.07 },
      { amp: 28, freq: 0.011, phase: 1.8, yOff: 0.56, opacity: 0.055 },
      { amp: 50, freq: 0.005, phase: 3.6, yOff: 0.62, opacity: 0.045 },
    ];
    const lerp = (a, b, t) => a + (b - a) * t;
    const draw = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      mouse.current.x = lerp(mouse.current.x, target.current.x, 0.06);
      mouse.current.y = lerp(mouse.current.y, target.current.y, 0.06);
      mouse.current.vx *= 0.88;
      mouse.current.vy *= 0.88;
      ctx.clearRect(0, 0, w, h);
      for (const wave of waves) {
        const currentPhase = wave.phase + mouse.current.x * 5 + mouse.current.vx * 2;
        const mxInf = (mouse.current.x - 0.5) * 30 + mouse.current.vx * 20;
        const myInf = (mouse.current.y - 0.5) * 20 + mouse.current.vy * 20;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 2) {
          const nx = x / w;
          const dist = Math.abs(nx - mouse.current.x);
          const proximity = 1 + (1 - Math.min(dist * 2, 1)) * 0.6;
          const y = h * wave.yOff + Math.sin(x * wave.freq + currentPhase) * wave.amp * proximity + mxInf * Math.sin(x * 0.008) + myInf;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, h * wave.yOff - wave.amp * 1.5, 0, h);
        grad.addColorStop(0, `rgba(59,130,246,${wave.opacity})`);
        grad.addColorStop(0.6, `rgba(59,130,246,${wave.opacity * 0.35})`);
        grad.addColorStop(1, "rgba(59,130,246,0)");
        ctx.fillStyle = grad;
        ctx.fill();
      }
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

/* ── Experience Card ── */
function ExperienceCard({ data, index }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "clamp(340px, 40vw, 500px)",
        height: "clamp(450px, 50vh, 600px)",
        marginTop: `${index * 25}vh`,
        borderRadius: 24,
        background: "rgba(255,255,255,0.01)",
        border: "1px solid rgba(255,255,255,0.04)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 40,
        boxSizing: "border-box",
        transition: "border-color 0.4s ease",
        flexShrink: 0,
      }}
      onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
      onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)")}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.8 }}>
        <img src={data.image} alt={data.company} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(120%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(11,15,23,0.8), rgba(11,15,23,0.95))" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ fontFamily: "'Space Grotesk', system-ui", fontWeight: 600, fontSize: "clamp(1.5rem, 2vw, 2rem)", color: "#F8FAFC", margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>
          {data.company}
        </h3>
        <p style={{ fontFamily: "'Inter', system-ui", fontWeight: 500, fontSize: "1rem", color: "#94A3B8", margin: 0 }}>
          {data.role}
        </p>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "'Inter', system-ui", fontWeight: 400, fontSize: "0.875rem", color: "#64748B", textTransform: "uppercase" }}>
          {data.date}
        </span>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              background: "rgba(11, 15, 23, 0.85)",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 24,
            }}
          >
            <p style={{ fontFamily: "'Inter', system-ui", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.6, color: "#E2E8F0", margin: 0, textAlign: "justify"}}>
              {data.summary}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.skills.map((skill, i) => (
                <SkillPill key={i} skill={skill} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Experience Section ── */
export default function Experience() {
  const containerRef = useRef(null);
  const rawScroll = useRef(0);
  const handleWheel = (e) => {
    const maxScrollLimit = (experienceData.length - 1) * 600;
    rawScroll.current = Math.max(0, Math.min(rawScroll.current + e.deltaY * 1.2, maxScrollLimit));
    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(${-rawScroll.current}px, ${-rawScroll.current * 0.4}px, 0)`;
    }
  };
  return (
    <section onWheel={handleWheel} style={{ height: "100vh", width: "100vw", position: "absolute", top: 0, left: 0, overflow: "hidden", background: "#0B0F17" }}>
      <ReactiveWaveCanvas />
      <div ref={containerRef} style={{ display: "flex", gap: "10vw", padding: "20vh 15vw", willChange: "transform", transition: "transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        {experienceData.map((data, index) => (
          <ExperienceCard key={data.id} data={data} index={index} />
        ))}
      </div>
    </section>
  );
}