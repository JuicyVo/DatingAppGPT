import React, { useEffect, useState } from 'react';
import './chat.css';


function Chatroom({ userName, userProfilePicture, userId1 }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);
  

  useEffect(() => {
    // Establish WebSocket connection when the component mounts
    const webSocketUrl = 'ws://localhost:8001'; 
    const ws = new WebSocket(webSocketUrl);

    

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
      setSentMessages((prevSentMessages) => [...prevSentMessages, message]);
      socket.send(JSON.stringify(message));
      setNewMessage(''); 
    }
  };

  return (
    <div>
            <div className="user-info">
        <img src={userProfilePicture} alt="User Profile" className="user-profile-picture" />
        <h2>{userName}</h2>
      </div>


      <div className="message-container">


      {[...messages, ...sentMessages].map((message, index) => (
  <div key={index} className={`message ${message.sender === userId1 ? 'sent' : 'received'}`}>
    {message.text}
  </div>
))}



        {/* {messages.map((message, index) => (
          <div key={index} className="message">
            {message.text}
          </div>
        ))} */}



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
