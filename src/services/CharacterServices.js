//in this layer the business logic takes place
const CharacterRepository = require("../repositories/CharacterRepository");
const ImageRepository = require("../repositories/ImageRepository");

class CharacterServices {
  constructor() {
    this.charRepo = new CharacterRepository();
    this.imgRepo = new ImageRepository();
  }

  getAll = async (filter, options) =>
    await this.charRepo.findAll(filter, options);

  getByID = async (id) => await this.charRepo.findByIDWithMovies(id);

  getByName = async (name) => await this.charRepo.findByName(name);

  associate = async (character, movie) => await character.addMovie(movie);

  create = async (character) => await this.charRepo.save(character);

  edit = async (id, character) => await this.charRepo.update(id, character);

  delete = async (id) => {
    //get character from the db by its id
    const character = await this.charRepo.findByID(id);
    //delete the image from aws of the previously fetched character
    this.imgRepo.deleteImg(character.image);
    //delete character from db
    return await this.charRepo.remove(id);
  };
}

module.exports = CharacterServices;
