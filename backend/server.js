// imports
require('dotenv').config();
const express = require('express');

// constants
const port = Number(process.env.PORT);

const app = express();

app.get('/', (req, res) => {
  console.log('request recieved!');

  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
