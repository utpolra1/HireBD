import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const hanlelogout = () => {
    logOut()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  // Apply theme changes to the Navbar
  useEffect(() => {
    const themeClass = isDarkTheme
      ? "bg-black text-white"
      : "bg-white text-black";
    document.documentElement.className = themeClass;
  }, [isDarkTheme]);

  return (
    <div
      className={`navbar bg-slate-900 text-white ${
        isDarkTheme ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="navbar-start">
        {/* Dropdown for smaller screens */}
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] w-52 bg-base-100 rounded-box shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="btn btn-ghost text-xl">
          HireBD
        </NavLink>
      </div>

      {/* Navbar items for larger screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>

      {/* Theme toggle and Login button */}
      <div className="navbar-end gap-3">
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            checked={isDarkTheme}
            onChange={toggleTheme}
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        <div className="flex items-center gap-x-1">
          <div>
            {user ? (
              <div>
                <div role="">
                  <div className="w-10 mr-2 rounded-full items-center flex justify-center">
                      <NavLink to="/userprofile">
                        <button className="avatar online">
                          <img
                            alt=""
                            className="rounded-full w-4 h-8"
                            src={user?.photoURL}
                          />
                        </button>
                      </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink to="/login">
                <button  className="w-20 h-10 rounded-lg btn btn-outline btn-secondary">Login</button>
              </NavLink>
            )}
          </div>
          <div>
            {user && (
              <div>
                <button className="w-20 h-10 rounded-lg btn-active font-bold">
                  <a className="" onClick={hanlelogout}>
                    Logout
                  </a>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
