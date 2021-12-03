import React from "react";
import { useAuth } from "../../../context/AuthContext";
import qrImg from "../../../images/qr.png";
import { copy } from "../../lib/copyContent";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./help.css";
function InviteFriends() {
  const { currentUser } = useAuth();
  return (
    <MainLayout>
      <div className="invite_container">
        <AppBar title="Invite Firends" backUrl="/" />

        <div className="invite_body">
          <img src={qrImg} alt="" />

          <h2>
            Refer Code:
            <span
              style={{
                color: "#FF9800",
                marginLeft: "10px",
                fontWeight: "bolder",
              }}
            >
              {currentUser?.myReferCode}
            </span>
          </h2>

          <button
            onClick={() => copy(currentUser?.myReferCode)}
            className="copy_button"
          >
            Copy Refer Code
          </button>
          <h5 style={{ marginTop: "20px" }}>
            Refer Link:
            <span
              style={{
                color: "#FF9800",
                marginLeft: "10px",
                fontWeight: "bolder",
              }}
            >
              <a
                href={`https://tolikeglobal.com/register?referCode=${currentUser?.myReferCode}`}
              >
                {`https://tolikeglobal.com/register?referCode=${currentUser?.myReferCode}`}
              </a>
            </span>
          </h5>

          <button
            onClick={() =>
              copy(
                `https://tolikeglobal.com/register?referCode=${currentUser?.myReferCode}`
              )
            }
            className="copy_button"
          >
            Copy Refer Link
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default InviteFriends;
