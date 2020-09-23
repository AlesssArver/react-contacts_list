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

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Email is incorrect").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type IProps = {
  register: (email: string, password: string) => void;
};
type IFormValues = {
  email: string;
  password: string;
};

const Register: FC<IProps> = ({ register }) => {
  const classes = useStyles();

  const initialValues: IFormValues = { email: "", password: "" };

  return (
    <>
      <Typography className={classes.title}>Register</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values: IFormValues, { resetForm }: any) => {
          register(values.email, values.password);
          resetForm();
        }}
      >
        {(props: any) => (
          <form onSubmit={props.handleSubmit}>
            <div className={classes.field}>
              <TextField
                className={classes.input}
                size="small"
                variant="outlined"
                name="email"
                placeholder="Email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
              />
            </div>
            <div className={classes.field}>
              <Button className={classes.button} type="submit">
                Register
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <Link to="/login">
        <Typography className={classes.link}>Login</Typography>
      </Link>
    </>
  );
};

export default React.memo(Register);
