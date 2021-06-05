const express = require("express");
const MovieServices = require("../services/MovieServices");
const movieServices = new MovieServices();
const ImageServices = require("../services/ImageServices");
const imgServices = new ImageServices();
const Success = require("../handlers/SucessHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get all movies
 * @route GET /api/v1/movies
 */

const getAllMovies = async (req, res, next) => {
  try {
    //regarding destructured params in repository
    const { filter = "", options = "" } = req.query;
    //send request to the db with desired queries
    const movies = await movieServices.getAll(filter, options);
    //parse response
    res.json(new Success(movies));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get movie by ID
 * @route GET /api/v1/movies/:id
 */

const getMovieByID = async (req, res, next) => {
  try {
    //id entered in the url as a param
    const id = req.params.id;
    //Send req to the db with the movie id
    const movie = await movieServices.getByID(id);
    //parse res
    res.json(new Success(movie));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get the characters of a movie
 * @route GET /api/v1/movies/:movieID/characters/:characterID
 */

const associateCharacter = async (req, res, next) => {
  try {
    //get the character and the movie coming from the client
    const character = req.character;
    const movie = req.movie;
    //associate the previoulsy mentioned char and movie
    const association = await movieServices.associate(movie, character);
    //parse response
    res.json(new Success(association));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description post movie
 * @route POST /api/v1/movie
 */

const createMovie = async (req, res, next) => {
  try {
    //e.g data posted in the client
    let movie = req.body;
    //fetch previoulsy posted data from the db
    movie = await movieServices.create(movie);
    res.status(201).json(new Success(movie)); //the 201 code indicates that the request has succeeded and has led to the creation of a resource
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description upload the image of a movie
 * @route POST /api/v1/movies/image
 */

const saveMovieImage = async (req, res, next) => {
  try {
    //get the id of the posted movie
    const movieID = req.body.id;
    //get the image of the posted movie
    const img = req.file;
    //parse response
    res.json(new Success(await imgServices.createMovieImage(movieID, img)));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description edit movie by ID
 * @route PUT /api/v1/movies/:id
 */

const updateMovie = async (req, res, next) => {
  try {
    //params sent in the request i.e the id of the movie in the route /:id
    const { id } = req.params;
    //data coming from the client
    let movie = req.body;
    //edit transaction and persist it to the db
    const updatedCharacterMovie = await movieServices.edit(id, movie);
    //parse response
    res.json(new Success(updatedCharacterMovie));
  } catch (error) {
    next(error);
  }
};

/**(
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description delete movie by id
 * @route DELETE /api/v1/movies/:id
 */

const deleteMovie = async (req, res, next) => {
  try {
    //params sent in the request i.e the route /:id
    const { id } = req.params;
    //delete document with the corresponding id sent in the request from the db
    const movie = await movieServices.delete(id);
    //parse response
    res.json(new Success(movie));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies,
  getMovieByID,
  associateCharacter,
  createMovie,
  saveMovieImage,
  updateMovie,
  deleteMovie,
};
