import { ArrowForwardIosSharp } from "@material-ui/icons";
import React from "react";
import sunImg from "../../../images/sun.png";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ShowMemonicDialog from "./ShowMemonicDialog";
import "./usersetting.css";
import WithdrawAddressModal from "./WithdrawAddressModal";
function UserSetting() {
  const [withdrawModal, setWithdrawModal] = React.useState(false);
  const [changePasswordModal, setChangePasswordModal] = React.useState(false);
  const [showMemonicModal, setShowMemonicModal] = React.useState(false);

  return (
    <MainLayout>
      <div className="user_setting_container">
        <AppBar title="Setting" backUrl="/" />
        <div className="user_setting_top">
          <img src={sunImg} alt="" />
          <h4>Set up</h4>
        </div>
        <div className="user_setting_body">
          <div
            onClick={() => setWithdrawModal(true)}
            className="setting_option_item"
          >
            <h4>Withdraw Address</h4>
            <ArrowForwardIosSharp />
          </div>
          <div
            onClick={() => setChangePasswordModal(true)}
            className="setting_option_item"
          >
            <h4>Change Password</h4>
            <ArrowForwardIosSharp />
          </div>
          <div
            onClick={() => setShowMemonicModal(true)}
            className="setting_option_item"
          >
            <h4>Show Four Digit Code</h4>
            <ArrowForwardIosSharp />
          </div>
        </div>
        {withdrawModal && <WithdrawAddressModal setOpen={setWithdrawModal} />}
        {changePasswordModal && (
          <ChangePasswordDialog setOpen={setChangePasswordModal} />
        )}
        {showMemonicModal && (
          <ShowMemonicDialog setOpen={setShowMemonicModal} />
        )}
      </div>
    </MainLayout>
  );
}

export default UserSetting;
