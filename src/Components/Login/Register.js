import React from "react";
import { Link, useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../context/AuthContext";
import { axiosPost } from "../ApiCall/axiosApi";
const Register = (props) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let refCode = params.get("referCode");

  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [secretCode, setSecretCode] = React.useState("");
  const [referCode, setReferCode] = React.useState(refCode ? refCode : "");

  const [error, setError] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { getUser } = useAuth();
  const history = useHistory();
  const submitHandler = async (e) => {
    if (!phone || !password || !confirmPassword || !name || !secretCode) {
      let err = {};
      if (!phone) err.phone = "Enter Your Phone";
      if (!password) err.password = "Enter Your Password";
      if (!confirmPassword) err.confirmPassword = "Confirm Your  Password";
      if (!name) err.name = "Enter Your  Name";
      if (!secretCode) err.secretCode = "Enter Your  Secret Code";
      setError(err);
    } else {
      setError({});
      setLoading(true);
      if (password === confirmPassword) {
        const res = await axiosPost("user/signup", "", {
          phone,
          password,
          name,
          secretCode,
          referCode,
        });

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
      } else {
        let err = {};
        err.password = "Password Doesn't Matched.";
        setError(err);
      }
    }
  };

  return (
    <div className="login_container">
      <div className="register_text">
        <h2>Registered</h2>
      </div>

      <div className="login_items">
        <p>Full Name</p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          value={name}
        />
        {error?.name && <p className="error">{error.name}</p>}

        <p>Phone Number Or Email</p>
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Phone Or Email"
          value={phone}
        />
        {error?.phone && <p className="error">{error.phone}</p>}
        <p>4 Digit Code</p>
        <input
          type="number"
          onChange={(e) => setSecretCode(e.target.value)}
          placeholder="Memonic Code"
          value={secretCode}
        />
        {error?.secretCode && <p className="error">{error.secretCode}</p>}
        <p>Password</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
        />
        {error?.password && <p className="error">{error.password}</p>}
        <p>Confirm Password</p>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          value={confirmPassword}
        />
        {error?.confirmPassword && (
          <p className="error">{error.confirmPassword}</p>
        )}
        <p>Invite Code</p>
        <input
          type="number"
          onChange={(e) => setReferCode(e.target.value)}
          placeholder="Invite Code"
          value={referCode}
        />
        {error?.referCode && <p className="error">{error.referCode}</p>}

        {error?.message && <p className="error">{error.message}</p>}
        <div className="login_setting">
          <div className="forget_password">
            <p>Already Have An Account?</p>
          </div>
          <div className="register">
            <p>
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
        <div className="login">
          <BeatLoader loading={loading} />
          <button disabled={loading} onClick={() => submitHandler()}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
