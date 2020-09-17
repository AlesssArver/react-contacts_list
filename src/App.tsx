import React from "react";
import { Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import AuthContainer from "./containers/Auth";
import ContactsContainer from "./containers/Contacts";

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <div className={classes.container}>
        <Route exact path="/" render={() => <Redirect to="/contacts" />} />
        <Route path={["/login", "/register"]} component={AuthContainer} />
        <Route path="/contacts" component={ContactsContainer} />
      </div>
    </Container>
  );
};

export default App;
