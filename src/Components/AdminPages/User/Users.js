import { Grid, Typography } from "@material-ui/core";
import React, { useRef } from "react";
import { axiosGet } from "../../ApiCall/axiosApi";
import Loader from "../../Layout/Loader";
import User from "./User";
import "./user.css";
function Users() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const inputRef = useRef(null);

  React.useEffect(() => {
    getUsers();
  }, []);

  const changeValue = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (text) {
      const newUser = users.filter((user) => {
        const userId = "" + user?.userId;
        if (userId.search(text) === 0) {
          return true;
        }
        // if (user?.phone?.includes(text) || userId.includes(text)) {
        //   return user;
        // }
      });
      if (newUser.length > 0) {
        setUsers(newUser);
      }
    } else {
      getUsers();
    }
  };

  const getUsers = async () => {
    setLoading(true);
    const res = await axiosGet(
      "admin/users",
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setUsers(res.data.users);
    } else {
      alert("Setting Not Found.");
    }
  };

  const searchUsers = async () => {
    if (searchText) {
      setLoading(true);
      const res = await axiosGet(
        `admin/user/search/${searchText}`,
        localStorage.getItem("admin-token")
      );
      setLoading(false);
      if (res.status === 201) {
        setUsers([]);
        setUsers((p) => res.data?.users);
      }
    }
  };

  if (loading) return <Loader loading={loading} />;
  return (
    <>
      <div>
        <input
          ref={inputRef}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          required
          placeholder="Search User Email,Phone,UID"
          icon="search"
        />
        <button onClick={() => searchUsers()}>Search</button>
        <button onClick={() => getUsers()}>Refresh</button>
      </div>

      <br />
      <hr />
      <br />
      <Typography variant="h3">Total Users: {users.length}</Typography>

      <Grid container spacing={5}>
        {users?.map((user) => (
          <Grid item xs={12} sm={6} md={4}>
            <User user={user} />
          </Grid>
        ))}
      </Grid>

      {!loading && users.length === 0 && <div>No Data Found!</div>}
    </>
  );
}

export default Users;
