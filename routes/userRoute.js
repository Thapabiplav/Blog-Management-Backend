const { register, login } = require("../controllers/userControllers");
const catchError = require("../utils/catchError");

const router = require("express").Router();

router.route("/register").post(catchError(register));
router.route("/login").post(catchError(login));

module.exports = router;
