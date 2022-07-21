const express = require("express");
const userController = require("../controllers/users/userController");
const { signUp, login } = userController;
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.post("/signup", userAuth.saveUser, signUp);
router.post("/sigin", login);

module.exports = router;
