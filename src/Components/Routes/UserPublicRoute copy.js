import _ from "lodash";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const UserPublicRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");
  return _.isEmpty(currentUser) || !token ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to="/" />
  );
};

export default UserPublicRoute;
