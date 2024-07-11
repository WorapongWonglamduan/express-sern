const express = require("express");
const router = express.Router();

const { register } = require("../controllers/auth");

// //middleware
// const { auth, isAdmin } = require("../middleware/auth");

// //Route
// //Auth

router.post("/register", register);

module.exports = router;
