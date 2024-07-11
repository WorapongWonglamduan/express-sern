const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUser } = require("../models/User");

exports.register = async (req, res) => {
  try {
    //check user
    var newUser = { ...req.body };

    const hasUser = await findUser({ newUser });
    if (hasUser) {
      return res.status(400).send("User Already exits");
    }
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(newUser.password, salt);
    newUser = { ...newUser, password: hasPassword };

    const result = await createUser({ newUser });
    return result && res.status(200).send("User Register Successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Register Error");
  }
};
