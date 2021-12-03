import React from "react";
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import qrImg from "../../../images/qr.png";
import { axiosPut } from "../../ApiCall/axiosApi";
import { copy } from "../../lib/copyContent";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./purchase.css";
function PurchasePackage() {
  const history = useHistory();
  const { location } = history;
  const { state } = location;
  const price = state?.price;
  const membershipId = state?.membershipId;
  const [trxId, setTrxId] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(new Date().getTime());
  const { appSetting } = useAuth();
  React.useEffect(() => {
    if (price && membershipId) {
      console.log({
        price,
        membershipId,
      });
    } else {
      history.push("/");
    }
  }, []);

  const requestPurchase = async () => {
    if (trxId) {
      const purchase = {
        membershipId,
        orderNumber,
        trxNumber: trxId,
      };
      setLoading(true);
      const res = await axiosPut(
        "user/package",
        localStorage.getItem("token"),
        purchase
      );
      setLoading(false);
      if (res.status === 201) {
        setError("");
        setTrxId("");
        alert(res?.data.message);
        history.push("/");
      } else {
        setError(res?.data?.message);
      }
    } else {
      setError("Please Enter TXID Id");
    }
  };

  return (
    <MainLayout>
      <div className="purchase_container">
        <AppBar title="Recharge" backUrl="/" />
        <div className="purchase_body">
          <p>Currency</p>
          <h3>USDT</h3>
          <br />
          <p>Chain Name</p>
          <button className="chain_name_btn">TRC20</button>
          <div className="purchase_center">
            <img src={qrImg} alt="" />
            <p>Recharge Address</p>
            <h3>{appSetting?.rechargeAddress}</h3>
            <button
              onClick={() => copy(appSetting?.rechargeAddress)}
              className="copy_address_btn"
            >
              Copy Address
            </button>
          </div>
          <button className="full_width_btn">
            Recommended USDT currency Exchange App
          </button>
          <br />
          <p className="margin_bottom">Order Number</p>
          <h3 className="margin_bottom">{orderNumber}</h3>
          <p>USDT</p>
          <h3 className="margin_bottom">{price}</h3>
          <p>Note</p>
          <input
            type="text"
            onChange={(e) => setTrxId(e.target.value)}
            placeholder="Please Enter The Last 4 Difit OF TXID"
            value={trxId}
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
            onClick={() => requestPurchase()}
            disabled={loading}
            className="full_width_btn"
          >
            Submit
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default PurchasePackage;
