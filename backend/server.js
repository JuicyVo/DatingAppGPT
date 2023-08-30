const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 8000;

const client = new Client({
  host: 'localhost',
  database: 'gptinder',
  user: 'williamvo',
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








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
