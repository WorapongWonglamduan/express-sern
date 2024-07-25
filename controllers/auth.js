const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUser } = require("../models/User");

exports.register = async (req, res) => {
  try {
    // Check user
    var newUser = { ...req.body };

    const hasUser = await findUser({ user: newUser });

    // If user already exists
    if (hasUser.length > 0) {
      return res.status(400).send("User already exists");
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    newUser = { ...newUser, password: hashedPassword };

    // Create new user
    const result = await createUser({ newUser });

    // Send response
    return res.status(200).send("User registered successfully");
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).send("Register Error");
  }
};

exports.login = async (req, res) => {
  try {
    //check user
    var loginUser = { ...req.body };

    var user = await findUser({ user: loginUser });

    if (user.length > 0 && user[0].status === 1) {
      const isMatch = await bcrypt.compare(
        loginUser.password,
        user[0].password
      );

      if (!isMatch) {
        return res.status(400).send("Password invalid");
      }

      const { password, ...userWithoutPassword } = user[0];
      //payload
      const payload = {
        user: { ...userWithoutPassword },
      };

      //generate token
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        return res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Login Error");
  }
};
exports.currentUser = async (req, res) => {
  try {
    const user = await findUser({ user: req.user });
    const { password, ...userWithoutPassword } = user[0];

    return res.send(userWithoutPassword);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Current User Error");
  }
};
