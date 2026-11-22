import React from "react";
import Header from "./Header";
import { Form } from "react-router-dom";
import { useState, useRef } from "react";
import { Validate } from "../utils/Validate";
import { loginUser, registerUser } from "../utils/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const userName = useRef(null);

  const handleClick = async () => {
    const msg = Validate(email.current.value, password.current.value);

    setErrorMsg(msg);
    if (msg) return;

    setLoading(true); // stops a double-click from sending the request twice
    try {
      const credentials = {
        email: email.current.value,
        password: password.current.value,
      };

      // Sign-up creates the account and logs in; log-in only logs in.
      // Both give back the user in the shape the rest of the app expects.
      const user = signUp
        ? await registerUser({ name: userName.current.value, ...credentials })
        : await loginUser(credentials);

      dispatch(addUser(user));
      navigate("/browse", { replace: true }); // replace: the login page shouldn't stay in Back history
    } catch (error) {
      // error.message is already readable text (see readError in api.js)
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSignIn = () => {
    setSignUp(!signUp);
  };
  return (
    <div className="relative">
      <Header />

      <div className="absolute  ">
        <img
          src={BG_URL}
          alt="screen-img"
          className="h-screen object-cover md:h-auto md:object-contain md:inline-block"

        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-full  md:w-3/12 mx-auto my-36 bg-black/70 p-12 left-0 right-0 text-gray-50 rounded-2xl"
      >
        <h1 className="font-bold py-4 text-3xl">
          {signUp ? "Sign Up" : "Log in"}
        </h1>
        {signUp && (
          <input
            ref={userName}
            type="text"
            placeholder="Full Name"
            className="p-1 m-2 w-full  bg-pink-900 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-1 m-2 w-full bg-pink-900 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-1 m-2  w-full bg-pink-900 rounded-lg"
        />
        <p className="text-red-600 p-1 m-2">{errorMsg}</p>
        <button
          onClick={handleClick}
          disabled={loading}
          className="bg-pink-950 text-white p-1 m-2 w-full rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "Please wait..." : "Sign In"}
        </button>
        <p className="text-white p-2 cursor-pointer" onClick={toggleSignIn}>
          {signUp
            ? "Registered Already? Log In Now"
            : "New to Netflix? Sign up now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
