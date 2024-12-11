import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from '../../Hooks/UseAxios';
import { AuthContext } from '../../Firebase/AuthProvider';

const Alljobs = () => {
  const [clickedJob, setClickedJob] = useState(null);
  const [timer, setTimer] = useState(0);
  const [claimedJobs, setClaimedJobs] = useState([]);
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const { data: jobs = [] } = useQuery({
    queryKey: ['alljobs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/alljobs');
      return res.data;
    },
  });

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

  const handleClaim = async (job) => {
    try {
      if (!activeUser) {
        alert('User not found!');
        return;
      }

      // Update the user's balance in the backend
      await axiosSecure.put(`/user/${activeUser._id}`, { 
        balance: 1 // Increment the balance by 1
      });

      // Optionally update the claimed jobs list
      setClaimedJobs((prev) => [...prev, job.title]);

      alert('You have received $1!');

      // Clear the clicked job to allow starting another job
      setClickedJob(null);

      // Refetch to update the UI
      refetch();
    } catch (error) {
      console.error('Error claiming reward:', error);
    }
  };

  const handleButtonClick = (job) => {
    window.open(job.link, '_blank'); // Open the link in a new tab
    setClickedJob(job.title); // Start the timer for the clicked job
  };

  return (
    <div className="container mx-auto p-4">
      {jobs.map((job, index) => (
        <div key={index} className="card w-full bg-base-200 shadow-md mb-4">
          <div className="card-body">
            <h2 className="card-title">{job.title}</h2>
            <p>{job.description || 'No description provided.'}</p>
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className="badge badge-outline">{job.remaining} remaining</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${job.payment}</p>
                <p className="text-sm text-gray-500">{job.rate}</p>
              </div>
            </div>
            <div className="card-actions justify-between items-center mt-4">
              <div className="flex gap-2">
                {job.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="badge badge-secondary">{tag}</div>
                ))}
              </div>
              {claimedJobs.includes(job.title) ? (
                <button className="px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed">
                  Done
                </button>
              ) : clickedJob === job.title && timer > 0 ? (
                <p className="text-lg">Wait... {timer}s</p>
              ) : (
                <button
                  onClick={() => {
                    if (!clickedJob) handleButtonClick(job);
                    else if (timer === 0) handleClaim(job);
                  }}
                  className={`px-4 py-2 text-white rounded ${clickedJob === job.title ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  {clickedJob === job.title ? 'Claim' : 'Click Me'}
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