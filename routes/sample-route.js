import express from "express";
import {
  getAllTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} from "../controllers/sample-controller.js";
const router = express.Router();

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).delete(deleteTask).patch(updateTask);

export default router;
