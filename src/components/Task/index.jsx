// @flow

import * as React from "react";
import { useState, useRef } from "react";
import "./Task.css";

type TaskProps = {
  id: number,
  text: string,
  done: boolean,
  onToggle: (id: number) => void,
  onDelete: (id: number) => void,
  onEdit: (id: number, text: string) => void,
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
  const [editButtonText, setEditButtonText] = useState("Edit");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const isFocused = editButtonText === "Confirm";

  const handleEditTask = (event) => {
    event.preventDefault();
    if (!isFocused && inputRef.current instanceof HTMLInputElement) {
      inputRef.current.focus();
      setEditButtonText("Confirm");
      return;
    }

    if (inputRef.current instanceof HTMLInputElement) {
      inputRef.current.blur();
      setEditButtonText("Edit");
    }

    // validate
    if (task === "") {
      alert("Task cannot be empty!");
      // reset to original task
      setTask(text);
      return;
    }

    // no change
    if (task === text) {
      return;
    }

    onEdit(id, task);
  };

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
          ref={inputRef}
          value={task}
          onChange={(event) => setTask(event.target.value)}
          className="task-input"
        />
      </div>
      <div className="buttons">
        <button type="submit" onClick={handleEditTask} className="edit-button">
          {editButtonText}
        </button>
        {!isFocused && <button onClick={() => onDelete(id)}>Delete</button>}
      </div>
    </div>
  );
};
