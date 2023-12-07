import styles from "./UserRegistration.module.css";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { ThreeDots } from "react-loader-spinner";
import { BACKEND_URL } from "../../../utils/constants";
import CNTextField from "../../CNTextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

const UserRegistration = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    userPhoto: null,
    phoneNumber: "",
    address: "",
    latitude: "",
    longitude: "",
    aadhaarCardNumber: "",
    aadhaarCardPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      fullName,
      userPhoto,
      phoneNumber,
      address,
      latitude,
      longitude,
      aadhaarCardNumber,
      aadhaarCardPhoto,
    } = formData;

    const data = new FormData();
    data.append("fullName", fullName);
    data.append("userPhoto", userPhoto);
    data.append("phoneNumber", phoneNumber);
    data.append("address", address);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("aadhaarCardNumber", aadhaarCardNumber);
    data.append("aadhaarCardPhoto", aadhaarCardPhoto);

    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/donor/register`, data, {
        mode: "cors",
        withCredentials: true,
      });
      handleReset(e);
      document.cookie =
        "isNew=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setOpen(false);

      window.location.reload(true);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/donor/logout`, {
        mode: "cors",
        withCredentials: true,
      });
    } catch (error) {}
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      logout();
      document.cookie =
        "isNew=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const isUserNew = () => {
    const name = "isNew" + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(name) === 0) {
        const data = decodeURIComponent(
          cookie.substring(name.length, cookie.length)
        );

        return data;
      }
    }

    return false;
  };

  useEffect(() => {
    if (isUserNew() === "true") {
      handleOpen();
    }
  });

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}>
        <div className={styles.registrationContainer}>
          <div className={styles.title}>Welcome! Complete your Profile</div>
          <div className={styles.regFormClose} onClick={handleClose}>
            <CloseIcon />
          </div>
          <form
            className={styles.form}
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <CNTextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Full Name"
              name="fullName"
              type="text"
              fullWidth
              margin="none"
              onChange={handleChange}
            >
              {" "}
            </CNTextField>

            <CNTextField
              required
              //variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              fullWidth
              margin="none"
              type="text"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9+]*",
                maxLength: 10,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              onChange={handleChange}
            >
              {" "}
            </CNTextField>

            <CNTextField
              required
              variant="outlined"
              label="Address"
              name="address"
              type="text"
              fullWidth
              margin="none"
              onChange={handleChange}
            >
              {" "}
            </CNTextField>

            <CNTextField
              required
              variant="outlined"
              label="Aadhaar Card Number"
              name="aadhaarCardNumber"
              type="text"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 12,
              }}
              fullWidth
              margin="none"
              onChange={handleChange}
            >
              {" "}
            </CNTextField>

            <div>
              <div
                style={{
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: "var(--color1)",
                }}
              >
                User Photo
              </div>
              <input
                type="file"
                id="userPhoto"
                name="userPhoto"
                accept="image/*"
                required
                onChange={handleChange}
                style={{
                  padding: "15px",
                  border: "1px solid #bebebe",
                  borderRadius: "5px",
                  width: "100%",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: "var(--color1)",
                }}
              >
                Aadhaar Card Photo
              </div>
              <input
                type="file"
                id="aadhaarCardPhoto"
                name="aadhaarCardPhoto"
                accept="image/*"
                required
                onChange={handleChange}
                style={{
                  padding: "15px",
                  border: "1px solid #bebebe",
                  borderRadius: "5px",
                  width: "100%",
                }}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                padding: "10px",
                background: "var(--color2)",
                color: "var(--color1)",
              }}
            >
              {!isLoading ? (
                "Register"
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "25px",
                  }}
                >
                  <ThreeDots
                    color="var(--color1)"
                    radius="5"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              )}
            </Button>
          </form>{" "}
        </div>
      </Dialog>
    </>
  );
};

export default UserRegistration;
