const mysql = require("mysql2");

const conDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ecom-full-stack",
});
conDb.connect((err) => {
  console.log("====================================");
  if (err) {
    console.error("Error connecting to MySQL:", err);
  }
  console.log("Connected to MySQL");
  console.log("====================================");
});

module.exports = { conDb };
