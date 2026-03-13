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
      className={`upload-area ${dragOver ? "drag-over" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      {uploadedFile ? (
        <div className="uploaded-file">
          <span>📄 {uploadedFile.name}</span>
          <button onClick={() => setUploadedFile(null)}>✕</button>
        </div>
      ) : (
        <div className="upload-prompt">
          <span>📁</span>
          <p>Drag & drop a file or</p>
          <label className="upload-btn">
            Browse File
            <input
              type="file"
              hidden
              accept=".pdf,.txt,.doc,.docx"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>
          <small>Supports PDF, TXT, DOC (max 10 pages)</small>
        </div>
      )}
    </div>
  );
}

export default FileUpload;