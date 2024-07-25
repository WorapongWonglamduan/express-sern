const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).send("No token, authorization denied");
    }
    const decode = jwt.verify(token, "jwtSecret");
    console.log("====================================");
    console.log("decode->", decode);
    console.log("====================================");

    req.user = decode.user;

    next();
  } catch (error) {
    console.error("error=>", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token has expired");
    }
    return res.status(401).send("Token Invalid");
  }
};
