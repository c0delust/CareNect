import { useEffect, useState, forwardRef } from "react";
import styles from "./AddDoneeDialog.module.css";
import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import CNTextField from "../CNTextField";
import { ThreeDots } from "react-loader-spinner";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AddDoneeDialog = ({ open, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    setSnackBarOpen(false);
  }, [open]);

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
      setIsLoading(true);
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
          data.append("phoneNumber1", "+91" + phoneNumber1);
          data.append("phoneNumber2", "+91" + phoneNumber2);
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
              setSnackBarOpen(true);
              setIsLoading(false);
              e.target.reset();
            }
          } catch (error) {
            setIsLoading(false);
            console.log(error);
          }

          console.log(coordinates);
        },
        (err) => {
          setIsLoading(false);
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

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setSnackBarOpen(false);
        onClose();
      }}
      maxWidth="sm"
      fullWidth={true}
    >
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={10000}
        onClose={handleSnackBarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Donee Registered Successfully!
        </MuiAlert>
      </Snackbar>
      <div className={styles.addDoneeDialogContainer}>
        <div className={styles.title}>ADD DONEE</div>
        <div className={styles.regFormClose} onClick={onClose}>
          <CloseIcon />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
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
            variant="outlined"
            label="Phone Number 1"
            name="phoneNumber1"
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
            label="Phone Number 2"
            name="phoneNumber2"
            fullWidth
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
            margin="none"
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
                marginBottom: "15px",
                fontWeight: "600",
                color: "var(--color1)",
              }}
            >
              Family Info
            </div>
            <div className={styles.familyInfoRow}>
              <CNTextField
                required
                variant="outlined"
                label="Member Count"
                name="memberCount"
                type="number"
                inputProps={{
                  max: 20,
                  min: 1,
                }}
                fullWidth
                margin="none"
                onChange={handleChange}
              >
                {" "}
              </CNTextField>

              <CNTextField
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                fullWidth
                margin="none"
                onChange={handleChange}
              >
                {" "}
              </CNTextField>

              <CNTextField
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
              </CNTextField>
            </div>
          </div>

          <div>
            <div
              style={{
                marginBottom: "10px",
                fontWeight: "600",
                color: "var(--color1)",
              }}
            >
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
            <div
              style={{
                marginBottom: "10px",
                fontWeight: "600",
                color: "var(--color1)",
              }}
            >
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
            {!isLoading ? (
              "Add"
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
        </form>
      </div>
    </Dialog>
  );
};

export default AddDoneeDialog;
