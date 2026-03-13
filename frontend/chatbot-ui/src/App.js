import { useState } from "react";
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

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleFileUpload = (file) => {
    setMessages(prev => [
      ...prev,
      { sender: "user", text: `📄 Uploaded: ${file.name}` },
      { sender: "bot", text: `I've received "${file.name}". I'll analyze and summarize it once the backend is connected!` }
    ]);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "I'm processing your request. Backend coming soon!" }
      ]);
    }, 800);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div className="app">
      <div className="chat-container">

        {/* ✅ Updated Header */}
        <div className="chat-header">
          <div className="bot-avatar">🤖</div>
          <div className="header-info">
            <h2>Public Sector Assistant</h2>
            <span className="status">{userEmail}</span>
          </div>
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              {msg.sender === "bot" && <span className="avatar">🤖</span>}
              <div className="bubble">{msg.text}</div>
              {msg.sender === "user" && <span className="avatar">👤</span>}
            </div>
          ))}
        </div>

        {/* File Upload */}
        <FileUpload onFileUpload={handleFileUpload} />

        {/* Input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button onClick={sendMessage}>Send ➤</button>
        </div>

      </div>
    </div>
  );
}

export default App;