import React from "react";
import { useHistory } from "react-router";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import { axiosPost } from "../../ApiCall/axiosApi";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./withdraw.css";
function UserWithdraw() {
  const [amount, setAmount] = React.useState("");
  const [secretCode, setSecretCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { getUser } = useAuth();
  const history = useHistory();
  const withdrawHandler = async () => {
    if (amount && secretCode) {
      setLoading(true);
      const res = await axiosPost(
        "user/withdraw",
        localStorage.getItem("token"),
        {
          secretCode,
          amount,
        }
      );
      setLoading(false);
      if (res.status === 201) {
        setError("");
        await getUser();
        history.push("/");
        alert(res?.data?.message);
      } else {
        setError(res?.data?.message);
      }
    } else {
      setError("Enter Amount And Memonic Code");
    }
  };

  return (
    <MainLayout>
      <div className="withdraw_container">
        <AppBar title="Withdraw" backUrl="/" />
        <div className="withdraw_body">
          <p>Amount</p>
          <input
            type="number"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Enter Amount"
            value={amount}
          />

          <p>Memonic</p>
          <input
            type="text"
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Memonic"
            value={secretCode}
          />
          <div className="withdraw">
            <p style={{ color: "red" }}>{error}</p>
            <BeatLoader loading={loading} />
            <button disabled={loading} onClick={() => withdrawHandler()}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserWithdraw;
