import { AddCircleOutline, SendOutlined } from "@material-ui/icons";
import { getDatabase, ref, update } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../context/AuthContext";
import useMessageList from "../../../hooks/useMessageList";
import MainLayout from "../MainPage/MainLayout";
import AppBar from "../PageComponents/AppBar";
import "./message.css";
import MessageItem from "./MessageItem";

function Message() {
  const { currentUser } = useAuth();
  const msgBoxRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = React.useState("");
  const [messageLoading, setMessageLoading] = React.useState(false);
  const [imageAsLink, setImageAsLink] = React.useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = React.useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { loading, messageList } = useMessageList(currentUser?.userId);
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
          sender: "user",
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
          sender: "user",
          time: date,
        };
        sendMsg(msg);
      });
    });
  };
  const sendMsg = async (msg) => {
    const db = getDatabase();
    setMessageLoading(true);
    update(ref(db, `Messages/${currentUser?.userId}/${msg?.messageId}`), msg)
      .then((res) => {
        setMessageLoading(false);
        setMessage("");
        setImageAsLink([]);
        setSelectedImageUrl("");
        sendNewMessage();
      })
      .catch((err) => {
        setMessageLoading(false);
      });
  };

  const sendNewMessage = async () => {
    const db = getDatabase();
    update(ref(db, `NewMessage/${currentUser?.userId}`), {
      userId: currentUser?.userId,
      name: currentUser?.name,
    })
      .then((res) => {})
      .catch((err) => {
        setMessageLoading(false);
      });
  };

  const changeImage = (e) => {
    setImageAsLink(e.target.files);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setSelectedImageUrl(objectUrl);

    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl);
  };

  return (
    <MainLayout>
      <>
        <div className="user_message_container">
          <div>
            <AppBar title="Message" backUrl="/" />
          </div>
          <div className="user_message_box_container">
            <div id="message_box" ref={msgBoxRef} className="user_m_main">
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
            <div className="user_m_footer">
              <input
                onChange={(e) => changeImage(e)}
                id="image"
                type="file"
                accept="image/*"
                style={{ visibility: "invisible", display: "none" }}
                multiple="false"
              />

              <label htmlFor="image">
                <div className="user_add_Image">
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
              <div className="user_input_title">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write Something"
                />
              </div>
              <div className="user_send_button">
                {messageLoading ? (
                  <BeatLoader loading={loading} />
                ) : (
                  <SendOutlined onClick={() => sendMessage()} fontSize="40" />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </MainLayout>
  );
}

export default Message;
