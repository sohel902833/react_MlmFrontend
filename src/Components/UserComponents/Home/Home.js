import { Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import bannerImg from "../../../images/banner.jpg";
import facebookImg from "../../../images/facebook.png";
import helpCenterImg from "../../../images/help_center.png";
import incomeGuideImg from "../../../images/income_guide.png";
import inviteFrndsImg from "../../../images/invite_friends.png";
import tiktakImg from "../../../images/tiktak.png";
import videoTutorialImg from "../../../images/video_tutorial.png";
import ShowAlertDialog from "./AlertDialog";
import "./home.css";

const randomText = [
  "Congratulations***1478 upgrade VIP1",
  "Congratulations***7898 upgrade  VIP2",
  "Congratulations***1278 upgrade  VIP3",
  "Congratulations***8888 upgrade  VIP1",
  "Congratulations***4578 upgrade  VIP3",
  "Congratulations***7898 upgrade  VIP2",
  "Congratulations***1278 upgrade  VIP1",
  "Congratulations***328 upgrade  VIP3",
  "Congratulations***4578 upgrade  VIP2",
  "Congratulations***2578 upgrade  VIP3",
];

let counter = 0;

function Home() {
  const { appSetting } = useAuth();
  const helpCenter = appSetting?.helpCenter;
  const history = useHistory();
  const [currentText, setCurrentText] = React.useState(randomText[0]);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [text, setText] = React.useState(1);

  React.useEffect(() => {
    if (sessionStorage.getItem("isShow")) {
    } else {
      setShowAlertDialog(true);
      sessionStorage.setItem("isShow", true);
    }
  }, [text]);

  React.useEffect(() => {
    setTimer();
  }, []);
  const openNewPage = () => {
    window.open(helpCenter);
  };
  const navigatePage = (url) => {
    history.push(url);
  };

  const setTimer = () => {
    setInterval(() => {
      if (randomText.length > counter) {
        setCurrentText(randomText[counter]);
        counter++;
      } else {
        counter = 0;
        setCurrentText(randomText[counter]);
      }
    }, 8000);
  };

  return (
    <div className="home-container">
      <div className="home_items">
        <div className="banner_section">
          <img src={bannerImg} alt="" />
        </div>

        <div onClick={openNewPage} className="home_item">
          <h5>Help Center</h5>
          <img src={helpCenterImg} alt="" />
        </div>
        <div
          onClick={() => navigatePage("/invite-friends")}
          className="home_item"
        >
          <h5>Invite Friends</h5>
          <img src={inviteFrndsImg} alt="" />
        </div>
        <div
          onClick={() => navigatePage("/income-guide")}
          className="home_item"
        >
          <h5>Income Guide</h5>
          <img src={incomeGuideImg} alt="" />
        </div>
        <div
          onClick={() => navigatePage("/video-tutorial")}
          className="home_item"
        >
          <h5>Video Tutorial</h5>
          <img src={videoTutorialImg} alt="" />
        </div>
        <div className="home_item">
          <img src={videoTutorialImg} alt="" />
          <h5>{currentText}</h5>
        </div>
      </div>
      <Typography style={{ marginLeft: "10px" }} variant="h4">
        Mission Hall
      </Typography>
      <div className="home_icons">
        <div className="home_icon">
          <img style={{ height: "268px" }} src={facebookImg} alt="" />
        </div>
        <div className="home_icon">
          <img style={{ height: "268px" }} src={tiktakImg} alt="" />
        </div>
      </div>
      {showAlertDialog && (
        <ShowAlertDialog setOpen={setShowAlertDialog} setting={appSetting} />
      )}
     </div>
  );
}

export default Home;
