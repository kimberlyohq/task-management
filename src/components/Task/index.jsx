// @flow

import * as React from "react";
import { useState, useRef } from "react";
import "./Task.css";
import type { TaskType } from "../../utils/useTask.js";

type TaskProps = {
  task: TaskType,
  onToggle: (id: number) => void,
  onDelete: (id: number) => void,
  onEdit: (id: number, text: string) => void,
};

export const Task = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskProps): React.Element<"div"> => {
  const { id, text, done } = task;

  const [taskText, setTaskText] = useState(text);
  const [editButtonText, setEditButtonText] = useState("Edit");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const isFocused = document.activeElement === inputRef.current;

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
    if (taskText === "") {
      alert("Task cannot be empty!");
      // reset to original task
      setTaskText(text);
      return;
    }

    // no change
    if (taskText.trim() === text) {
      return;
    }

    onEdit(id, taskText.trim());
  };

  return (
    <div className="task-container">
      <div className="left-container">
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
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          className={"task-input" + (done ? "-done" : "")}
        />
      </div>
      <div className="buttons">
        <button type="submit" onClick={handleEditTask} className="edit-button">
          {editButtonText}
        </button>
        {!isFocused && (
          <button onClick={() => onDelete(id)} className="delete-button">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
