import React, { useEffect, useState } from 'react';
import './chat.css';
import axios from 'axios';

function Chatroom({ userName, userProfilePicture, userId1 }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const userMessage = newMessage.trim();

  const HTTP = "http://localhost:3000/GPT"

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

  const handleSend = async () => {
    if (socket && newMessage.trim() !== '') {
      const message = { text: newMessage };
      setSentMessages((prevSentMessages) => [...prevSentMessages, message]);
      socket.send(JSON.stringify(message));
      setNewMessage('');

      // Add the user's message to the messages state with their profile picture
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'chatGPT', text: newMessage, picture: 'ai_profile_picture_url' },
      ]);

      // Process the user's message with OpenAI
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    async function processMessageToChatGpt() {
      let role = "user";
      return {
        role: role,
        content: `Hi, can you respond to the user and pretend that you are the fictional character ${userName} and respond to the user's prompt
        which will be this "${userMessage}", and maybe try to respond in a sexy way while trying to flirt with the user. Try to keep it relatively short, to less than 200 tokens`,
      };
    }

    const openAiApiKey = process.env.REACT_APP_OPEN_AI_API_KEY;
    const message = await processMessageToChatGpt();
    const apiRequestBody = {
      messages: [message],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + openAiApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (response.ok) {
        const data = await response.json();

        // Add the ChatGPT response to the messages state with the AI profile picture
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: userId1, text: `${userName}: ${data.choices[0].message.content}`, picture: userProfilePicture },
        ]);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='chatroom'>
      <div className="user-info">
        <img src={userProfilePicture} alt="User Profile" className="user-profile-picture" />
        <h2>{userName}</h2>
      </div>

      <div className="message-container">
        {[...messages, ...sentMessages].map((message, index) => (
          <div key={index} className={`message ${message.sender === 'chatGPT' ? 'sent' : 'received'}`}>
            {message.picture && (
              <img src={message.picture} alt="User Profile" className="user-profile-icon" />
            )}
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
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chatroom;
