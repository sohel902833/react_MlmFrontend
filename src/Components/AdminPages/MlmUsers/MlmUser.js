import React from "react";
import { axiosGet } from "../../ApiCall/axiosApi";
import AdminLayout from "../../Layout/AdminLayout";
import Loader from "../../Layout/Loader";
import styles from "./Mlm.module.css";
import SingleMlmUser from "./SingleMlmUser";
function MlmUser() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [level1, setLevel1] = React.useState([]);
  const [level2, setLevel2] = React.useState([]);
  const [level3, setLevel3] = React.useState([]);
  const [level4, setLevel4] = React.useState([]);
  const [level5, setLevel5] = React.useState([]);
  const [level1Title, setLevel1Title] = React.useState("");
  const [level2Title, setLevel2Title] = React.useState("");
  const [level3Title, setLevel3Title] = React.useState("");
  const [level4Title, setLevel4Title] = React.useState("");
  const [level5Title, setLevel5Title] = React.useState("");

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const res = await axiosGet(
      "admin/mlm/users",
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setUsers(res.data.users);
    } else {
      alert("Setting Not Found.");
    }
  };
  const getLevel1 = async (referCode, title) => {
    setLoading(true);
    const res = await axiosGet(
      `admin/mlm/users?referCode=${referCode}`,
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setLevel1(res.data.users);
      setLevel2([]);
      setLevel2Title("");
      setLevel3([]);
      setLevel3Title("");
      setLevel4([]);
      setLevel4Title("");
      setLevel5([]);
      setLevel5Title("");
      setLevel1Title(title);
    } else {
      alert("Setting Not Found.");
    }
  };
  const getLevel2 = async (referCode, title) => {
    setLoading(true);
    const res = await axiosGet(
      `admin/mlm/users?referCode=${referCode}`,
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setLevel2(res.data.users);
      setLevel3([]);
      setLevel3Title("");
      setLevel4([]);
      setLevel4Title("");
      setLevel5([]);
      setLevel5Title("");
      setLevel2Title(title);
    } else {
      alert("Setting Not Found.");
    }
  };
  const getLevel3 = async (referCode, title) => {
    setLoading(true);
    const res = await axiosGet(
      `admin/mlm/users?referCode=${referCode}`,
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setLevel3(res.data.users);
      setLevel4([]);
      setLevel4Title("");
      setLevel5([]);
      setLevel5Title("");
      setLevel3Title(title);
    } else {
      alert("Setting Not Found.");
    }
  };
  const getLevel4 = async (referCode, title) => {
    setLoading(true);
    const res = await axiosGet(
      `admin/mlm/users?referCode=${referCode}`,
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setLevel4(res.data.users);
      setLevel5([]);
      setLevel5Title("");
      setLevel4Title(title);
    } else {
      alert("Setting Not Found.");
    }
  };
  const getLevel5 = async (referCode, title) => {
    setLoading(true);
    const res = await axiosGet(
      `admin/mlm/users?referCode=${referCode}`,
      localStorage.getItem("admin-token")
    );
    setLoading(false);
    if (res.status === 201) {
      setLevel5(res.data.users);
      setLevel5Title(title);
    } else {
      alert("Setting Not Found.");
    }
  };

  if (loading) return <Loader loading={loading} />;
  return (
    <AdminLayout>
      <div className={styles.mlm_container}>
        <div className={styles.mlm_item}>
          <center>
            <h2>All User</h2>
          </center>
          {users.map((user) => (
            <SingleMlmUser getLevel={getLevel1} user={user} />
          ))}
        </div>
        <div className={styles.mlm_item}>
          <center>
            <h5>
              Level 1 User {level1Title ? level1Title : "(Select An User)"}
            </h5>
          </center>
          {level1.map((user) => (
            <SingleMlmUser getLevel={getLevel2} user={user} />
          ))}
        </div>
        <div className={styles.mlm_item}>
          <center>
            <h5>
              Level 2 User {level2Title ? level2Title : "(Select An User)"}
            </h5>
          </center>
          {level2.map((user) => (
            <SingleMlmUser getLevel={getLevel3} user={user} />
          ))}
        </div>
        <div className={styles.mlm_item}>
          <center>
            <h5>
              Level 3 User {level3Title ? level3Title : "(Select An User)"}
            </h5>
          </center>
          {level3.map((user) => (
            <SingleMlmUser getLevel={getLevel4} user={user} />
          ))}
        </div>
        <div className={styles.mlm_item}>
          <center>
            <h5>
              Level 4 User {level4Title ? level4Title : "(Select An User)"}
            </h5>
          </center>
          {level4.map((user) => (
            <SingleMlmUser getLevel={getLevel5} user={user} />
          ))}
        </div>
        <div className={styles.mlm_item}>
          <center>
            <h5>
              Level 5 User {level5Title ? level5Title : "(Select An User)"}
            </h5>
          </center>
          {level5.map((user) => (
            <SingleMlmUser getLevel={() => {}} user={user} />
          ))}
        </div>
      </div>
    </AdminLayout>
    // <AdminLayout>
    //   <div className={styles.mlm_container}>
    //     <div className={styles.mlm_item}>
    //       <SingleMlmUser />
    //     </div>
    //     <div className={styles.mlm_item}>
    //       <SingleMlmUser />
    //     </div>
    //     <div className={styles.mlm_item}>
    //       <SingleMlmUser />
    //     </div>
    //     <div className={styles.mlm_item}>
    //       <SingleMlmUser />
    //     </div>
    //     <div className={styles.mlm_item}>
    //       <SingleMlmUser />
    //     </div>
    //   </div>
    // </AdminLayout>
  );
}

export default MlmUser;
