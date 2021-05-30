const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize/sequelize");

const Genre = sequelize.define("Genre", {
  // Model attributes are defined here
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Genre;

//!IMPORT HERE
const Movie = require("./movies");

//one to many relationship. one genre e.g thriller can have more than one movie
Genre.hasMany(Movie, { foreignKey: "genreID", sourceKey: "id" });
