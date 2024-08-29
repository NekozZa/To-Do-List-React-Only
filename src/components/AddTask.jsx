import React, { useState } from "react";

function AddTask(props) {
  const [newTask, setNewTask] = useState("");

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  return (
    <li>
      <input
        type="text"
        name="newTask"
        onChange={handleChange}
        value={newTask}
        hidden
      />
      <button
        onClick={() => {
          props.addTask(newTask, setNewTask);
        }}
        hidden
      >
        <i class="ri-edit-2-line"></i>
      </button>
    </li>
  );
}

export default AddTask;
