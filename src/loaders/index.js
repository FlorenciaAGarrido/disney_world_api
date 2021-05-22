const Server = require("./server/Server");
const { sequelize } = require("./sequelize/sequelize");
const config = require("../config/config");
const logger = require("./logger/logger");

const initExpressServer = async () => {
  try {
    //init db connection
    await sequelize.authenticate();
    //model synchronization. {alter: true} checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
    sequelize.sync({ alter: true });
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
