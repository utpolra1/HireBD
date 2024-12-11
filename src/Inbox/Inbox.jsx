import React, { useState, useContext, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxios from '../Hooks/UseAxios';
import { AuthContext } from '../Firebase/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const Inbox = () => {
    const axiosSecure = useAxios();
    const { user } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const receiverId = searchParams.get('receiverId');
    const receiverName = searchParams.get('receiverName');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    const [page, setPage] = useState(1); // Pagination state
    const [lastMessageId, setLastMessageId] = useState(null); // To track the last message for updating new messages

    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const {
        data: users = [],
        refetch,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const activesuser = users.find((b) => b.email === user?.email);

    useEffect(() => {
        if (!receiverId) return;
        const receiverUser = users.find((b) => b._id === receiverId);
        setSelectedReceiver(receiverUser);
    }, [receiverId, users]);

    // Fetch initial messages when a conversation is selected
    useEffect(() => {
        if (!selectedReceiver) return;
        const fetchMessages = async () => {
            try {
                const res = await axiosSecure.get(`/messages/${activesuser._id}/${selectedReceiver._id}?page=${page}`);
                const filteredMessages = res.data.filter(
                    (msg) =>
                        (msg.senderId === activesuser._id && msg.receiverId === selectedReceiver._id) ||
                        (msg.senderId === selectedReceiver._id && msg.receiverId === activesuser._id)
                );
                setMessages(filteredMessages);
                if (filteredMessages.length > 0) {
                    setLastMessageId(filteredMessages[filteredMessages.length - 1]._id);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [selectedReceiver, activesuser._id, page, axiosSecure]);

    // Fetch new messages only
    useEffect(() => {
        if (!selectedReceiver) return;
        const fetchNewMessages = async () => {
            try {
                const res = await axiosSecure.get(`/messages/${activesuser._id}/${selectedReceiver._id}?lastMessageId=${lastMessageId}`);
                const filteredMessages = res.data.filter(
                    (msg) =>
                        (msg.senderId === activesuser._id && msg.receiverId === selectedReceiver._id) ||
                        (msg.senderId === selectedReceiver._id && msg.receiverId === activesuser._id)
                );
                setMessages(prevMessages => [...prevMessages, ...filteredMessages]);
                if (filteredMessages.length > 0) {
                    setLastMessageId(filteredMessages[filteredMessages.length - 1]._id);
                }
            } catch (error) {
                console.error('Error fetching new messages:', error);
            }
        };
        // Polling for new messages every 5 seconds
        const intervalId = setInterval(fetchNewMessages, 5000);
        return () => clearInterval(intervalId);
    }, [selectedReceiver, activesuser._id, lastMessageId, axiosSecure]);

    // Send a new message
    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const res = await axiosSecure.post('/messages', {
                senderId: activesuser._id,
                receiverId: selectedReceiver._id,
                text: newMessage,
            });

            // Add the new message to the list
            setMessages(prevMessages => [...prevMessages, res.data]);
            setNewMessage('');
            // Scroll to bottom only when a new message is sent
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-4 overflow-y-auto">
                <div className="text-lg font-semibold">Conversations</div>
                <div className="mt-4 space-y-4">
                    {users
                        .filter((u) => u._id !== activesuser._id) // Exclude logged-in user from the sidebar
                        .map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded-lg cursor-pointer"
                                onClick={() => setSearchParams({ receiverId: user._id, receiverName: user.name })}
                            >
                                <img
                                    src={user.photo || '/default-avatar.png'}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <span>{user.name}</span>
                            </div>
                        ))}
                </div>
            </div>

            {/* Chat Section */}
            <div className="w-3/4 bg-gray-50 flex flex-col">
                {/* Header */}
                {selectedReceiver ? (
                    <div className="p-4 bg-blue-600 text-white text-xl font-semibold">
                        <div className="flex items-center">
                            <img
                                src={selectedReceiver.photo || '/default-avatar.png'}
                                alt={selectedReceiver.name}
                                className="w-10 h-10 rounded-full object-cover mr-4"
                            />
                            <span>{selectedReceiver.name}</span>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-gray-400 text-white text-xl font-semibold">Select a conversation</div>
                )}

                {/* Messages Container */}
                <div
                    ref={messagesContainerRef}
                    className="flex-1 p-4 overflow-y-auto space-y-4"
                >
                    {messages.map((msg) => {
                        const sender = users.find((u) => u._id === msg.senderId);
                        return (
                            <div
                                key={msg._id}
                                className={`flex ${msg.senderId === activesuser._id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`flex items-center space-x-2 ${msg.senderId === activesuser._id ? 'flex-row-reverse' : ''}`}
                                >
                                    {sender?.photo ? (
                                        <img src={sender.photo} alt={sender.name} className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                    )}

                                    <div
                                        className={`max-w-xs p-3 rounded-lg shadow-lg ${
                                            msg.senderId === activesuser._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} /> {/* This is where we scroll to */}
                </div>

                {/* Input */}
                <div className="p-4 flex items-center border-t bg-white shadow-md">
                    <input
                        type="text"
                        placeholder="Write a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-full p-3 focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-4 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Inbox;
