export default {
  setSnackbar: (
    isSnackbar: boolean,
    snackbarType: "error" | "success" | "info" | "warning",
    text?: string
  ) =>
    ({
      type: "SNACKBAR/SET_SNACKBAR",
      isSnackbar,
      snackbarType,
      text,
    } as const),
  closeSnackbar: () => ({ type: "SNACKBAR/CLOSE_SNACKBAR" } as const),
};
