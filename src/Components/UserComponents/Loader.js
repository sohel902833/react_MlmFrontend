import React from "react";
import { BeatLoader } from "react-spinners";
function Loader({ loading }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BeatLoader loading={loading} />
    </div>
  );
}

export default Loader;
