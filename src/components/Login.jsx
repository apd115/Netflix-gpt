import React from "react";
import Header from "./Header";
import { Form } from "react-router-dom";
import { useState, useRef } from "react";
import { Validate } from "../utils/Validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase.config";

const Login = () => {
  const [signUp, setSignUp] = useState("true");
  const [errorMsg, setErrorMsg] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const userName = useRef(null);

  const handleClick = () => {
    const msg = Validate(email.current.value, password.current.value);

    setErrorMsg(msg);
    if (msg) return;

    if (signUp) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
          // ..
        });
    }
  };

  const toggleSignIn = () => {
    setSignUp(!signUp);
  };
  return (
    <div className="relative">
      <Header />

      <div className="absolute ">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_large.jpg"
          alt="screen-img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute  w-3/12 mx-auto my-36 bg-black/70 p-12 left-0 right-0 text-gray-50 "
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
          className="bg-pink-950 text-white p-1 m-2 w-full rounded-lg"
        >
          Sign In
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
