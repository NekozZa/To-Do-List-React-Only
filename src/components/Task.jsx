import React from "react";
import "../styles/task.css";

function Task(props) {
  return (
    <li className="task">
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
