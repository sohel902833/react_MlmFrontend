import { Card, CardContent } from "@material-ui/core";
import React from "react";
import fbImage from "../../../images/facebook.png";
import tiktakImg from "../../../images/tiktak.png";
import { axiosPost } from "../../ApiCall/axiosApi";
import "./task.css";
function TaskItem({ task, filterTask }) {
  const [loading, setLoading] = React.useState(false);

  const receiveTask = async () => {
    setLoading(true);
    const res = await axiosPost(
      `user/task/receive/${task?.id}`,
      localStorage.getItem("token")
    );
    setLoading(false);
    if (res.status === 201) {
      filterTask(task?.id);
    }
  };

  return (
    <Card
      style={{ marginBottom: "15px", marginLeft: "5px", marginRight: "5px" }}
    >
      <CardContent>
        <div className="task_item">
          <div className="task_top">
            <div className="task_top_left">
              <img
                src={task?.brand === "Facebook" ? fbImage : tiktakImg}
                alt=""
              />
              <div className="task_top_left_data">
                <h4>{task?.brand === "Facebook" ? task?.brand : "Tiktak"}</h4>
                <p>Like</p>
              </div>
            </div>
            <div className="task_top_right">
              <div className="task_serial">
                <p>{new Date().getTime()}</p>
              </div>
              <div className="task_price">
                <h4>{task?.price}</h4>
              </div>
            </div>
          </div>
          <div className="task_bottom">
            <div className="bottom_left">
              <h4>{task?.id}</h4>
            </div>
            <div className="bottom_right">
              <button disabled={loading} onClick={() => receiveTask()}>
                Receive
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskItem;
