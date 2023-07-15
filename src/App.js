import React, { useState } from 'react';
import './App.css';
import SwipeFooter from './components/SwipeFooter';
import ProfileCard from './components/ProfileCard';
import SwipeHeader from './components/SwipeHeader';
import Swipe from './components/Swipe';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleProfileButtonClick = () => {
    setCurrentScreen('profile');
  };

  const handleSwipesButtonClick = () => {
    setCurrentScreen('swipes');
  };

  const handleChatsButtonClick = () => {
    setCurrentScreen('chats');
  };

  return (
    <div className="App">
      <SwipeHeader
        currentScreen={currentScreen}
        handleProfileButtonClick={handleProfileButtonClick}
        handleSwipesButtonClick={handleSwipesButtonClick}
        handleChatsButtonClick={handleChatsButtonClick}
      />
      <div className="container">
        <Swipe currentScreen={currentScreen} />
      </div>
      <SwipeFooter setCurrentScreen={setCurrentScreen} />
    </div>
  );
}

export default App;
