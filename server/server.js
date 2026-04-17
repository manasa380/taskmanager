const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);