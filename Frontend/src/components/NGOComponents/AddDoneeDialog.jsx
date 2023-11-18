import { useEffect, useState } from "react";
import styles from "./AddDoneeDialog.module.css";
import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import CloseIcon from "@mui/icons-material/Close";

const AddDoneeDialog = ({ open, setOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber1: "",
    phoneNumber2: "",
    address: "",
    aadhaarCardNumber: "",
    memberCount: "",
    income: "",
    incomeSource: "",
    photoFile: "",
    aadhaarCardPhoto: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          const {
            fullName,
            phoneNumber1,
            phoneNumber2,
            address,
            aadhaarCardNumber,
            memberCount,
            income,
            incomeSource,
            photoFile,
            aadhaarCardPhoto,
          } = formData;

          const data = new FormData();
          data.append("fullName", fullName);
          data.append("phoneNumber1", phoneNumber1);
          data.append("phoneNumber2", phoneNumber2);
          data.append("address", address);
          data.append("aadhaarCardNumber", aadhaarCardNumber);
          data.append("memberCount", memberCount);
          data.append("income", income);
          data.append("incomeSource", incomeSource);
          data.append("photoFile", photoFile);
          data.append("aadhaarCardPhoto", aadhaarCardPhoto);
          data.append("latitude", coordinates.latitude);
          data.append("longitude", coordinates.longitude);

          try {
            const response = await axios.post(
              BACKEND_URL + "/ngo/registerDonee",
              data,
              {
                mode: "cors",
                withCredentials: true,
              }
            );

            if (response.status === 201) {
              onClose();
            }
          } catch (error) {
            console.log(error);
          }

          console.log(coordinates);
        },
        (err) => {
          console.log(err);
          return;
        }
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={true}>
      <div className={styles.addDoneeDialogContainer}>
        <div className={styles.title}>ADD DONEE</div>
        <div className={styles.regFormClose} onClick={onClose}>
          <CloseIcon />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
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
          </TextField>

          <TextField
            required
            variant="outlined"
            label="Phone Number 1"
            name="phoneNumber1"
            fullWidth
            margin="none"
            type="text"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9+]*",
              maxLength: 13,
              minLength: 13,
            }}
            onChange={handleChange}
          >
            {" "}
          </TextField>

          <TextField
            required
            variant="outlined"
            label="Phone Number 2"
            name="phoneNumber2"
            fullWidth
            type="text"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9+]*",
              maxLength: 13,
            }}
            margin="none"
            onChange={handleChange}
          >
            {" "}
          </TextField>

          <TextField
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
          </TextField>

          <TextField
            required
            variant="outlined"
            label="Aadhaar Card Number"
            name="aadhaarCardNumber"
            type="text"
            fullWidth
            margin="none"
            onChange={handleChange}
          >
            {" "}
          </TextField>

          <div>
            <div style={{ marginBottom: "10px", fontWeight: "600" }}>
              Family Info
            </div>
            <div className={styles.familyInfoRow}>
              <TextField
                required
                variant="outlined"
                label="Member Count"
                name="memberCount"
                type="number"
                fullWidth
                margin="none"
                onChange={handleChange}
              >
                {" "}
              </TextField>

              <TextField
                required
                variant="outlined"
                label="Income"
                name="income"
                type="text"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 6,
                }}
                fullWidth
                margin="none"
                onChange={handleChange}
              >
                {" "}
              </TextField>

              <TextField
                required
                variant="outlined"
                label="Income Source"
                name="incomeSource"
                type="text"
                fullWidth
                margin="none"
                onChange={handleChange}
              >
                {" "}
              </TextField>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: "10px", fontWeight: "600" }}>
              Upload Photo
            </div>
            <input
              required
              name="photoFile"
              type="file"
              style={{
                padding: "15px",
                border: "1px solid #bebebe",
                borderRadius: "5px",
                width: "100%",
              }}
              onChange={handleChange}
            ></input>
          </div>

          <div>
            <div style={{ marginBottom: "10px", fontWeight: "600" }}>
              Upload Aadhaar Card
            </div>
            <input
              required
              name="aadhaarCardPhoto"
              type="file"
              style={{
                padding: "15px",
                border: "1px solid #bebebe",
                borderRadius: "5px",
                width: "100%",
              }}
              onChange={handleChange}
            ></input>
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
            Submit
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default AddDoneeDialog;
