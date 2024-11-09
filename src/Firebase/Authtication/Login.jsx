import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [errorUser, seterrorUser] = useState(" ");
  const { login, googleLogIn } = useContext(AuthContext);
  const [showPassword, setShowpassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const hanlelogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then((result) => {
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("Sorry... Password Wrong..!");
        seterrorUser("Sorry... Password Wrong..!");
      });
  };

  const googlLogin = () => {
    googleLogIn()
      .then(() => {
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-center mt-8 text-white">
      <div class="relative flex flex-col px-28 bg-gray-900 text-white bg-transparent shadow-none rounded-xl bg-clip-border">
        <div class="m-5 px-8 py-3 text-center block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal rounded-lg bg-[#ff00d3]">
            Login Now
        </div>
        <form onSubmit={hanlelogin} action="">
          <div class="flex flex-col gap-4">
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                name="email"
                class="relative peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder="Enter Email"
                type="email"
                required
              />
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
            </div>
            <div class="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="relative peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                required
              />
              <span
                className="absolute pt-3 pr-32"
                onClick={() => setShowpassword(!showPassword)}
              >
                <FaEye></FaEye>
              </span>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
            </div>
            <div class="-ml-2.5">
              <div class="inline-flex items-center">
                <label
                  htmlFor="checkbox"
                  class="relative flex items-center p-3 rounded-full cursor-pointer"
                >
                  <input
                    type="checkbox"
                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="checkbox"
                  />
                  <span class="absolute text-white bg-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  class="mt-px font-light text-white cursor-pointer select-none"
                  htmlFor="checkbox"
                >
                  Remember Me
                </label>
              </div>
            </div>
          </div>
          <div class=" flex flex-col">
            <button
              class="btn btn-outline btn-secondary mx-5 px-8"
              type="submit"
            >
              Sign In
            </button>
            <p class="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
              Don't have an account?
            </p>
            <NavLink
              className="btn btn-outline btn-secondary mx-5 px-8"
              to="/register"
            >
              Register
            </NavLink>
          </div>
        </form>
        <div className="flex items-center mt-6">
          <hr className="border-t border-gray-300 flex-1" />
          <span className="text-gray-500 mx-4">or</span>
          <hr className="border-t border-gray-300 flex-1" />
        </div>
        <button
          onClick={googlLogin}
          className="my-4 flex items-center justify-center w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-md transition-all hover:bg-gray-100 focus:outline-none"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
