const { DataTypes } = require("sequelize");
const { sequelize } = require("../loaders/sequelize/sequelize");
const Character = require("./characters");
const ContentType = require("./contentTypes");
const Genre = require("./genres");

const Movie = sequelize.define("Movie", {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Movie;

//many to many relationship. one movie can have many characters e.g toy story has woody, buzz, etc., as characters
Movie.belongsToMany(Character, {
  through: "charactersMovies",
  as: "character",
  foreignKey: "movieID",
});

//?one to many relationships
//Every "movie" is either a movie or a series i.e the ContentType obj
Movie.belongsTo(ContentType, {
  foreignKey: "contentTypeID",
  targetKey: "id",
});
//one to many relation. there can be many movies of each genre
Movie.belongsTo(Genre, { foreignKey: "genreID", targetKey: "id" });
