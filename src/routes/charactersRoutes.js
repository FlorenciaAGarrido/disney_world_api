const { Router } = require("express");
const {
  getAllCharacters,
  getCharacterByID,
  createCharacter,
  saveCharacterImage,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/charactersControllers");
const {
  getAllRequestValidations,
  getByIdRequestValidations,
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
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteCharacter);

module.exports = router;
