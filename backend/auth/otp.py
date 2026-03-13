import pyotp
import time

# Store OTPs temporarily
otp_store = {}

def generate_otp(email):
    # Generate a 6-digit OTP
    totp = pyotp.TOTP(pyotp.random_base32(), interval=300)
    otp = totp.now()
    # Store OTP with timestamp
    otp_store[email] = {
        "otp": otp,
        "timestamp": time.time()
    }
    print(f"[DEV MODE] OTP for {email}: {otp}")
    return otp

def verify_otp(email, otp):
    if email not in otp_store:
        return False
    stored = otp_store[email]
    # OTP expires after 5 minutes
    if time.time() - stored["timestamp"] > 300:
        del otp_store[email]
        return False
    if stored["otp"] == otp:
        del otp_store[email]
        return True
    return False