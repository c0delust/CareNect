import axios from "axios";
import styles from "./ProfileView.module.css";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import LoginForm from "./LoginForm.jsx";
import CheckAuth from "../utils/CheckAuth";

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleDetailOpen = () => {
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/userExists",
        { mode: "cors", withCredentials: true }
      );

      const responseData = response.data;

      if (responseData.userData != null) {
        setUser(responseData.userData);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const logout = async () => {
    window.open(
      "http://localhost:3000/auth/logout?source=profileView",
      "_self"
    );
  };

  useEffect(() => {
    async function checkAuth() {
      setUser(await CheckAuth());
    }
    checkAuth();
  }, []);

  return (
    <>
      {user ? (
        <div className={`${styles.profile}`} onClick={handleDetailOpen}>
          <img src={user.userPhoto} width="45px"></img>
        </div>
      ) : (
        <div className={`${styles.signInButton}`} onClick={handleLoginOpen}>
          Sign In
        </div>
      )}
      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        // fullWidth={true}
        // maxWidth="sm"
      >
        <LoginForm />
      </Dialog>
      {user && (
        <Dialog
          open={detailOpen}
          onClose={handleDetailClose}
          PaperProps={{
            style: {
              position: "absolute",
              top: "5%",
              right: "0%",
              // // top: "0%",
              // left: "88%",
              borderRadius: "20px",
              // transform: "translate(-50%, -50%)",
            },
          }}
          BackdropProps={{
            style: { backgroundColor: "transparent" },
          }}
        >
          <div className={styles.profileDetails}>
            {user.fullName}
            <br />
            {user.email}
            <br />
            <button className={styles.logoutButton} onClick={logout}>
              Log Out
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ProfileView;
