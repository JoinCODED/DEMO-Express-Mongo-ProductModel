const express = require("express");
const cors = require("cors");

// Routes
const cookieRoutes = require("./apis/cookies/routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cookies", cookieRoutes);

const PORT = 8000;

app.listen(PORT, () =>
  console.log(`The application is running on localhost:${PORT}`)
);
