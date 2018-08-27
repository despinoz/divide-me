const mongoose = require('mongoose');
const Log = require('log');

const log = new Log('info');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/divide-me', { useNewUrlParser: true });

const BillSchema = new Schema({
  owner: String,
  users: {
    user: String,
  },
  name: String,
});

const Bill = mongoose.model('Bill', BillSchema);

const create = (callback) => {
  Bill.create({ }, (err, result) => {
    if (err) log.error(err);
    callback(result);
  });
};

module.exports = {
  create,
};
