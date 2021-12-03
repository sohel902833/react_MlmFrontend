import React from "react";
import { BeatLoader } from "react-spinners";
import useConversationList from "../../../hooks/useConversationList";
import ConversationItem from "./ConversationItem";
function Conversation() {
  const { loading, conversationList } = useConversationList();
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BeatLoader loading={loading} />
      </div>
    );
  }
  return (
    <>
      {conversationList.map((conversation) => (
        <ConversationItem conversation={conversation} />
      ))}
    </>
  );
}

export default Conversation;
