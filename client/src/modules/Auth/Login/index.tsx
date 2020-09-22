import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
  },
  button: {
    marginTop: 15,
    width: "100%",
  },
  field: {
    margin: 10,
  },
  link: {
    fontSize: 14,
    textTransform: "lowercase",
    textAlign: "center",
  },
}));

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email is incorrect").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type IProps = {
  login: (email: string, password: string) => void;
};
type IFormValues = {
  email: string;
  password: string;
};

const Login: FC<IProps> = ({ login }) => {
  const classes = useStyles();

  const initialValues: IFormValues = { email: "", password: "" };

  return (
    <>
      <Typography className={classes.title}>LogIn</Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={({ email, password }, { resetForm }) => {
          login(email, password);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={classes.field}>
              <TextField
                className={classes.input}
                size="small"
                variant="outlined"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.input}
                size="small"
                variant="outlined"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            <div className={classes.field}>
              <Button className={classes.button} type="submit">
                Login
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <Link to="/register">
        <Typography className={classes.link}>Register</Typography>
      </Link>
    </>
  );
};

export default React.memo(Login);
