import express from "express";
import {
  getTasks,
  addTask,
  deleteTask,
  editTask,
  toggleTask,
} from "./tasksController.js";

const router = express.Router();

router.get("/", getTasks);

router.post("/addTask", addTask);
router.post("/deleteTask/:id", deleteTask);
router.post("/editTask", editTask);
router.post("/toggleTask/:id", toggleTask);

export default router;
