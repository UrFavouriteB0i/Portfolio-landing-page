import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Tech Stack Data — tighter domain clusters
   ───────────────────────────────────────────────────────────── */
const stackData = [
  // Core hub
  { id: "python",     name: "Python",          slug: "python",            color: "#60A5FA", proficiency: 90, size: 100, x: 48, y: 42, connections: ["fastapi","pytorch","tensorflow","kafka","langgraph","cv"] },
  // ML / AI cluster (upper-left)
  { id: "pytorch",    name: "PyTorch",         slug: "pytorch",           color: "#FB923C", proficiency: 60, size: 84,  x: 32, y: 24, connections: ["python","tensorflow","cv","onnx","tinyml"] },
  { id: "tensorflow", name: "TensorFlow",       slug: "tensorflow",        color: "#FB923C", proficiency: 50, size: 78,  x: 22, y: 42, connections: ["python","pytorch","cv","onnx"] },
  { id: "cv",         name: "Comp Vision",      slug: "opencv",            color: "#A78BFA", proficiency: 50, size: 78,  x: 14, y: 28, connections: ["python","pytorch","tensorflow","opencv","tinyml"] },
  { id: "langgraph",  name: "LangGraph",        slug: "langchain",         color: "#86EFAC", proficiency: 40, size: 70,  x: 34, y: 54, connections: ["python","kafka"] },
  { id: "opencv",     name: "OpenCV",           slug: "opencv",            color: "#A78BFA", proficiency: 25, size: 60,  x: 12, y: 48, connections: ["cv","python","pytorch"] },
  { id: "onnx",       name: "ONNX",             slug: "onnx",              color: "#005CED", proficiency: 20, size: 58,  x: 20, y: 60, connections: ["pytorch","tensorflow","edgeai"] },
  { id: "tinyml",     name: "TinyML",           slug: "arduino",           color: "#22D3EE", proficiency: 20, size: 58,  x: 34, y: 68, connections: ["pytorch","cv","edgeai","esp32"] },
  // Backend / Data cluster (upper-right)
  { id: "fastapi",    name: "FastAPI",          slug: "fastapi",           color: "#2DD4BF", proficiency: 55, size: 80,  x: 62, y: 26, connections: ["python","kafka","redis","aws"] },
  { id: "kafka",      name: "Kafka",            slug: "apachekafka",       color: "#94A3B8", proficiency: 45, size: 72,  x: 54, y: 14, connections: ["python","fastapi","redis"] },
  { id: "redis",      name: "Redis",            slug: "redis",             color: "#F87171", proficiency: 45, size: 72,  x: 42, y: 16, connections: ["kafka","fastapi","python"] },
  { id: "postgres",   name: "PostgreSQL",       slug: "postgresql",        color: "#60A5FA", proficiency: 25, size: 60,  x: 58, y: 56, connections: ["fastapi","python"] },
  // Cloud / Infra cluster (right)
  { id: "aws",        name: "AWS",              slug: null,               color: "#FBBF24", proficiency: 55, size: 80,  x: 74, y: 38, connections: ["fastapi","kubernetes","kafka","gcp"],
    svg: <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path fill="currentColor" d="M7.64 10.38c0 .25.02.45.07.62c.05.12.12.28.21.46c.04.04.05.1.05.15c0 .07-.04.13-.13.2l-.42.28c-.06.04-.12.06-.17.06c-.07 0-.13-.04-.2-.1c-.09-.1-.17-.2-.24-.31c-.06-.11-.13-.24-.2-.39c-.52.61-1.17.92-1.96.92c-.56 0-1-.16-1.33-.48c-.32-.32-.49-.75-.49-1.29c0-.55.2-1 .6-1.36c.41-.34.95-.52 1.63-.52c.23 0 .44.02.71.06c.23.03.5.08.76.14v-.48c0-.51-.1-.84-.31-1.07c-.22-.21-.57-.3-1.08-.3c-.24 0-.48.03-.72.08c-.25.06-.49.13-.72.23c-.11.04-.2.07-.23.08c-.05.02-.08.02-.11.02c-.09 0-.14-.06-.14-.2v-.33c0-.1.01-.18.05-.23q.045-.075.18-.12c.24-.14.51-.24.84-.32a4 4 0 0 1 1.04-.13q1.185 0 1.74.54c.37.36.55.91.55 1.64v2.15zm-2.7 1.02c.22 0 .44-.04.68-.12s.45-.23.63-.43c.11-.13.19-.27.25-.43c0-.16.05-.35.05-.58v-.27c-.2-.07-.4-.07-.62-.12a7 7 0 0 0-.62-.04c-.45 0-.77.09-.99.27s-.32.43-.32.76c0 .32.07.56.24.71c.16.17.39.25.7.25m5.34.71a.6.6 0 0 1-.28-.06c-.03-.05-.08-.14-.12-.26L8.32 6.65c-.04-.15-.06-.22-.06-.27c0-.11.05-.17.16-.17h.65c.13 0 .22.02.26.07c.06.04.1.13.14.26l1.11 4.4l1.04-4.4c.03-.13.07-.22.13-.26c.05-.04.14-.07.25-.07h.55c.12 0 .21.02.26.07c.05.04.1.13.13.26L14 11l1.14-4.46c.04-.13.09-.22.13-.26c.06-.04.14-.07.26-.07h.62c.11 0 .17.06.17.17c0 .03-.01.07-.02.12c0 0-.02.08-.04.15l-1.61 5.14c-.04.14-.08.21-.15.26c-.04.04-.13.07-.24.07h-.57c-.13 0-.19-.02-.27-.07a.45.45 0 0 1-.12-.26L12.27 7.5l-1.03 4.28q-.045.195-.12.27a.5.5 0 0 1-.27.06zm8.55.18c-.33 0-.7-.04-1.03-.12s-.59-.17-.76-.26a.5.5 0 0 1-.21-.19a.4.4 0 0 1-.04-.18v-.34c0-.14.05-.2.15-.2h.12c.04 0 .1.05.17.08c.22.1.47.18.73.23c.27.05.54.08.79.08c.42 0 .75-.07.97-.22c.23-.17.35-.36.35-.63c0-.19-.07-.34-.18-.47c-.12-.12-.35-.24-.67-.34l-.97-.3c-.48-.16-.84-.38-1.06-.68a1.58 1.58 0 0 1-.33-.97c0-.28.06-.52.18-.73c.12-.22.28-.4.46-.55c.22-.15.44-.26.71-.34q.39-.12.84-.12q.21 0 .45.03c.14.02.28.05.42.07c.14.04.26.07.38.11s.2.08.28.12c.09.05.16.1.2.16s.06.13.06.22v.32q0 .21-.15.21c-.05 0-.14-.03-.26-.08c-.37-.17-.8-.26-1.27-.26c-.38 0-.66.06-.89.19c-.2.12-.31.32-.31.59c0 .19.07.35.2.47c.13.13.38.25.73.37l.95.3c.48.14.82.36 1.03.64q.3.405.3.93c0 .28-.06.54-.17.77c-.12.22-.28.42-.5.58c-.19.17-.44.29-.72.38s-.62.13-.95.13m1.25 3.24C17.89 17.14 14.71 18 12 18c-3.85 0-7.3-1.42-9.91-3.77c-.21-.19-.02-.44.23-.29c2.82 1.63 6.29 2.62 9.89 2.62c2.43 0 5.1-.5 7.55-1.56c.37-.15.68.26.32.53M21 14.5c-.29-.37-1.86-.18-2.57-.1c-.21.03-.24-.16-.05-.3c1.25-.87 3.31-.6 3.54-.33c.24.3-.06 2.36-1.23 3.34c-.19.15-.36.07-.28-.11c.27-.68.86-2.16.59-2.5" /></svg> },
  { id: "gcp",        name: "GCP",              slug: "googlecloud",       color: "#60A5FA", proficiency: 35, size: 68,  x: 82, y: 22, connections: ["aws","kubernetes","cv"] },
  { id: "kubernetes", name: "Kubernetes",       slug: "kubernetes",        color: "#818CF8", proficiency: 30, size: 66,  x: 80, y: 50, connections: ["aws","gcp","docker"] },
  { id: "docker",     name: "Docker",           slug: "docker",            color: "#60A5FA", proficiency: 30, size: 62,  x: 70, y: 60, connections: ["kubernetes","aws"] },
  // Edge / IoT cluster (bottom-center)
  { id: "cpp",        name: "C++",              slug: "cplusplus",         color: "#818CF8", proficiency: 35, size: 68,  x: 22, y: 72, connections: ["ros","esp32"] },
  { id: "edgeai",     name: "Edge AI",          slug: "nvidia",            color: "#76B900", proficiency: 35, size: 68,  x: 44, y: 76, connections: ["pytorch","tinyml","esp32","onnx"] },
  { id: "esp32",      name: "ESP32",            slug: "espressif",         color: "#E7352C", proficiency: 15, size: 54,  x: 56, y: 78, connections: ["cpp","edgeai","tinyml"] },
  { id: "ros",        name: "ROS",              slug: "ros",               color: "#94A3B8", proficiency: 25, size: 60,  x: 12, y: 68, connections: ["cpp","modbus"] },
  { id: "modbus",     name: "MODBUS",           slug: "siemens",           color: "#34D399", proficiency: 15, size: 54,  x: 14, y: 82, connections: ["ros","cpp"] },
];

/* ─────────────────────────────────────────────────────────────
   Precomputed unique connection lines
   ───────────────────────────────────────────────────────────── */
const uniqueLines = (() => {
  const seen = new Set();
  const result = [];
  stackData.forEach((t, i) => {
    t.connections.forEach((connId) => {
      const j = stackData.findIndex((s) => s.id === connId);
      if (j === -1 || j <= i) return;
      const key = `${i}-${j}`;
      if (seen.has(key)) return;
      seen.add(key);
      result.push({ from: i, to: j });
    });
  });
  return result;
})();

/* ─────────────────────────────────────────────────────────────
   Hex → RGB helper
   ───────────────────────────────────────────────────────────── */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

/* ─────────────────────────────────────────────────────────────
   TechNode — glassmorphic floating node
   ───────────────────────────────────────────────────────────── */
function TechNode({ tech, isHovered, isConnected, onHover, onLeave }) {
  const rgb = useMemo(() => hexToRgb(tech.color), [tech.color]);
  const expanded = isHovered;
  const baseSize = tech.size;
  const expandedSize = baseSize * 2.2;
  const defaultScale = baseSize / expandedSize;
  const targetScale = expanded ? 1 : isConnected ? defaultScale * 1.05 : defaultScale;
  const circumference = Math.PI * (expandedSize - 6);
  const strokeOffset = circumference * (1 - tech.proficiency / 100);

  return (
    <div
      onMouseEnter={() => onHover(tech.id)}
      onMouseLeave={onLeave}
      style={{
        width: expandedSize,
        height: expandedSize,
        borderRadius: "50%",
        transform: `scale(${targetScale})`,
        transformOrigin: "center center",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease, backdrop-filter 0.35s ease",
        backdropFilter: expanded ? "blur(16px) saturate(1.5)" : "blur(12px) saturate(1.3)",
        background: expanded
          ? `rgba(255,255,255,0.06)`
          : `rgba(255,255,255,0.03)`,
        border: `1px solid ${
          expanded
            ? `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`
            : isConnected
            ? `rgba(${rgb.r},${rgb.g},${rgb.b},0.2)`
            : `rgba(255,255,255,0.08)`
        }`,
        boxShadow: expanded
          ? `inset 0 1px 0 0 rgba(255,255,255,0.12), 0 0 ${expandedSize * 0.5}px rgba(${rgb.r},${rgb.g},${rgb.b},0.15), 0 25px 50px -15px rgba(0,0,0,0.5)`
          : `inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 ${baseSize * 0.35}px rgba(${rgb.r},${rgb.g},${rgb.b},0.05)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Proficiency ring */}
      <AnimatePresence>
        {expanded && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: 3, left: 3,
              width: expandedSize - 6,
              height: expandedSize - 6,
              transform: "rotate(-90deg)",
              pointerEvents: "none",
            }}
          >
            <circle
              cx={(expandedSize - 6) / 2}
              cy={(expandedSize - 6) / 2}
              r={(expandedSize - 6) / 2 - 1}
              fill="none"
              stroke={`rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`}
              strokeWidth={2}
            />
            <circle
              cx={(expandedSize - 6) / 2}
              cy={(expandedSize - 6) / 2}
              r={(expandedSize - 6) / 2 - 1}
              fill="none"
              stroke={tech.color}
              strokeWidth={2}
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)" }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Icon — fixed size, scales with parent */}
      <div style={{
        width: 42,
        height: 42,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        flexShrink: 0,
      }}>
        {tech.svg ? (
          tech.svg
        ) : (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.slice(1)}`}
              alt={tech.name}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: expanded ? 0 : 1,
                transition: "opacity 0.25s ease",
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <img
              src={`https://cdn.simpleicons.org/${tech.slug}/ffffff`}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: expanded ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
        )}
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 4,
              pointerEvents: "none",
            }}
          >
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "#E2E8F0",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}>
              {tech.name}
            </span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: tech.color,
              lineHeight: 1,
              marginTop: 2,
              textShadow: `0 0 20px rgba(${rgb.r},${rgb.g},${rgb.b},0.3)`,
            }}>
              {tech.proficiency}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default Label */}
      {!expanded && (
        <span style={{
          position: "absolute",
          bottom: -16,
          fontFamily: "'Inter', sans-serif",
          fontSize: 9,
          color: "#64748B",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: 0.7,
          }}
        >
          {tech.name}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Stacks Component
   ───────────────────────────────────────────────────────────── */
export default function Stacks({ chatOpen, setChatOpen }) {
  const outerRef = useRef(null);
  const nodesContainerRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const linesCanvasRef = useRef(null);
  const nodeRefsMap = useRef({});
  const rafRef = useRef(null);
  const hoveredIdRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const [hoveredId, setHoveredId] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  /* Preload white icon variants so crossfade is instant */
  useEffect(() => {
    stackData.forEach((tech) => {
      if (!tech.svg && tech.slug) {
        const img = new Image();
        img.src = `https://cdn.simpleicons.org/${tech.slug}/ffffff`;
      }
    });
  }, []);

  /* HoveredId sync — state for React, ref for canvas loop */
  const handleHover = useCallback((id) => {
    hoveredIdRef.current = id;
    setHoveredId(id);
  }, []);
  const handleLeave = useCallback(() => {
    hoveredIdRef.current = null;
    setHoveredId(null);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Connection lookup for React hover highlighting */
  const connectedIds = useMemo(() => {
    if (!hoveredId) return new Set();
    const set = new Set();
    const tech = stackData.find((t) => t.id === hoveredId);
    if (tech) {
      tech.connections.forEach((c) => set.add(c));
      set.add(hoveredId);
    }
    return set;
  }, [hoveredId]);

  /* ─── Single animation loop — canvas + line drawing ─── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const bgCanvas = bgCanvasRef.current;
    const linesCanvas = linesCanvasRef.current;
    const nodesContainer = nodesContainerRef.current;
    if (!bgCanvas || !linesCanvas || !nodesContainer) return;

    const bgCtx = bgCanvas.getContext("2d");
    const linesCtx = linesCanvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    /* Canvas resize helper */
    const resize = () => {
      const rect = nodesContainer.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      [bgCanvas, linesCanvas].forEach((c) => {
        c.width = w * dpr;
        c.height = h * dpr;
        c.style.width = w + "px";
        c.style.height = h + "px";
        c.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };
    resize();
    window.addEventListener("resize", resize);

    /* Mouse tracking */
    const onMouse = (e) => {
      const rect = nodesContainer.getBoundingClientRect();
      mouseRef.current.tx = (e.clientX - rect.left) / rect.width;
      mouseRef.current.ty = (e.clientY - rect.top) / rect.height;
    };
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        const rect = nodesContainer.getBoundingClientRect();
        mouseRef.current.tx = (e.touches[0].clientX - rect.left) / rect.width;
        mouseRef.current.ty = (e.touches[0].clientY - rect.top) / rect.height;
      }
    };
    nodesContainer.addEventListener("mousemove", onMouse, { passive: true });
    nodesContainer.addEventListener("touchmove", onTouch, { passive: true });

    /* Background orb definitions */
    const orbs = [
      { x: 0.3, y: 0.35, r: 120, speed: 0.004, phase: 0,    color: [59, 130, 246] },
      { x: 0.7, y: 0.5,  r: 100, speed: 0.003, phase: 2.1,  color: [99, 102, 241] },
      { x: 0.5, y: 0.7,  r: 90,  speed: 0.005, phase: 4.2,  color: [59, 130, 246] },
      { x: 0.2, y: 0.6,  r: 70,  speed: 0.006, phase: 1.4,  color: [139, 92, 246] },
      { x: 0.8, y: 0.3,  r: 80,  speed: 0.004, phase: 3.5,  color: [59, 130, 246] },
    ];

    /* ─── Main draw loop ─── */
    let time = 0;
    const m = mouseRef.current;

    const draw = () => {
      time += 1;

      // Lerp mouse
      m.x += (m.tx - m.x) * 0.02;
      m.y += (m.ty - m.y) * 0.02;

      const w = nodesContainer.getBoundingClientRect().width;
      const h = nodesContainer.getBoundingClientRect().height;

      /* ── 1. Background canvas: reactive glow orbs ── */
      bgCtx.clearRect(0, 0, w, h);
      for (const orb of orbs) {
        const ox = (orb.x + Math.sin(time * orb.speed + orb.phase) * 0.08) * w;
        const oy = (orb.y + Math.cos(time * orb.speed * 0.7 + orb.phase) * 0.06) * h;
        // Subtle mouse pull
        const mx = ox + (m.x * w - ox) * 0.04;
        const my = oy + (m.y * h - oy) * 0.04;
        const grad = bgCtx.createRadialGradient(mx, my, 0, mx, my, orb.r);
        grad.addColorStop(0, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0.035)`);
        grad.addColorStop(0.5, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0.012)`);
        grad.addColorStop(1, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0)`);
        bgCtx.fillStyle = grad;
        bgCtx.beginPath();
        bgCtx.arc(mx, my, orb.r, 0, Math.PI * 2);
        bgCtx.fill();
      }

      /* ── 2. Lines canvas: animated connection lines ── */
      linesCtx.clearRect(0, 0, w, h);
      const hovId = hoveredIdRef.current;
      const hovIdx = hovId ? stackData.findIndex((t) => t.id === hovId) : -1;

      // Read node positions from CSS custom properties
      const positions = stackData.map((tech, i) => {
        const el = nodeRefsMap.current[i];
        if (!el) return { x: (tech.x / 100) * w, y: (tech.y / 100) * h };
        const style = getComputedStyle(el);
        const dx = parseFloat(style.getPropertyValue("--dx")) || 0;
        const dy = parseFloat(style.getPropertyValue("--dy")) || 0;
        return {
          x: (tech.x / 100) * w + dx,
          y: (tech.y / 100) * h + dy,
        };
      });

      // Draw lines
      for (const line of uniqueLines) {
        const a = positions[line.from];
        const b = positions[line.to];
        const isHighlighted = hovIdx !== -1 &&
          (line.from === hovIdx || line.to === hovIdx);

        linesCtx.beginPath();
        linesCtx.moveTo(a.x, a.y);
        linesCtx.lineTo(b.x, b.y);

        if (isHighlighted) {
          linesCtx.strokeStyle = "rgba(59,130,246,0.22)";
          linesCtx.lineWidth = 1.5;
          linesCtx.shadowColor = "rgba(59,130,246,0.12)";
          linesCtx.shadowBlur = 8;
        } else {
          linesCtx.strokeStyle = "rgba(59,130,246,0.05)";
          linesCtx.lineWidth = 0.8;
          linesCtx.shadowColor = "transparent";
          linesCtx.shadowBlur = 0;
        }
        linesCtx.stroke();
      }
      // Reset shadow
      linesCtx.shadowColor = "transparent";
      linesCtx.shadowBlur = 0;

      // Draw glow around hovered node
      if (hovIdx !== -1) {
        const hp = positions[hovIdx];
        const hColor = stackData[hovIdx].color;
        const rgb = hexToRgb(hColor);
        const grad = linesCtx.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, stackData[hovIdx].size * 1.5);
        grad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.06)`);
        grad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
        linesCtx.fillStyle = grad;
        linesCtx.beginPath();
        linesCtx.arc(hp.x, hp.y, stackData[hovIdx].size * 1.5, 0, Math.PI * 2);
        linesCtx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      nodesContainer.removeEventListener("mousemove", onMouse);
      nodesContainer.removeEventListener("touchmove", onTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  /* Node ref callback */
  const setNodeRef = useCallback((idx, el) => {
    nodeRefsMap.current[idx] = el;
  }, []);

  return (
    <div
      ref={outerRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#0B0F17",
      }}
    >
      {/* ── CSS animations for node drift ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        @keyframes stackFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stack-enter-1 { animation: stackFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .stack-enter-2 { animation: stackFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .stack-enter-3 { animation: stackFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s both; }

        @keyframes stackFloatA {
          0%   { --dx:   0px; --dy:   0px; }
          15%  { --dx:  -5px; --dy:  -3px; }
          30%  { --dx:  -2px; --dy:   5px; }
          50%  { --dx:   6px; --dy:   2px; }
          65%  { --dx:   3px; --dy:  -6px; }
          80%  { --dx:  -4px; --dy:  -1px; }
          100% { --dx:   0px; --dy:   0px; }
        }
        @keyframes stackFloatB {
          0%   { --dx:   0px; --dy:   0px; }
          20%  { --dx:   4px; --dy:  -2px; }
          40%  { --dx:  -3px; --dy:   4px; }
          55%  { --dx:  -5px; --dy:  -3px; }
          75%  { --dx:   2px; --dy:   5px; }
          90%  { --dx:   3px; --dy:  -4px; }
          100% { --dx:   0px; --dy:   0px; }
        }
        @keyframes stackFloatC {
          0%   { --dx:  0px;  --dy:  0px; }
          25%  { --dx:  3px;  --dy: -2px; }
          50%  { --dx: -2px;  --dy:  3px; }
          75%  { --dx: -3px;  --dy: -1px; }
          100% { --dx:  0px;  --dy:  0px; }
        }

        .stack-float-node {
          --dx: 0px;
          --dy: 0px;
          animation:
            stackFloatA var(--durA, 22s) ease-in-out var(--delayA, 0s) infinite,
            stackFloatB var(--durB, 30s) ease-in-out var(--delayB, 0s) infinite,
            stackFloatC var(--durC, 12s) ease-in-out var(--delayC, 0s) infinite;
          will-change: --dx, --dy;
        }

        @media (prefers-reduced-motion: reduce) {
          .stack-float-node {
            animation: none !important;
            --dx: 0px;
            --dy: 0px;
          }
        }
      `}</style>

      {/* ── Background canvas ── */}
      <canvas
        ref={bgCanvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Section header ── */}
      <div style={{
        position: "relative",
        zIndex: 20,
        paddingTop: "clamp(100px, 14vh, 140px)",
        paddingBottom: "clamp(12px, 2vh, 24px)",
        textAlign: "center",
        pointerEvents: "none",
      }}>
        <div className="stack-enter-1" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
          fontWeight: 500,
          color: "#3B82F6",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}>
          What I Work With
        </div>
        <h2 className="stack-enter-2" style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
          fontWeight: 700,
          color: "#F8FAFC",
          lineHeight: 1.1,
          margin: 0,
        }}>
          Tech Stacks
        </h2>
        <p className="stack-enter-3" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
          color: "#64748B",
          marginTop: 12,
          maxWidth: 400,
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.6,
        }}>
          Hover a node to explore proficiency across the tools and frameworks I use.
        </p>
      </div>

      {/* ── Nodes container (shared with canvases) ── */}
      <div
        ref={nodesContainerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(520px, 72vh, 720px)",
          zIndex: 10,
        }}
      >
        {/* Lines canvas */}
        <canvas
          ref={linesCanvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Tech nodes */}
        {stackData.map((tech, idx) => {
          const isExp = hoveredId === tech.id;
          // Per-node animation timing variation
          const durA = 18 + (idx * 3.7 % 8);
          const durB = 24 + (idx * 5.3 % 12);
          const durC = 10 + (idx * 2.1 % 5);
          const delayA = (idx * 1.3 % 4);
          const delayB = (idx * 2.7 % 6);
          const delayC = (idx * 0.9 % 3);

          return (
            <div
              key={tech.id}
              ref={(el) => setNodeRef(idx, el)}
              className="stack-float-node"
              style={{
                position: "absolute",
                left: `${tech.x}%`,
                top: `${tech.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isExp ? 50 : 10,
                "--durA": `${durA}s`,
                "--durB": `${durB}s`,
                "--durC": `${durC}s`,
                "--delayA": `${delayA}s`,
                "--delayB": `${delayB}s`,
                "--delayC": `${delayC}s`,
              }}
            >
              <TechNode
                tech={tech}
                isHovered={isExp}
                isConnected={connectedIds.has(tech.id)}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            </div>
          );
        })}
      </div>

      {/* ── Bottom fade ── */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 120,
        background: "linear-gradient(to bottom, transparent, #0B0F17)",
        pointerEvents: "none",
        zIndex: 30,
      }} />
    </div>
  );
}
