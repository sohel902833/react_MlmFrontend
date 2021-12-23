import { Grid, MenuItem, Select, Typography } from "@material-ui/core";
import React, { useRef } from "react";
import { axiosGet } from "../../ApiCall/axiosApi";
import AdminLayout from "../../Layout/AdminLayout";
import Loader from "../../Layout/Loader";
import User from "./User";
import "./user.css";
function Usersbypackage() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [selectedPackageId, setSelectedPackageId] = React.useState();
  const [packageName, setPackageName] = React.useState();
  const inputRef = useRef(null);
  const [membershipList, setMembershipList] = React.useState([]);

  React.useEffect(() => {
    getMembershipList();
  }, []);

  const getMembershipList = async () => {
    setLoading(true);
    const res = await axiosGet(
      `admin/membership`,
      localStorage.getItem("admin-token")
    );
    if (res.status === 201) {
      setMembershipList(res.data.membership);
      if (res?.data?.membership?.length > 0) {
        const mem = res?.data?.membership[0];
        setSelectedPackageId(mem?.levelId);
        setPackageName(mem?.levelName);

        getUsers(mem?.levelId);
      }
    } else {
      setLoading(false);
    }
  };

  const changePackageId = (id) => {
    setSelectedPackageId(id);
    if (id === "free") {
      setPackageName("Free");
    } else {
      const filteredMembership = membershipList?.filter(
        (m) => m.levelId === id
      );
      if (filteredMembership.length > 0) {
        setPackageName(filteredMembership[0].levelName);
      }
    }

    getUsers(id);
  };

  const getUsers = async (id) => {
    setLoading(true);
    const res = await axiosGet(
      `admin/users/package/${id}`,
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setUsers([]);
      setUsers((prevUser) => {
        return res.data.user;
      });
      console.log(res?.data.user);
      console.log({ users });
    } else {
      alert("Setting Not Found.");
    }
  };
  if (loading) return <Loader loading={loading} />;
  return (
    <AdminLayout>
      <Typography variant="h5">
        Total Users In (<span style={{ color: "green" }}>{packageName})</span>:{" "}
        {users.length}
      </Typography>
      <div style={{ display: "flex" }}>
        <Typography style={{ marginRight: "20px" }} variant="h5">
          Select Membership:
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="Select Membership"
          onChange={(e) => changePackageId(e.target.value)}
          label="Task For"
        >
          {membershipList.map((member) => (
            <MenuItem value={member?.levelId}>{member?.levelName}</MenuItem>
          ))}
        </Select>
      </div>
      <br />
      <hr />
      <Grid container spacing={5}>
        {users?.map((user) => (
          <Grid item xs={12} sm={6} md={4}>
            <User user={user} levelName={packageName} />
          </Grid>
        ))}
      </Grid>
    </AdminLayout>
  );
}

export default Usersbypackage;
