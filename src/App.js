import './App.css';
import React, {useState} from 'react';
import Swipes from './components/Swipe';

function App() {
  const [currentScreen, setCurrentScreen] = useState('swipes');

  const handleProfileButtonClick =() => {
    setCurrentScreen('profile')
  };
  const handleSwipesButtonClick =() => {
    setCurrentScreen('swipes')
  };
  const handleChatsButtonClick =() => {
    setCurrentScreen('chats')
  };

return <Swipes currentScreen={currentScreen} />




}

export default App;
