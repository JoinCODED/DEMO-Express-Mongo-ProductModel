const express = require("express");
const bodyParser = require("body-parser");

// Routes
const cookieRoutes = require("./routes/cookies");

const app = express();

app.use(bodyParser.json());

app.use("/cookies", cookieRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
