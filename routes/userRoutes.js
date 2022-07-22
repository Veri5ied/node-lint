const express = require("express");
const userController = require("../controllers/users/userController");
const { signUp, login, verifiyOTP } = userController;
const userAuth = require("../middleware/userAuth");

const router = express.Router();

router.post("/signup", userAuth.saveUser, signUp);
router.post("/sigin", login);
router.post("/verifiyotp", verifiyOTP);

module.exports = router;
