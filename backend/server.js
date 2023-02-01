// imports
require('dotenv').config();
const express = require('express');
const path = require('path');

// constants
const port = Number(process.env.PORT);

const app = express();

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('request recieved!');

  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.status(200).json({ hello: 'world' });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
