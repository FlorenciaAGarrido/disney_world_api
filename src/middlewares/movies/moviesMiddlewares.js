const { check } = require("express-validator");
const AppError = require("../../handlers/AppError");
const { USER_ROLE, ADMIN_ROLE } = require("../../constants/constants");
const { commonValidationResult } = require("../commonMiddlewares");
const { validJWT, hasRole } = require("../auth/authMiddlewares");
const MovieServices = require("../../services/MovieServices");
const movieServices = new MovieServices();

const _titleRequired = check("title", "Title required").not().isEmpty();

const _isRoleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    const ROLES = [USER_ROLE, ADMIN_ROLE];
    !ROLES.includes(role) && new AppError("Invalid role", 400);
  });

const _idRequired = check("id").not().isEmpty();
const _isIDNumeric = check("id").isNumeric();
const _idExists = check("id").custom(async (id = "") => {
  const foundMovie = await movieServices.getByID(id);
  if (!foundMovie) {
    throw new AppError(`Character with ID ${id} does not exist`, 400);
  }
});

const _ratingRequired = check("rating").not().isEmpty();
const _isRatingNumeric = check("rating").isNumeric();
const _isRatingOptional = check("rating").optional().isNumeric();
const _creationDateRequired = check("creationDate").not().isEmpty();
const _creationDateValid = check("creationDate")
  .optional()
  .isDate("MM-DD-YYYY");
const _titleExists = check("title").custom(async (title = "") => {
  const foundTitle = await movieServices.findByTitle(title);
  if (foundTitle) {
    throw new AppError(
      `A movie with the title ${foundTitle} already exists in the DB`,
      400
    );
  }
});

const getAllRequestValidations = [validJWT];
const getRequestValidations = [
  validJWT,
  _idRequired,
  _isIDNumeric,
  _idExists,
  commonValidationResult,
];
const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired,
  _isIDNumeric,
  _idExists,
  commonValidationResult,
];

module.exports = {
  getAllRequestValidations,
  getRequestValidations,
  deleteRequestValidations,
};
