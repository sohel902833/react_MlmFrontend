import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import * as React from "react";
import AdminLayout from "../../Layout/AdminLayout";
import AddTask from "./AddTask";
import "./task.css";
import TaskLists from "./TaskLists";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Tasks() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AdminLayout>
      <div
        style={{
          background: "white",
          padding: "20px",
        }}
      >
        <Box sx={{ width: "100%", background: "white" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Add Task" {...a11yProps(0)} />
              <Tab label="Task Lists" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AddTask />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TaskLists />
          </TabPanel>
        </Box>
      </div>
    </AdminLayout>
  );
}
