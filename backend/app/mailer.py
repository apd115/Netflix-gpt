def send_password_reset_email(to_email: str, link: str) -> None:
    """Development 'email': print it to the terminal.

    In production this one function is the only thing you would change: call a
    mail service (SendGrid, SES, Resend...) here instead of printing."""
    print(f"\n=== PASSWORD RESET EMAIL to {to_email} ===\n{link}\n", flush=True)
