#Netflix-gpt

Login Page -

1. Login Form
- The top section of the login page includes a custom header that displays the Netflix logo, giving the UI a familiar and polished look.
- A single, versatile form is used for both login and sign-up functionalities. The form dynamically adapts based on user action, reducing redundancy and improving maintainability.
- Users can seamlessly switch between login and sign-up modes through a simple toggle mechanism (e.g., a button or link), with the form fields and button labels updating accordingly.

2. Validating User Name, Email and Password - 
- Implemented form validation using useRef() and regular expressions for username, email, and password inputs to ensure input correctness and user-friendly error handling.

3. Created Redux Store for storing user info.
Divided it into slices i.e. userSlice.

4. Firebase Authentication (Backend as a Service)

Integrated Firebase Authentication to handle user sign-up, login, and logout functionality.

Utilized createUserWithEmailAndPassword, signInWithEmailAndPassword, and signOut methods from Firebase.

5. Persistent User Session using onAuthStateChanged

Used Firebase’s onAuthStateChanged to detect and maintain login status even after page reloads.

This ensures that the user stays logged in across sessions until they explicitly sign out.

6. Redux State Management

Implemented Redux to manage and access user state throughout the app.

Structured Redux store into modular slices for clean separation of concerns.

Used useSelector to access user state and useDispatch to update it on login/logout.

7. Conditional Rendering Based on Authentication

The app displays different UI components based on whether the user is authenticated or not.

For example, the Netflix logo is always shown, but the user icon and sign-out button only appear after login.

Programmatic Navigation with React Router

Used useNavigate from react-router-dom to programmatically redirect users after login/logout actions.

8. Reusable Header Component

Created a reusable <Header /> component that adapts its content based on the user's login state.

Input Validation for Login and Sign-up Forms

Added form validation to check for email format and password strength before submitting auth requests.

9. We have unsubscribed to our onAuthStateChanged to avoid memory leak. //Hygiene practice
10. Add hardcoded values to the constants.js file.

11. Used TMDB API to render movie lists on UI.

⚠️ This project uses The Movie Database (TMDb) API to fetch movie data. Since TMDb is blocked in India, you may not see the movie list rendered on the UI. To bypass this, please use the Webshare VPN Chrome Extension or any proxy to view the content correctly.

12. Registered the TMDB API key in the constants.js file. //Made it a constant to avoid hardcoding in the codebase and also made an app on TMDB to get the API key and access token.
13. Then fetched the mnot trending movies using the TMDB API and rendered them on the UI in the browse page.
14. Created Redux store for storing movie data and Movie Videos.
15. Used Redux to manage movie data and videos, allowing for efficient state management and access across components.
16. Created Redux store slices for movies and videos, ensuring modularity and separation of concerns.
17. Created custom hooks to fetch movie data and videos, promoting reusability and cleaner code.
18. IMplemented autoplay functionality for movie trailers using the YouTube API, enhancing user engagement with dynamic content.
19. Displayed now playing, popular and top rated movies on the browse page using TMDB API.
20. Added Gpt serach page containing gpr search bar and gpt chat box.
21. A movie recommendation system based on user preferences and viewing history, enhancing user experience by suggesting relevant content.
22. Implemented multi-language support for the app, allowing users to choose their preferred language for a more personalized experience on gpt search page.
23. Used Gemini API key to process user queries and got the movie suggestions and fetch data from tmdb database based on the movies received from gemini search.
24. Implemented movie suggestions from tmdb api data based on user queries.
25. Memoization implementation to reduce api calls.
26. Added movie data to the redux store.
27. Reused MovieList container to build movie suggestions boxes in gpt search page.
28. Created .env file for securing API Keys.
29. Made the site responsive by adding tailwind css styling for mobile and tablet.

