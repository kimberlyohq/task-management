// @flow

import * as React from "react";
import { useState } from "react";
import "./Task.css";

type TaskProps = {
  id: number,
  text: string,
  done: boolean,
  onToggle: (id: number) => void,
  onDelete: (id: number) => void,
  onEdit: (id: number, text: string) => void;
};

export const Task = ({
  id,
  text,
  done,
  onToggle,
  onDelete,
  onEdit,
}: TaskProps): React.Element<"div"> => {
  const [task, setTask] = useState(text);

  const handleEditTask = () => {
    // validate
    if (task === "") {
      alert("Task cannot be empty!");
      return ;
    }

    // no change
    if(task === text) {
      return ;
    }

    onEdit(id, task);

  }

  return (
    <div className="task-container">
      <div className="left-items">
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={done}
            onChange={() => onToggle(id)}
            className="checkbox"
          />
        </div>
        <input
          value={task}
          onChange={(event) => setTask(event.target.value)}
          className="task-input"
        />
      </div>
      <div className="buttons">
        <button onClick={handleEditTask} className="edit-button">Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};
