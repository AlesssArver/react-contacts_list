import { combineReducers } from "redux";

import app from "./app";
import snackbar from "./snackbar";
import auth from "./auth";
import contacts from "./contacts";

const rootReducer = combineReducers({ app, snackbar, auth, contacts });
export default rootReducer;
