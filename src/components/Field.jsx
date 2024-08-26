import React from "react";
import Task from "./Task";
import "../styles/field.css";

function Field(props) {
  return (
    <div>
      <h1 className="field-name">{props.fieldName}</h1>
      <ul className="task-list">
        <Task taskName="Cock" />
      </ul>
    </div>
  );
}

export default Field;
