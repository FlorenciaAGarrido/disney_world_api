//in this layer the business logic takes place
const ImageRepository = require("../repositories/ImageRepository");
const CharacterRepository = require("../repositories/CharacterRepository");
const MovieRepository = require("../repositories/MovieRepository");

class ImageServices {
  constructor() {
    this.imgRepo = new ImageRepository();
    this.charRepo = new CharacterRepository();
    this.movieRepo = new MovieRepository();
  }

  createCharacterImage = async (charID, file) => {
    const character = await this.charRepo.findByID(charID);

    //if it exists, delete prev img prior to uploading new img
    character.image &&
      (await this.charRepo.remove(character.name, file.mimetype));

    const imgURL = await this.imgRepo.uploadImg(
      character.name,
      file.buffer,
      file.mimetype
    );
    return await this.charRepo.update(charID, { image: imgURL });
  };

  createMovieImage = async (movieID, file) => {
    const movie = await this.movieRepo.findByID(movieID);

    //if it exists, delete prev img prior to uploading new img
    movie.image && (await this.movieRepo.remove(movie.name, file.mimetype));

    const imgURL = await this.imgRepo.uploadImg(
      movie.name,
      file.buffer,
      file.mimetype
    );
    return await this.movieRepo.update(movieID, { image: imgURL });
  };
}

module.exports = ImageServices;
