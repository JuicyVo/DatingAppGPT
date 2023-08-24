import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, user } = useAuth0(); // Destructure user from useAuth0

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin
      }

    });
  };

  console.log (user)
  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
      {/* {user && (
        <div>
          <h3>User Information:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Picture: <img src={user.picture} alt="Profile" /></p>
        </div>
      )} */}
    </div>
  );
};

export default LoginButton;
