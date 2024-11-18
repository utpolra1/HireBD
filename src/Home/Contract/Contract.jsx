import React, { useContext } from 'react';
import useAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Firebase/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Contract = () => {
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        data: users = [],
        refetch,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users'); // Replace with your endpoint
            return res.data;
        },
    });

    // Find the active user by email
    const activesuser = users.find((b) => b.email === user?.email);

    // Filter out the active user from the list
    const filteredUsers = users.filter((userItem) => userItem._id !== activesuser?._id);

    if (isLoading) {
        return <p className="text-center text-xl text-blue-500">Loading users...</p>;
    }

    if (isError) {
        return <p className="text-center text-xl text-red-500">Error fetching users: {error.message}</p>;
    }

    const sendMessage = async (receiverId, receiverName) => {
        try {
            await axiosSecure.post('/messages', {
                senderId: activesuser._id,
                receiverId,
            });
            navigate(`/inbox?receiverId=${receiverId}&receiverName=${receiverName}`);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Contract</h2>
            <ul className="space-y-4">
                {filteredUsers.map((userItem) => (
                    <li
                        key={userItem.id}
                        className={`bg-white p-4 rounded-lg shadow-md flex items-center justify-between ${
                            activesuser && activesuser._id === userItem._id ? 'bg-blue-100' : ''
                        }`} // Highlight active user with a different background color
                    >
                        <div className="flex items-center space-x-4">
                            {/* Display the user's photo if available */}
                            {userItem?.photo && (
                                <img
                                    src={userItem.photo}
                                    alt={userItem.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <p className="text-xl font-semibold text-gray-800">{userItem.name}</p>
                                <p className="text-sm text-gray-600">ID: {userItem._id}</p>
                            </div>
                        </div>
                        <div className="space-x-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Send Request
                            </button>
                            <button
                                onClick={() => sendMessage(userItem._id, userItem.name)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-6 text-center">
                <button
                    onClick={refetch}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                    Refresh Users
                </button>
            </div>
        </div>
    );
};

export default Contract;
