import axios from "axios";
import styles from "./ProfileView.module.css";
import { useEffect, useState } from "react";
import profilePlaceHolder from "../assets/profilePlaceholder.png";
import { Dialog } from "@mui/material";
import LoginForm from "./LoginForm.jsx";

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

      const userData = response.data.userData;
      setUser(userData);
    } catch (error) {
      // console.log(error);
    }
  };

  const logout = async () => {
    window.open("http://localhost:3000/auth/logout", "_self");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      {user ? (
        <div className={`${styles.profile}`}>User</div>
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
    </>
  );
};

export default ProfileView;
