import { useState, useEffect, useRef } from "react";
import API_URL from "../config";

/* ─────────────────────────────────────────────
   CHAT PANEL — Slide-in panel for AI chat
   ───────────────────────────────────────────── */

export default function ChatPanel({ isOpen, onClose }) {
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
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages,
        }),
      });
      const result = await res.json();
      // API returns { response: string, blocked: boolean }
      const reply = result.response || "Something went wrong. Try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
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
    <>
      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Backdrop overlay for mobile & click outside */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 998,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(400px, 92vw)",
          zIndex: 999,
          backdropFilter: "blur(24px) saturate(1.3)",
          WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          background: "rgba(11,15,23,0.92)",
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
    </>
  );
}
