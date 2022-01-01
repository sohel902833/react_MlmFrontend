import { Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import appDownloadImg from "../../../images/app_download.png";
import dailyReportImg from "../../../images/daily_report.png";
import incomeBreakDownImg from "../../../images/income_breakdown.png";
import joinCommunityImg from "../../../images/join_community.png";
import logoutImg from "../../../images/logout.png";
import personalInformationImg from "../../../images/personal_information.png";
import purchaseCommunityImg from "../../../images/purchase_community.png";
import teamReportImg from "../../../images/team_report.png";
import withdrawImg from "../../../images/withdraw.png";
import Informationitem from "./Informationitem";
import "./mine.css";
function Commonfunctions() {
  const history = useHistory();
  const { logout, appSetting } = useAuth();
  const openJoinCommunity = () => {
    window.open(appSetting?.helpCenter);
  };
  const openAppLink = () => {
    window.open(appSetting?.appLink);
  };

  return (
    <div className="card" style={{ marginBottom: "10px", padding: "10px" }}>
      <Typography variant="h6">Common Functions</Typography>
      <br />
      <div className="information_section">
        <div className="information_item">
          <Informationitem
            callMethod={() => history.push("/me")}
            text="Personal Information"
            image={personalInformationImg}
          />
          <Informationitem
            callMethod={() => history.push("/daily-report")}
            text="Daily Report"
            image={dailyReportImg}
          />
          <Informationitem
            callMethod={() => history.push("/income-breakdown")}
            text="Income Breakdown"
            image={incomeBreakDownImg}
          />
        </div>
        <div className="information_item">
          <Informationitem
            callMethod={() => history.push("/purchase-community")}
            text="Purchase History"
            image={purchaseCommunityImg}
          />
          <Informationitem
            callMethod={() => history.push("/withdraw-report")}
            text="Withdraw Report"
            image={withdrawImg}
          />
          <Informationitem
            callMethod={openJoinCommunity}
            text="Join Community"
            image={joinCommunityImg}
          />
        </div>
        <div className="information_item">
          <Informationitem
            callMethod={() => history.push("/team-report")}
            text="Team Report"
            image={teamReportImg}
          />
          <Informationitem
            callMethod={openAppLink}
            text="Download App"
            image={appDownloadImg}
          />
          <Informationitem
            callMethod={logout}
            text="Logout"
            image={logoutImg}
          />
        </div>
      </div>
    </div>
  );
}

export default Commonfunctions;
