const express = require("express")
const { signupUser, signinUser, verifyUser } = require('../controllers/authController');
const verifyToken = require("../verifyToken");

const router = express.Router();

router.post('/signup', signupUser);
router.post("/signin", signinUser)
router.get("/verify", verifyToken, verifyUser)

module.exports = router;