const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/users");

// //middleware
// const { auth, isAdmin } = require("../middleware/auth");

router.get("/users", getUsers);

module.exports = router;
