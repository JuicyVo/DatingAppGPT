const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const openai = require('openai');
require('dotenv').config(); //to grab fron .env in backend



const app = express();
const port = 8000;

const client = new Client({
  host: 'localhost',
  database: 'gptinder',
  user: 'williamvo',
});

const openaiApiKey = process.env.OPENAI_API_KEY; 
console.log('OpenAI API Key:', openaiApiKey);

const openaiClient = new openai({
  apiKey: openaiApiKey
});




client.connect();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Backends up");
});


app.get ('/users', (req, res) => {
  try {
    const query ='SELECT * FROM UserProfile'
    client.query(query, (error, result) => {
      if (error) {
        console.log (error)
        res.status(500).json({error: 'A error occured'})
      } else {
        // console.log (result.rows)
        res.json(result.rows)
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'A error occured'})
  }
})

app.post('/check-user', (req, res) => {
  console.log("CheckUser")
  try {
    const { email } = req.body;
    const query = 'SELECT EXISTS (SELECT 1 FROM UserProfile WHERE email = $1) AS exists;';
    const values = [email];

    client.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while checking user existence' });
      } else {
        const userExists = result.rows[0].exists;
        console.log("User exists:", userExists); // Add this line to log user existence
        res.json({ exists: userExists });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while checking user existence' });
  }
});

app.post('/users', (req, res) => {
  console.log("UWU")
  try {
    const { firstName, lastName, age, gender, biography, matches, reports, email, profilePictureUrl, location, isBot } = req.body;
    const query = `INSERT INTO UserProfile (firstName, lastName, age, gender, biography, matches, reports, email, profilePictureUrl, location, isBot) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
    const values = [firstName, lastName, age, gender, biography, matches, reports, email, profilePictureUrl, location, isBot];
    client.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
      } else {
        res.json(result.rows[0]);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

app.post('/get-user-id', (req, res) => { //god damn this was a pain
  try {
    const { email } = req.body;
    const values = [email];
    console.log('Received email:', email); 
    const query = 'SELECT userId FROM UserProfile WHERE email = $1;';

    client.query(query, values, (error, result) => {
      if (error) {
        console.log('Database query error:', error);
        res.status(500).json({ error: 'An error occurred while getting userId' });
      } else {
        console.log('Database query result:', result.rows); // Log the entire result object
        const userId = result.rows[0] ? result.rows[0].userid : null;
        console.log("User ID:", userId); 

        console.log("Response Sent:", {
          userId,
        });
        res.json({ userId });
      }
    });
  } catch (error) {
    console.log('Server error:', error);
    res.status(500).json({ error: 'An error occurred while getting userId' });
  }
});

app.post('/create-like', (req, res) => {
  try {
    const { likerId, likedUserId } = req.body;

    // Check if the target user is a bot
    const checkBotQuery = 'SELECT isBot FROM UserProfile WHERE userId = $1;';
    const values = [likedUserId];

    client.query(checkBotQuery, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while checking if the user is a bot.' });
      } else {
        const isBot = result.rows[0].isbot;
        console.log (result.rows[0].isbot)
        console.log(`User ${likerId} is liking User ${likedUserId}. Is target user a bot? ${isBot ? 'Yes' : 'No'}`);

        if (isBot) {
          // Create a mutual like if the target user is a bot
          const createLikeQuery = 'INSERT INTO Likes (likerId, likedUserId) VALUES ($1, $2), ($2, $1);';
          const likeValues = [likerId, likedUserId];
          console.log ("IS A BOT")
          client.query(createLikeQuery, likeValues, (likeError) => {
            if (likeError) {
              console.error(likeError);
              res.status(500).json({ error: 'An error occurred while creating a mutual like.' });
            } else {
              res.json({ message: 'Like created successfully.' });
              console.log(`User ${likerId} is liking User ${likedUserId}. Is target user a bot? ${isBot ? 'Yes' : 'No'}`);
            }
          });
        } else {
          // If the target user is not a bot, create a one-way like
          const createLikeQuery = 'INSERT INTO Likes (likerId, likedUserId) VALUES ($1, $2);';
          const likeValues = [likerId, likedUserId];
          console.log ("ISNT A BOT")

          client.query(createLikeQuery, likeValues, (likeError) => {
            if (likeError) {
              console.error(likeError);
              res.status(500).json({ error: 'An error occurred while creating a like.' });
            } else {
              res.json({ message: 'Like created successfully.' });
            }
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating a like.' });
  }
});



app.post('/create-match', (req, res) => {
  try {
    const { user1Id, user2Id } = req.body;

    console.log(`Received request to create match between User ${user1Id} and User ${user2Id}`);

    // Check if both users have liked each other
    const checkLikeQuery = 'SELECT EXISTS (SELECT 1 FROM Likes WHERE likerId = $1 AND likedUserId = $2) AS user1LikesUser2, ' +
      'EXISTS (SELECT 1 FROM Likes WHERE likerId = $2 AND likedUserId = $1) AS user2LikesUser1;';
    const values = [user1Id, user2Id];

    client.query(checkLikeQuery, values, (error, result) => {
      if (error) {
        console.error('Error while checking likes:', error);
        res.status(500).json({ error: 'An error occurred while checking likes between users.' });
      } else {
        const user1LikesUser2 = result.rows[0].user1likesuser2;
        const user2LikesUser1 = result.rows[0].user2likesuser1;

        console.log(`Received request to create match between User ${user1Id} and User ${user2Id}`);
        console.log(`User ${user1Id} likes User ${user2Id}: ${user1LikesUser2}`);
        console.log(`User ${user2Id} likes User ${user1Id}: ${user2LikesUser1}`);
        

        if (user1LikesUser2 && user2LikesUser1) {
          // Both users have liked each other, create a match
          const createMatchQuery = 'INSERT INTO Matches (user1Id, user2Id) VALUES ($1, $2);';
          const matchValues = [user1Id, user2Id];

          client.query(createMatchQuery, matchValues, (matchError) => {
            if (matchError) {
              console.error('Error creating match:', matchError);
              res.status(500).json({ error: 'An error occurred while creating a match.' });
            } else {
              console.log(`Match created between User ${user1Id} and User ${user2Id}`);
              res.json({ message: 'Match created successfully.' });
            }
          });
        } else {
          // Users have not liked each other, cannot create a match
          console.log(`Users ${user1Id} and ${user2Id} did not like each other.`);
          res.status(400).json({ error: 'Both users must like each other to create a match.' });
        }
      }
    });
  } catch (error) {
    console.error('Exception caught:', error);
    res.status(500).json({ error: 'An error occurred while creating a match.' });
  }
});



app.get('/user-matches/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    
    const query = 'SELECT * FROM Matches WHERE user1Id = $1 OR user2Id = $1';
    const values = [userId];

    client.query(query, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user matches.' });
      } else {
        res.json(result.rows);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user matches.' });
  }
});



app.get('/user-profile/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    const query = 'SELECT * FROM UserProfile WHERE userId = $1;';
    const values = [userId];

    client.query(query, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user profile.' });
      } else {
        if (result.rows.length === 0) {
          res.status(404).json({ error: 'User profile not found.' });
        } else {
          res.json(result.rows[0]);
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user profile.' });
  }
});






// Start the Express app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

