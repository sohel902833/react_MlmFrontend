import React from "react";
import Main from "../Components/UserComponents/MainPage/Main";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
  const auth = useAuth();
  console.log(auth, "HOmePage");
  return (
    <Main />
    // <div style={{ height: "100vh" }}>
    //   <BottomNav />
    // </div>
  );
};

export default Homepage;
