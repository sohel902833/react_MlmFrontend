import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosGet } from "../Components/ApiCall/axiosApi";

const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setcurrentUser] = useState({});
  const [appSetting, setAppSetting] = useState({});
  const history = useHistory();
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      setLoading(true);
      let res = await axiosGet("user", localStorage.getItem("token"));
      console.log(res);
      if (res.status == "201") {
        setcurrentUser(res.data);
        getSetting();
      } else {
        setLoading(false);
        if (res.status === 404) {
          logout();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getSetting() {
    try {
      let res = await axiosGet("user/setting", localStorage.getItem("token"));
      if (res.status == "201") {
        setAppSetting(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        if (res.status === 404) {
          logout();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  //logout function
  function logout() {
    setcurrentUser({});
    localStorage.removeItem("token");
    history.push("/login");
  }

  const value = {
    currentUser,
    logout,
    getUser,
    appSetting,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
