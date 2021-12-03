import React from "react";
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { axiosPost } from "../../ApiCall/axiosApi";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./forget.css";
function ForgetPassword() {
  const [email, setEmail] = React.useState("");
  const [secretCode, setSecretCode] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  const withdrawHandler = async () => {
    console.log({ email, secretCode, newPassword, confirmNewPassword });
    console.log(email && secretCode && newPassword && confirmNewPassword);
    if (email && secretCode && newPassword && confirmNewPassword) {
      console.log(newPassword === confirmNewPassword);
      if (newPassword === confirmNewPassword) {
        setLoading(true);
        const res = await axiosPost(
          "user/forget-password",
          localStorage.getItem("token"),
          {
            phone: email,
            secretCode,
            newPassword,
          }
        );
        setLoading(false);
        if (res.status === 201) {
          setError("");
          history.push("/login");
          alert(res?.data?.message);
        } else {
          setError(res?.data?.message);
        }
      } else {
        setError("Password Doesn't Matched.");
      }
    } else {
      setError("Enter All Required Input.");
    }
  };

  return (
    <MainLayout>
      <div className="withdraw_container">
        <AppBar title="Forget Password" backUrl="/login" />
        <div className="withdraw_body">
          <p>Email</p>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Or Phone"
            value={email}
          />

          <p>Memonic</p>
          <input
            type="text"
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Memonic"
            value={secretCode}
          />
          <p>New Password</p>
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            value={newPassword}
          />
          <p>Confirm New Password</p>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            value={confirmNewPassword}
          />
          <div className="withdraw">
            <p style={{ color: "red" }}>{error}</p>
            <BeatLoader loading={loading} />
            <button
              style={{ width: "200px" }}
              disabled={loading}
              onClick={() => withdrawHandler()}
            >
              Forget Password
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default ForgetPassword;
