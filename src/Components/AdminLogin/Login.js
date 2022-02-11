import React from "react";
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useAdminAuth } from "../../context/AdminContext";
import { axiosPost } from "../ApiCall/axiosApi";
import styles from "./Login.module.css";
const Login = () => {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { getAdmin } = useAdminAuth();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!phone && !password) {
      let err = {};
      if (!phone) err.phone = "Enter Your Phone";
      if (!password) err.password = "Enter Your Password";
      setError(err);
    } else {
      setLoading(true);
      const res = await axiosPost("admin/login", "", {
        email: phone,
        password,
      });
      console.log(res);
      if (res.status === 201) {
        localStorage.setItem("admin-token", res.data.token);
        await getAdmin();
        setError({});
        setLoading(false);
        history.push("/admin");
      } else {
        if (res?.data?.message) {
          setError({ ...error, message: res.data.message });
        }
        setLoading(false);
        console.log(res);
      }
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_items}>
        <form
          onSubmit={(e) => submitHandler(e)}
          action=""
          className={styles.box}
        >
          <h1>Login</h1>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            name=""
            placeholder="Phone Or Email"
          />
          {error?.phone && <p className="error">{error.phone}</p>}
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            name=""
            placeholder="Password"
          />
          {error?.password && <p className="error">{error.password}</p>}
          {error?.message && <p className="error">{error.message}</p>}
          <BeatLoader loading={loading} />
          <br />
          <input disabled={loading} type="submit" name="" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;
