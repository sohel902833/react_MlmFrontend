import { getDatabase, ref, remove, update } from "firebase/database";
import React from "react";
import { BeatLoader } from "react-spinners";
import useNotification from "../../../hooks/useNotification";
import AdminLayout from "../../Layout/AdminLayout";
import "./notification.css";

function Notification() {
  const { loading, notificationList } = useNotification();
  const [message, setMessage] = React.useState("");
  const [upLoading, setUpLoading] = React.useState(false);
  const [dlLoading, setDlLoading] = React.useState(false);

  const setNotification = () => {
    const db = getDatabase();
    setUpLoading(true);
    let notificationId = "" + new Date().getTime();

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
    update(ref(db, `Notification/${notificationId}`), {
      notificationId,
      message,
      time: date,
    })
      .then((res) => {
        setNewNotification();
        setUpLoading(false);
        setMessage("");
      })
      .catch((err) => {
        setUpLoading(false);
      });
  };

  const setNewNotification = () => {
    const db = getDatabase();
    const notificationId = new Date().getTime();
    update(ref(db, `NewNotification/`), {
      notificationId,
    });
  };

  const removeNotification = (notificationId) => {
    setDlLoading(true);
    const db = getDatabase();
    remove(ref(db, `Notification/${notificationId}`))
      .then((res) => {
        setDlLoading(false);
      })
      .catch((err) => {
        setDlLoading(false);
      });
  };

  return (
    <AdminLayout>
      <div className="input_notification">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Enter Notification Message"
        />
        {upLoading ? (
          <BeatLoader loading={loading} />
        ) : (
          <button onClick={setNotification}>Save</button>
        )}
      </div>
      <div className="table-responsive table-bordered ">
        <table className="table  table-striped table-bordered">
          <thead
            className="text-center"
            style={{ backgroundColor: `#00C972`, color: `#fff` }}
          >
            <th>Sl</th>
            <th>Notification Message</th>
            <th>Time</th>
            <th>Action</th>
          </thead>
          <tbody className="text-left">
            {notificationList.map((data, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{data?.message}</td>
                <td>{data?.time}</td>
                <td>
                  <button
                    disabled={dlLoading}
                    onClick={() => removeNotification(data?.notificationId)}
                    className="accept"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Notification;
