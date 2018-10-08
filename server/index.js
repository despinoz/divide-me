const express = require('express');
const bodyParser = require('body-parser');
const Log = require('log');
const db = require('../db');

const app = express();
const port = process.env.PORT || 3000;
const log = new Log('info');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client/dist'));

app.get('/bill', (req, res) => {
  // log.info(create);
  res.send('GET');
});

app.get('/bill/:billId/items', (req, res) => {
  const id = req.params.billId;
  db.find(id, (resp) => {
    log.info(resp.items);
    res.send(resp);
  });
  // log.info(create);
});

app.post('/bill', (req, res) => {
  db.create((data) => {
    // log.info(data.id);
    res.send(data.id);
  });
});

app.put('/bill/:billId', (req, res) => {
  const id = req.params.billId;
  const item = req.body;
  db.update(id, item, (data) => {
    log.info(data);
  });
  // log.info(req.params.billId);
  // log.info(req.body);
  res.end();
});

app.listen(port, () => log.info(`listening to ${port}`));
