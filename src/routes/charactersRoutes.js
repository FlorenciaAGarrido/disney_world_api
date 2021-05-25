const { Router } = require("express");
const {
  getAllCharacters,
  getCharacterByID,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/charactersControllers");
const {
  getAllRequestValidations,
  getByIdRequestValidations,
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
} = require("../middlewares/characters/charactersMiddlewares");

const router = Router();

router.get("/", getAllRequestValidations, getAllCharacters);
router.get("/:id(\\d+)/", getByIdRequestValidations, getCharacterByID);
router.post("/", postRequestValidations, createCharacter);
router.put("/:id(\\d+)/", putRequestValidations, updateCharacter);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteCharacter);

module.exports = router;
