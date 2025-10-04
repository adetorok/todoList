import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// ✅ Get all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ➕ Create a new todo
router.post("/", async (req, res) => {
  const { title } = req.body;
  const newTodo = new Todo({ title });
  await newTodo.save();
  res.json(newTodo);
});

// 🗑️ Delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo deleted" });
});

// ✅ Toggle complete
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

export default router;
