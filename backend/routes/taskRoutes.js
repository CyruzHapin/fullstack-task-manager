const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const tasks = await pool.query(
    "SELECT * FROM tasks WHERE user_id=$1",
    [req.user.id]
  );

  res.json(tasks.rows);
});

router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;

  await pool.query(
    "INSERT INTO tasks(title, user_id) VALUES($1, $2)",
    [title, req.user.id]
  );

  res.json({ message: "Task created" });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM tasks WHERE id=$1",
    [id]
  );

  res.json({ message: "Task deleted" });
});

module.exports = router;