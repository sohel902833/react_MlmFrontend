import { getDatabase, onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function useConversationList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [conversationList, setConversationList] = useState([]);
  useEffect(() => {
    async function fetchMessages() {
      //databse related works
      const db = getDatabase();
      const upgradeRef = ref(db, "Conversation");
      const upgradeQuery = query(upgradeRef);
      try {
        setError(false);
        setLoading(true);
        //request firebase database;
        onValue(upgradeQuery, (snapshot) => {
          setLoading(false);
          if (snapshot.exists()) {
            setConversationList((prevCashout) => {
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

  return { loading, error, conversationList };
}
