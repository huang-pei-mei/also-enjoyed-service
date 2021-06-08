const express = require('express');
const path = require('path');
const app = express();


const port = process.env.PORT || 4000;

const { findRelated } = require('../database/methods/query.js');

app.use(express.static(path.join(__dirname, '..', '/public')));

app.get('/', (req, res) => {
  res.end();
});

app.get('/api/relatedIds/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  if (bookId === undefined || bookId === null) {
    res.status(400).send('Specified item page does not exist');
  } else {
    findRelated(req.params.bookId)
      .then((data) => {
        res.status(200).send(data[0]);
      });
  }
})

app.listen(port, () => {
  const url = process.env.ENV === 'dev' ? 'http://localhost' : 'http://ec2-35-162-103-218.us-west-2.compute.amazonaws.com';
  console.log(`also enjoyed service running on ${url}:${port}`);
});