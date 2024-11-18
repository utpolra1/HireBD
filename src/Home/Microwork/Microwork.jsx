import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/UseAxios';

const TimerButton = ({ userEmail }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isClaimed, setIsClaimed] = useState(false);

    // Fetch user data from the server to check if they have already claimed
    const axiosSecure = useAxios();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    useEffect(() => {
        // Check if the user's email exists in the claimed list
        const user = users.find((u) => u.email === userEmail);
        if (user && user.hasClaimed) {
            setIsClaimed(true);
        }
    }, [users, userEmail]);

    useEffect(() => {
        let interval;
        if (isClicked) {
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
    }, [isClicked]);

    const handleClaim = async () => {
        try {
            // Update user's claim status on the server
            await axiosSecure.patch(`/users/${userEmail}/claim`, { hasClaimed: true });
            setIsClaimed(true);
            alert('You have received $1!');
            refetch(); // Refetch data to update the UI
        } catch (error) {
            console.error('Error claiming reward:', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            {!isClaimed && !isClicked && (
                <button
                    onClick={() => setIsClicked(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Click Me
                </button>
            )}
            {isClicked && timer > 0 && (
                <p className="mt-4 text-lg">Please wait... {timer} seconds</p>
            )}
            {timer === 0 && !isClaimed && isClicked && (
                <button
                    onClick={() => {
                        handleClaim();
                        setIsClaimed(true); // Show "Done" immediately after claiming
                    }}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Claim
                </button>
            )}
            {isClaimed && (
                <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed">
                    Done
                </button>
            )}
        </div>
    );
};

export default TimerButton;
