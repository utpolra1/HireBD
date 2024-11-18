import React, { useContext, useState } from "react";
import useAxios from "../Hooks/UseAxios";
import { AuthContext } from "../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [activeTab, setActiveTab] = useState("GIG");
  
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "GIG":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Service"
                  className="rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">
                  800+ High Quality SEO Backlinks
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  High DA 50-95. White Hat Backlinks.
                </p>
                <p className="text-lg font-bold mt-4">$10</p>
                <button className="btn btn-primary btn-sm w-full mt-4">
                  Order Now
                </button>
              </div>
            ))}
          </div>
        );
      case "ADD_NEW_GIG":
        return (
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">Add New Gig</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Gig Title</label>
                <input type="text" className="input input-bordered w-full" placeholder="Enter gig title" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea className="textarea textarea-bordered w-full" placeholder="Enter gig description"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        );
      case "REVIEW":
        return (
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <p>No reviews yet.</p>
          </div>
        );
        case "ABOUT":
        return (
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">ABOUT</h3>
            <p>ABOUT.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Profile Header */}
      <div className="flex items-center h-64 bg-green-200 rounded-lg p-4 mb-6">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} alt="User Avatar" />
          </div>
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">seoexperteam</h1>
          <p className="text-sm text-gray-500">⭐ 5 (3 reviews) • Level 3</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        {/* Sidebar */}
        <div className="bg-white shadow-lg rounded-lg p-4 w-full lg:w-1/4">
          <h2 className="text-lg font-semibold">Last 90 Days</h2>
          <ul className="text-sm text-gray-600 mt-4 space-y-2">
            <li>Recent orders: 8</li>
            <li>On time: 100%</li>
            <li>Completed orders: 6</li>
          </ul>
          <h2 className="text-lg font-semibold mt-6">All Time Metrics</h2>
          <ul className="text-sm text-gray-600 mt-4 space-y-2">
            <li>Completed orders: 6</li>
            <li>From: BD</li>
            <li>Member since: Oct 2021</li>
          </ul>
          <h2 className="text-lg font-semibold mt-6">Social Links</h2>
          <div className="flex gap-2 mt-4">
            <a href="#" className="btn btn-circle btn-sm btn-outline">FB</a>
            <a href="#" className="btn btn-circle btn-sm btn-outline">TW</a>
            <a href="#" className="btn btn-circle btn-sm btn-outline">IG</a>
            <a href="#" className="btn btn-circle btn-sm btn-outline">LN</a>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="w-full lg:w-3/4">
          <div className="bg-gray-900 text-white flex gap-5 p-5">
            <button onClick={() => setActiveTab("GIG")} className={`px-3 py-1 ${activeTab === "GIG" ? "bg-gray-700" : ""}`}>
              GIG
            </button>
            <button onClick={() => setActiveTab("ADD_NEW_GIG")} className={`px-3 py-1 ${activeTab === "ADD_NEW_GIG" ? "bg-gray-700" : ""}`}>
              ADD NEW GIG
            </button>
            <button onClick={() => setActiveTab("REVIEW")} className={`px-3 py-1 ${activeTab === "REVIEW" ? "bg-gray-700" : ""}`}>
              Review
            </button>
            <button onClick={() => setActiveTab("ABOUT")} className={`px-3 py-1 ${activeTab === "ABOUT" ? "bg-gray-700" : ""}`}>
              About
            </button>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
