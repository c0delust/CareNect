import styles from "./AddNeedDialog.module.css";
import { Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import CNTextField from "../CNTextField";
import { ThreeDots } from "react-loader-spinner";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CategoryIcon from "@mui/icons-material/Category";
import InputAdornment from "@mui/material/InputAdornment";

const AddNeedDialog = ({ open, setOpen, donee }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    quantity: "",
    deadline: "",
    needImage: "",
  });
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    setSnackBarOpen(false);
  }, [open]);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { title, description, quantity, deadline, needImage, category } =
      formData;

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("quantity", quantity);
    data.append("deadline", deadline);
    data.append("needImage", needImage);
    data.append("category", category);
    data.append("doneeID", donee.id);

    try {
      const response = await axios.post(
        BACKEND_URL + "/ngo/registerNeed",
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setCategory(e.target.value);
    }
    if (e.target.name === "deadline") {
      const dateString = e.target.value;
      const [year, month, day] = dateString.split("-").map(Number);
      setDeadline(new Date(`${year}-${month}-${day}`));
    }

    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
      deadline: deadline,
    });
  };

  const onClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      setCategory("");
      setFormData({});
    }
  };

  return (
    <>
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
          Need added Successfully!
        </MuiAlert>
      </Snackbar>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={true}>
        <div className={styles.addNeedDialogContainer}>
          <div className={styles.title}>ADD NEED</div>
          <div className={styles.subtitle}>
            {donee ? "For: " + donee.fullName : ""}
          </div>
          <div className={styles.formClose} onClick={onClose}>
            <CloseIcon />
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <CNTextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Title"
              name="title"
              type="text"
              fullWidth
              margin="none"
              onChange={handleChange}
            />
            <CNTextField
              required
              id="outlined-select-currency"
              select
              value={category}
              name="category"
              label="Category"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon />
                  </InputAdornment>
                ),
              }}
            >
              {/* {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))} */}

              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Medical">Medical</MenuItem>
              <MenuItem value="Women & Girls">Women & Girls</MenuItem>
              <MenuItem value="Animals">Animals</MenuItem>
              <MenuItem value="Creative">Creative</MenuItem>
              <MenuItem value="Food & Hunger">Food & Hunger</MenuItem>
              <MenuItem value="Environmental">Environmental</MenuItem>
              <MenuItem value="Children">Children</MenuItem>
              <MenuItem value="Memorial">Memorial</MenuItem>
              <MenuItem value="Community Development">
                Community Development
              </MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </CNTextField>

            <CNTextField
              required
              multiline
              id="outlined-basic"
              variant="outlined"
              label="Description"
              name="description"
              type="text"
              fullWidth
              margin="none"
              onChange={handleChange}
              maxRows={3}
              inputProps={{
                maxLength: 150,
              }}
            />

            <CNTextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Quantity"
              name="quantity"
              type="text"
              fullWidth
              margin="none"
              onChange={handleChange}
              inputProps={{
                maxLength: 50,
              }}
            />

            <CNTextField
              required
              aria-readonly
              name="deadline"
              label="Deadline"
              type="date"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: new Date().toISOString().split("T")[0],
                max: new Date(new Date().setMonth(new Date().getMonth() + 2))
                  .toISOString()
                  .split("T")[0],
              }}
            />

            <div>
              <div
                style={{
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: "var(--color1)",
                }}
              >
                Upload Image
              </div>
              <input
                required
                name="needImage"
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
                "Submit"
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
    </>
  );
};

export default AddNeedDialog;
