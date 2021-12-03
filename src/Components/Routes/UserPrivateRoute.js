import _ from "lodash";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const UserPrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");
  if (!_.isEmpty(currentUser) && token) {
    return <Route {...rest}>{(props) => <Component {...props} />}</Route>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default UserPrivateRoute;
