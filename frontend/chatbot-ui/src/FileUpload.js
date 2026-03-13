import { useState } from "react";

function FileUpload({ onFileUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    const allowed = ["application/pdf", "text/plain", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      alert("Only PDF, TXT, or DOC files are allowed!");
      return;
    }
    setUploadedFile(file);
    onFileUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      style={{
        margin: "0 14px 10px",
        border: `1.5px dashed ${dragOver ? "#845EF7" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "14px",
        padding: "12px 16px",
        textAlign: "center",
        background: dragOver ? "rgba(132,94,247,0.08)" : "rgba(255,255,255,0.02)",
        transition: "all 0.2s",
        cursor: "pointer"
      }}
    >
      {uploadedFile ? (
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          color: "#00C9A7", fontSize: "13px", fontWeight: 600
        }}>
          <span>📄 {uploadedFile.name}</span>
          <button
            onClick={() => setUploadedFile(null)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "none", color: "rgba(255,255,255,0.4)",
              borderRadius: "99px", width: "22px", height: "22px",
              cursor: "pointer", fontSize: "11px"
            }}>✕</button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "18px" }}>📁</span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>
            Drag & drop a file or
          </span>
          <label style={{
            background: "linear-gradient(135deg, #845EF7, #00C9A7)",
            color: "white", borderRadius: "8px",
            padding: "5px 14px", cursor: "pointer",
            fontSize: "11px", fontWeight: 700, display: "inline-block"
          }}>
            Browse
            <input
              type="file" hidden
              accept=".pdf,.txt,.doc,.docx"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>
          <div style={{ width: "100%", fontSize: "10px", color: "rgba(255,255,255,0.2)", marginTop: "-4px" }}>
            Supports PDF, TXT, DOC (max 10 pages)
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;