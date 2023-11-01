import {
  Dialog,
  Button,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useState } from "react";

const LoginDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  return (
    <div stlye={{}}>
      <h4>How to create Dialog Box in ReactJS?</h4>
      <Button variant="outlined" color="primary" onClick={handleClickToOpen}>
        Open Demo Dialog
      </Button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"How are you?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            I am Good, Hope the same for you!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
