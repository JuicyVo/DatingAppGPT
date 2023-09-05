import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

function Message() {
  const { userId1, userId2 } = useParams();

  return (
    <div>
      <h2>Message Page</h2>
      <p>User ID 1: {userId1}</p>
      <p>User ID 2: {userId2}</p>
      {/* Add message content and functionality here */}
    </div>
  );
}

export default Message;
