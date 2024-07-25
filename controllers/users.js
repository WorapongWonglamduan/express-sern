const { getAllUsers } = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const result = await getAllUsers();
    return result && res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Get All Users Error");
  }
};
