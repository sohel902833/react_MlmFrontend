import React from "react";
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import bkashImage from "../../../images/bkash.png";
import nagadImage from "../../../images/nagad.png";
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
  const [paymentMethod, setPaymentMethod] = React.useState("");
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
        paymentMethod
      };
      setLoading(true);
      const res = await axiosPut(
        "user/package",
        localStorage.getItem("token"),
        purchase
      );
      setLoading(false);
      if (res.status=== 201) {
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
          <h3>BDT</h3>
          <br />
          <div className="purchase_center">

            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

              <img style={{maxWidth:"200px"}} src={bkashImage} alt="" />
              <img style={{maxWidth:"160px",height:"150px",marginLeft:"20px"}} src={nagadImage} alt="" />
            </div>
            <br/>
            <br/>
            <br/>
            <p>Recharge Address</p>
            <h3>{appSetting?.rechargeAddress}</h3>
            <button
              onClick={() => copy(appSetting?.rechargeAddress)}
              className="copy_address_btn"
            >
              Copy Address
            </button>
          </div>
         
          <br />
          <p className="margin_bottom">Order Number</p>
          <h3 className="margin_bottom">{orderNumber}</h3>
          <p>BDT</p>
          <h3 className="margin_bottom">{price}</h3>
          <p>Trx Id</p>
          <input
            type="text"
            onChange={(e) => setTrxId(e.target.value)}
            placeholder="Please Enter TXID"
            value={trxId}
          /> 
          <br/>
          <h6>Enter Payment Method (Bkash Or Nagad)</h6>
           <input
            type="text"
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="Enter Payment Method"
            value={paymentMethod}
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
