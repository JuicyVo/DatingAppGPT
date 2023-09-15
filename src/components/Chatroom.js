import React, { useEffect, useState } from 'react';

function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  console.log("CHATROOM TEST")

  useEffect(() => {
    // Establish WebSocket connection when the component mounts
    const webSocketUrl = 'ws://localhost:8000'
    const ws = new WebSocket('ws://your-server-url');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      // Clean up WebSocket connection when the component unmounts
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      const message = { text: newMessage };
      socket.send(JSON.stringify(message));
      setNewMessage('');
    }
  };

  return (
    <div>
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatroom;
