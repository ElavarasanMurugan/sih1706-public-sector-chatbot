import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleOtpSubmit = () => {
    if (otp === "123456") {
      onLogin(email);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="login-icon">🤖</div>
          <h2>Public Sector Assistant</h2>
          <p>Secure 2FA Authentication Required</p>
        </div>

        <div className="step-indicator">
          <div className={`step ${step >= 1 ? "active" : ""}`} />
          <div className={`step ${step >= 2 ? "active" : ""}`} />
        </div>

        {step === 1 && (
          <div className="login-form">
            <label>Work Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="you@organization.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
              />
            </div>
            {error && <span className="error">{error}</span>}
            <button onClick={handleEmailSubmit}>Send OTP to Email ➤</button>
            <p className="demo-hint">Demo OTP: <span>123456</span></p>
          </div>
        )}

        {step === 2 && (
          <div className="login-form">
            <label>OTP sent to <strong>{email}</strong></label>
            <div className="input-wrapper">
              <span className="input-icon">🔐</span>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleOtpSubmit()}
              />
            </div>
            {error && <span className="error">{error}</span>}
            <button onClick={handleOtpSubmit}>Verify & Login ✓</button>
            <button className="resend" onClick={() => { setStep(1); setError(""); }}>
              ← Change Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;