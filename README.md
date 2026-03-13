# 🤖 Public Sector Chatbot - SIH1706

A deep learning chatbot built for public sector organizations to handle
employee queries related to HR policies, IT support, leave management,
and document processing.

## 🚀 Features

- 💬 AI-powered chat with intent classification
- 🔐 2-Factor Authentication (Email OTP)
- 📄 Document upload & summarization (PDF/TXT)
- 🤬 Profanity filter
- ⚡ Real-time responses under 5 seconds
- 👥 Scalable for 5+ concurrent users

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Flask (Python) |
| NLP | NLTK, Transformers |
| Auth | PyOTP (2FA) |
| Document Processing | PyPDF2 |
| Profanity Filter | better-profanity |

## 📁 Project Structure
```
sih1706-public-sector-chatbot/
├── backend/
│   ├── app.py              # Flask API server
│   ├── auth/
│   │   ├── otp.py          # 2FA OTP logic
│   │   └── profanity.py    # Bad language filter
│   ├── nlu/
│   │   ├── intent.py       # Intent classification
│   │   └── document.py     # PDF summarizer
│   └── knowledge_base/
│       └── responses.py    # HR/IT knowledge base
├── frontend/
│   └── chatbot-ui/         # React chat interface
├── data/
│   ├── training_data/      # Training datasets
│   └── sample_docs/        # Sample documents
├── requirements.txt
└── README.md
```

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/ElavarasanMurugan/sih1706-public-sector-chatbot.git
cd sih1706-public-sector-chatbot
```

### 2. Setup Backend
```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd backend
python app.py
```

### 3. Setup Frontend
```bash
cd frontend/chatbot-ui
npm install
npm start
```

### 4. Access the app
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔐 Demo Credentials
- Enter any valid email address
- Demo OTP: Check terminal output

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/send-otp` | Send OTP to email |
| POST | `/verify-otp` | Verify OTP |
| POST | `/chat` | Send chat message |
| POST | `/upload-doc` | Upload & summarize document |

## 👨‍💻 Author
Developed for Smart India Hackathon (SIH) 2024
Problem ID: SIH1706