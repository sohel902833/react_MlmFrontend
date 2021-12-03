import React from "react";
import { Link } from "react-router-dom";
import "./message.css";
function ConversationItem({ conversation }) {
  return (
    <Link
      to={{
        pathname: `/admin/message/${conversation?.userId}`,
        state: {
          conversation,
        },
      }}
    >
      <div className="conversation_item">
        <h2>{conversation?.name}</h2>
        <h3>{conversation?.phone}</h3>
        <h4>User Id: {conversation?.userId}</h4>
      </div>
    </Link>
  );
}

export default ConversationItem;
