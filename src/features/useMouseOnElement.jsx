import React, { useState, useEffect } from "react";

function useMouseOnElement(elementClass) {
  const [mouseOnElement, setMouseOnElement] = useState(false);
  const elements = document.querySelectorAll(`.${elementClass}`);

  useEffect(() => {
    elements.forEach((element) => {
      element.addEventListener("mouseover", () => {
        setMouseOnElement(true);
      });

      element.addEventListener("mouseleave", () => {
        setMouseOnElement(false);
      });
    });
  }, []);

  return mouseOnElement;
}

export default useMouseOnElement;
