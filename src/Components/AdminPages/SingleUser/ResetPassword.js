import React, { useState } from "react";
import { axiosPut } from "../../ApiCall/axiosApi";
import "./reset.css";
function ResetPassword({ userId, getUser }) {
  const [newPassword, setNewPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const resetPassword = async () => {
    let err = {};
    if (newPassword || secretCode || name || balance) {
      setError({});
      const res = await axiosPut(
        "admin/user/change/password",
        localStorage.getItem("admin-token"),
        {
          newPassword,
          secretCode,
          userId,
          balance,
          name,
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setError({ success: "User Updated Successful" });
        setNewPassword("");
        setSecretCode("");
        await getUser();
      } else {
        setError({ message: res?.data?.message });
      }
    } else {
      if (!newPassword) err.newPassword = "Enter New Password";
      if (!secretCode) err.secretCode = "Enter Security Code";
      if (!balance) err.balance = "Enter Balance";
      if (!name) err.name = "Enter Name";
    }
  };

  return (
    <div className="reset_container">
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
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        required
        placeholder="Name"
        icon="search"
      />
      <p style={{ color: "red" }}>{error?.name ? error?.name : ""}</p>
      <input
        onChange={(e) => setBalance(e.target.value)}
        value={balance}
        type="number"
        required
        placeholder="Balance"
        icon="search"
      />
      <p style={{ color: "red" }}>{error?.balance ? error?.balance : ""}</p>
      <p style={{ color: "red" }}>{error?.message ? error?.message : ""}</p>
      <p style={{ color: "green" }}>{error?.success ? error?.success : ""}</p>

      <button disabled={loading} onClick={(e) => resetPassword()}>
        Update
      </button>
    </div>
  );
}

export default ResetPassword;
