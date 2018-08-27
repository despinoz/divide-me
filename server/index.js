const express = require('express');
const Log = require('log');
const db = require('../db');

const app = express();
const port = process.env.PORT || 3000;
const log = new Log('info');

app.get('/bill', (req, res) => {
  // log.info(create);
  res.send('GET');
});

app.post('/bill', (req, res) => {
  db.create((data) => {
    // log.info(data.id);
    res.send(data.id);
  });
});

app.use(express.static('client/dist'));

app.listen(port, () => log.info(`listening to ${port}`));
