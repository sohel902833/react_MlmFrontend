import _ from "lodash";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminContext";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const { currentAdmin } = useAdminAuth();
  const token = localStorage.getItem("admin-token");
  if (!_.isEmpty(currentAdmin) && token) {
    return <Route {...rest}>{(props) => <Component {...props} />}</Route>;
  } else {
    return <Redirect to="/admin-login" />;
  }
};

export default AdminPrivateRoute;
