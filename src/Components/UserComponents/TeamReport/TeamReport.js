import React from "react";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import { axiosGet } from "../../ApiCall/axiosApi";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./team.css";
import TeamItem from "./TeamItem";
function TeamReport() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [gen1View, setGen1View] = React.useState(true);
  const [gen2View, setGen2View] = React.useState(false);
  const [gen3View, setGen3View] = React.useState(false);
  const [title, setTitle] = React.useState("Team Report  Generation 1");

  const [referUserList, setReferUserList] = React.useState([]);
  React.useEffect(() => {
    getReferUser();
  }, []);

  const getReferUser = async () => {
    setGen2View(false);
    setGen3View(false);
    setGen1View(true);
    setTitle("Team Report Generation 1");

    const res = await axiosGet(
      "user/refer-user",
      localStorage.getItem("token")
    );
    console.log(res?.data?.users);
    setLoading(false);
    if (res.status === 201) {
      setReferUserList(res?.data?.users);
    }
  };

  const getLevel2 = async (referCode) => {
    setTitle(`Team Report Generation 2 : (${referCode})`);
    setGen1View(false);
    setGen3View(false);
    setGen2View(true);
    const res = await axiosGet(
      `user/refer/user/${referCode}`,
      localStorage.getItem("token")
    );
    console.log(res?.data?.users);
    setLoading(false);
    if (res.status === 201) {
      setReferUserList(res?.data?.users);
    }
  };
  const getLevel3 = async (referCode) => {
    setTitle(`Team Report Generation 3 : (${referCode})`);
    setGen1View(false);
    setGen2View(false);
    setGen3View(true);
    const res = await axiosGet(
      `user/refer/user/${referCode}`,
      localStorage.getItem("token")
    );
    setLoading(false);
    if (res.status === 201) {
      setReferUserList(res?.data?.users);
    }
  };

  return (
    <MainLayout>
      <div className="team_report_container">
        <AppBar title={title} backUrl="/" />
        <div className="team_report_body">
          <h4 style={{ cursor: "pointer" }} onClick={() => getReferUser()}>
            Generation 1
          </h4>
          {loading ? (
            <BeatLoader loading={loading} />
          ) : gen1View ? (
            referUserList.map((user) => (
              <TeamItem getUser={getLevel2} user={user} />
            ))
          ) : null}
          <h4 style={{ cursor: "pointer" }}>Generation 2</h4>
          {loading ? (
            <BeatLoader loading={loading} />
          ) : gen2View ? (
            referUserList.map((user) => (
              <TeamItem getUser={getLevel3} user={user} />
            ))
          ) : null}
          <h4 style={{ cursor: "pointer" }}>Generation 3</h4>
          {loading ? (
            <BeatLoader loading={loading} />
          ) : gen3View ? (
            referUserList.map((user) => (
              <TeamItem getUser={() => console.log("Here")} user={user} />
            ))
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
}

export default TeamReport;
