import { useState } from "react";
import "./App.css";
import Navbar from "./Component/Header";
import Hero from "./Component/Hero";
// import Experience from "./Component/Experience";
// import Work from "./Component/Work";
// import Stack from "./Component/Stack";
import Footer from "./Component/Footer";

function App() {
  /* Chat state lives here so Navbar can toggle it
     and Hero's ChatPanel can read/close it */
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div
      style={{
        background: "#0B0F17",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Navbar — fixed, persists across all sections */}
      <Navbar
        onChatToggle={() => setChatOpen((prev) => !prev)}
        chatOpen={chatOpen}
      />

      {/* Sections */}
      <Hero chatOpen={chatOpen} setChatOpen={setChatOpen} />

      {/* Uncomment as you build each section: */}
      {/* <Experience /> */}
      {/* <Work /> */}
      {/* <Stack /> */}

      <Footer />
    </div>
  );
}

export default App;