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

  // console.log (user)//this works
  const constructedEmail = `${user.given_name}.${user.family_name}@example.com`;

 

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

  const handleLike = (constructedEmail, likedUserId) => {
    axios
      .post('http://localhost:8000/get-user-id', {
        email: constructedEmail,
      })
      .then(response => {
        const user1Id = response.data.userId;
        const user2Id = likedUserId;
  
        console.log(`User with ID ${user1Id} likes user with ID ${likedUserId}`);
  
        axios.post('http://localhost:8000/create-like', {
            likerId: user1Id,
            likedUserId: user2Id,
          })
          .then(likeResponse => {
            console.log('Like Response:', likeResponse.data);
  
            axios.post('http://localhost:8000/create-match', {
                user1Id,
                user2Id,
              })
              .then(matchResponse => {
                console.log('Match Response:', matchResponse.data); // Log match response
              })
              .catch(error => {
                console.log('Error creating a match:', error);
              });
          })
          .catch(error => {
            console.log('Error creating a like:', error);
          });
      })
      .catch(error => {
        console.log('Error getting userId:', error);
      });
  };
  

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  const currentProfile = users[currentIndex];

// console.log(`${user.given_name}.${user.family_name}@example.com`)
// console.log(currentProfile.userid)



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
        
        <button onClick={() => handleLike(`${user.given_name}.${user.family_name}@example.com`, currentProfile.userid)}>Like</button>

      </div>
    </div>
  );
}
