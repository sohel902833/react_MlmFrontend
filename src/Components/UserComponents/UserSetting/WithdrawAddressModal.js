import { CloseOutlined } from "@material-ui/icons";
import React from "react";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import { axiosPost } from "../../ApiCall/axiosApi";
import "./withdraw.css";

function WithdrawAddressModal({ setOpen }) {
  const { currentUser, getUser } = useAuth();
  const [withdrawAddress, setWithdrawAddress] = React.useState(
    currentUser?.withdrawAddress === "none" ? "" : currentUser?.withdrawAddress
  );
  const [memonic, setMemonic] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const updateWithdrawAddress = async () => {
    if (withdrawAddress && memonic) {
      setLoading(true);
      const res = await axiosPost(
        "user/withdraw-address",
        localStorage.getItem("token"),
        {
          secretCode: memonic,
          withdrawAddress,
        }
      );
      setLoading(false);
      if (res?.status === 201) {
        await getUser();
        setError("");
        alert(res?.data?.message);
      } else {
        setError(res?.data?.message);
      }
    } else {
      setError("Enter Withdraw Address And Memonic");
    }
  };
  return (
    <div className="withdraw_modal_container">
      <div onClick={() => setOpen(false)} className="modal_close">
        <CloseOutlined />
      </div>
      <div className="modal_body">
        <h5>Setup Withdraw Address</h5>
        <p>Withdraw Address</p>
        <input
          type="text"
          value={withdrawAddress}
          onChange={(e) => setWithdrawAddress(e.target.value)}
          placeholder="Withdraw Address"
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

export default WithdrawAddressModal;
