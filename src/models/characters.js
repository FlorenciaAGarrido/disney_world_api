const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize/sequelize");

const Character = sequelize.define("Character", {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    //true until the img is uploaded to a cloud service
    allowNull: true,
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

//!IMPORT HERE
const Movie = require("./movies");

//many to many relationship. one character can be in different movies e.g woody appears in toy story, toy story 2, etc
Character.belongsToMany(Movie, {
  through: "charactersMovies",
  as: "movies",
  foreignKey: "characterID",
});
