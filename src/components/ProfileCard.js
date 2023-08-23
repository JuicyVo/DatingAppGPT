import { useEffect, useState } from 'react';
import './profile-card.css'
import axios from 'axios';



export default function ProfileCard() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/users')
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      if (users.length > 0) {
        console.log(users[0].profilepictureurl)
      }
  }, []);

  const handleNextProfile = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  const currentProfile = users[currentIndex];

  if (!currentProfile) {
    return <div>No more profiles</div>;
  }

  return (
    <div className="profile-card">
      <div className="image-container">
        <img src={currentProfile.profilepictureurl} />
      </div>
      <div className="profile-info">
        <h2>{`${currentProfile.firstname} ${currentProfile.lastname}`}</h2>
        <p>Age: {currentProfile.age}</p>
        <p>Bio: {currentProfile.biography}</p>
      </div>
      <div className="swipe-buttons">
        <button>rewind</button>
        <button onClick={handleNextProfile}>Next Profile</button>
      </div>
    </div>
  );
}
