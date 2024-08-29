import React, { useState } from "react";

import "../styles/task.css";

function Task(props) {
  return (
    <li
      className={`task task-${props.id}`}
      draggable
      onDragStart={() => {
        props.setActiveTask(`.field-${props.fieldID} .task-${props.id}`);
        props.setSrcField([props.tasks, props.setTasks]);
      }}
      onDragEnd={() => {
        props.setActiveTask(null);
      }}
    >
      <p>{props.taskName}</p>

      <i
        class="ri-delete-bin-line"
        onClick={() => {
          props.onDelete(props.id, props.taskName);
        }}
      ></i>
    </li>
  );
}

export default Task;
