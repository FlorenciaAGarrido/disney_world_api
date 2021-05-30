//in this layer the business logic takes place
const MovieRepository = require("../repositories/MovieRepository");

class MovieServices {
  constructor() {
    this.repo = new MovieRepository();
  }

  getAll = async () => await this.repo.findAll();

  getByID = async (id) => await this.repo.findByID(id);

  getByTitle = async (title) => await this.repo.findByTitle(title);

  create = async (movie) => await this.repo.save(movie);

  edit = async (id, movie) => await this.repo.update(id, movie);

  delete = async (id) => await this.repo.remove(id);
}

module.exports = MovieServices;
