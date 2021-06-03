const { Model } = require('../index.js');

module.exports.findRelated = (id) => {
  return Model.find({ book_id: id });
};