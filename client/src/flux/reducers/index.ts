import { combineReducers } from "redux";

import app from "./app";
import auth from "./auth";
import contacts from "./contacts";

const rootReducer = combineReducers({ app, auth, contacts });
export default rootReducer;
