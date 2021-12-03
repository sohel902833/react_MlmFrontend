import React from "react";
import { useAuth } from "../../../context/AuthContext";
import "./order.css";
import OrderTabs from "./OrderTabs";

function Order() {
  const { currentUser: user } = useAuth();
  return (
    <div className="order_container">
      <div className="order_dashboard">
        <h3>Task Record</h3>
        <h4>
          Available Opportunities:{" "}
          {user?.currentMembership?.numOfJobs > 0
            ? parseInt(user?.currentMembership?.numOfJobs) -
              parseInt(user?.todayDone)
            : 0}
        </h4>
      </div>
      <OrderTabs />
    </div>
  );
}

export default Order;
