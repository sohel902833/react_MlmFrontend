import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const apiKey = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MESAURMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};
const app = initializeApp(apiKey);
export const db = getDatabase(app);
export default app;

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.database();
// const auth = firebase.auth();
// export { db, auth };
