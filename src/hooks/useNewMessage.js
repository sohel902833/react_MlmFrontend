import { getDatabase, onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function useNewMessageList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [newMessageList, setNewMessageList] = useState([]);
  useEffect(() => {
    async function fetchMessages() {
      //databse related works
      const db = getDatabase();
      const upgradeRef = ref(db, "NewMessage");
      const upgradeQuery = query(upgradeRef);
      try {
        setError(false);
        setLoading(true);
        //request firebase database;
        onValue(upgradeQuery, (snapshot) => {
          setLoading(false);
          if (snapshot.exists()) {
            setNewMessageList((prevCashout) => {
              return [...Object.values(snapshot.val())];
            });
          }
        });
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }
    fetchMessages();
  }, []);

  return { loading, error, newMessageList };
}
