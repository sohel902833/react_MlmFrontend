import { CloseOutlined } from "@material-ui/icons";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { copy } from "../../lib/copyContent";
import "./withdraw.css";
function ShowMemonicDialog({ setOpen }) {
  const { currentUser } = useAuth();

  const copySecretCode = async () => {
    copy(currentUser?.secretCode);
    setOpen(false);
  };

  return (
    <div className="withdraw_modal_container">
      <div onClick={() => setOpen(false)} className="modal_close">
        <CloseOutlined />
      </div>
      <div className="modal_body">
        <h5>Memonic Code : {currentUser?.secretCode}</h5>

        <button onClick={() => copySecretCode()} className="full_width_btn">
          Copy
        </button>
      </div>
    </div>
  );
}

export default ShowMemonicDialog;
