//the repo layer is the one that communicates with the db i.e the model layer
const { Op } = require("sequelize");
const Character = require("../models/characters");

class CharacterRepository {
  constructor() {}

  findAll = async (
    { name, age, weight, movieTitle },
    { limit, offset, order }
  ) => {
    let where = {};
    //condtional clauses in case no queries are passed as params
    name && (where.name = { [Op.like]: `%%${name}%` }); //like to match similar and lower case params
    age && (where.age = { age });
    weight && (where.weight = { weight });

    //!TO DO: movie title. associate character with movie

    await Character.findAll({ where });
  };

  findByID = async (id) => await Character.findByPk(id);

  findByName = async (name) => await Character.findOne({ where: { name } });

  save = async (character) => await Character.create(character);

  update = async (id, character) =>
    //change every character in the db whose id matches the id passed as a param to the character passed as a param
    await Character.update(character, { where: { id } });

  remove = async (id) => await Character.destroy({ where: id });
}

module.exports = CharacterRepository;
