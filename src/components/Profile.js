import React from 'react';

function Profile({ currentScreen }) {
  if (currentScreen === 'profile') {
    return (
      <div className="App">
        <div className="container">
          <h1>Profile</h1>
          <div className="profile-details">
            <img src="profile-image.jpg" alt="Profile" />
            <h2>John Doe</h2>
            <p>Age: 25</p>
            <p>Location: New York</p>
            <p>About Me: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et malesuada felis.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;