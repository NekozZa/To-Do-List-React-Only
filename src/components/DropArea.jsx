import React, { useState } from "react";
import "../styles/drop_area.css";

function DropArea(props) {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <li
      className={showDrop ? "drop-area" : "hide-drop"}
      onDragEnter={() => {
        setShowDrop(true);
      }}
      onDragLeave={() => {
        setShowDrop(false);
      }}
      onDrop={() => {
        props.onDrop(props.fieldID, props.taskID, props.tasks, props.setTasks);
        setShowDrop(false);
      }}
      onDragOver={(e) => {
        return e.preventDefault();
      }}
    >
      Drop Here
    </li>
  );
}

export default DropArea;
