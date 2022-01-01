import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { axiosGet } from "../../ApiCall/axiosApi";
import "./task.css";
import TaskItem from "./TaskItem";

function Task({ navigateBottomBar }) {
  const { currentUser, getUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [membershipList, setMembershipList] = React.useState([]);
  const [taskList, setTaskList] = React.useState([]);
  const [taskType, setTaskType] = React.useState("Facebook");

  React.useEffect(() => {
    getMembershipList();
    getTaskList(taskType);
  }, []);
  const getMembershipList = async () => {
    setLoading(true);
    const res = await axiosGet(
      "user/membership-list",
      localStorage.getItem("token")
    );
    setLoading(false);
    if (res.status === 201) {
      setMembershipList(res.data.membership);
    }
  };
  const getTaskList = async (taskT) => {
    setLoading(true);
    const res = await axiosGet(
      `user/my-task/${taskT}`,
      localStorage.getItem("token")
    );
    setLoading(false);
    if (res.status === 201) {
      setTaskList(res.data.myTasks);
    } else {
      setTaskList([]);
    }
  };

  const filterTask = async (taskId) => {
    const tList = taskList.filter((task) => task.id !== taskId);
    navigateBottomBar(3);
    await getUser();
    setTaskList(tList);
  };

  const changeTaskType = (taskType) => {
    setTaskType(taskType);
    getTaskList(taskType);
  };

  return (
    <div className="task_container">
      <div className="task_brands">
        <div
          onClick={() => changeTaskType("Facebook")}
          className={`task_brand ${taskType === "Facebook" && `active_task`}`}
        >
          <h3>Facebook</h3>
        </div>
        <div
          onClick={() => changeTaskType("Tiktak")}
          className={`task_brand ${taskType === "Tiktak" && `active_task`}`}
        >
          <h3> Youtube</h3>
        </div>
      </div>
      <div className="membership_lists">
        {membershipList.map((member) => (
          <div className={`membership_item`}>
            <h4
              className={`${
                currentUser?.currentMembership?.levelId === member?.levelId &&
                "active_member"
              }`}
            >
              {member.levelName}
            </h4>
          </div>
        ))}
      </div>
      <div className="task_lists">
        {taskList.map((task) => (
          <TaskItem filterTask={filterTask} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Task;
