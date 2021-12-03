import { Grid } from "@material-ui/core";
import React from "react";
import { axiosGet } from "../../ApiCall/axiosApi";
import Loader from "../../Layout/Loader";
import Taskitem from "./Taskitem";

function TaskLists() {
  const [loading, setLoading] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  React.useEffect(() => {
    getTaskList();
  }, []);

  const getTaskList = async () => {
    setLoading(true);
    const res = await axiosGet(
      `admin/task`,
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setTaskList(res.data.tasks);
    }
  };
  const filterTask = (id) => {
    const fTask = taskList.filter((t) => t.id !== id);
    setTaskList(fTask);
  };

  if (loading) {
    return <Loader loading={loading} />;
  }
  return (
    <Grid container spacing={5}>
      {taskList?.map((task) => (
        <Grid item xs={12} sm={12} md={6}>
          <Taskitem
            filterTask={filterTask}
            task={task}
            getTaskList={getTaskList}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default TaskLists;
