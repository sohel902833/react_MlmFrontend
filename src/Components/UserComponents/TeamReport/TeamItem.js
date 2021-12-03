import React from "react";
import "./team.css";
function TeamItem({ user, getUser }) {
  return (
    <div
      onClick={() => getUser(user?.myReferCode)}
      key={user?.userId}
      className="refer_user_item"
    >
      <h5>
        Name: *****
        {user?.name?.substring(user?.name.length - 5, user?.name?.length)}
      </h5>
      <p>
        *******
        {user?.phone?.substring(user?.phone.length - 6, user?.phone?.length)}
      </p>
      <p>Invite Code: {user?.referCode}</p>
      <p>User Refer Code: {user?.myReferCode}</p>
      <p>
        Package Name :<span style={{ color: "red" }}> {user?.levelName}</span>
      </p>
    </div>
  );
}

export default TeamItem;
