const { Router } = require("express");
const {
  getAllCharacters,
  getCharacterByID,
  associateCharacter,
  createCharacter,
  saveCharacterImage,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/charactersControllers");
const {
  getAllRequestValidations,
  getByIdRequestValidations,
  associationRequestValidation,
  postRequestValidations,
  postImageRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
} = require("../middlewares/characters/charactersMiddlewares");

const router = Router();

//number regexes
router.get("/", getAllRequestValidations, getAllCharacters);
router.get("/:id(\\d+)/", getByIdRequestValidations, getCharacterByID);
router.post("/", postRequestValidations, createCharacter);
router.post("/image", postImageRequestValidations, saveCharacterImage);
router.put("/:id(\\d+)/", putRequestValidations, updateCharacter);
router.put(
  "/:characterID(\\d+)/movies/:movieID(\\d+)/",
  associationRequestValidation,
  associateCharacter
);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteCharacter);

module.exports = router;
