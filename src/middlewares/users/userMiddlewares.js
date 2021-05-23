//File to validate the users' data i.e the attrs set in the user model, in every endpoint
const { check } = require("express-validator");
const AppError = require("../../handlers/AppError");
const { USER_ROLE, ADMIN_ROLE } = require("../../constants/constants");
const { commonValidationResult } = require("../commonMiddlewares");
const { validJWT, hasRole } = require("../auth/authMiddlewares");
const UserServices = require("../../services/userServices");
const userServices = new UserServices();

//check if the entered id is a mongo id
// const _isMongoID = check("id").isMongoId();

//check if the name, email and pass were passed through the body
//check if the user's id was entered as a param in the endpoint
const _idRequired = check("id", "ID is required").not().isEmpty();
const _nameRequired = check("name", "Name is required").not().isEmpty();
const _emailRequired = check("email", "Email is required").not().isEmpty();
const _passRequired = check("password", "Password is required").not().isEmpty();

//check if the the email and the assigned role passed have the correct format e.g username@email..., mm-dd-yyyy and user role respectively
const _isEmailValid = check("email", "Email is invalid").isEmail();
const _isRoleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    const ROLES = [USER_ROLE, ADMIN_ROLE];
    !ROLES.includes(role) && new AppError("Invalid role", 400);
  });
//updated email
const _isOptionalMailValid = check("email", "Email is invalid")
  .optional()
  .isEmail();

//check if the ID and both the first and updated emails passed already exist in the db
const _idExists = check("id").custom(async (id = "") => {
  //look for the entered id in the db
  const foundUser = await userServices.getByID(id);
  !foundUser && new AppError(`User with ID ${id} does not exist`, 400);
});
const _emailExists = check("email").custom(async (email = "") => {
  //look up for the passed email in the db
  const foundUser = await userServices.getByEmail(email);
  foundUser && new AppError("Email already exists in the DB", 400);
});
const _optionalMailExists = check("email")
  .optional()
  .custom(async (email = "") => {
    const foundUser = await userServices.getByEmail(email);
    foundUser && new AppError("Email already exists in the DB", 400);
  });

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
  _emailRequired,
  _isEmailValid,
  _emailExists,
  _passRequired,
  _isRoleValid,
  commonValidationResult,
];

//validations for the /users/:id PUT endpoint
const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired,
  _idExists,
  _isOptionalMailValid,
  _optionalMailExists,
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
