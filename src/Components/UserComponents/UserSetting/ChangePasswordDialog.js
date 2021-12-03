import { CloseOutlined } from "@material-ui/icons";
import React from "react";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import { axiosPut } from "../../ApiCall/axiosApi";
import "./withdraw.css";

function ChangePasswordDialog({ setOpen }) {
  const { currentUser, getUser } = useAuth();
  const [newPassword, setNewPassword] = React.useState();
  const [memonic, setMemonic] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const updateWithdrawAddress = async () => {
    if (newPassword && memonic) {
      setLoading(true);
      const res = await axiosPut(
        "user/password",
        localStorage.getItem("token"),
        {
          secretCode: memonic,
          newPassword,
        }
      );
      setLoading(false);
      if (res?.status === 201) {
        setError("");
        alert(res?.data?.message);
      } else {
        setError(res?.data?.message);
      }
    } else {
      setError("Enter New Password And Memonic");
    }
  };
  return (
    <div className="withdraw_modal_container">
      <div onClick={() => setOpen(false)} className="modal_close">
        <CloseOutlined />
      </div>
      <div className="modal_body">
        <h5>Change Password</h5>
        <p>New Password</p>
        <input
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <p>Memonic Code</p>
        <input
          type="text"
          value={memonic}
          onChange={(e) => setMemonic(e.target.value)}
          placeholder="Memonic"
        />
        <p style={{ color: "red" }}>{error}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <BeatLoader loading={loading} />
        </div>

        <button
          onClick={() => updateWithdrawAddress()}
          disabled={loading}
          className="full_width_btn"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default ChangePasswordDialog;
