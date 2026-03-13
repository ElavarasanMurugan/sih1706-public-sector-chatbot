from better_profanity import profanity

# Load default profanity list
profanity.load_censor_words()

def check_profanity(text):
    """Returns True if profanity is detected"""
    return profanity.contains_profanity(text)

def censor_text(text):
    """Returns censored version of text"""
    return profanity.censor(text)