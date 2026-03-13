import PyPDF2
import io

def extract_text_from_pdf(file):
    """Extract text from uploaded PDF file"""
    text = ""
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
    except Exception as e:
        return f"Error reading PDF: {str(e)}"
    return text

def summarize_text(text, max_sentences=5):
    """Simple extractive summarizer"""
    sentences = text.replace("\n", " ").split(". ")
    sentences = [s.strip() for s in sentences if len(s.strip()) > 30]
    if not sentences:
        return "Could not extract meaningful content from the document."
    # Return first few sentences as summary
    summary = ". ".join(sentences[:max_sentences])
    return summary + "."

def process_document(file):
    """Main function to process uploaded document"""
    filename = file.filename.lower()
    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(file)
    elif filename.endswith(".txt"):
        text = file.read().decode("utf-8")
    else:
        return "Unsupported file format. Please upload PDF or TXT files."

    if not text.strip():
        return "The document appears to be empty or unreadable."

    summary = summarize_text(text)
    word_count = len(text.split())
    return f"📄 Document Summary:\n\n{summary}\n\n📊 Document Stats: {word_count} words, {len(text.split(chr(10)))} lines."