import {
  getDatabase,
  onValue,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";
export default function useMessageList(userId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    async function fetchMessages() {
      //databse related works
      const db = getDatabase();
      const upgradeRef = ref(db, `Messages/${userId}`);
      const upgradeQuery = query(upgradeRef, orderByKey());
      try {
        setError(false);
        setLoading(true);
        //request firebase database;
        onValue(upgradeQuery, (snapshot) => {
          setLoading(false);
          if (snapshot.exists()) {
            setMessageList((prevCashout) => {
              return [...Object.values(snapshot.val())];
            });
          } else {
            setMessageList([]);
          }
        });
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }
    fetchMessages();
  }, [userId]);

  return { loading, error, messageList };
}
