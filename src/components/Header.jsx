import { useNavigate } from "react-router-dom";
import { logoutUser, restoreSession } from "../utils/authApi.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice.js";
import { useDispatch } from "react-redux";
import { Lang_Identifier, LOGO } from "../utils/constants.js";
import { toggleGptSearchView } from "../utils/gptSlice.jsx";
import lang from "../utils/langConstants.jsx";
import { changeLanguage } from "../utils/langConfig.jsx";




const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

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
    navigate("/");
  }

  const handleClick = () => {
    dispatch(toggleGptSearchView());

  }

  // On mount, ask the backend "is someone logged in?" (this replaces Firebase's
  // onAuthStateChanged). It works after a page refresh too: the access token is
  // gone from memory, but the httpOnly cookie lets restoreSession get a new one.
  useEffect(() => {
    let cancelled = false; // if we unmount before the answer arrives, do nothing

    restoreSession().then((sessionUser) => {
      if (cancelled) return;
      if (sessionUser) {
        dispatch(addUser(sessionUser));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10  flex md:flex-row flex-col justify-between ">
      <img
        className="w-44 mx-auto md:mx-0"
        src={LOGO}
        alt="Logo"
      />


      {user && <div className="flex justify-between">
        {showGptSearch && <select className="bg-red-800 text-white py-2 px-4 my-2 mx-4 rounded-lg cursor-pointer  h-12 " onChange={handleChange}>
          {Lang_Identifier.map(lang => (<option key={lang.identifier} value={lang.identifier} className="bg-white text-black">{lang.name}</option>))}
        </select>}


        <button className="bg-red-800 text-white py-2 px-4 my-2 mx-4 rounded-lg cursor-pointer  h-12"
          onClick={handleClick}>
          {showGptSearch ? "Home" : "Gpt Search"}
        </button>
        <img className="w-12 h-11 my-2" src={user?.photoURL}
          alt="user-icon" />

        <button className="text-sm font-medium text-white hover:shadow cursor-pointer mx-2" onClick={handleSignOut}>Sign Out</button>
      </div>}

    </div>
  );
}

export default Header;
