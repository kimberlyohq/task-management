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
  //a better way is using a edited state, make less state in a component and logic simpler.
  const [edited, setEdited] = useState(false)
 

  const inputRef = useRef<HTMLInputElement | null>(null);

  

  const handleEditTask = (event) => {
    //todos

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
        {edited ? <input
          autoFocus
          ref={inputRef}
          defaultValue={taskText}
          className={"task-input" + (done ? "-done" : "")}
        /> : <span>{taskText}</span>}
       
      </div>
      <div className="buttons">
        <button type="submit" onClick={handleEditTask} className="edit-button">
          {edited ? 'Confrim' : 'Edit'}
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
