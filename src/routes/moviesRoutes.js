const { Router } = require("express");
const {
  getAllMovies,
  getMovieByID,
  associateCharacter,
  createMovie,
  saveMovieImage,
  updateMovie,
  deleteMovie,
} = require("../controllers/moviesControllers");
const {
  getRequestValidations,
  getAllRequestValidations,
  postRequestValidations,
  postImageRequestValidations,
  putRequestValidations,
  associationRequestValidation,
  deleteRequestValidations,
} = require("../middlewares/movies/moviesMiddlewares");

const router = Router();

router.get("/", getAllRequestValidations, getAllMovies);
router.get("/:id(\\d+)/", getRequestValidations, getMovieByID);
router.post("/", postRequestValidations, createMovie);
router.post("/image", postImageRequestValidations, saveMovieImage);
router.put("/:id(\\d+)/", putRequestValidations, updateMovie);
//associations between movies and characters
router.put(
  "/:movieID(\\d+)/characters/:characterID(\\d+)/",
  associationRequestValidation,
  associateCharacter
);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteMovie);

module.exports = router;
