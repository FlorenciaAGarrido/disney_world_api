const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize/sequelize");

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
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Movie;

//!IMPORT HERE
const Character = require("./characters");
const ContentType = require("./contentTypes");
const Genre = require("./genres");

//many to many relationship. one movie can have many characters e.g toy story has woody, buzz, etc., as characters
Movie.belongsToMany(Character, {
  through: "characterMovies",
  as: "characters",
  foreignKey: "movieID",
});

// //?one to many relationships
//Every "movie" is either a movie or a series i.e the ContentType obj
Movie.belongsTo(ContentType, {
  foreignKey: "contentTypeID",
  targetKey: "id",
  as: "contentType",
});

Movie.belongsTo(Genre, {
  foreignKey: "genreID",
  targetKey: "id",
  as: "genre",
});
