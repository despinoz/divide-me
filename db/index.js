const mongoose = require('mongoose');
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

mongoose.connect('mongodb://localhost/divide-me');
