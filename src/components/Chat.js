import React from 'react';
import './chat.css'

function Chat({ currentScreen }) {
  if (currentScreen === 'chats') {
    return (
      <div className="App">
        <div className="chatContainer">
          <div className="newMatchesHeader">
        <h2>New Matches</h2>
        </div>
          <ul className="newMatches">
            <li>Match1</li>
            <li>Match2</li>
            <li>Match3</li>
          </ul>
          <div className="messageLogHeader">
          <h2>Messages</h2>
          </div>
          <ul className="messageLog">
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
