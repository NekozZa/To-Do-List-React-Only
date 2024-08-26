import React, { useState } from "react";
import Field from "./Field";
import "../styles/field_layout.css";

function Table(props) {
  const [fields, setFields] = useState(props.fields);

  return (
    <div className="fields">
      {fields.map((field) => {
        return <Field fieldName={field} />;
      })}
    </div>
  );
}

export default Table;
