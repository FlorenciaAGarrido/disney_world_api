//in this layer the business logic takes place
const GenreRepository = require("../repositories/GenreRepository");

class GenreServices {
  constructor() {
    this.repo = new GenreRepository();
  }

  getByID = async (id) => await this.repo.findByID(id);

  getByDescription = async (desc) => await this.repo.findByDescription(desc);
}

module.exports = GenreServices;
