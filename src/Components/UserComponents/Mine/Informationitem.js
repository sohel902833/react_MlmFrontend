import React from "react";
import "./mine.css";
function Informationitem({ text, image, callMethod }) {
  return (
    <div onClick={callMethod} className="information">
      <img src={image} alt="" />
      <p>{text}</p>
    </div>
  );
}

export default Informationitem;
