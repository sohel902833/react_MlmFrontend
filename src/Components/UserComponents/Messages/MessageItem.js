import React from "react";
import "./message.css";
function MessageItem({ message }) {
  return (
    <div
      className={`${
        message?.sender === "admin"
          ? "user_receive_message"
          : "user_send_message"
      }`}
    >
      <div className="user_message_item_container">
        {message?.message === "" ? null : <h2>{message?.message}</h2>}
        {message?.messageType === "image" ? (
          <img
            style={{ width: "40%", height: "400px" }}
            src={message?.imageUrl}
            alt=""
          />
        ) : null}
        <p>{message?.time}</p>
      </div>
    </div>
  );
}

export default MessageItem;
