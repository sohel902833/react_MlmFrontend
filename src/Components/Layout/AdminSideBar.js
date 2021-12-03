import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import * as React from "react";
import { useHistory } from "react-router";
import { useAdminAuth } from "../../context/AdminContext";
const sideBarItemList = [
  {
    text: "Users",
    link: "/admin",
  },
  {
    text: "Users By MLm",
    link: "/admin/mlm",
  },
  {
    text: "Users By Package",
    link: "/admin/package-user",
  },

  {
    text: "Settings",
    link: "/admin/setting",
  },
  {
    text: "Tasks",
    link: "/admin/tasks",
  },
  {
    text: "Income Guide",
    link: "/admin/income-guide",
  },
  {
    text: "Video Tutorial",
    link: "/admin/video-tutorial",
  },
  {
    text: "Membership",
    link: "/admin/membership",
  },
  {
    text: "Membership Purchase Req.",
    link: "/admin/purchase-request",
  },
  {
    text: "Withdraw",
    link: "/admin/withdraw",
  },
  {
    text: "Message",
    link: "/admin/message",
  },
  {
    text: "Notification",
    link: "/admin/notification",
  },
  {
    text: "Reset Password",
    link: "/admin/reset-password",
  },
];
export default function AdminSideBar({ open, setOpen, anchor }) {
  const history = useHistory();

  const changeRoute = (path) => {
    history.push(path);
  };

  const { logout } = useAdminAuth();

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={setOpen(false)}
      onKeyDown={setOpen(false)}
    >
      <List>
        {sideBarItemList.map((itm, index) => (
          <ListItem button onClick={() => changeRoute(itm.link)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={itm.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem onClick={(e) => logout()} button>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={anchor}
        open={open}
        onClose={setOpen(false)}
        onOpen={setOpen(true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </div>
  );
}
