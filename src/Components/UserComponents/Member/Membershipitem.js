import React from "react";
import { Link } from "react-router-dom";
import profileImg from "../../../images/profile.png";
import "./member.css";
function Membershipitem({ membership }) {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={{
        pathname: `/purchase-package`,
        state: {
          price: membership?.price,
          membershipId: membership?.levelId,
        },
      }}
    >
      <div className="membership_item2" style={{ cursor: "pointer" }}>
        <div className="m_left">
          <img
            src={membership?.imageUrl ? membership?.imageUrl : profileImg}
            alt=""
          />
        </div>
        <div className="m_right">
          <h4>
            {membership?.levelName} : {membership?.price} BDT
          </h4>
          <p>Number of jobs per day: {membership?.numOfJobs}</p>
          <p>Monthly Income: {membership?.monthlyIncome} BDT</p>
          <p>Validity Period Day: {membership?.validityDay} BDT</p>
        </div>
      </div>
    </Link>
  );
}

export default Membershipitem;
