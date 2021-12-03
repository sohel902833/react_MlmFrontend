import React from "react";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import { axiosGet } from "../../ApiCall/axiosApi";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./community.css";
function PurchaseCommunity() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = React.useState(true);

  const [referUserList, setReferUserList] = React.useState([]);
  React.useEffect(() => {
    getReferUser();
  }, []);

  const getReferUser = async () => {
    const res = await axiosGet("user/package", localStorage.getItem("token"));
    setLoading(false);
    if (res.status === 201) {
      setReferUserList(res?.data?.packageList);
    }
  };

  return (
    <MainLayout>
      <div className="team_report_container">
        <AppBar title="Purchase Community" backUrl="/" />
        <div className="team_report_body">
          {loading ? (
            <BeatLoader loading={loading} />
          ) : (
            referUserList.map((user) => (
              <div key={user?.userId} className="refer_user_item">
                <h5>Package Name: {user?.levelName}</h5>
                <p>Order Number: {user?.orderNumber}</p>
                <p>Status: {user?.state}</p>
                <p>
                  Time:
                  {new Date(user?.time).toLocaleDateString("en-BD", {
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

export default PurchaseCommunity;
