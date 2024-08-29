import React, { useState, useEffect } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import DropArea from "./DropArea";
import axios from "axios";
import "../styles/field.css";

function Field(props) {
  const [tasks, setTasks] = useState([]);

  function handleClick(id) {
    const inp = document.querySelector(`.field-${id} input`);
    const btn = document.querySelector(`.field-${id} button`);
    inp.toggleAttribute("hidden");
    btn.toggleAttribute("hidden");
  }

  function addTask(newTask, setNewTask) {
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

  function deleteTask(id, taskName) {
    setTasks(tasks.filter((task, index) => index !== id));

    axios.delete("http://localhost:5000/api/table/field/delete-task", {
      data: {
        tableName: props.tableName,
        fieldName: props.fieldName,
        taskName: taskName,
      },
    });
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
      <i
        class="ri-close-line close-icon"
        onClick={() => {
          props.onDelete(props.id);
        }}
      ></i>

      <h1 className="field-name">{props.fieldName}</h1>
      <hr />

      <ul className="task-list">
        <DropArea
          onDrop={props.onDrop}
          fieldID={props.id}
          taskID={0}
          tasks={tasks}
          setTasks={setTasks}
        />

        {tasks.map((task, index) => (
          <>
            <Task
              key={index}
              id={index}
              fieldID={props.id}
              taskName={task}
              tasks={tasks}
              onDelete={deleteTask}
              setActiveTask={props.setActiveTask}
              setSrcField={props.setSrcField}
              setTasks={setTasks}
            />

            <DropArea
              onDrop={props.onDrop}
              fieldID={props.id}
              taskID={index + 1}
              tasks={tasks}
              setTasks={setTasks}
            />
          </>
        ))}

        <AddTask addTask={addTask} />
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
