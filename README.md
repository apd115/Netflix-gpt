#Netflix-gpt

Login Page -

1.Login Form
- The top section of the login page includes a custom header that displays the Netflix logo, giving the UI a familiar and polished look.
- A single, versatile form is used for both login and sign-up functionalities. The form dynamically adapts based on user action, reducing redundancy and improving maintainability.
- Users can seamlessly switch between login and sign-up modes through a simple toggle mechanism (e.g., a button or link), with the form fields and button labels updating accordingly.

2.Validating User Name, Email and Password - 
- Implemented form validation using useRef() and regular expressions for username, email, and password inputs to ensure input correctness and user-friendly error handling.

Created Redux Store for storing user info.
Divided it into slices i.e. userSlice.
