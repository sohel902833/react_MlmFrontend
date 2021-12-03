import React from "react";
import youtubeImg from "../../../images/youtube.png";
import { axiosGet } from "../../ApiCall/axiosApi";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./video.css";
function VideoTutorial() {
  const [videoTutorialList, setVideoTutorialList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getIncomeGuide();
  }, []);

  const getIncomeGuide = async () => {
    const res = await axiosGet(
      "user/video-tutorial",
      localStorage.getItem("token")
    );

    setLoading(false);
    if (res.status === 201) {
      setVideoTutorialList(res?.data?.videoTutorial);
    }
  };

  const openNewWindow = (url) => {
    window.open(url);
  };

  return (
    <MainLayout>
      <div className="income_guide_container">
        <AppBar title="Video Tutorial" backUrl="/" />
        <div className="image_list">
          {videoTutorialList?.map((video) => (
            <div>
              <img
                onClick={() => openNewWindow(video?.videoUrl)}
                src={youtubeImg}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default VideoTutorial;
