import React from "react";
import { BeatLoader } from "react-spinners";
import useNotification from "../../../hooks/useNotification";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./notification.css";
function UserNotification() {
  const { loading, notificationList } = useNotification();

  return (
    <MainLayout>
      <div className="user_notification_container">
        <AppBar title="Notifications" backUrl="/" />
        <div className="user_notification_body">
          {loading ? (
            <BeatLoader loading={loading} />
          ) : (
            notificationList.map((n) => (
              <div className="notification_item">
                <h5>{n?.message}</h5>
                <p>{n?.time}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default UserNotification;
