import React from "react";
import "../styles/task.css";

function Task(props) {
  return (
    <li>
      <i class="ri-add-line"></i>
      {props.taskName}
    </li>
  );
}

export default Task;
