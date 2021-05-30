const { Router } = require("express");
const {
  getAllMovies,
  getMovieByID,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/moviesControllers");
const {
  getRequestValidations,
  getAllRequestValidations,
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
} = require("../middlewares/movies/moviesMiddlewares");

const router = Router();

router.get("/", getAllRequestValidations, getAllMovies);
router.get("/:id", getRequestValidations, getMovieByID);
router.post("/", postRequestValidations, createMovie);
router.put("/:id", putRequestValidations, updateMovie);
router.delete("/:id", deleteRequestValidations, deleteMovie);

module.exports = router;
