//in this layer the business logic takes place
const MovieRepository = require("../repositories/MovieRepository");
const GenreRepository = require("../repositories/GenreRepositpory");
const ContentTypeRepository = require("../repositories/ContentTypeRepository");

class MovieServices {
  constructor() {
    this.movieRepo = new MovieRepository();
    this.genreRepo = new GenreRepository();
    this.contentTypeRepo = new ContentTypeRepository();
  }

  getAll = async () => await this.movieRepo.findAll();

  getByID = async (id) => await this.movieRepo.findByID(id);

  getByTitle = async (title) => await this.movieRepo.findByTitle(title);

  create = async (movie) => {
    const genre = await this.genreRepo.findByDescription(movie.genre);
    const contentType = await this.contentTypeRepo.findByDescription(
      movie.contentType
    );

    movie.genreID = genre.id;
    movie.contentTypeID = contentType.id;

    return await this.movieRepo.save(movie);
  };

  edit = async (id, movie) => {
    if (movie.genre) {
      const genre = await this.genreRepo.findByDescription(movie.genre);
      const contentType = await this.contentTypeRepo.findByDescription(
        movie.contentType
      );

      movie.genreID = genre.id;
      movie.contentTypeID = contentType.id;
    }

    return await this.movieRepo.update(id, movie);
  };

  delete = async (id) => await this.movieRepo.remove(id);
}

module.exports = MovieServices;
