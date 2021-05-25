//in this layer the business logic takes place
const CharacterRepository = require("../repositories/CharacterRepository");

class CharacterServices {
  constructor() {
    this.repo = new CharacterRepository();
  }

  getAll = async () => await this.repo.findAll();

  getByID = async (id) => await this.repo.findByID(id);

  getByName = async (name) => await this.repo.findByName(name);

  create = async (character) => await this.repo.save(character);

  edit = async (id, character) => await this.repo.update(id, character);

  delete = async (id) => await this.repo.remove(id);
}

module.exports = CharacterServices;
