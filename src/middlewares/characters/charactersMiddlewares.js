//File to validate the users' data i.e the attrs set in the user model, in every endpoint
const { check } = require("express-validator");
const AppError = require("../../handlers/AppError");
const { USER_ROLE, ADMIN_ROLE } = require("../../constants/constants");
const { commonValidationResult } = require("../commonMiddlewares");
const { validJWT, hasRole } = require("../auth/authMiddlewares");
const UserServices = require("../../services/userServices");
const userServices = new UserServices();

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

//check if the ID already exists in the db
const _idExists = check("id").custom(async (id = "") => {
  //look for the entered id in the db
  const foundUser = await userServices.getByID(id);
  !foundUser && new AppError(`User with ID ${id} does not exist`, 400);
});

//check if the age and the weight are numbers
const _isAgeANumber = check("age").isNumeric();
const _isWeightANumber = check("weight").isNumeric();

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
