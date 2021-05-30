//File to validate the users' data i.e the attrs set in the user model, in every endpoint
const { check } = require("express-validator");
const AppError = require("../../handlers/AppError");
const { USER_ROLE, ADMIN_ROLE } = require("../../constants/constants");
const { commonValidationResult } = require("../commonMiddlewares");
const { validJWT, hasRole } = require("../auth/authMiddlewares");
const CharacterServices = require("../../services/CharacterServices");
const characterServices = new CharacterServices();

//check if the name and the history were passed through the body
//check if the user's id was entered as a param in the endpoint
const _idRequired = check("id", "ID is required").not().isEmpty();
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

//check if the age and the weight are numbers
const _isAgeANumber = check("age").optional().isNumeric();
const _isWeightANumber = check("weight").optional().isNumeric();

//validations for the /users GET endpoint
const getAllRequestValidations = [validJWT, commonValidationResult];

//validations for the /users/:id GET endpoint
const getByIdRequestValidations = [
  validJWT,
  _idRequired,
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

//validations for the /users/:id PUT endpoint
const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired,
  _idExists,
  _nameExists,
  _isAgeANumber,
  _isWeightANumber,
  _isRoleValid,
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
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
};
