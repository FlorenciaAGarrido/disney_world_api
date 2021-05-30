//the repo layer is the one that communicates with the db i.e the model layer
const Genre = require("../models/genres");

class GenreRepository {
  constructor() {}

  findByID = async (id) => await Genre.findByPk(id);

  findByDescription = async (desc) => await Genre.findOne({ where: { desc } });
}

module.exports = GenreRepository;
