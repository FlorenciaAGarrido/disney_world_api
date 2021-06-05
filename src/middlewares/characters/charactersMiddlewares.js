//File to validate the users' data i.e the attrs set in the user model, in every endpoint
const { check } = require("express-validator");
const multer = require("multer");
const upload = multer();
const AppError = require("../../handlers/AppError");
const { USER_ROLE, ADMIN_ROLE } = require("../../constants/constants");
const {
  commonValidationResult,
  imageRequired,
} = require("../commonMiddlewares");
const { validJWT, hasRole } = require("../auth/authMiddlewares");
const CharacterServices = require("../../services/CharacterServices");
const characterServices = new CharacterServices();
const MovieServices = require("../../services/MovieServices");
const movieServices = new MovieServices();

//check if the name and the history were passed through the body
//check if the user's id was entered as a param in the endpoint
const _idRequired = (attr) =>
  check(attr, `${attr} is required`).not().isEmpty();
const _nameRequired = check("name", "Name is required").not().isEmpty();
const _historyRequired = check("history", "History is required")
  .not()
  .isEmpty();

//check if the assigned role passed has the correct format
const _isRoleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    const ROLES = [USER_ROLE, ADMIN_ROLE];
    !ROLES.includes(role) && new AppError("Invalid role", 400);
  });

//check if the ID and the name already exist in the db; they're both unique attrs
const _idExists = check("id").custom(async (id = "") => {
  //look for the entered id in the db
  const foundCharacter = await characterServices.getByID(id);
  !foundCharacter &&
    new AppError(`Character with ID ${id} does not exist`, 400);
});
const _nameExists = check("name").custom(async (name = "") => {
  const foundCharacter = await characterServices.getByName(name);
  foundCharacter &&
    new AppError(`A character with the name ${name} already exists`, 400);
});

//check if the id, the age and the weight are numbers
const _isIDNumeric = (attr) => check(attr).isNumeric();
const _isAgeANumber = check("age").optional().isNumeric();
const _isWeightANumber = check("weight").optional().isNumeric();

const _characterIDExists = check("characterID").custom(
  /**
   * @param {express.Request} req
   */
  async (characterID = "", { req }) => {
    const foundCharacter = await characterServices.getByID(characterID);
    !foundCharacter &&
      new AppError(
        `The character with the ID ${characterID} does not exist`,
        400
      );
    //add the fetched character to the request object that will then be handled in the corresponding controller function
    req.character = foundCharacter;
  }
);

const _movieIDExists = check("movieID").custom(
  /**
   * @param {express.Request} req
   */
  async (movieID = "", { req }) => {
    const foundMovie = await movieServices.getByID(movieID);
    !foundMovie &&
      new AppError(`The movie with the ID ${movieID} does not exist`, 400);
    //add the fetched movie to the request object that will then be handled in the corresponding controller function
    req.movie = foundMovie;
  }
);

//validations for the /users GET endpoint
const getAllRequestValidations = [validJWT, commonValidationResult];

//validations for the /users/:id GET endpoint
const getByIdRequestValidations = [
  validJWT,
  _idRequired("id"),
  _isIDNumeric("id"),
  _idExists,
  commonValidationResult,
];

//validations for the /users POST endpoint
const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _nameRequired,
  _nameExists,
  _isAgeANumber,
  _historyRequired,
  _isWeightANumber,
  _isRoleValid,
  commonValidationResult,
];

//validations for the /image POST endpoint
const postImageRequestValidations = [
  validJWT,
  hasRole(USER_ROLE, ADMIN_ROLE),
  upload.single("image"),
  _idRequired("id"),
  _isIDNumeric("id"),
  _idExists,
  imageRequired,
  commonValidationResult,
];

//validations for the /users/:id PUT endpoint
const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired("id"),
  _isIDNumeric("id"),
  _idExists,
  _nameExists,
  _isAgeANumber,
  _isWeightANumber,
  _isRoleValid,
  commonValidationResult,
];

//validations for the /characters/:characterID/movies/:movieID
const associationRequestValidation = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired("characterID"),
  _idRequired("movieID"),
  _isIDNumeric("characterID"),
  _isIDNumeric("movieID"),
  _characterIDExists,
  _movieIDExists,
  commonValidationResult,
];

//validations for the /users/:id DELETE endpoint
const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired,
  _idExists,
  commonValidationResult,
];

module.exports = {
  getAllRequestValidations,
  getByIdRequestValidations,
  associationRequestValidation,
  postRequestValidations,
  postImageRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
};
