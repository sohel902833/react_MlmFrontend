import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@material-ui/core";
import {
  AddLocationOutlined,
  ArchiveRounded,
  FavoriteBorderOutlined,
  GroupOutlined,
  HomeOutlined,
} from "@material-ui/icons";
import * as React from "react";
import Home from "../Home/Home";
import Member from "../Member/Member";
import Mine from "../Mine/Mine";
import Order from "../Order/Order";
import Pageheader from "../PageHeader";
import Task from "../Task/Task";
import "./h.css";
import styles from "./home.module.css";
export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState();

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value, setMessages]);

  return (
    <div className={styles.main_container}>
      <Box sx={{ pb: 7 }} ref={ref}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <div className={styles.page_header}>
            {value === 0 && <Pageheader text="Home" />}
            {value === 1 && <Pageheader text="Member" />}
            {value === 2 && <Pageheader text="Task" />}
            {value === 3 && <Pageheader text="Order" />}
            {value === 4 && <Pageheader text="Mine" />}
          </div>

          <div className={styles.content}>
            {value === 0 && <Home />}
            {value === 1 && <Member />}
            {value === 2 && <Task />}
            {value === 3 && <Order />}
            {value === 4 && <Mine />}
          </div>

          <BottomNavigation
            className={styles.bottom_nav}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeOutlined />} />
            <BottomNavigationAction label="Member" icon={<GroupOutlined />} />
            <BottomNavigationAction
              label="Task"
              icon={<FavoriteBorderOutlined />}
            />
            <BottomNavigationAction
              label="Order"
              icon={<AddLocationOutlined />}
            />
            <BottomNavigationAction label="Mine" icon={<ArchiveRounded />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
}
