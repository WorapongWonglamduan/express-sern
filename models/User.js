const { conDb } = require("../config/db");

const findUser = async ({ user }) => {
  try {
    var newUser = { ...user };
    console.log("====================================");
    console.log("newUser->", user);
    console.log("====================================");

    const [result] = await conDb
      .promise()
      .query("SELECT * FROM users WHERE username = ? OR email = ?", [
        newUser.username,
        newUser.email,
      ]);
    return result;
  } catch (error) {
    console.error("Error findUser :", error);
    throw error;
  }
};

const createUser = async ({ newUser }) => {
  var newUser = { ...newUser };

  try {
    const [result] = await conDb
      .promise()
      .query(
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

const getAllUsers = async () => {
  try {
    const [result] = await conDb.promise().query("SELECT * FROM users");
    return result;
  } catch (error) {
    console.error("Error getAllUsers:", error);
    throw error;
  }
};

module.exports = { createUser, findUser, getAllUsers };
