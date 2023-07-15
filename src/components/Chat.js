import React from 'react';
import './chat.css'

function Chat({ currentScreen }) {
  if (currentScreen === 'chats') {
    return (
      <div className="App">
        <h2>New Matches</h2>
        <div className="container">
          <ul class="newMatches">
            <li>Match1</li>
            <li>Match2</li>
            <li>Match3</li>
          </ul>
          <h2>Messages</h2>
          <ul class="messageLog">
            <li>Susan</li>
            <li>Susan</li>
            <li>Susan</li>
            <li>Susan</li>
          </ul>

        </div>
      </div>
    );
  }
}

export default Chat;
