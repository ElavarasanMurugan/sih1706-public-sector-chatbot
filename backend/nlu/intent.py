import re

# Intent patterns
intents = {
    "leave_balance": [
        "leave balance", "how many leaves", "remaining leaves",
        "leave days", "annual leave", "sick leave"
    ],
    "hr_policy": [
        "hr policy", "human resource", "policy", "rules",
        "regulation", "guidelines", "code of conduct"
    ],
    "it_support": [
        "it support", "technical issue", "computer problem",
        "software", "hardware", "password reset", "network",
        "internet", "laptop", "system"
    ],
    "benefits": [
        "benefits", "medical", "insurance", "health",
        "provident fund", "pf", "gratuity", "allowance"
    ],
    "events": [
        "events", "holiday", "celebration", "festival",
        "meeting", "schedule", "calendar", "upcoming"
    ],
    "greeting": [
        "hello", "hi", "hey", "good morning",
        "good afternoon", "good evening", "howdy"
    ]
}

# Responses for each intent
responses = {
    "leave_balance": "You currently have 12 annual leaves and 7 sick leaves remaining. To apply for leave, please visit the HR portal or contact your manager.",
    "hr_policy": "Our HR policies cover code of conduct, leave management, performance reviews, and workplace safety. You can find the complete policy document on the intranet portal.",
    "it_support": "For IT support, please raise a ticket at helpdesk@organization.gov.in or call the IT helpline at 1800-XXX-XXXX. Response time is within 4 working hours.",
    "benefits": "Employee benefits include medical insurance (self + family), provident fund (12% of basic), gratuity, and annual performance bonus. Contact HR for detailed information.",
    "events": "Upcoming events: Annual Day on March 20th, Team Building Workshop on March 25th. Check the intranet calendar for more details.",
    "greeting": "Hello! 👋 I'm your Public Sector Assistant. I can help you with HR policies, IT support, leave balance, benefits, and more. What can I help you with today?",
    "default": "I'm not sure I understood that. I can help you with HR policies, IT support, leave balance, employee benefits, and company events. Could you please rephrase your question?"
}

def get_intent(message):
    message = message.lower()
    for intent, keywords in intents.items():
        for keyword in keywords:
            if keyword in message:
                return intent
    return "default"

def get_response(message):
    intent = get_intent(message)
    return responses[intent]