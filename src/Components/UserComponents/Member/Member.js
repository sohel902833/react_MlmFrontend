import React from "react";
import { useAuth } from "../../../context/AuthContext";
import bgImg from "../../../images/bg.jpg";
import { axiosGet } from "../../ApiCall/axiosApi";
import Loader from "../Loader";
import "./member.css";
import Membershipitem from "./Membershipitem";
function Member() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [membershipList, setMembershipList] = React.useState([]);

  React.useEffect(() => {
    getMembershipList();
  }, []);
  const getMembershipList = async () => {
    setLoading(true);
    const res = await axiosGet(
      "user/membership-list",
      localStorage.getItem("token")
    );
    setLoading(false);
    if (res.status === 201) {
      setMembershipList(res.data.membership);
    }
  };

  if (loading) return <Loader loading={loading} />;
  return (
    <div className="member_container">
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className="member_header"
      ></div>
      <div className="member_details">
        <div className="membership_details_card">
          <h4>
            {currentUser?.currentMembership?.levelName
              ? `${currentUser?.currentMembership?.levelName} : ${currentUser?.currentMembership?.price} BDT`
              : "Free : 0 BDT"}
          </h4>
          <p>
            {currentUser?.currentMembership?.monthlyIncome
              ? `Monthly Income :  ${currentUser?.currentMembership?.monthlyIncome} BDT`
              : "Monthly Income : 0 BDT"}
          </p>
          <p>
            {currentUser?.currentMembership?.numOfJobs
              ? `Number Of Jobs Per Day :${currentUser?.currentMembership?.numOfJobs}`
              : "Number Of Jobs Per Day: 0"}
          </p>
          <p>
            {currentUser?.currentMembership?.validityDay
              ? `Validity Period Day : ${currentUser?.currentMembership?.validityDay}`
              : "Validity Period Day : 0"}
          </p>
        </div>
        <div className="membership_lists2">
          {membershipList.map((membership) => (
            <Membershipitem membership={membership} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Member;
