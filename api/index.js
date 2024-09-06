import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import { fetchTasks, createTasks, deleteTasks } from "./task";

const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    console.log("api/indexjs get fetchtasks ", tasks);
    res.send(tasks.Items);
  } catch (err) {
    res.status(400).send(`Error fetching tasks: ${err}`);
  }
});

app.post("/task", async (req, res) => {
  try {
    console.log("api/indexjs post", req, res);
    const task = req.body;
    const response = await createTasks(task);
    console.log("api/indexjs post response", response);
    res.send(response);
  } catch (err) {
    console.log("api/indexjs post response err", err);
    res.status(400).send(`Error creating tasks: ${err}`);
  }
});

app.put("/task", async (req, res) => {
  try {
    const task = req.body;
    const response = await updateTasks(task);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating tasks: ${err}`);
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteTasks(id);
  } catch (err) {
    res.status(400).send(`Error deleting tasks: ${err}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
