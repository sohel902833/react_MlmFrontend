import React from "react";
import { useAuth } from "../../../context/AuthContext";
import profileImg from "../../../images/profile.png";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./personal.css";
function PersonalInformation() {
  const { currentUser } = useAuth();
  return (
    <MainLayout>
      <div className="personal_information_container">
        <AppBar title="Profile" backUrl="/" />
        <div className="personal_information_body">
          <div className="center_image">
            <img src={profileImg} alt="" />
          </div>
          <br />
          <h3>{currentUser?.phone}</h3>
          <h3>{currentUser?.name}</h3>
          <p>UID : {currentUser?.userId}</p>
          <p>
            Balance:
            <span style={{ color: "green", fontWeight: "bold" }}>
              {currentUser?.balance}
            </span>
          </p>{" "}
          <p>
            Total Revenue:
            <span style={{ color: "green", fontWeight: "bold" }}>
              {currentUser?.totalRevenue}
            </span>
          </p>{" "}
          <p>
            Task Revenue:
            <span style={{ color: "green", fontWeight: "bold" }}>
              {currentUser?.taskRevenue}
            </span>
          </p>
          <p>
            My Refer Code:
            <span style={{ color: "green", fontWeight: "bold" }}>
              {currentUser?.myReferCode}
            </span>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default PersonalInformation;
