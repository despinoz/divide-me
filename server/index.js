const express = require('express');
const Log = require('log');

const app = express();
const port = process.env.PORT || 3000;
const log = new Log('info');


app.use(express.static('client/dist'));

app.listen(port, () => log.info(`listening to ${port}`));
