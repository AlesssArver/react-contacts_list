import React, { ComponentType, FC, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import store, { IRootState } from "./flux";
import { initializeApp } from "./flux/reducers/app";

import {
  SnackbarContainer,
  AuthContainer,
  ContactsContainer,
  ShowContactContainer,
} from "./containers";

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const App: FC<IMapStateToProps & IMapDispatchToProps> = ({
  initializeApp,
  initialized,
}) => {
  const classes = useStyles();

  useEffect(() => initializeApp(), [initialized]);

  return (
    <>
      <Container className={classes.mainContainer}>
        <div className={classes.container}>
          <Suspense fallback={<h1>Loading . . .</h1>}>
            <SnackbarContainer />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/contacts" />}
              />

              <Route
                path={["/login", "/register"]}
                render={() => <AuthContainer />}
              />
              <Route
                exact
                path="/contacts"
                render={() => <ContactsContainer />}
              />
              <Route path="/contacts/:_id" component={ShowContactContainer} />
              <Route path="*" render={() => <>404 Not Found</>} />
            </Switch>
          </Suspense>
        </div>
      </Container>
    </>
  );
};

type IMapStateToProps = {
  initialized: boolean;
};
type IMapDispatchToProps = {
  initializeApp: () => void;
};
const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  initialized: state.app.initialized,
});

const AppContainer = compose<ComponentType>(
  connect<IMapStateToProps, IMapDispatchToProps, {}, IRootState>(
    mapStateToProps,
    { initializeApp }
  ),
  withRouter
)(App);

const MainApp: FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};
export default MainApp;
