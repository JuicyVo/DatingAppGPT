import React, { useState } from 'react';
import './App.css';
import SwipeFooter from './components/SwipeFooter';
import ProfileCard from './components/ProfileCard';
import SwipeHeader from './components/SwipeHeader';
import Swipe from './components/Swipe';
import Chat from './components/Chat';
import Profile from './components/Profile';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';


function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleProfileButtonClick = () => {
    setCurrentScreen('profile');
  };

  const handleSwipesButtonClick = () => {
    setCurrentScreen('swipes');
  };

  const handleChatsButtonClick = () => {
    setCurrentScreen('chat');
  };

  return (
    <div className="App">
      <SwipeHeader
        // currentScreen={currentScreen}
        // handleProfileButtonClick={handleProfileButtonClick}
        // handleSwipesButtonClick={handleSwipesButtonClick}
        // handleChatsButtonClick={handleChatsButtonClick}
      />
      <div className="container">
        <Swipe currentScreen={currentScreen} />
        <Chat currentScreen={currentScreen} />
        <Profile currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      
      </div>
      <SwipeFooter setCurrentScreen={setCurrentScreen} />
      <LoginButton/>
      <LogoutButton/>
    </div>
  );
}

export default App;
