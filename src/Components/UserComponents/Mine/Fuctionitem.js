import React from "react";
import "./mine.css";
function Functionitem({ text, image, callMethod }) {
  return (
    <div
      onClick={callMethod}
      style={{ cursor: "pointer" }}
      className="function"
    >
      <img src={image} alt="" />
      <p>{text}</p>
    </div>
  );
}

export default Functionitem;
