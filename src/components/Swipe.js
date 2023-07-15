import React from 'react';
import ProfileCard from './ProfileCard';
import SwipeFooter from './SwipeFooter';

function Swipes({ currentScreen }) {
  if (currentScreen === 'swipes') {
    return (
      <div className="App">
        <div className="container">
          <ProfileCard />
        </div>
      </div>
    );
  
  }
}

export default Swipes;
