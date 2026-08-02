import { useState } from "react";

/* ─────────────────────────────────────────────
   GLASS NAVBAR — Global, fixed-position.
   Rendered at App level, persists across scroll.
   ───────────────────────────────────────────── */

export default function Navbar({ onChatToggle, chatOpen }) {
  const [hovering, setHovering] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Profile", href: "#profile" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Stack", href: "#stack" },
  ];

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navBtnStyle = (label) => ({
    padding: "10px 20px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontFamily: "'Inter', system-ui, sans-serif",
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: "-0.01em",
    color: hovering === label ? "#E2E8F0" : "#64748B",
    background: hovering === label ? "rgba(255,255,255,0.06)" : "transparent",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
  });

  return (
    <>
      <style>{`
        .glass-nav-desktop { display: none; }
        .glass-nav-mobile-toggle { display: flex; }
        @media (min-width: 768px) {
          .glass-nav-desktop { display: flex !important; }
          .glass-nav-mobile-toggle { display: none !important; }
        }
      `}</style>

      {/* ── Desktop pill nav ── */}
      <nav
        className="glass-nav-desktop"
        style={{
          position: "fixed",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          backdropFilter: "blur(16px) saturate(1.4)",
          WebkitBackdropFilter: "blur(16px) saturate(1.4)",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 999,
          padding: "6px 8px",
          gap: 4,
          alignItems: "center",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {navItems.map(({ label, href }) => (
          <button
            key={label}
            onClick={() => scrollTo(href)}
            onMouseEnter={() => setHovering(label)}
            onMouseLeave={() => setHovering(null)}
            style={navBtnStyle(label)}
          >
            {label}
          </button>
        ))}

        <div
          style={{
            width: 1,
            height: 20,
            background: "rgba(255,255,255,0.08)",
            margin: "0 4px",
          }}
        />

        <button
          onClick={onChatToggle}
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 13,
            color: chatOpen ? "#60A5FA" : "#64748B",
            background: chatOpen
              ? "rgba(59,130,246,0.12)"
              : "transparent",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            outline: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseEnter={(e) => {
            if (!chatOpen) {
              e.currentTarget.style.color = "#E2E8F0";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }
          }}
          onMouseLeave={(e) => {
            if (!chatOpen) {
              e.currentTarget.style.color = "#64748B";
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Ask AI
        </button>
      </nav>

      {/* ── Mobile toggle ── */}
      <button
        className="glass-nav-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 101,
          width: 44,
          height: 44,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(11,15,23,0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#E2E8F0",
          padding: 0,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {mobileOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </>
          )}
        </svg>
      </button>

      {/* ── Mobile fullscreen nav ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(11,15,23,0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {navItems.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              style={{
                padding: "14px 40px",
                borderRadius: 999,
                border: "none",
                background: "transparent",
                color: "#94A3B8",
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 20,
                cursor: "pointer",
                outline: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#E2E8F0")}
              onMouseLeave={(e) => (e.target.style.color = "#94A3B8")}
            >
              {label}
            </button>
          ))}

          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(255,255,255,0.08)",
              margin: "8px 0",
            }}
          />

          <button
            onClick={() => {
              setMobileOpen(false);
              onChatToggle();
            }}
            style={{
              padding: "14px 40px",
              borderRadius: 999,
              border: "none",
              background: "transparent",
              color: chatOpen ? "#60A5FA" : "#94A3B8",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 20,
              cursor: "pointer",
              outline: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Ask AI
          </button>
        </div>
      )}
    </>
  );
}