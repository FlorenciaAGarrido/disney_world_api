//the repo layer is the one that communicates with the db i.e the model layer
const Movie = require("../models/movies");

class MovieRepository {
  constructor() {}

  //!TO-DO: FILTER CHARACTERS

  findAll = async () => await Movie.findAll();

  // async findAllWithPagination(filter, options) {
  //   return await Movie.paginate(filter, options);
  // }

  findByID = async (id) => await Movie.findByPk(id);

  findByTitle = async (title) => await Movie.findOne({ where: { title } });

  save = async (movie) => await Movie.create(movie);

  update = async (id, movie) =>
    //change every movie in the db whose id matches the id passed as a param to the movie passed as a param
    await Movie.update(movie, { where: { id } });

  remove = async (id) => await Movie.destroy({ where: id });
}

module.exports = MovieRepository;
