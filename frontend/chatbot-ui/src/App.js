import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your Public Sector Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");

    // Temporary bot reply (will connect to backend later)
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

  return (
    <div className="app">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <span className="bot-avatar">🤖</span>
          <div>
            <h2>Public Sector Assistant</h2>
            <span className="status">● Online</span>
          </div>
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