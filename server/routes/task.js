const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// CREATE
router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    userId: req.user.id,
    title: req.body.title
  });
  res.json(task);
});

// GET
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;