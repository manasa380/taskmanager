const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// TEST ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));

// DB CONNECT
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// FIXED PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});