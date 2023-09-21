import React, { useEffect, useState } from 'react';
import './message.css';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Chatroom from './Chatroom';

function Message({ userId1, userId2 }) {
  const { isAuthenticated } = useAuth0();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [showChatroom, setShowChatroom] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`http://localhost:8000/user-profile/${userId2}`)
        .then(response => {
          const { firstname, lastname, profilepictureurl } = response.data;
          setUserName(`${firstname} ${lastname}`);
          setUserProfilePicture(profilepictureurl);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [isAuthenticated, userId2]);

  return (
    <div className="message-container">
      {showChatroom ? (
        <Chatroom
          userId1={userId1}
          userId2={userId2}
          userName={userName}
          userProfilePicture={userProfilePicture}
        />
      ) : (
        <div>
          <div className="user-info">
            <img src={userProfilePicture} alt="User Profile" className="user-profile-picture" />
            <h2>{userName}</h2>
          </div>
          <div className="message-list-container">
            <div className="message-list">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender === userId1 ? 'sent' : 'received'}`}>
                  {message.text}
                </div>
              ))}
            </div>
          </div>
          <div className="message-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
