import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
function Profile({ currentScreen, setCurrentScreen }) {
  const { user } = useAuth0();

  const [age, setAge] = useState(user?.age || '');
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || '');
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Add save logic here
    setEditMode(false);
  };

  return (
    <>
      {currentScreen === 'profile' && (
        <div className="App">
          <div className="container">
            <div className="profile-details">
              <img src={user?.picture} alt="Profile Picture" className="img-profile" />
              <h2>{user?.given_name}</h2>
              <p>Age: {age}</p>
              <p>About Me: {aboutMe}</p>

              {editMode ? (
                <>
                  <label>
                    Age:
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                  </label>
                  <label>
                    About Me:
                    <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} />
                  </label>
                  <button onClick={handleSaveClick}>Save</button>
                </>
              ) : (
                <button onClick={handleEditClick}>Edit</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default Profile;
