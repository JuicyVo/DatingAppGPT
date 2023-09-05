import React, { useEffect, useState } from 'react';
import './chat.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function Chat({ currentScreen }) {
  const [matches, setMatches] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]); // State to store user profiles
  const { user, isAuthenticated } = useAuth0();
  const [userId, setUserId] = useState(null); // State to store user's ID

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch the user's ID
      axios
        .post('http://localhost:8000/get-user-id', {
          email: `${user.given_name}.${user.family_name}@example.com`,
        })
        .then(response => {
          setUserId(response.data.userId);
          console.log(`User ID: ${response.data.userId}`);
        })
        .catch(error => {
          console.error('Error getting userId:', error);
        });
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      // Fetch the user's matches using their ID
      axios
        .get(`http://localhost:8000/user-matches/${userId}`)
        .then(async response => {
          const matchesData = response.data;

          // Create an array to store user profile information
          const userProfilesData = [];

          // Fetch user profile information for each match's user2id
          for (const match of matchesData) {
            const userProfileResponse = await axios.get(
              `http://localhost:8000/user-profile/${match.user2id}`
            );

            // Add user profile information to the array
            userProfilesData.push(userProfileResponse.data);
          }

          // Set both matches and user profiles data in state
          setMatches(matchesData);
          setUserProfiles(userProfilesData);

          console.log('Matches:', matchesData);
          console.log('User Profiles:', userProfilesData);
        })
        .catch(error => {
          console.error('Error fetching user matches:', error);
        });
    }
  }, [userId, isAuthenticated]);

  if (currentScreen === 'chats') {
    return (
      <div className="App">
        <div className="chatContainer">
          <div className="newMatchesHeader">
            <h2>Messages</h2>
          </div>
          <ul className="messageLog">
            {matches.map((match, index) => (
              <li key={match.matchid}>
                <div>
                  {/* <p>Match ID: {match.matchid}</p> */}
                  {/* <p>User 2 ID: {match.user2id}</p> */}
                  {userProfiles[index] && (
                    <div>
                      <p>{userProfiles[index].firstname} {userProfiles[index].lastname}</p>
                      <img src={userProfiles[index].profilepictureurl} alt={`Profile ${index}`} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="messageLogHeader">
            
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
