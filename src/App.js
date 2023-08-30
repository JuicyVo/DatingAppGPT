import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SwipeFooter from './components/SwipeFooter';
import { useAuth0 } from "@auth0/auth0-react";
import ProfileCard from './components/ProfileCard';
import SwipeHeader from './components/SwipeHeader';
import Swipe from './components/Swipe';
import Chat from './components/Chat';
import Profile from './components/Profile';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';




function App() {
  const { user, isAuthenticated } = useAuth0(); // Add this line
  const [users, setUsers] = useState([]); // Add this line
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
      // console.log (response.data)
    })
    .catch (error => {
      console.log (error)
    })
  },[])


  // useEffect(() => {
  //   if (isAuthenticated && users.length > 0) {
  //     const fullName = `${user?.given_name} ${user?.family_name}`;
  //     const userExists = users.some(u => `${u.firstName} ${u.lastName}` === fullName);

  //     if (!userExists) {
  //       axios
  //         .post('http://localhost:8000/users', {
  //           firstName: user?.given_name,
  //           lastName: user?.family_name,
  //           age: 0,
  //           gender: '',
  //           biography: '',
  //           matches: 0,
  //           reports: 0,
  //           email: user?.email || `${user?.given_name}.${user?.family_name}@example.com`,
  //           profilePictureUrl: user?.picture,
  //           location: '',
  //         })
  //         .then(response => {
  //           console.log('User added:', response.data);
  //           setUsers(prevUsers => [...prevUsers, response.data]);
  //         })
  //         .catch(error => {
  //           console.log('Error adding user:', error);
  //         });
  //     }
  //   }
  // }, [user, isAuthenticated, users]);




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
