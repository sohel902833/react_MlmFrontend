import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosGet } from "../Components/ApiCall/axiosApi";

const AdminAuthContext = React.createContext();
export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
export const AdminAuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentAdmin, setcurrentAdmin] = useState({});
  const history = useHistory();
  useEffect(() => {
    getAdmin();
  }, []);

  async function getAdmin() {
    try {
      setLoading(true);
      let res = await axiosGet("admin", localStorage.getItem("admin-token"));
      if (res.status === 201) {
        setcurrentAdmin(res.data);
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
    setcurrentAdmin({});
    localStorage.removeItem("admin-token");
    history.push("/admin-login");
  }

  const value = {
    currentAdmin,
    logout,
    getAdmin,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};
