import React, { useState } from "react";
import { axiosPost } from "../../ApiCall/axiosApi";
import AdminLayout from "../../Layout/AdminLayout";
import "./reset.css";
function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [email, setEmail] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const resetPassword = async () => {
    let err = {};
    if (newPassword && prevPassword && secretCode) {
      setError({});
      const res = await axiosPost(
        "admin/reset-admin",
        localStorage.getItem("admin-token"),
        {
          prevPassword: prevPassword,
          password: newPassword,
          secretCode,
          email,
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setError({ success: "Password Updated Successful" });
        setNewPassword("");
        setPrevPassword("");
        setEmail("");
        setSecretCode("");
      } else {
        setError({ message: res?.data?.message });
      }
    } else {
      if (!newPassword) err.newPassword = "Enter New Password";
      if (!prevPassword) err.prevPassword = "Enter Previous Password";
      if (!secretCode) err.secretCode = "Enter Security Code";
      setError(err);
    }
  };

  return (
    <AdminLayout>
      <div className="reset_container">
        <input
          onChange={(e) => setPrevPassword(e.target.value)}
          value={prevPassword}
          type="password"
          required
          placeholder="Previous Password"
          icon="search"
        />
        <p style={{ color: "red" }}>
          {error?.prevPassword ? error?.prevPassword : ""}
        </p>
        <input
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          type="password"
          required
          placeholder="New Password"
          icon="search"
        />
        <p style={{ color: "red" }}>
          {error?.newPassword ? error?.newPassword : ""}
        </p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          required
          placeholder="Email"
          icon="search"
        />
        <p style={{ color: "red" }}>{error?.email ? error?.email : ""}</p>
        <input
          onChange={(e) => setSecretCode(e.target.value)}
          value={secretCode}
          type="text"
          required
          placeholder="Secret Code"
          icon="search"
        />
        <p style={{ color: "red" }}>
          {error?.secretCode ? error?.secretCode : ""}
        </p>
        <p style={{ color: "red" }}>{error?.message ? error?.message : ""}</p>
        <p style={{ color: "green" }}>{error?.success ? error?.success : ""}</p>
        <button disabled={loading} onClick={(e) => resetPassword()}>
          Update
        </button>
      </div>
    </AdminLayout>
  );
}

export default ResetPassword;
