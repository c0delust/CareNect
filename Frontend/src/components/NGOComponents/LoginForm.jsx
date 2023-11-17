import styles from "./LoginForm.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState, useEffect, useRef } from "react";
import { BACKEND_URL } from "../../utils/constants";
import axios from "axios";
import Cookie from "js-cookie";

const LoginForm = () => {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const [currentInput, setCurrentInput] = useState("input1");

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    registrationNo: "",
    password: "",
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter" && event.target.id === "input2") {
      event.preventDefault();
      input3Ref.current.focus();
      handleSubmit(event);
      return;
    }

    if (event.key === "Enter") {
      switch (event.target.id) {
        case "input1":
          event.preventDefault();
          input2Ref.current.focus();
          break;
        case "input2":
          event.preventDefault();
          input3Ref.current.focus();
          break;
        case "input3":
          handleSubmit(event);
          break;
        default:
          break;
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/ngo/login`, formData, {
        mode: "cors",
      });

      Cookie.set("token", response.data.token, { path: "/ngo" });
      console.log(response.status);
      window.location.reload(false);
    } catch (error) {
      console.log(error.message);
    }

    input3Ref.current.blur();
  };

  return (
    <>
      {!Cookie.get("token") && (
        <div className={styles.formContainer}>
          <div className={styles.title}>Login</div>
          <form>
            <label htmlFor="registrationNo">Registration No.</label>
            <input
              type="text"
              placeholder="Registration No."
              name="registrationNo"
              onChange={handleChange}
              id="input1"
              ref={input1Ref}
              onKeyDown={handleEnterKey}
              tabIndex={1}
            />

            <label htmlFor="password">Password</label>

            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                tabIndex={2}
                id="input2"
                ref={input2Ref}
                onKeyDown={handleEnterKey}
              />
              <div className={styles.eye} onClick={togglePassword}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>

            <input
              type="submit"
              value="Login"
              className={styles.submitButton}
              onClick={handleSubmit}
              tabIndex={3}
              id="input3"
              ref={input3Ref}
              onKeyDown={handleEnterKey}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
