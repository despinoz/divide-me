const mongoose = require('mongoose');
const Log = require('log');

const log = new Log('info');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/divide-me', { useNewUrlParser: true });

const ItemSchema = new Schema({
  name: String,
  quantity: Number,
  unitPrice: Number,
});

const BillSchema = new Schema({
  owner: String,
  items: [ItemSchema],
  users: [String],
  name: String,
});

// BillSchema.methods.speak = () => {
//   log.info(this)
//   const greeting = this.name
//     ? `Meow name is ${this.name}`
//     : "I don't have a name";
//   log.info(greeting);
// };

const Bill = mongoose.model('Bill', BillSchema);

const create = (callback) => {
  Bill.create({ }, (err, res) => {
    if (err) log.error(err);
    callback(res);
  });
};

const update = (id, item, callback) => {
  // console.log(item)
  // const newItem = new ItemSchema(item);
  Bill.updateOne({ _id: id }, { $push: { items: item } }, (err, res) => {
    if (err) log.error(err);
    callback(res);
  });
};

const find = (id, callback) => {
  Bill.findOne({ _id: id }, (err, res) => {
    if (err) log.error(err);
    callback(res);
  });
};

module.exports = {
  create,
  update,
  find,
};

// Bill.findById('5b83a66c19eafe19bea65bed', (err, adventure) => {
//   if (err) log.error(err);
// });
