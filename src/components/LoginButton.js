import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const LoginButton = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const constructedEmail = `${user.given_name}.${user.family_name}@example.com`;
  
      axios
        .post('http://localhost:8000/check-user', {
          email: constructedEmail,
        })
        .then(response => {
          const userExists = response.data.exists;
  
          if (!userExists) {
            axios
              .post('http://localhost:8000/users', {
                firstName: user.given_name,
                lastName: user.family_name,
                age: 0,
                gender: '',
                biography: '',
                matches: 0,
                reports: 0,
                email: constructedEmail,
                profilePictureUrl: user.picture,
                location: '',
              })
              .then(response => {
                console.log('User added:', response.data);
              })
              .catch(error => {
                console.log('Error adding user:', error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [user, isAuthenticated]);
  

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginButton;
