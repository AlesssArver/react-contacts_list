import React, { FC, useEffect, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

type IProps = {
  isSnackbar: boolean;
  type?: "error" | "success" | "info" | "warning";
  text?: string;
  closeSnackbar: () => void;
};

const MySnackbar: FC<IProps> = ({ isSnackbar, type, text, closeSnackbar }) => {
  const [open, setOpen] = useState(false);

  const handleClose = (reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  };

  return (
    <Snackbar
      open={isSnackbar}
      onClose={handleClose}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert severity={type}>{text}</Alert>
    </Snackbar>
  );
};
export default React.memo(MySnackbar);
