import React, { useEffect, useState } from 'react';
import './chat.css';
import axios from 'axios';

function Chatroom({ userName, userProfilePicture, userId1 }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);
  const [prompt, setPrompt] =useState('');
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

  const sendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      const message = { text: newMessage };
      setSentMessages((prevSentMessages) => [...prevSentMessages, message]);
      socket.send(JSON.stringify(message));
      setNewMessage(''); 
    }
  };


// //chatgpt
// async function processMessageToChatGpt() {
//   let role = "user";
//   return { role: role, content: `Hi, can you respond to the user and pretend that if you are ${userName} and talk about your 
//   recent accomplishments?` };
// }
// const openAiApiKey = process.env.REACT_APP_OPEN_AI_API_KEY;

// async function fetchData() {
//   const message = await processMessageToChatGpt();

//   const apiRequestBody = {
//     messages: [message],
//     model: "gpt-3.5-turbo",
//     temperature: 0.7,
//   };

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": "Bearer " + openAiApiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(apiRequestBody),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//     } else {
//       throw new Error("Failed to fetch data");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchData();




const handleSubmit = async (e) => {
  e.preventDefault();

  async function processMessageToChatGpt() {
    let role = "user";
    return {
      role: role,
      content: `Hi, can you respond to the user and pretend that you are the fictional character ${userName} and respond to user's prompt
      which will be this "${userMessage}", and maybe try to respond in a sexy way while trying to flirt with the user .`,
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

      // Add the ChatGPT response to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'chatGPT', text: data.choices[0].message.content },
      ]);

    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error(error);
  }
};

    

  return (
    <div>
            <div className="user-info">
        <img src={userProfilePicture} alt="User Profile" className="user-profile-picture" />
        <h2>{userName}</h2>
      </div>


      <div className="message-container">

    <h2>TEST</h2>

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
        {/* <button onClick={sendMessage}>Send</button> */} 
        <button onClick={handleSubmit}>Send</button> 
      </div>
    </div>
  );
}

export default Chatroom;
