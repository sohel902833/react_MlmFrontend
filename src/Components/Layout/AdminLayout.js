import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import AdminSideBar from "./AdminSideBar";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      minHeight: "100vh",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    appbar: {
      backgroundColor: theme.palette.background.default,
    },
    img: {
      margin: "10px",
      width: "30px",
      borderRadius: "50%",
    },
    leftDiv: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
      "& a": {
        textDecoration: "none",
      },
    },
    d_cv: {
      border: "1px solid #fff",
      padding: "10px",
      cursor: "Pointer",
      fontSize: "16px",
      borderRadius: "10px",
      boxShadow: `0px 0px 6px 1px ${
        theme.palette.type === "dark" ? "#fff" : "#000"
      }`,
    },
  };
});
const AdminLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const toggleDrawer = (o) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(o);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
          <div className={classes.leftDiv}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => setOpen(!open)}
                color="textPrimary"
                aria-label="open drawer"
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography color="textPrimary">Admin</Typography>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <AdminSideBar open={open} setOpen={toggleDrawer} anchor="left" />
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
