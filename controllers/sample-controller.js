//import models your app uses

import { asyncWrapper } from "../middlewares/async";
//import { createCustomAPIError } from "../errors/custom-error";

const getAllTasks = asyncWrapper(async (req, res) => {
  res.status(200).json({ message: "All tasks loaded" });
});

const createTask = asyncWrapper(async (req, res) => {
  res.status(201).json({ message: "Tasks created" });
});

const getTask = asyncWrapper(async (req, res, next) => {
  res.status(200).json({ message: "Single task loaded" });
});

const updateTask = asyncWrapper(async (req, res) => {
  res.status(200).json({ message: "Data updated successfully" });
});

const deleteTask = asyncWrapper(async (req, res) => {
  res.status(200).json({ message: "Task deleted successfully" });
});

export { getAllTasks, createTask, getTask, updateTask, deleteTask };
