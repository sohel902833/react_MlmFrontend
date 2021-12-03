import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { axiosGet } from "../../ApiCall/axiosApi";
import "./order.css";
import Orderitem from "./Orderitem";
function Finished() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);

  React.useEffect(() => {
    getTaskList();
  }, []);

  const getTaskList = async (taskT) => {
    setLoading(true);
    const res = await axiosGet(
      `user/task/complete`,
      localStorage.getItem("token")
    );
    setLoading(false);
    if (res.status === 201) {
      setTaskList(res.data.myTasks.reverse());
    }
  };

  return (
    <div className="order_lists">
      {taskList.map((task) => (
        <Orderitem task={task} view={false} />
      ))}
    </div>
  );
}

export default Finished;
