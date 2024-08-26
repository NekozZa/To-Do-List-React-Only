import React, { useState, useEffect } from "react";
import Field from "./Field";
import axios from "axios";
import "../styles/field_layout.css";

function Table(props) {
  const [fields, setFields] = useState([]);

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
          <Field key={index} fieldName={field} tableName={props.tableName} />
        );
      })}
    </div>
  );
}

export default Table;
