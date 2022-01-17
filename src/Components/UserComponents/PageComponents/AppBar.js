import { Typography } from "@material-ui/core";
import { ArrowBackIosSharp } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import sunImg from "../../../images/boom.jpeg";
import "./appbar.css";
function AppBar({ title, backUrl }) {
  const history = useHistory();

  return (
    <div className="app_bar_container">
      <div className="app_left">
        <ArrowBackIosSharp
          onClick={() => history.push(backUrl)}
          style={{ cursor: "pointer" }}
          fontSize="45px"
        />
        <img src={sunImg} alt="" />
        <Typography className="logo_title" variant="h6">
          BOOM CASH
        </Typography>
      </div>
      <div className="header_right">
        <Typography className="page_title" variant="h6">
          {title}
        </Typography>
      </div>
    </div>
  );
}

export default AppBar;
