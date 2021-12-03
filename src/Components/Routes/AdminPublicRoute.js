import _ from "lodash";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminContext";
const AdminPublicRoute = ({ component: Component, ...rest }) => {
  const { currentAdmin } = useAdminAuth();
  const token = localStorage.getItem("admin-token");
  return _.isEmpty(currentAdmin) || !token ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to="/admin" />
  );
};

export default AdminPublicRoute;
