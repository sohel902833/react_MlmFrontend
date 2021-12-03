import { Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { axiosGet } from "../../ApiCall/axiosApi";
import AdminLayout from "../../Layout/AdminLayout";
import Loader from "../../Layout/Loader";
function SigleUser() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getUser();
  }, []);

  const { userId } = useParams();

  const getUser = async () => {
    setLoading(true);
    const res = await axiosGet(
      `admin/user/${userId}`,
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setUser(res?.data);
    } else {
      alert(res?.data?.message);
    }
  };

  console.log(user);
  if (loading) return <Loader loading={loading} />;
  return (
    <AdminLayout>
      <div className="single_container">
        <div className="single_top">
          <center>
            <Typography variant="h5">Name: {user?.name}</Typography>
            <Typography variant="h6">UID: {user?.userId}</Typography>
            <Typography variant="h6">
              Balance: <b>{user?.balance} </b> USDT
            </Typography>
            <Typography variant="h6">
              Total Revenue: <b>{user?.totalRevenue} </b> USDT
            </Typography>
            <Typography variant="h6">
              Package:{" "}
              {user?.currentMembership?.levelName
                ? user?.currentMembership?.levelName
                : "Free"}
            </Typography>
            <Typography variant="h6">
              Referral Income: <b>{user?.referalIncome} </b> USDT
            </Typography>{" "}
            <Typography variant="h6">
              Team Work Income: <b>{user?.teamWorkIncome} </b> USDT
            </Typography>
            <Typography variant="h6">
              Task Revenue: <b>{user?.taskRevenue} </b> USDT
            </Typography>
          </center>
        </div>
        <br />
        <hr />
        <br />
      </div>
      <Typography variant="h4">Earning History: </Typography>
      <br />
      <div className="table-responsive table-bordered ">
        <table className="table  table-striped table-bordered">
          <thead
            className="text-center"
            style={{ backgroundColor: `#00C972`, color: `#fff` }}
          >
            <th>Sl</th>
            <th>Amount</th>
            <th>Earn Form</th>
            <th>Time</th>
          </thead>
          <tbody className="text-left">
            {user?.earningHistory?.map((data, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{data?.amount}</td>
                <td>{data?.text}</td>
                <td>{data?.joiningDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default SigleUser;
