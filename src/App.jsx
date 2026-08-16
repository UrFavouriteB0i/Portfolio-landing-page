import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Component/Header";
import Hero from "./Component/Hero";
import Experience from "./Component/Exp";
import Work from "./Component/Works";
import Stack from "./Component/Stacks";
import Footer from "./Component/Footer";
import ChatPanel from "./Component/ChatPanel";
import API_URL from "./config";

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [currentView, setCurrentView] = useState("profile");

  // Pre-warm HF Space on page load so chatbot is instant
  useEffect(() => {
    fetch(`${API_URL}/info`).catch(() => {});
  }, []);

  return (
    <div
      style={{
        background: "#0B0F17",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Navbar
        onChatToggle={() => setChatOpen((prev) => !prev)}
        chatOpen={chatOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, width: "100%" }}>
        {currentView === "profile" && <Hero />}
        {currentView === "experience" && <Experience />}
        {currentView === "work" && <Work />}
        {currentView === "stack" && <Stack />}
      </div>

      {/* Chat panel — fixed position, works across all views */}
      <ChatPanel
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />

      <Footer />
    </div>
  );
}

export default App;