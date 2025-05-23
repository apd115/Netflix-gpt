import React from 'react';
import Header from './Header';
import Login from "./Login";
import Browse from "./Browse";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/Firebase.config';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';



const Body = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
  
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
      }
    });

  },[])
  

  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path: "/browse",
      element:<Browse/>
    }

  ]);
  
  return (
    <div>
      <RouterProvider router={appRouter}/>
      
      
    </div>
  );
}

export default Body;