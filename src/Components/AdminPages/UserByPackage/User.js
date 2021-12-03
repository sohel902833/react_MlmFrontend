import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { axiosDelete, axiosPut } from "../../ApiCall/axiosApi";
const User = ({ user: propUser, fetchUsers, levelName }) => {
  const [user, setUser] = React.useState(propUser);
  const [loading, setLoading] = React.useState(false);
  const [balance, setBalance] = React.useState(user?.balance);
  const [name, setName] = React.useState(user?.name);
  const [show, setShow] = React.useState(false);
  const history = useHistory();
  const deleteUser = async () => {
    if (window.confirm("Are you Want To Sure Delete This User")) {
      setLoading(true);
      const res = await axiosDelete(
        `admin/user/${user?.userId}`,
        localStorage.getItem("admin-token")
      );
      setLoading(false);
      alert(res?.data?.message);
    } else {
    }
  };

  const updateUser = async () => {
    setLoading(true);
    const res = await axiosPut(
      `admin/user/${user?.userId}`,
      localStorage.getItem("admin-token"),
      {
        name,
        balance,
      }
    );
    setLoading(false);
    if (res.status === 201) {
      setUser({
        ...user,
        balance,
        name,
      });
    }
    alert(res?.data?.message);
  };
  const navigateUser = () => {
    history.push(`/admin/user/${user?.userId}`);
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <Card elevation={1}>
        <CardHeader
          //   avatar={<Person aria-label="recipe">R</Person>}
          action={
            <IconButton aria-label="settings">
              <DeleteOutlined onClick={() => deleteUser()} />
              <EditOutlined
                onClick={() => setShow(!show)}
                style={{ marginLeft: "10px" }}
              />
            </IconButton>
          }
          title={user.name}
          subheader={user.phone}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary">
            Balance: {user.balance}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            UID :<span style={{ color: "green" }}>{user.userId}</span>
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Crrent Level :<span style={{ color: "red" }}>{levelName}</span>
          </Typography>
          <button
            style={{ width: "200px", borderRadius: "20px" }}
            onClick={navigateUser}
          >
            View Details
          </button>
        </CardContent>

        {show && (
          <div style={{ marginLeft: "25px" }}>
            <TextField
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              label="Balance"
              variant="outlined"
              color="secondary"
              required
              type="number"
            />
            <br />

            <br />

            <br />
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              variant="outlined"
              color="secondary"
              required
              type="text"
            />
            <br />
            <br />
            {loading ? (
              <BeatLoader loading={loading} />
            ) : (
              <Button
                onClick={() => updateUser()}
                style={{ marginBottom: "10px" }}
                color="secondary"
                variant="outlined"
                type="submit"
                endIcon={<EditOutlined />}
              >
                Update
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default User;
