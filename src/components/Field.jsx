import React, { useState, useEffect } from "react";
import Task from "./Task";
import axios from "axios";
import "../styles/field.css";

function Field(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/${props.tableName.toLowerCase()}/${
            props.fieldName
          }`
        );
        setTasks(response.data);
      } catch (err) {}
    };

    getTasks();
  }, [props.fieldName]);

  return (
    <div className="field">
      <h1 className="field-name">{props.fieldName}</h1>
      <hr />
      <ul className="task-list">
        {tasks.map((task, index) => (
          <Task key={index} taskName={task} />
        ))}
      </ul>
    </div>
  );
}

export default Field;
