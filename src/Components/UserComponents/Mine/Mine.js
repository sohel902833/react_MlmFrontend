import { FileCopyOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useNewNotification from "../../../hooks/userNewNotification";
import bgImg from "../../../images/bg.jpg";
import inviteFrndsImg from "../../../images/invite_friends.png";
import messageImg from "../../../images/msg.png";
import sunImg from "../../../images/net.jpg";
import profileImg from "../../../images/profile.png";
import settingImg from "../../../images/setting.png";
import withdrawImg from "../../../images/withdraw.png";
import { copy } from "../../lib/copyContent";
import Loader from "../Loader";
import Commonfunctions from "./CommonFunctions";
import Functionitem from "./Fuctionitem";
import "./mine.css";
function Mine() {
  const [loading, setLoading] = React.useState(false);
  const [viewNotificationBar, setViewNotificationBar] = React.useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();

  const viewNotification = Number(localStorage.getItem("viewNotification"));
  const { loading: notificationLoading, newNotification } =
    useNewNotification();
  const goToNotification = () => {
    localStorage.setItem("viewNotification", newNotification?.notificationId);
    history.push("/notification");
  };

  React.useEffect(() => {
    if (newNotification?.notificationId === viewNotification) {
      setViewNotificationBar(false);
    } else {
      setViewNotificationBar(true);
    }
  }, [notificationLoading]);

  if (loading) return <Loader loading={loading} />;
  return (
    <div className="mine_container">
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="user_section"
      >
        <div className="user_options">
          <div className="icons">
            <img
              onClick={() => history.push("/user-setting")}
              src={settingImg}
              alt=""
            />
            <img onClick={() => goToNotification()} src={messageImg} alt="" />
            {viewNotificationBar && (
              <div className="notification_indicator"></div>
            )}
          </div>
        </div>
        <div className="profile_section">
          <div className="profile_left">
            <img src={profileImg} alt="" />
          </div>
          <div className="profile_right">
            <p style={{ fontSize: "20px" }}>{currentUser?.phone}</p>
            <p>
              UID: {currentUser?.userId}
              <span
                onClick={() => copy(currentUser?.userId)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              >
                <FileCopyOutlined color="#457889" />
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="profile_current_level">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={sunImg} alt="" />

          <h3 style={{ fontWeight: "bolder", color: "white" }}>NETWORK KINGG</h3>
        </div>
        <div>
          <h4 style={{ color: "white" }}>
            Current Level :{" "}
            {currentUser?.currentMembership?.levelName
              ? currentUser?.currentMembership?.levelName
              : "Free"}
          </h4>
        </div>
      </div>

      <div className="card">
        <div className="functions">
          <Functionitem
            callMethod={() => history.push("/invite-friends")}
            text="Invite Friends"
            image={inviteFrndsImg}
          />
          <Functionitem
            callMethod={() => history.push("/withdraw")}
            text="Withdraw"
            image={withdrawImg}
          />
        </div>
      </div>
      <div className="card" style={{ marginBottom: "20px", padding: "20px" }}>
        <div className="balance_container">
          <div className="balance_item">
            <h4>Balance</h4>
            <h3>{currentUser?.balance}</h3>
          </div>
          <div className="balance_item">
            <h4>Total Revenue</h4>
            <h3 style={{ textAlign: "right" }}>{currentUser?.totalRevenue}</h3>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <div className="balance_container">
          <div className="balance_item">
            <h4>Day Income</h4>
            <h3>{currentUser?.dayIncome}</h3>
          </div>
          <div className="balance_item">
            <h4>Task Revenue</h4>
            <h3 style={{ textAlign: "right" }}>{currentUser?.taskRevenue}</h3>
          </div>
        </div>
        <div className="balance_container">
          <div className="balance_item">
            <h4>Referral Income</h4>
            <h3>{currentUser?.referralIncome}</h3>
          </div>
          <div className="balance_item">
            <h4>Team Work Income</h4>
            <h3 style={{ textAlign: "right" }}>
              {currentUser?.teamWorkIncome}
            </h3>
          </div>
        </div>
      </div>
      <Commonfunctions />
    </div>
  );
}

export default Mine;
