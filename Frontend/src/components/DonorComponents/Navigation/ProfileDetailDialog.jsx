import { Dialog } from "@mui/material";
import styles from "./ProfileDetailDialog.module.css";
import { BACKEND_URL } from "../../../utils/constants";
import Cookie from "js-cookie";

const ProfileDetailDialog = ({ open, onClose, user }) => {
  const logout = async () => {
    window.open(`${BACKEND_URL}/donor/logout?source=profileView`, "_self");
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            position: "absolute",
            top: "4%",
            right: "0%",
          },
        }}
        BackdropProps={{
          style: { backgroundColor: "transparent" },
        }}
      >
        <div className={styles.profileDetails}>
          <div className={styles.username}>{user.fullName}</div>

          <div className={styles.links}>View Profile</div>
          <div className={styles.line}></div>
          <div className={styles.links}>View my Impact</div>

          <button className={styles.logoutButton} onClick={logout}>
            Log Out
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileDetailDialog;
