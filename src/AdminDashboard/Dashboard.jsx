import { CiShop } from "react-icons/ci";
import { FaHome, FaUserPlus } from "react-icons/fa";
import { FaChartSimple, FaCircleUser } from "react-icons/fa6";
import { MdArticle, MdOutlinePublishedWithChanges } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import Swal from "sweetalert2";
import { AuthContext } from "../Firebase/AuthProvider";
import useAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { user, logOut} = useContext(AuthContext);

  // Extracting users and state from the Redux store
  const axiosSecure = useAxios();
  const { data: users = [], refetch } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      },
    });
  // Find email of logged-in user from backend
  const loggedInUser = users.find((u) => u.email === user?.email);

  const handleLogOut = () => {
    logOut()
        .then(() => {
            Swal.fire({
                title: "Logged out!",
                text: "You've successfully logged out.",
                icon: "success"
            });
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops !",
                text: error.massage,
            });
        })
}

  return (
    <>
      <div className="flex bg-gray-200 pt-10">
        <h1 className="text-3xl lg:hidden font-bold flex justify-cente items-center lg:pt-8 gap-2 mx-9">
          <FaHome />
          Dashboard
        </h1>
        <div className="navbar bg-gray-200 pb-14">
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="flex">
        {/* Sidebar for Large Screens */}

        <div className="w-80 min-h-screen font-bold bg-gray-200 hidden lg:block">
          <ul className="mx-8 gap-2 grid">
            <span className="justify-center flex text-4xl pt-8 pr-5">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                  <img src={user?.photoURL} />
                </div>
              </div>
            </span>
            <h1 className="text-3xl font-bold justify-center items-center text-center pr-6 mx-5">
              {user?.displayName}
            </h1>
            <div className="divider"></div>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md p-3 text-xl text-center ${
                    isActive ? "bg-red-600 text-white" : ""
                  }`
                }
                to="/dashboard/profile"
              >
                <FaCircleUser />
                Profile
              </NavLink>
            </li>

            <li>
            
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-md p-3 text-xl text-center ${
                        isActive ? "bg-red-600 text-white" : ""
                      }`
                    }
                    to="order"
                  >
                    <CiShop />
                    Orders
                  </NavLink>

            </li>

            <li>

                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md p-3 text-xl text-center ${
                      isActive ? "bg-red-600 text-white" : ""
                    }`
                  }
                  to="/dashboard/Allbookslist"
                >
                  <MdArticle /> All Book Lists
                </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-md p-3 text-xl text-center ${
                        isActive ? "bg-red-600 text-white" : ""
                      }`
                    }
                    to="/dashboard/bookslist"
                  >
                    <MdArticle /> Book Lists
                  </NavLink>
            </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md p-3 text-xl text-center ${
                      isActive ? "bg-red-600 text-white" : ""
                    }`
                  }
                  to="/dashboard/users"
                >
                  <FaUserPlus />
                  All users
                </NavLink>
              </li>
            <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-md p-3 text-xl text-center ${
                        isActive ? "bg-red-600 text-white" : ""
                      }`
                    }
                    to="/dashboard/addbooks"
                  >
                    <MdOutlinePublishedWithChanges />
                    Add Books
                  </NavLink>
            </li>

            <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-md p-3 text-xl text-center ${
                      isActive ? "bg-red-600 text-white" : ""
                    }`
                  }
                  to="/dashboard/charts"
                >
                  <FaChartSimple />
                  Charts
                </NavLink>
            </li>
            <div className="divider"></div>
            <NavLink
              className="flex gap-2 text-center text-red-600 text-2xl items-center"
              to="/"
            >
              <button className="mt-6 px-6 py-3 flex items-center gap-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-600 transition">
                <FaHome />
                Homepage
              </button>
            </NavLink>
            <NavLink
              className="flex gap-2 text-center text-red-600 text-2xl items-center"
              to="/products"
            >
              <button onClick={handleLogOut} className="mt-6 px-6 py-3 bg-red-600 flex items-center gap-2 text-white font-semibold rounded-md hover:bg-red-600 transition">
                <AiOutlineLogout />
                Logout
              </button>
            </NavLink>
          </ul>
        </div>

        {/* Dropdown for Small Screens */}
        <div className="lg:hidden bg-gray-200">
          <div className="dropdown bg-gray-200">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/dashboard/profile">
                  <FaCircleUser />
                  Profile
                </NavLink>
              </li>

              <li>
                <NavLink to="order">
                  <CiShop /> Orders
                </NavLink>
              </li>
              <li>
                {loggedInUser?.role === "admin" ? (
                  <NavLink to="/dashboard/Allbookslist">
                    <MdArticle /> All Book Lists
                  </NavLink>
                ) : (
                  <NavLink to="/dashboard/bookslist">
                    <MdArticle /> Book Lists
                  </NavLink>
                )}
              </li>
              {loggedInUser?.role === "admin" && (
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUserPlus /> All users
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/dashboard/addbooks">
                  <MdOutlinePublishedWithChanges /> Add Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/charts">
                  <FaChartSimple /> Charts
                </NavLink>
              </li>
              <div className="divider"></div>
              <NavLink
                className="flex gap-2 text-center text-red-600 text-xl items-center"
                to="/"
              >
                <button className="mt-3 px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-600 transition">
                  Homepage
                </button>
              </NavLink>
              <NavLink
                className="flex gap-2 text-center text-red-600 text-xl items-center"
                to="/"
              >
                <button to='/' onClick={handleLogOut} className="mt-6 px-4 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-600 transition">
                  Logout
                </button>
              </NavLink>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 m-6 rounded-lg border bg-gray-100">
          <Outlet className=""></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;