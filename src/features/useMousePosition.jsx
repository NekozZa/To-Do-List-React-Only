import React, { useState, useEffect } from "react";

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  function handleMouseMove(e) {
    setMousePosition({
      x: e.pageX,
      y: e.pageY,
    });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

export default useMousePosition;
