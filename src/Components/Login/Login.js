import React from "react";
import { Link, useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../context/AuthContext";
import bgImg from "../../images/bg.jpg";
import sunImg from "../../images/sun.png";
import { axiosPost } from "../ApiCall/axiosApi";
import "./log.css";

const Login = () => {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const { getUser } = useAuth();
  const history = useHistory();
  const submitHandler = async (e) => {
    if (!phone && !password) {
      let err = {};
      if (!phone) err.phone = "Enter Your Phone";
      if (!password) err.password = "Enter Your Password";
      setError(err);
    } else {
      setLoading(true);
      const res = await axiosPost("user/login", "", {
        phone,
        password,
      });
      console.log(res);
      if (res.status === 201) {
        localStorage.setItem("token", res?.data?.token);
        await getUser();
        setLoading(false);
        history.push("/");
      } else {
        setLoading(false);
        setError({});
        if (res?.data?.message) {
          let err = {};
          err.message = res.data.message;
          setError(err);
        }
        if (res?.data?.errors) {
          setError(res.data.errors);
        }
      }
    }
  };

  return (
    <div className="login_container">
      <div
        className="login_topbar"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <img src={sunImg} alt="" />
        <h2>LIKE</h2>
      </div>
      <div className="login_items">
        <p>Account Number Or Email</p>
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Phone Or Email"
          value={phone}
        />
        {error?.phone && <p className="error">{error.phone}</p>}
        <p>Password</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
        />
        {error?.password && <p className="error">{error.password}</p>}
        {error?.message && <p className="error">{error.message}</p>}
        <div className="login_setting">
          <div className="forget_password">
            <p
              onClick={() => history.push("/forget-password")}
              style={{ cursor: "pointer" }}
            >
              Forget Password
            </p>
          </div>
          <div className="register">
            <p>
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
        <div className="login">
          <BeatLoader loading={loading} />
          <button disabled={loading} onClick={() => submitHandler()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
