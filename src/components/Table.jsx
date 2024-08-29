import React, { useState, useEffect, act } from "react";
import Field from "./Field";
import AddField from "./AddField";
import axios from "axios";
import "../styles/field_layout.css";

function Table(props) {
  const [fields, setFields] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [srcField, setSrcField] = useState([]);

  function onDrop(
    targetFieldID,
    targetTaskID,
    targetFieldTasks,
    setTargetFieldTasks
  ) {
    const draggedTask = document.querySelector(`${activeTask} p`).innerHTML;
    const [srcFieldTasks, setSrcFieldTasks, srcFieldID] = srcField;

    console.log(fields[targetFieldID + 1]);
    console.log(fields[srcFieldID + 1]);

    axios.post(
      "http://localhost:5000/api/table/field/add-task",
      {
        tableName: props.tableName,
        fieldName: fields[targetFieldID + 1],
        taskName: draggedTask,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    axios.delete("http://localhost:5000/api/table/field/delete-task", {
      data: {
        tableName: props.tableName,
        fieldName: fields[srcFieldID + 1],
        taskName: draggedTask,
      },
    });

    srcFieldTasks.splice(srcFieldTasks.indexOf(draggedTask), 1);
    setSrcFieldTasks(srcFieldTasks);

    targetFieldTasks.splice(targetTaskID, 0, draggedTask);
    setTargetFieldTasks(targetFieldTasks);
  }

  function addField(newField, setNewField) {
    setFields(fields.concat(newField));

    axios.post(
      "http://localhost:5000/api/table/add-field",
      {
        tableName: props.tableName,
        fieldName: newField,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setNewField("");
  }

  function deleteField(id) {
    setFields(fields.filter((field, index) => index - 1 != id));

    axios.delete("http://localhost:5000/api/table/delete-field", {
      data: {
        tableName: props.tableName,
        fieldName: fields[id + 1],
      },
    });
  }

  useEffect(() => {
    const getFields = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/${props.tableName.toLowerCase()}`
        );
        setFields(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFields();
  }, [props.tableName]);

  return (
    <div className="fields">
      {fields.slice(1, fields.length).map((field, index) => {
        return (
          <Field
            key={index}
            id={index}
            fieldName={field}
            tableName={props.tableName}
            onDelete={deleteField}
            onDrop={onDrop}
            setActiveTask={setActiveTask}
            setSrcField={setSrcField}
          />
        );
      })}

      <AddField addField={addField} />
    </div>
  );
}

export default Table;
