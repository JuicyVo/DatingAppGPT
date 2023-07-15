import './App.css';
import React, {useState} from 'react';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import Footer from './components/Footer';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleProfileButtonClick =() => {
    setCurrentScreen('profile')
  };





  return (
    <div className="App">
      <Header/>
      <div className ="container">
      <ProfileCard/>
      <Footer/>
    </div>
    </div>
  );
}

export default App;
