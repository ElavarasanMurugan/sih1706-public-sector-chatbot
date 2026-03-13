# HR Policy Knowledge Base
hr_policies = {
    "leave_policy": """
    Leave Policy:
    - Annual Leave: 20 days per year
    - Sick Leave: 12 days per year
    - Casual Leave: 8 days per year
    - Maternity Leave: 180 days
    - Paternity Leave: 15 days
    - Apply via HR portal 3 days in advance
    """,
    "work_hours": """
    Working Hours:
    - Monday to Friday: 9:00 AM - 6:00 PM
    - Saturday: 9:00 AM - 2:00 PM (alternate)
    - Lunch Break: 1:00 PM - 2:00 PM
    - Overtime requires prior manager approval
    """,
    "code_of_conduct": """
    Code of Conduct:
    - Maintain professional behavior at all times
    - Respect all colleagues regardless of position
    - No discrimination or harassment of any kind
    - Protect confidential organization information
    - Report violations to HR immediately
    """
}

# IT Support Knowledge Base
it_support = {
    "password_reset": """
    Password Reset:
    - Visit: https://helpdesk.organization.gov.in
    - Click 'Forgot Password'
    - Enter your employee ID
    - OTP will be sent to registered email
    - Or call IT helpdesk: 1800-XXX-XXXX
    """,
    "vpn_setup": """
    VPN Setup:
    - Download Cisco AnyConnect from intranet
    - Server: vpn.organization.gov.in
    - Use your employee credentials
    - Contact IT support for access issues
    """,
    "software_request": """
    Software Request:
    - Raise a ticket on the IT portal
    - Get manager approval first
    - Processing time: 3-5 working days
    - Emergency requests: Call IT helpdesk
    """
}

def get_hr_policy(topic):
    return hr_policies.get(topic, "Policy not found. Please contact HR directly.")

def get_it_support(topic):
    return it_support.get(topic, "Solution not found. Please contact IT helpdesk.")