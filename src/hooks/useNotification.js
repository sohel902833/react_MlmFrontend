import { getDatabase, onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function useNotification() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [notificationList, setNotificationList] = useState([]);
  useEffect(() => {
    async function fetchMessages() {
      //databse related works
      const db = getDatabase();
      const upgradeRef = ref(db, "Notification");
      const upgradeQuery = query(upgradeRef);
      try {
        setError(false);
        setLoading(true);
        //request firebase database;
        onValue(upgradeQuery, (snapshot) => {
          setLoading(false);
          if (snapshot.exists()) {
            const newList = [...Object.values(snapshot.val())];
            console.log(newList);
            console.log(newList.reverse());
            setNotificationList((prevList) => newList.reverse());
            // setNotificationList((prevCashout) => {
            //   return [...Object.values(snapshot.val())];
            // });
          }
        });
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }
    fetchMessages();
  }, []);

  return { loading, error, notificationList };
}
