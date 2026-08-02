// import React from "react";
// import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"; // Import icons from react-icons
// import { FaXTwitter } from "react-icons/fa6";

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-t from-black via-black/80 to-transparent py-24">
//       <div className="container mx-auto flex justify-center space-x-6">
//         {/* GitHub */}
//         <a
//           href="https://github.com/UrFavouriteB0i"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-gray-400 hover:text-violet-800 transition duration-300"
//         >
//           <FaGithub size={30} />
//         </a>

//         {/* Instagram */}
//         <a
//           href="https://instagram.com/zhilaanabdrrsyd"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-gray-400 hover:text-violet-800 transition duration-300"
//         >
//           <FaInstagram size={30} />
//         </a>

//         {/* LinkedIn */}
//         <a
//           href="https://linkedin.com/in/zhilaan-rusmawan"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-gray-400 hover:text-violet-800 transition duration-300"
//         >
//           <FaLinkedin size={30} />
//         </a>

//         {/* Twitter */}
//         <a
//           href="https://x.com/Zhilaan_abdrsyd"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-gray-400 hover:text-violet-800 transition duration-300"
//         >
//           <FaXTwitter size={30} />
//         </a>
//       </div>
//     </footer>
//   );
// }
import React from "react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/UrFavouriteB0i",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/zhilaan-rusmawan",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/Zhilaan_abdrsyd",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:zhilaanabdrsyd@gmail.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0B0F17",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px clamp(20px, 5vw, 48px) 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Top row: name + socials */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          {/* Left: identity */}
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "#E2E8F0",
                letterSpacing: "-0.02em",
              }}
            >
              Zhilaan Rusmawan
            </div>
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: 13,
                color: "#64748B",
                marginTop: 4,
              }}
            >
              AI Software Engineer · Jakarta, Indonesia
            </div>
          </div>

          {/* Right: social links */}
          <div style={{ display: "flex", gap: 8 }}>
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748B",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#E2E8F0";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#64748B";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 12,
              color: "#475569",
            }}
          >
            © {new Date().getFullYear()} Zhilaan Rusmawan
          </span>
          <a
            href="mailto:zhilaanabdrsyd@gmail.com"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#64748B",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#E2E8F0")}
            onMouseLeave={(e) => (e.target.style.color = "#64748B")}
          >
            zhilaanabdrsyd@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}