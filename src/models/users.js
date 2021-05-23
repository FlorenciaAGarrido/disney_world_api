const { DataTypes } = require("sequelize");
const { sequelize } = require("../loaders/sequelize/sequelize");

const User = sequelize.define("Users", {
  // Model attributes are defined here
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  enable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = User;
