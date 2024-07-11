const { conDb } = require("../config/db");

const findUser = ({ newUser }) => {
  var newUser = { ...newUser };

  try {
    const result = conDb.query(
      "SELECT * FROM users WHERE  username = ? OR email = ?",
      [newUser.username, newUser.email]
    );

    return result;
  } catch (error) {
    console.error("Error findUser :", error);
    throw error;
  }
};

const createUser = ({ newUser }) => {
  var newUser = { ...newUser };

  try {
    const result = conDb.query(
      "INSERT INTO users(first_name, last_name, phone, email, username, password) VALUES (?, ?, ?, ?, ?, ?)",
      [
        newUser.first_name,
        newUser.last_name,
        newUser.phone,
        newUser.email,
        newUser.username,
        newUser.password,
      ]
    );

    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

module.exports = { createUser, findUser };
