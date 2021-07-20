// @flow

import React from "react";
import { useState, useRef } from "react";
import "./Task.css";
import type { TaskType } from "../../utils/useTask.js";

type TaskProps = {
  task: TaskType,
  onDelete: (id: number) => void,
  onEdit: (id: number, text: string) => void,
  onToggle: (id: number) => void,
};

export const Task = ({
  task,
  onDelete,
  onEdit,
  onToggle,
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

    // no change to text
    if (editedTask === text) {
      setIsEditing(false);
      return;
    }

    setIsEditing(false);
    onEdit(id, editedTask);
  };

  const handleToggle = () => {
    onToggle(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="task-container">
      <div className="left-container">
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={done}
            onChange={handleToggle}
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
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
