import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser, restoreSession } from "../utils/authApi.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice.js";
import { markAuthChecked } from "../utils/authSlice.js";
import { useDispatch } from "react-redux";
import { Lang_Identifier, LOGO } from "../utils/constants.js";
import lang from "../utils/langConstants.jsx";
import { changeLanguage } from "../utils/langConfig.jsx";




const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const location = useLocation();
  // "Which screen am I on?" now comes from the URL, not from a Redux flag.
  const isGptPage = location.pathname === "/browse/gpt";

  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  }

 

  const handleSignOut = async () => {
    try {
      await logoutUser(); // tells the backend to revoke the session
    } catch {
      // Even if the network call failed, the user asked to sign out,
      // so we still sign them out on this device below.
    }
    dispatch(removeUser());
    navigate("/", { replace: true }); // replace: Back must not return to a screen that needs login
  }

  // Normal navigate() ADDS a history entry, which is exactly what makes the
  // browser's Back button return to the previous screen.
  const handleClick = () => {
    navigate(isGptPage ? "/browse" : "/browse/gpt");
  }

  // On mount, ask the backend "is someone logged in?" (this replaces Firebase's
  // onAuthStateChanged). It works after a page refresh too: the access token is
  // gone from memory, but the httpOnly cookie lets restoreSession get a new one.
  useEffect(() => {
    let cancelled = false; // if we unmount before the answer arrives, do nothing

    restoreSession().then((sessionUser) => {
      if (cancelled) return;
      dispatch(markAuthChecked()); // the answer is in: pages may now decide what to show
      if (sessionUser) {
        dispatch(addUser(sessionUser));
        // Only the login page needs to push a logged-in user onward. On
        // /browse or /browse/gpt they are already where they belong (before,
        // a refresh on the GPT screen would have thrown them back to /browse).
        if (location.pathname === "/") navigate("/browse", { replace: true });
      } else {
        dispatch(removeUser());
        navigate("/", { replace: true });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="absolute w-screen px-8 pt-6 pb-2 bg-gradient-to-b from-black z-10  flex md:flex-row flex-col justify-between ">
      <img
        className="w-44 mx-auto md:mx-0"
        src={LOGO}
        alt="Logo"
        // Two stacked dark glows: a tight one that outlines the letters, and a
        // wide soft one that darkens the busy poster behind them.
        style={{
          filter:
            "drop-shadow(0 0 6px rgba(0,0,0,0.95)) drop-shadow(0 0 18px rgba(0,0,0,0.85))",
        }}
      />


      {user && <div className="flex justify-between">
        {isGptPage && <select className="bg-red-800 text-white py-2 px-4 my-2 mx-4 rounded-lg cursor-pointer  h-12 " onChange={handleChange}>
          {Lang_Identifier.map(lang => (<option key={lang.identifier} value={lang.identifier} className="bg-white text-black">{lang.name}</option>))}
        </select>}


        <button className="bg-red-800 text-white py-2 px-4 my-2 mx-4 rounded-lg cursor-pointer  h-12"
          onClick={handleClick}>
          {isGptPage ? "Home" : "Gpt Search"}
        </button>
        {/* Profile icon: hidden for now (it does nothing yet). Restore when there is a use case, e.g. a dropdown with name/email and Sign Out.
        <img className="w-12 h-11 my-2" src={user?.photoURL}
          alt="user-icon" />
        */}

        <button className="text-sm font-medium text-white hover:shadow cursor-pointer mx-2" onClick={handleSignOut}>Sign Out</button>
      </div>}

    </div>
  );
}

export default Header;
