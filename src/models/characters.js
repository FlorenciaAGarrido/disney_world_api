const { DataTypes } = require("sequelize");
const { sequelize } = require("../loaders/sequelize/sequelize");
const Movie = require("./movies");

const Character = sequelize.define("Character", {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: "true",
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  history: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Character;

//many to many relationship. one character can be in different movies e.g woody appears in toy story, toy story 2, etc
Character.belongsToMany(Movie, {
  through: "charactersMovies",
  as: "movies",
  foreignKey: "characterID",
});
