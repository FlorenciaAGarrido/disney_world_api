//the repo layer is the one that communicates with the db i.e the model layer
const { Op } = require("sequelize"); //operator to filter queries. if its not used, sequelize asumes an equality comparison by default in where clauses
const Movie = require("../models/movies");

class MovieRepository {
  constructor() {}

  findAll = async (
    { title, rating, creationDate }, //filtering query params
    { limit, offset, order } //query options
  ) => {
    let where = {};
    //condtional clauses in case no queries are passed as params
    title && (where.title = { [Op.like]: `%%${title}%` }); //like to match similar and lower case params
    rating && (where.rating = { rating });
    creationDate && (where.creationDate = { creationDate });

    //projection to sort movies by creation date and title
    let projectionAttrs = {
      where,
      attrs: ["title", "image", "creationDate"],
    };

    projectionAttrs && (projectionAttrs.order = [order.split(";")]); //!to add in docs: query params => key: options[order] value: creationDate;ASC || creationDate;DESC. the sames goes for sorting by title

    await Movie.findAll(projectionAttrs);
  };

  findByID = async (id) => await Movie.findByPk(id);

  findByTitle = async (title) => await Movie.findOne({ where: { title } });

  save = async (movie) => await Movie.create(movie);

  update = async (id, movie) =>
    //change every movie in the db whose id matches the id passed as a param to the movie passed as a param
    await Movie.update(movie, { where: { id } });

  remove = async (id) => await Movie.destroy({ where: id });
}

module.exports = MovieRepository;
