import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experienceData = [
  {
    id: "videfly",
    company: "Videfly",
    role: "AI Software Engineer",
    date: "Jan 2025 — Present",
    summary: "Architected a high-throughput Kafka-based AI generation platform processing over 1,000 jobs daily. Reduced generation time by 3-4x and engineered multimodal evaluation pipelines integrating LangGraph and MCP for autonomous agents.",
    skills: ["Python", "FastAPI", "Kafka", "LangGraph", "AWS", "Docker"],
    image: "https://ipis.ui.ac.id/storage/product_images/xFN612if8ZoXm8Zyuad8WyI5oGZ4sfDYIQuKvEQJ.png", // Replaced logo with image link here
  },
  {
    id: "Freelance",
    company: "Edge AI Freelance",
    role: "AI Solutions Engineer",
    date: "Jun 2024 — Jan 2025",
    summary: "Engineered real-time edge inference systems, quantizing ResNet models on ESP32 microcontrollers with 520KB SRAM. Delivered an end-to-end IoT computer vision surveillance platform tailored for MSME retail clients.",
    skills: ["Edge AI", "C++", "PyTorch", "TinyML", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "festo",
    company: "Festo Indonesia",
    role: "ML Engineer Intern",
    date: "Feb 2023 — Aug 2023",
    summary: "Developed convolutional neural network (CNN) models for industrial visual analysis, streamlining automated sorting processes and improving production line defect detection accuracy.",
    skills: ["TensorFlow", "OpenCV", "Python", "Industrial IoT"],
    image: "https://images.seeklogo.com/logo-png/21/1/festo-logo-png_seeklogo-219284.png",
  },
  {
    id: "awg",
    company: "PT. AWG",
    role: "Robotics Engineer Intern",
    date: "Jun 2022 — Aug 2023",
    summary: "Programmed Automated Guided Vehicle (AGV) control systems using C++ and C#. Integrated MODBUS protocols and sensor fusion techniques for robust indoor navigation and mapping.",
    skills: ["C++", "C#", "ROS", "Sensor Fusion", "MODBUS"],
    image: "https://i.imgur.com/0Pwxgif.jpeg",
  },
];

/* Reactive Wave Canvas matching the Hero color palette and responding to mouse velocity */
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
      
      // Calculate pointer velocity and direction
      mouse.current.vx = (nx - lastMouse.current.x) / dt * 120;
      mouse.current.vy = (ny - lastMouse.current.y) / dt * 120;

      lastMouse.current = { x: nx, y: ny, time: now };
      target.current.x = nx;
      target.current.y = ny;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });

    const waves = [
      { amp: 40, freq: 0.007, phase: 0, yOff: 0.50, opacity: 0.07 },
      { amp: 28, freq: 0.011, phase: 1.8, yOff: 0.56, opacity: 0.055 },
      { amp: 50, freq: 0.005, phase: 3.6, yOff: 0.62, opacity: 0.045 },
    ];

    const lerp = (a, b, t) => a + (b - a) * t;

    const draw = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      
      mouse.current.x = lerp(mouse.current.x, target.current.x, 0.06);
      mouse.current.y = lerp(mouse.current.y, target.current.y, 0.06);
      
      // Smoothly decay velocity to a complete stop when mouse stops moving
      mouse.current.vx *= 0.88;
      mouse.current.vy *= 0.88;

      ctx.clearRect(0, 0, w, h);

      for (const wave of waves) {
        // Use velocity to shift phase/offset reactively on mouse movement
        const currentPhase = wave.phase + (mouse.current.x * 5) + (mouse.current.vx * 2);
        const mxInf = (mouse.current.x - 0.5) * 30 + mouse.current.vx * 20;
        const myInf = (mouse.current.y - 0.5) * 20 + mouse.current.vy * 20;
        
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 2) {
          const nx = x / w;
          const dist = Math.abs(nx - mouse.current.x);
          const proximity = 1 + (1 - Math.min(dist * 2, 1)) * 0.6;
          
          const y =
            h * wave.yOff +
            Math.sin(x * wave.freq + currentPhase) * wave.amp * proximity +
            mxInf * Math.sin(x * 0.008) +
            myInf;
            
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
      {/* Replaced massive background logo with an image backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.8,
        }}
      >
        <img
          src={data.image}
          alt={data.company}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(120%)" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(11,15,23,0.8), rgba(11,15,23,0.95))",
          }}
        />
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
            <p style={{ fontFamily: "'Inter', system-ui", fontWeight: 400, fontSize: "1.05rem", lineHeight: 1.6, color: "#E2E8F0", margin: 0 }}>
              {data.summary}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{ fontFamily: "'Inter', system-ui", fontWeight: 500, fontSize: "0.75rem", color: "#94A3B8", padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const rawScroll = useRef(0);

  const handleWheel = (e) => {
    const maxScrollLimit = (experienceData.length - 1) * 600;
    rawScroll.current = Math.max(0, Math.min(rawScroll.current + e.deltaY * 1.2, maxScrollLimit));
    
    // Smooth translation effect on the track container manually or via state/ref translation
    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(${-rawScroll.current}px, ${-rawScroll.current * 0.4}px, 0)`;
    }
  };

  return (
    <section
      onWheel={handleWheel}
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
        background: "#0B0F17",
      }}
    >
      <ReactiveWaveCanvas />

      {/* The moving track */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          gap: "10vw",
          padding: "20vh 15vw",
          willChange: "transform",
          transition: "transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {experienceData.map((data, index) => (
          <ExperienceCard key={data.id} data={data} index={index} />
        ))}
      </div>
    </section>
  );
}