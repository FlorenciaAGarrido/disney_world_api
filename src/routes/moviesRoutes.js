const { Router } = require("express");
const {
  getAllMovies,
  getMovieByID,
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
  deleteRequestValidations,
} = require("../middlewares/movies/moviesMiddlewares");

const router = Router();

router.get("/", getAllRequestValidations, getAllMovies);
router.get("/:id", getRequestValidations, getMovieByID);
router.post("/", postRequestValidations, createMovie);
router.post("/image", postImageRequestValidations, saveMovieImage);
router.put("/:id", putRequestValidations, updateMovie);
router.delete("/:id", deleteRequestValidations, deleteMovie);

module.exports = router;
