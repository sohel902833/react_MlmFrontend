import React from "react";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import { axiosGet } from "../../ApiCall/axiosApi";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./withdraw.css";
function WithdrawReport() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = React.useState(true);

  const [withdrawReportList, setWithdrawReportList] = React.useState([]);
  React.useEffect(() => {
    getWithdrawReport();
  }, []);

  const getWithdrawReport = async () => {
    const res = await axiosGet("user/withdraw", localStorage.getItem("token"));
    console.log(res.data);
    setLoading(false);
    if (res.status === 201) {
      setWithdrawReportList(res?.data?.withdrawList);
    }
  };

  return (
    <MainLayout>
      <div className="team_report_container">
        <AppBar title="Withdraw Report" backUrl="/" />
        <div className="team_report_body">
          {loading ? (
            <BeatLoader loading={loading} />
          ) : (
            withdrawReportList.map((w) => (
              <div key={w?.id} className="refer_user_item">
                <h5>
                  Status: <span style={{ color: "green" }}> {w?.state}</span>
                </h5>
                <p>
                  Amount: <span style={{ color: "red" }}>{w?.amount}</span>{" "}
                </p>
                <p>
                  Time:
                  {new Date(w?.time).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default WithdrawReport;
