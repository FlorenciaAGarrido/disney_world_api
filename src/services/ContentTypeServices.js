//in this layer the business logic takes place
const ContentTypeRepository = require("../repositories/ContentType");

class ContentTypeServices {
  constructor() {
    this.repo = new ContentTypeRepository();
  }

  getByID = async (id) => await this.repo.findByID(id);

  getByDescription = async (desc) => await this.repo.findByDescription(desc);
}

module.exports = ContentTypeServices;
