import React from "react";
import "../styles/task.css";

function Task(props) {
  return <li className="task">{props.taskName}</li>;
}

export default Task;
