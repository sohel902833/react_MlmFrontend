import { Card, CardHeader, Grid, IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import React from "react";
import { BeatLoader } from "react-spinners";
import { axiosDelete, axiosGet, axiosPost } from "../../ApiCall/axiosApi";
import AdminLayout from "../../Layout/AdminLayout";
import Loader from "../../Layout/Loader";
import "./income.css";
function VideoTutorial() {
  const [videoUrl, setVideoUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [tutorialList, setTutorialList] = React.useState([]);

  React.useEffect(() => {
    getTutorial();
  }, []);

  const deleteTutorial = async (id) => {
    if (window.confirm("Are you Want To Sure Delete This Video Url")) {
      setLoading(true);
      const res = await axiosDelete(
        `admin/video-tutorial/${id}`,
        localStorage.getItem("admin-token")
      );
      setLoading(false);
      if (res.status === 201) {
        const fUrl = tutorialList.filter((inc) => inc.id !== id);
        setTutorialList(fUrl);
      }
    }
  };

  const setVideoTutorial = async () => {
    if (videoUrl) {
      setLoading(true);
      const res = await axiosPost(
        `admin/video-tutorial`,
        localStorage.getItem("admin-token"),
        { videoUrl }
      );
      setLoading(false);
      if (res.status === 201) {
        setLoading(false);
        setVideoUrl("");
        getTutorial();
      }
    }
  };

  const getTutorial = async () => {
    setPageLoading(true);
    const res = await axiosGet(
      `admin/video-tutorial`,
      localStorage.getItem("admin-token")
    );
    setPageLoading(false);
    if (res.status === 201) {
      setTutorialList(res.data.videoTutorial);
    }
  };

  if (pageLoading) {
    return <Loader loading={pageLoading} />;
  }

  return (
    <AdminLayout>
      <div className="income_container">
        <div className="add_income_guid">
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            type="text"
            placeholder="Enter Video Tutorial Youtube Id"
          />
          {loading ? (
            <BeatLoader loading={loading} />
          ) : (
            <button onClick={setVideoTutorial}>Save</button>
          )}
        </div>
        <hr />
        <Grid container spacing={5}>
          {tutorialList?.map((tutorial) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={1}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <DeleteOutlined
                        onClick={() => deleteTutorial(tutorial?.id)}
                      />
                    </IconButton>
                  }
                  title={tutorial?.videoUrl}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </AdminLayout>
  );
}

export default VideoTutorial;
