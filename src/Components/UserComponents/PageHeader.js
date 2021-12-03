import { Typography } from "@material-ui/core";
import React from "react";
import sunImg from "../../images/sun.png";
import "./page.css";
function Pageheader({ text }) {
  return (
    <div className="header_container">
      <div className="header_left">
        <img src={sunImg} alt="" />

        <Typography className="logo_title" variant="h6">
          LIKE
        </Typography>
      </div>
      <div className="header_right">
        <Typography className="page_title" variant="h6">
          {text}
        </Typography>
      </div>
    </div>
  );
}

export default Pageheader;
