import { useState } from "react";
import styles from "./Header.module.css";
import ProfileView from "./components/ProfileView";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div>
        <div className={styles.headerContainer}>
          <div className={styles.logo}> </div>
          <div className={styles.tabContainer}>
            <div
              className={`${styles.tab} ${
                activeTab === "Home" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("Home")}
            >
              Home
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "About Us" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("About Us")}
            >
              About Us
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "Contribute" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("Contribute")}
            >
              Contribute
            </div>
          </div>
          <div>
            <ProfileView />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
