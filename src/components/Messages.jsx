// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:4000/getmessages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This will ensure cookies are sent with the request
          
        })
        const data = await response.json();
        // Ensure data.messages is defined and is an array
        if (data.messages && Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          console.error('Invalid data format:', data);
          setMessages([]); // Set an empty array in case of invalid data
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setMessages([]); // Set an empty array in case of an error
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Messages</h1>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{`${message.firstname} ${message.lastname}`}</h2>
              <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
            </div>
            <div className="text-gray-700 mb-2">
              <p className="font-medium text-gray-800">Email:</p>
              <p>{message.email}</p>
            </div>
            <div className="text-gray-700 mb-2">
              <p className="font-medium text-gray-800">Phone:</p>
              <p>{message.phone}</p>
            </div>
            <div className="text-gray-700">
              <p className="font-medium text-gray-800">Message:</p>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
