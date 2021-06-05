const express = require("express");
const CharacterServices = require("../services/CharacterServices");
const characterServices = new CharacterServices();
const ImageServices = require("../services/ImageServices");
const imgServices = new ImageServices();
const Success = require("../handlers/SucessHandler");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get all characters
 * @route GET /api/v1/characters
 */

const getAllCharacters = async (req, res, next) => {
  try {
    //regarding destructured params in repository
    const { filter = "", options = "" } = req.query;
    //send request to the db with desired  queries
    const characters = await characterServices.getAll(filter, options);
    //parse response
    res.json(new Success(characters));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get character by ID
 * @route GET /api/v1/characters/:id
 */

const getCharacterByID = async (req, res, next) => {
  try {
    //id entered in the url as a param
    const id = req.params.id;
    //Send req to the db with the character id
    const character = await characterServices.getByID(id);
    //parse res
    res.json(new Success(character));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description get the character and the movies they are part of
 * @route GET /api/v1/characters/:characterID/movies/:movieID
 */

const associateCharacter = async (req, res, next) => {
  try {
    //get the character and the movie coming from the client
    const character = req.character;
    const movie = req.movie;
    //associate the previoulsy mentioned char and movie
    const association = await characterServices.associate(character, movie);
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
 * @description post characters
 * @route POST /api/v1/characters
 */

const createCharacter = async (req, res, next) => {
  try {
    //e.g data posted in the client
    let character = req.body;
    //fetch previoulsy posted data from the db
    character = await characterServices.create(character);
    res.status(201).json(new Success(character)); //the 201 code indicates that the request has succeeded and has led to the creation of a resource
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description upload the image of a character
 * @route POST /api/v1/image
 */

const saveCharacterImage = async (req, res, next) => {
  try {
    //get the id of the posted character
    const charID = req.body.id;
    //get the image of the posted character
    const img = req.file;
    //parse response
    res.json(new Success(await imgServices.createCharacterImage(charID, img)));
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description edit character by ID
 * @route PUT /api/v1/characters/:id
 */

const updateCharacter = async (req, res, next) => {
  try {
    //params sent in the request i.e the character's id in the route /:id
    const { id } = req.params;
    //data coming from the client
    let character = req.body;
    //edit transaction and persist it to the db
    const updatedCharacter = await characterServices.edit(id, character);
    //parse response
    res.json(new Success(updatedCharacter));
  } catch (error) {
    next(error);
  }
};

/**(
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @description delete character by id
 * @route DELETE /api/v1/characters/:id
 */

const deleteCharacter = async (req, res, next) => {
  try {
    //params sent in the request i.e the route /:id
    const { id } = req.params;
    //delete document with the corresponding id sent in the request from the db
    const character = await characterServices.delete(id);
    //parse response
    res.json(new Success(character));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCharacters,
  getCharacterByID,
  associateCharacter,
  createCharacter,
  saveCharacterImage,
  updateCharacter,
  deleteCharacter,
};
