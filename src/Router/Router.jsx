// this is router file where will be all path create and connect
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Firebase/Authtication/Login";
import Home from "../Home/Home";
import Register from "../Firebase/Authtication/Register";
import UserProfile from "../UserProfile/UserProfile";
import Dashboard from "../AdminDashboard/Dashboard";
import Microwork from "../Home/Microwork/Microwork";
import Inbox from "../Inbox/Inbox";
import Contract from "../Home/Contract/Contract";

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
      ,
    {
        path:'/mircrowrk',
        element:<Microwork></Microwork>
    },
    {
        path:"/inbox",
        element:<Inbox></Inbox>
    },
    {
      path:"/contract",
      element:<Contract></Contract>
    }
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <Error></Error>,
    children: [
    //   {
    //     path: "order",
    //     element: <PrivateSeller><Order></Order></PrivateSeller>
    //   },
    //   {
    //     path: "bookslist",
    //     element: <PrivateSeller><Booklist></Booklist></PrivateSeller>,
    //   },
    //   {
    //     path:"allbookslist",
    //     element:<Privatrout><AllBooklist></AllBooklist></Privatrout>

    //   },
    //   {
    //     path: "users",
    //     element: <Privatrout><User></User></Privatrout>
    //   },
    //   {
    //     path: "addbooks",
    //     element: <PrivateSeller><Addbooks>
    //     </Addbooks></PrivateSeller>
    //   },
    //   {
    //     path: "charts",
    //     element: <PrivateSeller><Charts></Charts></PrivateSeller>
    //   },

    //   // User
    //   {
    //     path: "profile",
    //     element: <PrivateRoutes><Profile /></PrivateRoutes>,
    //   },
    //   {
    //     path: "wishlist",
    //     element: <Wishlist />,
    //   },
    ]
  }
]);

export default Router;