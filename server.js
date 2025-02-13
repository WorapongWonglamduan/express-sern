const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { readdirSync } = require("fs");
require("./config/db");
require("dotenv").config();

const app = express();

//middle ware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());

app.get("/api/test", (req, res) => {
  res.send("Hello World!  im worapong");
});

//#2
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
