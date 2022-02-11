import { CloseOutlined } from "@material-ui/icons";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import "./alert.css";
function ShowAlertDialog({ setOpen, setting }) {
  const { currentUser } = useAuth();

  return (
    <div className="withdraw_modal_container">
      <div onClick={() => setOpen(false)} className="modal_close">
        <CloseOutlined />
      </div>
      <div className="modal_body">
        <div className="modal_content">
          <h5>{setting?.alertMessage}</h5>
        </div>

        <button onClick={() => setOpen(false)} className="full_width_btn">
          Ok
        </button>
      </div>
    </div>
  );
}

export default ShowAlertDialog;
