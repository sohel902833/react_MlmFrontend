import React from "react";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import { axiosGet } from "../../ApiCall/axiosApi";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./report.css";
function DailyReport() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = React.useState(true);

  const [dailyReportList, setDailyReportList] = React.useState([]);
  React.useEffect(() => {
    getReferUser();
  }, []);

  const getReferUser = async () => {
    const res = await axiosGet(
      "user/today/earn-history",
      localStorage.getItem("token")
    );
    setLoading(false);
    if (res.status === 201) {
      setDailyReportList(res?.data?.incomeHistory);
    }
  };

  return (
    <MainLayout>
      <div className="team_report_container">
        <AppBar title="Daily Report" backUrl="/" />
        <div className="team_report_body">
          {loading ? (
            <BeatLoader loading={loading} />
          ) : (
            dailyReportList.map((dr) => (
              <div key={dr?.id} className="refer_user_item">
                <h5>Earn Form : {dr?.text}</h5>
                <p>
                  Amount :
                  <span style={{ color: "green", fontWeight: "bolder" }}>
                    {dr?.amount}
                  </span>
                </p>
                <p>Time:{dr?.time}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default DailyReport;
