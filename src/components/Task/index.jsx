// @flow

import React from "react";
import { useState, useRef } from "react";
import "./Task.css";
import type { TaskType } from "../../utils/useTask.js";

type TaskProps = {
  task: TaskType,
  deleteTask: (id: number) => void,
  editTask: (id: number, text: string) => void,
  toggleTask: (id: number) => void,
};

export const Task = ({
  task,
  deleteTask,
  editTask,
  toggleTask,
}: TaskProps): React$Element<"div"> => {
  const { id, text, done } = task;

  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEditTask = (event) => {
    event.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    let editedTask: ?string;
    if (inputRef.current instanceof HTMLInputElement) {
      editedTask = inputRef.current.value.trim();
    }

    if (!editedTask) {
      alert("Cannot edit empty task");
      setIsEditing(false);
      return;
    }

    setIsEditing(false);
    editTask(id, editedTask);
  };

  return (
    <div className="task-container">
      <div className="left-container">
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={done}
            onChange={() => toggleTask(id)}
            className="checkbox"
          />
        </div>
        {isEditing ? (
          <input
            autoFocus
            ref={inputRef}
            defaultValue={text}
            className="task-input"
          />
        ) : (
          <span className={done ? "done" : ""}>{text}</span>
        )}
      </div>
      <div className="buttons">
        <button type="submit" onClick={handleEditTask} className="edit-button">
          {isEditing ? "Confirm" : "Edit"}
        </button>
        {!isEditing && (
          <button onClick={() => deleteTask(id)} className="delete-button">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
