import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const TestChat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Connect to the Socket.io server
    const socket = io('http://localhost:3000');
    setSocket(socket);

    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() !== '') {
      // Send the message to the server
      socket.emit('message', messageText);

      // Clear the input field
      setMessageText('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default TestChat;
