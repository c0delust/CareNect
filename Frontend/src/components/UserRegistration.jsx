import styles from "./UserRegistration.module.css";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { ThreeDots } from "react-loader-spinner";

const UserRegistration = () => {
  const REGISTER_API = "http://localhost:3000/registerDonor";

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
      const response = await axios.post(REGISTER_API, data, {
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
      const response2 = await axios.get(
        "http://localhost:3000/auth/login/success",
        { mode: "cors", withCredentials: true }
      );
      console.log(response2);
      const response1 = await axios.get("http://localhost:3000/auth/logout", {
        mode: "cors",
        withCredentials: true,
      });
      console.log(response1);
      const response = await axios.get(
        "http://localhost:3000/auth/login/success",
        { mode: "cors", withCredentials: true }
      );
      console.log(response);
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
          <div className={styles.regFormClose} onClick={handleClose}>
            <CloseIcon />
          </div>
          <h2>Welcome! Complete your Profile</h2>
          <div>
            {/* <p></p> */}
            <form
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                onChange={handleChange}
              />

              <label htmlFor="userPhoto">User Photo:</label>
              <input
                type="file"
                id="userPhoto"
                name="userPhoto"
                accept="image/*"
                required
                onChange={handleChange}
              />

              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                onChange={handleChange}
              />

              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                required
                onChange={handleChange}
              />

              <label htmlFor="aadhaarCardNumber">Aadhaar Card Number:</label>
              <input
                type="text"
                id="aadhaarCardNumber"
                name="aadhaarCardNumber"
                required
                onChange={handleChange}
              />

              <label htmlFor="aadhaarCardPhoto">Aadhaar Card Photo:</label>
              <input
                type="file"
                id="aadhaarCardPhoto"
                name="aadhaarCardPhoto"
                accept="image/*"
                required
                onChange={handleChange}
              />

              {isLoading ? (
                <div className={styles.loader}>
                  <ThreeDots
                    width="50"
                    color="#fca311"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                </div>
              ) : (
                <input type="submit" value="Save" />
              )}
            </form>{" "}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UserRegistration;
