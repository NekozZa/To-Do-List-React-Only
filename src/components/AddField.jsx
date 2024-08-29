import React, { useState } from "react";

function AddField(props) {
  const [newField, setNewField] = useState("");
  const [mouseOver, setMouseOver] = useState(false);

  function updateFieldValue(event) {
    setNewField(event.target.value);
  }

  return (
    <div
      className="field add-field-btn"
      onMouseOver={() => {
        setMouseOver(true);
      }}
      onMouseOut={() => {
        setMouseOver(false);
      }}
    >
      {mouseOver ? (
        <input type="text" value={newField} onChange={updateFieldValue}></input>
      ) : (
        <i className="ri-add-large-line"></i>
      )}

      {mouseOver && (
        <button onClick={() => props.addField(newField, setNewField)}>
          <i class="ri-check-line"></i>
        </button>
      )}
    </div>
  );
}

export default AddField;
