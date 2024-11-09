import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { NewUser, updateProfile, googleLogIn } = useContext(AuthContext); // Use useAuth hook to get context values
  const location = useLocation();
  const navigate = useNavigate();

  const googleLoginHandler = () => {
    googleLogIn()
      .then(() => {
        toast.success("SignUp Success");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error("Google SignUp Failed:", error);
        toast.error("Google SignUp Failed");
      });
  };

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=40e12a0fb8ad7194b0c97ec21a585d32",
        formData
      );
      setImageUrl(response.data.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const photo = imageUrl;

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      toast.error("Password must be at least 6 characters!");
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      toast.error("Password must contain at least one lowercase letter.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    setError("");

    try {
      const userCredential = await NewUser(email, password);
      await updateProfile({
        displayName: name,
        photoURL: photo,
      });
      navigate(location?.state ? location.state : "/");
      toast.success("SignUp Success");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex justify-center my-3">
      <div className="relative flex flex-col p-16 bg-gray-900 text-white shadow-none rounded-xl">
        <h4 className="text-center block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal rounded-lg py-2 bg-[#ff00d3]">
          Register Now
        </h4>
        <p className="text-center block mt-1 font-sans text-base antialiased font-normal leading-relaxed">
          Nice to meet you! Enter your details to register.
        </p>
        <form
          onSubmit={handleRegister}
          className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
        >
          <div className="flex flex-col gap-6 mb-1">
            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Your Name
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                name="name"
                required
                type="text"
                placeholder="name"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Your Email
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                name="email"
                required
                type="email"
                placeholder="name@mail.com"
                className="peer h-full w-full rounded-md border border-white border-t-transparent !border-t-blue-gray-100 bg-transparent px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Password
            </h6>
            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="relative peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                required
              />
              <span
                className="absolute pt-3 pr-32"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaEye />
              </span>
            </div>
            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Confirm Password
            </h6>
            <div className="relative w-full">
              <input
                name="confirmPassword"
                type="password"
                placeholder="confirm password"
                required
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Profile Picture
            </h6>
            <input
              type="file"
              onChange={handleImageUpload}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-6 w-full text-white py-3 rounded-md btn btn-outline btn-secondary"
          >
            Register
          </button>
        </form>
        <div className="flex items-center mt-6">
          <hr className="border-t border-gray-300 flex-1" />
          <span className="text-gray-500 mx-4">or</span>
          <hr className="border-t border-gray-300 flex-1" />
        </div>
        <button
          onClick={googleLoginHandler}
          className="mt-4 flex items-center justify-center w-full bg-white border border-gray-300 text-gray-900 py-3 rounded-md transition-all hover:bg-gray-100 focus:outline-none"
        >
          <FcGoogle className="mr-2" />
          Sign up with Google
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <NavLink to="/login" className="btn btn-outline btn-secondary">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;