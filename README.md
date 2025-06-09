#Netflix-gpt

Login Page -

1.Login Form
- The top section of the login page includes a custom header that displays the Netflix logo, giving the UI a familiar and polished look.
- A single, versatile form is used for both login and sign-up functionalities. The form dynamically adapts based on user action, reducing redundancy and improving maintainability.
- Users can seamlessly switch between login and sign-up modes through a simple toggle mechanism (e.g., a button or link), with the form fields and button labels updating accordingly.

2.Validating User Name, Email and Password - 
- Implemented form validation using useRef() and regular expressions for username, email, and password inputs to ensure input correctness and user-friendly error handling.

3.Created Redux Store for storing user info.
Divided it into slices i.e. userSlice.

4.Firebase Authentication (Backend as a Service)

Integrated Firebase Authentication to handle user sign-up, login, and logout functionality.

Utilized createUserWithEmailAndPassword, signInWithEmailAndPassword, and signOut methods from Firebase.

5.Persistent User Session using onAuthStateChanged

Used Firebase’s onAuthStateChanged to detect and maintain login status even after page reloads.

This ensures that the user stays logged in across sessions until they explicitly sign out.

6.Redux State Management

Implemented Redux to manage and access user state throughout the app.

Structured Redux store into modular slices for clean separation of concerns.

Used useSelector to access user state and useDispatch to update it on login/logout.

7.Conditional Rendering Based on Authentication

The app displays different UI components based on whether the user is authenticated or not.

For example, the Netflix logo is always shown, but the user icon and sign-out button only appear after login.

Programmatic Navigation with React Router

Used useNavigate from react-router-dom to programmatically redirect users after login/logout actions.

8.Reusable Header Component

Created a reusable <Header /> component that adapts its content based on the user's login state.

Input Validation for Login and Sign-up Forms

Added form validation to check for email format and password strength before submitting auth requests.

9. We have unsubscribed to our onAuthStateChanged to avoid memory leak. //Hygiene practice
10. Add hardcoded values to the constants.js file.

11. Used TMDB API to render movie lists on UI.

⚠️ This project uses The Movie Database (TMDb) API to fetch movie data. Since TMDb is blocked in India, you may not see the movie list rendered on the UI. To bypass this, please use the Webshare VPN Chrome Extension or any proxy to view the content correctly.



