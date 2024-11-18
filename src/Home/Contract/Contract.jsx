import React from 'react';
import useAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';

const Contract = () => {
    const axiosSecure = useAxios();

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

    if (isLoading) {
        return <p className="text-center text-xl text-blue-500">Loading users...</p>;
    }

    if (isError) {
        return <p className="text-center text-xl text-red-500">Error fetching users: {error.message}</p>;
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Contract</h2>
            <ul className="space-y-4">
                {users.map(user => (
                    <li
                        key={user.id}
                        className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                    >
                        <div>
                            <p className="text-xl font-semibold text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-600">ID: {user.id}</p>
                        </div>
                        <div className="space-x-4">
                            <button
                                onClick={() => console.log(`Request sent to user ${user.id}`)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Send Request
                            </button>
                            <button
                                onClick={() => console.log(`Message sent to user ${user.id}`)}
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
