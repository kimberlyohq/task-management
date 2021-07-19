import express from "express";
import cors from "cors";

import tasksRouter from "./components/tasks/tasksRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8000;

// Routes
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
