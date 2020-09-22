import { lazy } from "react";

export const AuthContainer = lazy(() => import("./Auth"));
export const ContactsContainer = lazy(() => import("./Contacts"));
export const ShowContactContainer = lazy(() => import("./ShowContact"));
export const SnackbarContainer = lazy(() => import("./Snackbar"));
