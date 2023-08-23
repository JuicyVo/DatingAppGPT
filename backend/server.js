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
        res.json(result.rows)
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'A error occured'})
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
