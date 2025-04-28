import Body from "./components/Body";
import {createBrowserRouter} from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";
import {RouterProvider} from "react-router-dom";


export const App = ()=> {

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
     <Body/>
     </div>
      
      
      
    
  );
}


