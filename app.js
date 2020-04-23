const express = require("express");
const bodyParser = require("body-parser");

// Routes
const cookieRoutes = require("./routes/cookies");

const app = express();

app.use(bodyParser.json());

app.use("/cookies", cookieRoutes);

app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});
