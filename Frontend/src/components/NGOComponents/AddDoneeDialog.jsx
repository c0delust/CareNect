import { useEffect, useState } from "react";
import styles from "./AddDoneeDialog.module.css";
import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

const AddDoneeDialog = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    // password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.log(err);
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
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth={true}
    >
      <div className={styles.addDoneeDialogContainer}>
        <div className={styles.title}>ADD DONEE</div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
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
            variant="outlined"
            label="Aadhaar Card Number"
            name="aadhharCardNumber"
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
              type="file"
              style={{
                padding: "15px",
                border: "1px solid #bebebe",
                borderRadius: "5px",
                width: "100%",
              }}
            ></input>
          </div>

          <div>
            <div style={{ marginBottom: "10px", fontWeight: "600" }}>
              Upload Aadhaar Card
            </div>
            <input
              type="file"
              style={{
                padding: "15px",
                border: "1px solid #bebebe",
                borderRadius: "5px",
                width: "100%",
              }}
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
