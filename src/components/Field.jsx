import React, { useState, useEffect } from "react";
import Task from "./Task";
import axios from "axios";
import "../styles/field.css";

function Field(props) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleClick(id) {
    const inp = document.querySelector(`.field-${id} input`);
    const btn = document.querySelector(`.field-${id} button`);
    inp.toggleAttribute("hidden");
    btn.toggleAttribute("hidden");
  }

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function addNewTask() {
    setTasks(tasks.concat(newTask));

    axios.post(
      "http://localhost:5000/api/table/field/add-task",
      {
        tableName: props.tableName,
        fieldName: props.fieldName,
        taskName: newTask,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setNewTask("");
  }

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
    <div className={`field field-${props.id}`}>
      <h1 className="field-name">{props.fieldName}</h1>
      <hr />

      <ul className="task-list">
        {tasks.map((task, index) => (
          <Task key={index} taskName={task} />
        ))}

        <li>
          <input
            type="text"
            name="newTask"
            onChange={handleChange}
            value={newTask}
            hidden
          />
          <button onClick={addNewTask} hidden>
            <i class="ri-edit-2-line"></i>
          </button>
        </li>
      </ul>

      <i
        className={`ri-arrow-down-double-line add-task-btn`}
        onClick={() => {
          handleClick(props.id);
        }}
      ></i>
    </div>
  );
}

export default Field;
