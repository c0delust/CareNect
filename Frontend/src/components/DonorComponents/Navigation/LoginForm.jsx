import styles from "./LoginForm.module.css";
import { BACKEND_URL } from "../../../utils/constants";

const LoginForm = () => {
  const googleAuth = () => {
    window.open(`${BACKEND_URL}/donor/google`, "_self");
  };

  return (
    <>
      <div className={`${styles.dialogContent}`}>
        <div className={`${styles.dialogTitle}`}>LOGIN</div>
        <div className={`${styles.googleSignIn}`} onClick={googleAuth}>
          <img
            src="https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png"
            width="30px"
          ></img>
          <div>Continue with Google</div>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
