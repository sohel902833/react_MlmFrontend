import {
  AddCircleOutline,
  CloseRounded,
  DeleteOutline,
  SendOutlined,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { getDatabase, ref, remove, update } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useMessageList from "../../../hooks/useMessageList";
import useNewMessageList from "../../../hooks/useNewMessage";
import AdminLayout from "../../Layout/AdminLayout";
import Conversation from "./Conversation";
import "./message.css";
import MessageItem from "./MessageItem";

function Message() {
  const conversationRef = useRef(null);
  const closeRef = useRef(null);
  const openRef = useRef(null);
  const msgBoxRef = useRef(null);

  const messagesEndRef = useRef(null);
  const [message, setMessage] = React.useState("");
  const [messageLoading, setMessageLoading] = React.useState(false);
  const [imageAsLink, setImageAsLink] = React.useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = React.useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const closeSideBar = () => {
    conversationRef.current.style.display = "none";
    openRef.current.style.display = "block";
  };
  const openSideBar = () => {
    conversationRef.current.style.display = "block";
    openRef.current.style.display = "none";
  };

  const { userId } = useParams();
  const history = useHistory();
  const { location } = history;
  const { state } = location;
  const selectedConversation = state?.conversation;

  const { loading, messageList } = useMessageList(userId);
  const { loading: newMessageLoading, newMessageList } = useNewMessageList();
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);
  const storage = getStorage();

  const sendMessage = async () => {
    if (message) {
      if (imageAsLink.length > 0) {
        setMessageLoading(true);
        uploadImage(sendMsg);
      } else {
        const messageId = messageList.length + 1;
        var today = new Date();
        var date =
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear() +
          ", " +
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const msg = {
          imageUrl: "",
          message,
          messageId,
          messageType: "text",
          sender: "admin",
          time: date,
        };
        sendMsg(msg);
      }
    } else {
      if (imageAsLink.length > 0) {
        setMessageLoading(true);

        uploadImage();
      }
    }
  };

  const uploadImage = async () => {
    const imageRef = storageRef(
      storage,
      `/Profiles/${imageAsLink.name}+${new Date().getTime()}.jpg`
    );
    uploadBytes(imageRef, imageAsLink[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        var today = new Date();
        var date =
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear() +
          ", " +
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();

        const messageId = messageList.length + 1;
        const msg = {
          imageUrl: downloadURL,
          message,
          messageId,
          messageType: "image",
          sender: "admin",
          time: date,
        };
        sendMsg(msg);
      });
    });
  };

  const sendMsg = async (msg) => {
    const db = getDatabase();
    setMessageLoading(true);
    update(ref(db, `Messages/${userId}/${msg?.messageId}`), msg)
      .then((res) => {
        setMessageLoading(false);
        setMessage("");
        setImageAsLink([]);
        setSelectedImageUrl("");
        removeNewMessages();
      })
      .catch((err) => {
        setMessageLoading(false);
      });
  };

  const removeNewMessages = async () => {
    const db = getDatabase();
    remove(ref(db, `NewMessage/${userId}`))
      .then((res) => {})
      .catch((err) => {
        setMessageLoading(false);
      });
  };

  const deleteConversation = () => {
    if (window.confirm("Delete Conversation?")) {
      const db = getDatabase();
      remove(ref(db, `Messages/${userId}`))
        .then((res) => {
          alert("Deleted Successful.");
        })
        .catch((err) => {
          setMessageLoading(false);
        });
    }
  };

  const changeImage = (e) => {
    setImageAsLink(e.target.files);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setSelectedImageUrl(objectUrl);

    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  };

  return (
    <AdminLayout>
      <>
        <div className="new_message_container">
          <h3>New Messages</h3>
          <div className="new_message">
            {newMessageList.map((nMsg) => (
              <div>
                <Link
                  to={{
                    pathname: `/admin/message/${nMsg?.userId}`,
                    state: {
                      nMsg,
                    },
                  }}
                >
                  <h5>{nMsg?.name}</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="message_container">
          <div ref={conversationRef} className="conversation_list">
            <div
              ref={closeRef}
              onClick={(e) => closeSideBar()}
              className="close_icon"
            >
              <CloseRounded />
            </div>
            <Conversation />
          </div>
          <div className="message_box_container">
            <div className="m_header">
              <div
                ref={openRef}
                onClick={() => openSideBar()}
                className="sidebar_icon"
              >
                <MenuIcon />
              </div>
              <div>
                <h3>
                  {selectedConversation?.name
                    ? selectedConversation?.name
                    : "Conversatin Not Selected."}
                </h3>
              </div>
              <div
                onClick={() => deleteConversation()}
                style={{ marginLeft: "50px", cursor: "pointer" }}
              >
                <DeleteOutline />
              </div>
            </div>
            <div id="message_box" ref={msgBoxRef} className="m_main">
              {loading ? (
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
              ) : (
                messageList.map((message) => <MessageItem message={message} />)
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="m_footer">
              <input
                onChange={(e) => changeImage(e)}
                id="image"
                type="file"
                accept="image/*"
                style={{ visibility: "invisible", display: "none" }}
                multiple="false"
              />

              <label htmlFor="image">
                <div className="add_Image">
                  <AddCircleOutline />
                  {selectedImageUrl !== "" && (
                    <img
                      style={{ width: "50px", height: "50px" }}
                      src={selectedImageUrl}
                      alt=""
                    />
                  )}
                </div>
              </label>
              <div className="input_title">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write Something"
                />
              </div>
              <div className="send_button">
                {messageLoading ? (
                  <BeatLoader loading={loading} />
                ) : (
                  <SendOutlined onClick={() => sendMessage()} fontSize="20" />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </AdminLayout>
  );
}

export default Message;
