module.exports.findRelated = (id, Model) => {
  return Model.find({ book_id: id });
};