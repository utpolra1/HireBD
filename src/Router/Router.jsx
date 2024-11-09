// this is router file where will be all path create and connect
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Firebase/Authtication/Login";
import Home from "../Home/Home";
import Register from "../Firebase/Authtication/Register";
import UserProfile from "../UserProfile/UserProfile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <></>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/userprofile",
        element:<UserProfile></UserProfile>
      }
    ],
  },
]);

export default Router;