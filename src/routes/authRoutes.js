const { Router } = require("express");
const { login, register } = require("../controllers/authControllers");
const {
  postLoginRequestValidations,
  postRegisterRequestValidations,
} = require("../middlewares/auth/authMiddlewares");

const router = Router();

router.post("/login", postLoginRequestValidations, login);
router.post("/register", postRegisterRequestValidations, register);

module.exports = router;
