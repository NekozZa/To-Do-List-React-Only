import React, { useState, useEffect } from "react";
import Field from "./Field";
import axios from "axios";
import "../styles/field_layout.css";

function Table(props) {
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState("");
  const [mouseOver, setMouseOver] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  function addField() {
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

  function updateFieldValue(event) {
    setNewField(event.target.value);
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
          />
        );
      })}
      <div
        className="field add-field-btn"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {mouseOver ? (
          <input
            type="text"
            value={newField}
            onChange={updateFieldValue}
          ></input>
        ) : (
          <i className="ri-add-large-line"></i>
        )}

        {mouseOver && (
          <button onClick={addField}>
            <i class="ri-check-line"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default Table;
