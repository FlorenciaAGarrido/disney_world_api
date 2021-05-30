//the repo layer is the one that communicates with the db i.e the model layer
const ContentTypes = require("../models/contentTypes");

class ContentTypeRepository {
  constructor() {}

  findByID = async (id) => await ContentTypes.findByPk(id);

  findByDescription = async (desc) =>
    await ContentTypes.findOne({ where: { desc } });
}

module.exports = ContentTypeRepository;
