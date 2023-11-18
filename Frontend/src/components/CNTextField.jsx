import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const CNTextField = styled(TextField)({
  "& label": {
    color: "var(--color1-light)",
  },
  "& label.Mui-focused": {
    color: "var(--color1)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--color1)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--color1-light)",
    },
    "&:hover fieldset": {
      borderColor: "var(--color1)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color1)",
    },
    "&.Mui-focused": {
      color: "var(--color1)",
      caretColor: "var(--color1)",
    },
  },
});

export default CNTextField;
