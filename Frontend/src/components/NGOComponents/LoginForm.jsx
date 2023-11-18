import styles from "./LoginForm.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { BACKEND_URL } from "../../utils/constants";
import axios from "axios";
import Cookie from "js-cookie";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const CustomTextField = styled(TextField)({
  "& label": {
    color: "#cfcfcf",
  },
  "& label.Mui-focused": {
    color: "var(--color2)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--color2)",
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color2)",
    },
    "&.Mui-focused": {
      color: "white",
      caretColor: "white",
    },
  },
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    registrationNo: "",
    password: "",
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
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
  };

  return (
    <>
      {!Cookie.get("token") && (
        <div className={styles.formContainer}>
          <div className={styles.title}>Login</div>
          <form onSubmit={handleSubmit}>
            <CustomTextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Registration No."
              name="registrationNo"
              type="text"
              fullWidth
              onChange={handleChange}
            />
            <div className={styles.passwordContainer}>
              <CustomTextField
                required
                id="outlined-basic"
                variant="outlined"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                onChange={handleChange}
              />

              <div className={styles.eye} onClick={togglePassword}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>

            <input
              type="submit"
              value="Login"
              className={styles.submitButton}
              tabIndex={3}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
