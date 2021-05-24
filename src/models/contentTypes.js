const { DataTypes } = require("sequelize");
const { sequelize } = require("../loaders/sequelize/sequelize");
const Movie = require("./movies");

//content type refers to a movie or a series
const ContentType = sequelize.define("ContentType", {
  // Model attributes are defined here
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = ContentType;

ContentType.hasMany(Movie, {
  as: "movies",
  foreignKey: "contentTypeID",
});
