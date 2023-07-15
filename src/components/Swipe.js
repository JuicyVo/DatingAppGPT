import React from 'react';
import ProfileCard from './ProfileCard';
import SwipeFooter from './SwipeFooter';
import SwipeHeader from './SwipeHeader'

function Swipes({ currentScreen }) {
  if (currentScreen === 'swipes') {
    return(
    <div className="App">
    <SwipeHeader />
    <div className="container">
      <ProfileCard />
      <SwipeFooter />
    </div>
  </div>
    )

  } else if (currentScreen === 'profile') {
    return null;
  } else {
    return null;
  }
}

export default Swipes;

