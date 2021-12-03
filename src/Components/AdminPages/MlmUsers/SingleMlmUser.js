import React from "react";
import styles from "./Mlm.module.css";
function MUser({ user, getLevel }) {
  return (
    <div
      onClick={() =>
        getLevel(user.myReferCode, `--Refer Code: ${user?.myReferCode}`)
      }
      className={styles.user}
    >
      <h5 className={styles.title}>Name: {user?.name}</h5>
      <p className={styles.title}>Phone: {user?.phone}</p>
      <p className={styles.title}>Refercode: {user?.referCode}</p>
      <p className={styles.title}>MyReferCode: {user.myReferCode}</p>
    </div>
  );
}

export default MUser;
