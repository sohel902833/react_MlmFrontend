import { Card, CardContent } from "@material-ui/core";
import React from "react";
import { BeatLoader } from "react-spinners";
import fbImage from "../../../images/facebook.png";
import tiktakImg from "../../../images/youtube.png";
import { axiosPost } from "../../ApiCall/axiosApi";
import "./order.css";

function Orderitem({ task, filterTask, view }) {
  const [submitView, setSubmitView] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const openWindow = (url) => {
    window.open(url);
    setTimeout(() => {
      console.log("End");
      setSubmitView(true);
    }, 8000);
  };

  const submitTask = async () => {
    setSubmitLoading(true);
    const res = await axiosPost(
      `user/task-done/${task?.taskId}`,
      localStorage.getItem("token", {})
    );
    setSubmitLoading(false);
    if (res.status === 201) {
      setSubmitView(false);
      filterTask(task?.taskId);
      alert(res?.data?.message);
    } else {
      alert(res?.data?.message);
    }
  };

  return (
    <Card
      style={{ marginBottom: "15px", marginLeft: "5px", marginRight: "5px" }}
    >
      <CardContent>
        <div className="order_item_container">
          <div className="order_item_top">
            <div className="o_t_left">
              <img
                src={task?.brand === "Facebook" ? fbImage : tiktakImg}
                alt=""
              />
            </div>
            <div className="o_t_right">
              <h3>Task Income: {task?.price}</h3>
              <h6>Published Shared post and add customer service</h6>
            </div>
          </div>
          {view ? (
            <div className="order_item_bottom">
              <div>Forward</div>
              <div>Task Sample</div>
              {submitView ? (
                submitLoading ? (
                  <BeatLoader loading={submitLoading} />
                ) : (
                  <div onClick={() => submitTask()}>Submit</div>
                )
              ) : (
                <div onClick={() => openWindow(task?.videoUrl)}>Video</div>
              )}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default Orderitem;
