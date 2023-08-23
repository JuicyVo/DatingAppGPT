import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [currentScreen, setCurrentScreen] = useState('profile');
  const [message, setMessage] = useState('');


  const handleProfileButtonClick = () => {
    setCurrentScreen('profile');
  };
  const handleSwipesButtonClick = () => {
    setCurrentScreen('swipes');
  };
  const handleChatsButtonClick = () => {
    setCurrentScreen('chat');
  };

  useEffect(() => { //testrun
   axios.get('http://localhost:8000/data')
      .then(response => {
        console.log("hi")
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect (()=> {
    axios.get('http://localhost:8000/users')
    .then(response => {
      console.log (response.data)
    })
    .catch (error => {
      console.log (error)
    })
  },[])





  return (
    <div className="App">
       <h1>{message}</h1>
      <SwipeHeader
        // currentScreen={currentScreen}
        // handleProfileButtonClick={handleProfileButtonClick}
        // handleSwipesButtonClick={handleSwipesButtonClick}
        // handleChatsButtonClick={handleChatsButtonClick}
      />
      <div className="container">
        <Swipe currentScreen={currentScreen} />
        <Chat currentScreen={currentScreen} />
        <Profile currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}/>
      </div>
      <SwipeFooter setCurrentScreen={setCurrentScreen} />
      <LoginButton/>
      <LogoutButton/>
    </div>
   
  );
}

export default App;
