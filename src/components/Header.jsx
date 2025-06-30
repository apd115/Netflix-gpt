import { auth } from "../utils/Firebase.config.jsx";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
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


  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.

    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });

  }

  const handleClick = () => {
    dispatch(toggleGptSearchView());

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { //this returns a function to stop listening to auth change(user login logout)
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;

        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/Browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
    return () => unsubscribe(); //when something is returned from useEffect react calls it when component unmounts
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
