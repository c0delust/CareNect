// import React from 'react'
import styles from "./NgoNavbar.module.css";
import ProfileView from './ProfileView';
import NgoDashboard from './NgoDashboard';
import logo from "../assets/logo.png";

const NgoNavbar = () => {
  return (
    <>

        {/* <div className={`${styles.navbar} ${visible ? "" : styles.hidden}`}> */}
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img src={logo} />
          </div>
          

          <div style={{ alignSelf: "center" }}>
            <ProfileView />
          </div>
        </div>

        <NgoDashboard></NgoDashboard>

    </>
  )
}

export default NgoNavbar