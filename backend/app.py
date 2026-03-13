from flask import Flask, request, jsonify
from flask_cors import CORS
from auth.otp import generate_otp, verify_otp
from auth.profanity import check_profanity
from nlu.intent import get_response
from nlu.document import process_document

app = Flask(__name__)
CORS(app)

# ✅ Test route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Public Sector Chatbot API is running!"})

# ✅ Send OTP
@app.route("/send-otp", methods=["POST"])
def send_otp():
    data = request.json
    email = data.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400
    otp = generate_otp(email)
    return jsonify({"message": f"OTP sent to {email}", "otp": otp})

# ✅ Verify OTP
@app.route("/verify-otp", methods=["POST"])
def verify_otp_route():
    data = request.json
    email = data.get("email")
    otp = data.get("otp")
    if verify_otp(email, otp):
        return jsonify({"success": True, "message": "Login successful!"})
    return jsonify({"success": False, "message": "Invalid OTP"}), 401

# ✅ Chat endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message", "")
    if check_profanity(message):
        return jsonify({"response": "⚠️ Please use appropriate language."})
    response = get_response(message)
    return jsonify({"response": response})

# ✅ Document upload endpoint
@app.route("/upload-doc", methods=["POST"])
def upload_doc():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["file"]
    result = process_document(file)
    return jsonify({"summary": result})

if __name__ == "__main__":
    app.run(debug=True, port=5000)