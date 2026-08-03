import { useState } from "react";
import "./App.css";
import Navbar from "./Component/Header";
import Hero from "./Component/Hero";
import Experience from "./Component/Exp";
import Work from "./Component/Works";
// import Stack from "./Component/Stack";
import Footer from "./Component/Footer";

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [currentView, setCurrentView] = useState("profile");

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
        {currentView === "profile" && (
          <Hero chatOpen={chatOpen} setChatOpen={setChatOpen} />
        )}
        
        {currentView === "experience" && (
          <Experience chatOpen={chatOpen} setChatOpen={setChatOpen}/>
        )}
        {currentView === "work" && (
          <Work chatOpen={chatOpen} setChatOpen={setChatOpen}/>
        )}
        {/* {currentView === "stack" && <Stack />} */}
      </div>

      <Footer />
    </div>
  );
}

export default App;