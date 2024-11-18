import React, { useState } from "react";

const Inbox = () => {
  const [selectedContact, setSelectedContact] = useState("Ripon Roy");

  // Contacts
  const contacts = [
    { id: 1, name: "Ripon Roy", profilePic: "https://via.placeholder.com/40" },
    { id: 2, name: "Bangladesh Hindu Mohashangha", profilePic: "https://via.placeholder.com/40" },
    { id: 3, name: "Rj Biddan", profilePic: "https://via.placeholder.com/40" },
    { id: 4, name: "Bikash Roy Stafin", profilePic: "https://via.placeholder.com/40" },
  ];

  // Messages for each contact
  const messagesData = {
    "Ripon Roy": [
      { id: 1, sender: "Ripon Roy", text: "Bolchilo er age student asche...", time: "1:00 PM" },
      { id: 2, sender: "You", text: "Phone diya sun", time: "1:05 PM" },
    ],
    "Bangladesh Hindu Mohashangha": [
      { id: 1, sender: "Bangladesh Hindu Mohashangha", text: "Number to deowa ache", time: "1:10 PM" },
      { id: 2, sender: "You", text: "Kisu bolben na?", time: "1:15 PM" },
    ],
    "Rj Biddan": [
      { id: 1, sender: "Rj Biddan", text: "R koch koch ache", time: "1:20 PM" },
      { id: 2, sender: "You", text: "Thik ache", time: "1:25 PM" },
    ],
    "Bikash Roy Stafin": [
      { id: 1, sender: "Bikash Roy Stafin", text: "https://www.facebook.com/...", time: "1:30 PM" },
      { id: 2, sender: "You", text: "Thank you!", time: "1:35 PM" },
    ],
  };

  // Get messages for the selected contact
  const messages = messagesData[selectedContact] || [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-md border-r">
        <h2 className="text-xl font-semibold text-gray-800 p-4">Chats</h2>
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className={`flex items-center p-3 cursor-pointer ${
                selectedContact === contact.name ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedContact(contact.name)}
            >
              <img src={contact.profilePic} alt="Profile" className="rounded-full w-12 h-12 mr-3" />
              <div>
                <p className="font-medium">{contact.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{selectedContact}</h2>
          <span className="text-sm text-green-500">Active now</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg shadow-md max-w-sm ${
                  msg.sender === "You" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                <p className="font-medium">{msg.sender}</p>
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-500"
          />
          <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
