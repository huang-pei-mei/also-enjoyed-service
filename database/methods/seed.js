const { Model } = require('../index.js');

const getRelatedIds = (id) => {
  let related_ids = new Set();

  for (let rel = 0; rel < 12; rel++) {
    let rel_id = id;
    while (rel_id === id) {
      rel_id = randomIdGenerator();
    }

    try {
      related_ids.add(rel_id);
    } catch (err) {
      rel_id = randomIdGenerator();
      related_ids.add(rel_id);
    }
  }

  return Array.from(related_ids);
};

const randomIdGenerator = () => {
  return Math.floor(Math.random() * 100);
}

const seed = () => {
  for (let i = 0; i < 100; i++) {

    const doc = new Model({
      book_id: i,
      related_ids: getRelatedIds(i)
    });

    doc.save((err) => {
      if (err) return console.error(err);
    });
  }
};

seed();