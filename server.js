const express = require('express');

const app = express();

app.all('/', (req, res) => {res.sendStatus(200)});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});