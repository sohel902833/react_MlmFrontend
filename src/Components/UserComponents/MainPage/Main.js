import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import {
  AddLocationOutlined,
  ArchiveRounded,
  FavoriteBorderOutlined,
  GroupOutlined,
  HomeOutlined,
  MessageOutlined,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import Home from "../Home/Home";
import Member from "../Member/Member";
import Mine from "../Mine/Mine";
import Order from "../Order/Order";
import Pageheader from "../PageHeader";
import Task from "../Task/Task";
import "./main.css";
function Main() {
  const prevState = localStorage.getItem("bottomNav");

  const [value, setValue] = React.useState(prevState ? parseInt(prevState) : 0);
  const changeBottomNav = (newValue) => {
    setValue(newValue);
    localStorage.setItem("bottomNav", newValue);
  };

  return (
    <div className="main_container">
      <div className="message_icon">
        <Link to="/message">
          <MessageOutlined />
        </Link>
      </div>
      <div className="app_bar">
        {value === 0 && <Pageheader text="Home" />}
        {value === 1 && <Pageheader text="Member" />}
        {value === 2 && <Pageheader text="Task" />}
        {value === 3 && <Pageheader text="Order" />}
        {value === 4 && <Pageheader text="Mine" />}
      </div>
      <div className="main_content">
        {value === 0 && <Home />}
        {value === 1 && <Member />}
        {value === 2 && <Task navigateBottomBar={changeBottomNav} />}
        {value === 3 && <Order />}
        {value === 4 && <Mine />}
      </div>
      <div className="bottom_nav">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            changeBottomNav(newValue);
          }}
        >
          <BottomNavigationAction
            label={
              <span className={`${value === 0 ? "active_bottom" : ""}`}>
                Home
              </span>
            }
            icon={<HomeOutlined />}
          />
          <BottomNavigationAction
            label={
              <span className={`${value === 1 ? "active_bottom" : ""}`}>
                Member
              </span>
            }
            icon={<GroupOutlined />}
          />
          <BottomNavigationAction
            label={
              <span className={`${value === 2 ? "active_bottom" : ""}`}>
                Task
              </span>
            }
            icon={<FavoriteBorderOutlined />}
          />
          <BottomNavigationAction
            label={
              <span className={`${value === 3 ? "active_bottom" : ""}`}>
                Order
              </span>
            }
            icon={<AddLocationOutlined />}
          />
          <BottomNavigationAction
            label={
              <span className={`${value === 4 ? "active_bottom" : ""}`}>
                Mine
              </span>
            }
            icon={<ArchiveRounded />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default Main;
