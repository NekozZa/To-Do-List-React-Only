import React, { useState } from "react";

import "../styles/task.css";

function Task(props) {
  const [mouseOn, setMouseOn] = useState(false);

  return (
    <li
      className={`task task-${props.id}`}
      draggable
      onDragStart={() => {
        props.setActiveTask(`.field-${props.fieldID} .task-${props.id}`);
      }}
      onDragEnd={() => {
        props.setActiveTask(null);
      }}
    >
      {props.taskName}

      <i
        class="ri-delete-bin-line"
        onClick={() => {
          props.onDelete(props.id);
        }}
      ></i>
    </li>
  );
}

export default Task;
