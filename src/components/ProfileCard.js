import { useEffect, useState } from 'react';
import './profile-card.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function ProfileCard() {
  const { user, isAuthenticated } = useAuth0();
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/users')
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

 

  const handleNextProfile = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handleLastProfile = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  const currentProfile = users[currentIndex];

  return (
    <div className="profile-card">
      <div className="image-container">
        <img src={currentProfile.profilepictureurl} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>{`${currentProfile.firstname} ${currentProfile.lastname}`}</h2>
        <p>{currentProfile.biography}</p>
      </div>
      <div className="swipe-buttons">
        <button onClick={handleLastProfile}>Rewind</button>
        <button onClick={handleNextProfile}>Next Profile</button>
      </div>
      <div className="like-dislike">
        <button>Dislike</button>
        {/* <button onClick={handleLike}>Like</button> */}
      </div>
    </div>
  );
}
