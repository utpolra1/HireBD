import React, { useState, useEffect, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hooks/UseAxios";
import { AuthContext } from "../../Firebase/AuthProvider";

const Alljobs = () => {
  const [clickedJob, setClickedJob] = useState(null);
  const [timer, setTimer] = useState(0);
  const [claimedJobs, setClaimedJobs] = useState([]);
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: jobs = [] } = useQuery({
    queryKey: ["alljobs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/alljobs");
      return res.data;
    },
  });

  // Find active user based on email
  const activeUser = users?.find((u) => u?.email === user?.email);

  useEffect(() => {
    let interval;
    if (clickedJob) {
      setTimer(10); // Start the timer at 10 seconds
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clickedJob]);

  const handleClaim = async (id) => {
    try {
      // Check if user and job ID are valid
      if (!activeUser) {
        alert("User not found!");
        return;
      }
      if (!id) {
        alert("Invalid job details!");
        return;
      }
  
      // Ensure 'claimed' is an array, filter out empty strings and duplicate job IDs
      const updatedClaimed = Array.isArray(activeUser.claimed)
        ? [...new Set(
            [
              ...activeUser.claimed.filter(item => item !== ""), // Filter out empty strings
              id // Add the new job ID
            ]
          )]
        : [id]; // If 'claimed' is not an array, initialize with the job ID
  
      const updatedBalance = typeof activeUser.balance === "number" ? activeUser.balance + 1 : 1;
  
      const requestBody = {
        balance: updatedBalance,  // Increment the balance by $1
        claimed: updatedClaimed,  // Updated 'claimed' array
      };
  
      // Debug: Log request details
      console.log("Sending PATCH request to /user/" + activeUser._id, requestBody);
  
      // Send PATCH request to backend to update user balance and claimed jobs
      const response = await axiosSecure.patch(`/user/${activeUser._id}`, requestBody);
  
      // Debug: Log response details
      console.log("Response from server:", response);
  
      if (response.status === 200) {
        alert("You have claimed the job and earned $1!");
        setClaimedJobs((prev) => [...prev, id]); // Update UI locally
        setClickedJob(null); // Reset the clicked job
        refetch(); // Refetch to get updated user info
      } else {
        alert("Failed to claim the job. Please try again.");
      }
    } catch (error) {
      // Log the full error for debugging
      console.error("Error claiming job:", error);
  
      // Check if there's a specific error response from the backend
      if (error.response) {
        console.error("Error response from backend:", error.response.data);
        alert(`Backend error: ${error.response.data.message || "Unknown error"}`);
      } else {
        // A different error occurred (e.g., network error)
        alert("An error occurred while claiming the job. Please try again later.");
      }
    }
  };
  
  
  
  
  
  
  

  const handleButtonClick = (job) => {
    window.open(job.link, "_blank"); // Open the link in a new tab
    setClickedJob(job.title); // Start the timer for the clicked job
  };

  return (
    <div className="container mx-auto p-4">
      {jobs.map((job, index) => (
        <div key={index} className="card w-full bg-base-200 shadow-md mb-4">
          <div className="card-body">
            <h2 className="card-title">{job.title}</h2>
            <p>{job.description || "No description provided."}</p>
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className="badge badge-outline">
                  {job.remaining} remaining
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${job.payment}</p>
                <p className="text-sm text-gray-500">{job.rate}</p>
              </div>
            </div>
            <div className="card-actions justify-between items-center mt-4">
              <div className="flex gap-2">
                {job.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="badge badge-secondary">
                    {tag}
                  </div>
                ))}
              </div>
              {clickedJob === job.title ? (
                timer > 0 ? (
                  <p className="text-lg">Wait... {timer}s</p>
                ) : (
                  <button
                    onClick={() => handleClaim(job?._id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  >
                    Claim
                  </button>
                )
              ) : (
                <button
                  onClick={() => handleButtonClick(job)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Click Me
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alljobs;
