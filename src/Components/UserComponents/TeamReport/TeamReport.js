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
    getUserGeneration();
  }, []);

  const getUserGeneration = async () => {
    setGen2View(false);
    setGen3View(false);
    setGen1View(true);
    setTitle("Team Report Generation 1");

    const res = await axiosGet(
      "user/generation",
      localStorage.getItem("token")
    );
    setLoading(false);
    if (res.status === 201) {
      setReferUserList(res?.data);
    }
  };

  const enableGen1 = () => {
    setGen1View(!gen1View);
    setGen2View(false);
    setGen3View(false);
  };

  const enableGen2 = () => {
    setGen1View(false);
    setGen2View(!gen2View);
    setGen3View(false);
  };
  const enableGen3 = () => {
    setGen1View(false);
    setGen2View(false);
    setGen3View(!gen3View);
  };

  return (
    <MainLayout>
      <div className="team_report_container">
        <AppBar title={title} backUrl="/" />
        <div className="team_report_body">
          <h4 style={{ cursor: "pointer" }} onClick={() => enableGen1()}>
            Generation 1
          </h4>
          {loading ? (
            <BeatLoader loading={loading} />
          ) : gen1View ? (
            referUserList?.firstGen?.map((user) => <TeamItem user={user} />)
          ) : null}
          <h4 onClick={() => enableGen2()} style={{ cursor: "pointer" }}>
            Generation 2
          </h4>
          {loading ? (
            <BeatLoader loading={loading} />
          ) : gen2View ? (
            referUserList?.secondGen?.map((user) => <TeamItem user={user} />)
          ) : null}
          <h4 onClick={() => enableGen3()} style={{ cursor: "pointer" }}>
            Generation 3
          </h4>
          {loading ? (
            <BeatLoader loading={loading} />
          ) : gen3View ? (
            referUserList?.thirdGen?.map((user) => <TeamItem user={user} />)
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
}

export default TeamReport;
