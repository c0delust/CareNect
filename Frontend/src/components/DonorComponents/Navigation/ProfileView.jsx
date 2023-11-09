import axios from "axios";
import styles from "./ProfileView.module.css";
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import LoginForm from "./LoginForm.jsx";
import CheckAuth from "../../../utils/CheckAuth.js";
import ProfileDetailDialog from "./ProfileDetailDialog.jsx";

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

  useEffect(() => {
    (async () => {
      setUser(await CheckAuth());
    })();
  }, []);

  return (
    <>
      {user ? (
        <div className={`${styles.profile}`} onClick={handleDetailOpen}>
          <img src={user.userPhoto}></img>
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
        <ProfileDetailDialog
          open={detailOpen}
          onClose={handleDetailClose}
          user={user}
        />
      )}
    </>
  );
};

export default ProfileView;
