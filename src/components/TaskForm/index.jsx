// @flow

import React from "react";
import { useState } from "react";
import "./TaskForm.css";

type TaskFormProps = {
  addTask: (task: string) => void,
};

export const TaskForm = ({ addTask }: TaskFormProps): React$Element<"form"> => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = inputValue.trim();

    // validate input
    if (!task) {
      alert("Cannot add an empty task!");
      return;
    }

    // onSubmit(task);
    addTask(inputValue);
    // reset the input bar
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Add a new task"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        className="form-input"
      />
      <button type="submit" className="button">
        Add Task
      </button>
    </form>
  );
};
