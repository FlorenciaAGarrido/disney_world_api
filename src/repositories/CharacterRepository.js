//the repo layer is the one that communicates with the db i.e the model layer
const Character = require("../models/characters");

class CharacterRepository {
  constructor() {}

  //!TO-DO: FILTER CHARACTERS

  //   findAll = async () => await Character.findAll();

  // async findAllWithPagination(filter, options) {
  //   return await Character.paginate(filter, options);
  // }

  //   findByID = async (id) => await Character.findByPk(id);

  //findByName = async name => await Character.findOne({where: {name}})

  save = async (character) => await Character.create(character);

  //   update = async (id, character) =>
  //     //change every character in the db whose id matches the id passed as a param to the character passed as a param
  //     await Character.update(character, { where: { id } });

  //   remove = async (id) => await Character.destroy({ where: id });
}

module.exports = CharacterRepository;
