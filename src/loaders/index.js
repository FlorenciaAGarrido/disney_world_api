const Server = require("./server/Server");
const sequelize = require("./sequelize/sequelize");
const config = require("../config/config");
const logger = require("./logger/logger");

const initExpressServer = async () => {
  try {
    //init db connection
    await sequelize.authenticate();

    //!FOR TESTING PURPOSES
    require("../models/characters");
    require("../models/contentTypes");
    require("../models/genres");
    require("../models/movies");
    require("../models/users");

    sequelize.sync({ force: false });
    console.log("Connection has been established successfully."); //replace with logger file

    //init express server
    const server = new Server();
    logger.info("Server loaded successfully");

    //init server
    server.start();
    logger.info(`Server running on port ${config.port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error); //replace with logger file
  }
};

module.exports = { initExpressServer };
