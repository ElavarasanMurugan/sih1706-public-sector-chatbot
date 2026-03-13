import { useState, useEffect, useRef } from "react";
import Login from "./Login";
import FileUpload from "./FileUpload";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your Public Sector Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleFileUpload = async (file) => {
    setMessages(prev => [
      ...prev,
      { sender: "user", text: `📄 Uploaded: ${file.name}` }
    ]);
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:5000/upload-doc", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.summary || "Could not process document." }
      ]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Could not connect to server. Make sure the backend is running!" }
      ]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Could not connect to server. Make sure the backend is running!" }
      ]);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#070714",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', sans-serif",
      backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(132,94,247,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,201,167,0.12) 0%, transparent 50%)"
    }}>
      <div style={{
        width: "440px",
        height: "650px",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "28px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}>

        {/* Header */}
        <div style={{
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.03)",
          position: "relative"
        }}>
          <div style={{
            width: "44px", height: "44px",
            background: "linear-gradient(135deg, #845EF7, #00C9A7)",
            borderRadius: "14px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", flexShrink: 0,
            boxShadow: "0 8px 20px rgba(132,94,247,0.4)"
          }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>
              Public Sector Assistant
            </div>
            <div style={{ fontSize: "11px", color: "#00C9A7", fontWeight: 600, marginTop: "2px" }}>
              ● {userEmail}
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "11px",
              cursor: "pointer",
              fontWeight: 600
            }}>Logout</button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "20px",
          display: "flex", flexDirection: "column", gap: "14px"
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
              flexDirection: msg.sender === "user" ? "row-reverse" : "row"
            }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "10px",
                background: msg.sender === "bot"
                  ? "linear-gradient(135deg, #845EF7, #00C9A7)"
                  : "rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "15px", flexShrink: 0
              }}>
                {msg.sender === "bot" ? "🤖" : "👤"}
              </div>
              <div style={{
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius: msg.sender === "bot"
                  ? "18px 18px 18px 4px"
                  : "18px 18px 4px 18px",
                fontSize: "13.5px",
                lineHeight: 1.6,
                fontWeight: 500,
                background: msg.sender === "bot"
                  ? "rgba(255,255,255,0.07)"
                  : "linear-gradient(135deg, #845EF7, #6040d4)",
                color: "#fff",
                border: msg.sender === "bot" ? "1px solid rgba(255,255,255,0.08)" : "none",
                boxShadow: msg.sender === "user" ? "0 4px 20px rgba(132,94,247,0.35)" : "none"
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "10px",
                background: "linear-gradient(135deg, #845EF7, #00C9A7)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px"
              }}>🤖</div>
              <div style={{
                padding: "14px 18px",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "18px 18px 18px 4px",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", gap: "5px", alignItems: "center"
              }}>
                {[0, 0.2, 0.4].map((delay, i) => (
                  <div key={i} style={{
                    width: "7px", height: "7px",
                    background: "rgba(255,255,255,0.4)",
                    borderRadius: "50%",
                    animation: "bounce 1.2s infinite",
                    animationDelay: `${delay}s`
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* File Upload */}
        <FileUpload onFileUpload={handleFileUpload} />

        {/* Input */}
        <div style={{
          padding: "14px 16px",
          display: "flex", gap: "10px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)"
        }}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              padding: "12px 18px",
              color: "#fff",
              fontSize: "13.5px",
              outline: "none",
              fontFamily: "inherit"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: "linear-gradient(135deg, #845EF7, #00C9A7)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              padding: "12px 20px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 700,
              boxShadow: "0 4px 15px rgba(132,94,247,0.3)"
            }}>Send ➤</button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;