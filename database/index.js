const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/alsoEnjoyed', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', () => console.error('connection error! '));
db.once('open', () => {
  console.log('db connected successfully');
});

const alsoSchema = new mongoose.Schema({
  book_id: {
    type: Number,
    index: true,
    unique: true
  },
  related_ids: [Number]
});

const Also = mongoose.model('Also', alsoSchema);

module.exports.db = db;
module.exports.Model = Also;