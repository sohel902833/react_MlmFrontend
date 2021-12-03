import React from "react";
import { BeatLoader } from "react-spinners";

const style = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Loader = ({ loading }) => {
  return (
    <div style={style}>
      <BeatLoader loading={loading} />
    </div>
  );
};

export default Loader;
