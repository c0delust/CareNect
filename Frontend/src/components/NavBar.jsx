import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import Home from "../pages/HomePage";
import AboutUs from "../pages/AboutUsPage";
import Contribute from "../pages/ContributePage";
import ProfileView from "./ProfileView";
import CheckAuth from "../utils/CheckAuth";
import LoginForm from "./LoginForm";
import { Dialog } from "@mui/material";
import OurPartners from "../pages/OurPartners";
import logo from "../assets/logo.png";

const NavBar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleTabChange = async (tabName) => {
    if (tabName === "Contribute" && !isLogin) {
      handleLoginOpen();
      return;
    }
    setActiveTab(tabName);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    const checkAuth = async () => {
      if ((await CheckAuth()) != null) setIsLogin(true);
      else setIsLogin(false);
    };
    checkAuth();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <div className={`${styles.navbar} ${visible ? "" : styles.hidden}`}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img src={logo} />
          </div>
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
            {isLogin === true && (
              <div
                className={`${styles.tab} ${
                  activeTab === "Our Partners" ? styles.activeTab : ""
                }`}
                onClick={() => handleTabChange("Our Partners")}
              >
                Our Partners
              </div>
            )}
          </div>
          <div style={{ alignSelf: "center" }}>
            <ProfileView />
          </div>
        </div>
      </div>
      <div
        className={`${styles.pageContainer} ${
          activeTab !== "Home" ? styles.slide : ""
        }`}
      >
        {activeTab === "Home" && <Home />}
      </div>
      <div
        className={`${styles.pageContainer} ${
          activeTab !== "About Us" ? styles.slide : ""
        }`}
      >
        {activeTab === "About Us" && <AboutUs />}
      </div>
      <div
        className={`${styles.pageContainer} ${
          activeTab !== "Contribute" ? styles.slide : ""
        }`}
      >
        {activeTab === "Contribute" && <Contribute />}
      </div>

      <div
        className={`${styles.pageContainer} ${
          activeTab !== "Our Partners" ? styles.slide : ""
        }`}
      >
        {activeTab === "Our Partners" && <OurPartners />}
      </div>
      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        // fullWidth={true}
        // maxWidth="sm"
      >
        <LoginForm />
      </Dialog>
    </>
  );
};

export default NavBar;
