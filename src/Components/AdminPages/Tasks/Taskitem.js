import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import React from "react";
import { BeatLoader } from "react-spinners";
import { axiosDelete, axiosPut } from "../../ApiCall/axiosApi";
const Taskitem = ({ task, filterTask, getTaskList }) => {
  const [loading, setLoading] = React.useState(false);
  const [price, setPrice] = React.useState(task?.price);
  const [videoUrl, setVideoUrl] = React.useState(task?.videoUrl);
  const [show, setShow] = React.useState(false);
  const deleteJob = async () => {
    if (window.confirm("Are you Want To Sure Delete This Job")) {
      setLoading(true);
      const res = await axiosDelete(
        `admin/task/${task?.id}`,
        localStorage.getItem("admin-token")
      );
      setLoading(false);
      if (res.status === 201) {
        filterTask(task?.id);
      }
    }
  };

  const updateTask = async () => {
    if (price && videoUrl) {
      setLoading(true);
      const t = {
        ...task,
        price,
        videoUrl,
      };
      console.log(t);
      const res = await axiosPut(
        `admin/task/${task?.id}`,
        localStorage.getItem("admin-token"),
        t
      );
      console.log(res);
      setLoading(false);
      if (res.status === 201) {
        await getTaskList();
      }
    }
  };

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <DeleteOutlined onClick={() => deleteJob()} />
              <EditOutlined
                onClick={() => setShow(!show)}
                style={{ marginLeft: "10px" }}
              />
            </IconButton>
          }
          title={task?.brand}
          subheader={task?.title}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary">
            Price : {task?.price}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Membership : {task?.membership}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            VideoUrl :<span style={{ color: "red" }}>{task?.videoUrl}</span>
          </Typography>
        </CardContent>

        {show && (
          <div style={{ marginLeft: "25px" }}>
            <TextField
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              label="Price"
              variant="outlined"
              color="secondary"
              required
              type="number"
            />
            <br />
            <br />
            <br />
            <TextField
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              label="Video Url"
              variant="outlined"
              color="secondary"
              required
              type="text"
            />
            <br />
            <br />
            {loading ? (
              <BeatLoader loading={loading} />
            ) : (
              <Button
                onClick={() => updateTask()}
                style={{ marginBottom: "10px" }}
                color="secondary"
                variant="outlined"
                type="submit"
                endIcon={<EditOutlined />}
              >
                Update
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Taskitem;
