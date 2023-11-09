import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const googleAuth = () => {
    window.open("http://localhost:3000/donor/google", "_self");
  };

  return (
    <>
      <div className={`${styles.dialogContent}`}>
        <div className={`${styles.dialogTitle}`}>Login</div>
        <div className={`${styles.googleSignIn}`} onClick={googleAuth}>
          <img
            src="https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png"
            width="25px"
          ></img>
          <div>Continue with Google</div>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
