import { Button, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";
import { fetchTasks } from "../../../api/task";

export const Task = ({ task }) => {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task" id={id}>
      <div className={classnames("flex", { done: isComplete })}>
        <Checkbox
          checked={isComplete}
          onChange={handleUpdateTaskCompletion}
        ></Checkbox>
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button
          variant="contained"
          onClick={() => setIsDialogOpen(!isDialogOpen)}
        >
          <EditIcon />
        </Button>
        <Button color="error" contained onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>

      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      />
    </div>
  );
};
