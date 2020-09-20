import React, { FC } from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";

import { Register, Login } from "../../modules";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    boxShadow: "0 2px 5px 1px rgba(17, 17, 17, 0.10) !important",
  },
}));

type IProps = {
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
};

const Auth: FC<IProps> = ({ register, login }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Route path="/login" render={() => <Login login={login} />} />
          <Route
            path="/register"
            render={() => <Register register={register} />}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(Auth);
